import { NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';


const CACHE_TTL = 300000; // Aumentado para 5 minutos para reduzir carga no banco
const propertyCache = new Map<string, { data: any, timestamp: number }>();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tenantId = searchParams.get('tenant_id');
  const page = parseInt(searchParams.get('page') || '1');
  const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 100);
  const city = searchParams.get('city');
  const uf = searchParams.get('uf');

  if (!tenantId) {
    return NextResponse.json({ error: 'tenant_id is required' }, { status: 400 });
  }

  const cacheKey = `${tenantId}_page_${page}_limit_${limit}_${city}_${uf}`;
  const cachedData = propertyCache.get(cacheKey);

  if (cachedData && (Date.now() - cachedData.timestamp < CACHE_TTL)) {
    return NextResponse.json(cachedData.data);
  }

  try {
    const where: any = { tenantId };
    if (city) where.city = city;
    if (uf) where.state = uf;

    const [properties, total] = await Promise.all([
      prisma.property.findMany({
        where,
        take: limit,
        skip: (page - 1) * limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          title: true,
          price: true,
          city: true,
          state: true
        }
      }),
      prisma.property.count({ where })
    ]);

    const result = {
      data: properties,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    };

    if (propertyCache.size > 500) {
      propertyCache.clear();
    }
    propertyCache.set(cacheKey, { data: result, timestamp: Date.now() });
    return NextResponse.json(result);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
