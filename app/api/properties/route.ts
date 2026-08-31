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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tenantId = searchParams.get('tenant_id');
  const city = searchParams.get('city');
  const uf = searchParams.get('uf');

  if (!tenantId) {
    return NextResponse.json({ error: 'tenant_id is required' }, { status: 400 });
  }

  try {
    let query = 'SELECT * FROM properties WHERE tenant_id = $1';
    const params: any[] = [tenantId];
    let counter = 2;

    if (city) {
      query += ` AND city = $${counter++}`;
      params.push(city);
    }
    if (uf) {
      query += ` AND state = $${counter++}`;
      params.push(uf);
    }

    const result = await pool.query(query, params);
    return NextResponse.json(result.rows);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const rawBody = await request.json();
  const validation = PropertySchema.safeParse(rawBody);

  if (!validation.success) {
    return NextResponse.json({ error: validation.error.format() }, { status: 400 });
  }

  const { tenant_id, title, description, price, city, uf } = validation.data;

  try {
    const result = await pool.query(
      'INSERT INTO properties (tenant_id, title, description, price, city, uf) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [tenant_id, title, description, price, city, uf]
    );
    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const rawBody = await request.json();
  const { id, ...data } = rawBody;

  if (!id) return NextResponse.json({ error: 'Property id required' }, { status: 400 });

  try {
    const result = await pool.query(
      'UPDATE properties SET title = $1, description = $2, price = $3, city = $4, uf = $5 WHERE id = $6 RETURNING *',
      [data.title, data.description, data.price, data.city, data.uf, id]
    );
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) return NextResponse.json({ error: 'Property id required' }, { status: 400 });

  try {
    await pool.query('DELETE FROM properties WHERE id = $1', [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
