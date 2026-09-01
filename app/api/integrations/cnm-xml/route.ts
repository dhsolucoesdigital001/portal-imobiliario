import { NextResponse } from 'next/server';
import { Pool } from 'pg';
import { XMLParser } from 'fast-xml-parser'; // Recommended parser

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export async function POST(request: Request) {
  try {
    const rawXml = await request.text();
    const parser = new XMLParser();
    const jsonObj = parser.parse(rawXml);

    // Assuming a flat structure for real estate listing defined in CNM
    // Map jsonObj to your schema.
    const property = jsonObj.imovel; 

    if (!property || !property.id) {
        return NextResponse.json({ error: 'Invalid XML format' }, { status: 400 });
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
        property.id,
        property.titulo,
        property.valor || 0,
        property.descricao || '',
        'cnm'
    ]);

    return NextResponse.json({ success: true, id: property.id });
  } catch (error) {
    console.error('Error processing CNM XML:', error);
    return NextResponse.json({ error: 'Failed to process XML' }, { status: 500 });
  }
}
