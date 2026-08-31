import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function POST(request: Request) {
  try {
    const data = await request.json(); // Assumindo JSON processado do XML
    const query = `
      INSERT INTO properties (title, price, external_id, source)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (external_id) DO UPDATE SET price = $2
    `;
    await pool.query(query, [data.title, data.price, data.external_id, 'cnm-xml']);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to integrate CNM XML' }, { status: 500 });
  }
}
