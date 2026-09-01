import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function POST(request: Request) {
  try {
    const rawData = await request.text();
    // Assuming OLX sends form or JSON.
    // If it's XML, use a parser like 'xml2js'.
    // If it's JSON as common in webhooks:
    const data = JSON.parse(rawData);

    // Validate payload (example)
    if (!data.id || !data.title) {
        return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    const query = `
      INSERT INTO properties (external_id, title, price, description, source, updated_at)
      VALUES ($1, $2, $3, $4, $5, NOW())
      ON CONFLICT (external_id) DO UPDATE 
      SET price = EXCLUDED.price, 
          title = EXCLUDED.title,
          description = EXCLUDED.description,
          updated_at = NOW()
    `;
    
    await pool.query(query, [
        data.id, 
        data.title, 
        data.price || 0, 
        data.description || '', 
        'olx'
    ]);

    return NextResponse.json({ success: true, id: data.id });
  } catch (error) {
    console.error('Error processing OLX webhook:', error);
    return NextResponse.json({ error: 'Failed to process OLX webhook' }, { status: 500 });
  }
}
