import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Mock de Cache Simples (idealmente seria centralizado como Redis)
const propertyCache = new Map<string, { data: any, timestamp: number }>();
const CACHE_TTL = 60000; // 1 minuto

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tenantId = searchParams.get('tenant_id');
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const offset = (page - 1) * limit;

  if (!tenantId) {
    return NextResponse.json({ error: 'tenant_id is required' }, { status: 400 });
  }

  const cacheKey = `${tenantId}_page_${page}_limit_${limit}`;
  const cachedData = propertyCache.get(cacheKey);

  if (cachedData && (Date.now() - cachedData.timestamp < CACHE_TTL)) {
    return NextResponse.json(cachedData.data);
  }

  try {
    const countQuery = 'SELECT COUNT(*) FROM properties WHERE tenant_id = $1';
    const dataQuery = 'SELECT * FROM properties WHERE tenant_id = $1 LIMIT $2 OFFSET $3';
    
    const [countResult, dataResult] = await Promise.all([
        pool.query(countQuery, [tenantId]),
        pool.query(dataQuery, [tenantId, limit, offset])
    ]);

    const total = parseInt(countResult.rows[0].count);
    const result = {
        data: dataResult.rows,
        meta: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        }
    };

    propertyCache.set(cacheKey, { data: result, timestamp: Date.now() });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
