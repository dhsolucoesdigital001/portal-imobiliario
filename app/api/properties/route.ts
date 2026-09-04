import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// Singleton instance to prevent hot-reloading issues in Next.js development
const globalForPrisma = global as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;


const CACHE_TTL = 60000; // 1 minuto
const propertyCache = new Map<string, { data: any, timestamp: number }>();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tenantId = searchParams.get('tenant_id');
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
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

    const [total, properties] = await prisma.$transaction([
      prisma.property.count({ where }),
      prisma.property.findMany({
        where,
        take: limit,
        skip: (page - 1) * limit,
        orderBy: { createdAt: 'desc' }
      })
    ]);

    const result = {
      data: properties,
      meta: {
        total,
        page,
        limit
      }
    };

    propertyCache.set(cacheKey, { data: result, timestamp: Date.now() });
    return NextResponse.json(result);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
