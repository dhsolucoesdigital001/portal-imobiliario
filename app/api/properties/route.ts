import { NextResponse } from 'next/server';
import { Pool } from 'pg';
import { z } from 'zod';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const PropertySchema = z.object({
  tenant_id: z.string().uuid(),
  title: z.string().min(3),
  description: z.string().optional(),
  price: z.number().positive().optional(),
  city: z.string(),
  uf: z.string().length(2),
});

// Cache mantido para performance local
const propertyCache = new Map<string, { data: any, timestamp: number }>();
const CACHE_TTL = 60000; // 1 minuto

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
    let query = 'SELECT * FROM properties WHERE tenant_id = $1';
    const params: any[] = [tenantId];
    let offsetIdx = 2;

    if (city) {
        query += ` AND city = $${offsetIdx++}`;
        params.push(city);
    }
    if (uf) {
        query += ` AND uf = $${offsetIdx++}`;
        params.push(uf);
    }

    const countQuery = query.replace('SELECT *', 'SELECT COUNT(*)');
    query += ` LIMIT $${offsetIdx++} OFFSET $${offsetIdx++}`;
    params.push(limit, (page - 1) * limit);

    const [countResult, dataResult] = await Promise.all([
        pool.query(countQuery, params.slice(0, params.length - 2)),
        pool.query(query, params)
    ]);

    const result = {
        data: dataResult.rows,
        meta: {
            total: parseInt(countResult.rows[0].count),
            page,
            limit
        }
    };

    propertyCache.set(cacheKey, { data: result, timestamp: Date.now() });
    return NextResponse.json(result);
  } catch (error) {
    console.error('Erro ao buscar propriedades:', error);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
