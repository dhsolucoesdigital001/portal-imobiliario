import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tenantId = searchParams.get('tenant_id');

  if (!tenantId) {
    return NextResponse.json({ error: 'tenant_id is required' }, { status: 400 });
  }

  try {
    const result = await pool.query('SELECT * FROM users WHERE tenant_id = $1', [tenantId]);
    return NextResponse.json(result.rows);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const body = await request.json();
  const { tenant_id, name, email } = body;

  if (!tenant_id || !name || !email) {
    return NextResponse.json({ error: 'tenant_id, name, and email are required' }, { status: 400 });
  }

  try {
    const result = await pool.query(
      'INSERT INTO users (tenant_id, name, email) VALUES ($1, $2, $3) RETURNING *',
      [tenant_id, name, email]
    );
    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
