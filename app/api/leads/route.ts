import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Persistência real no banco
    const query = `
      INSERT INTO leads (name, email, phone, property_id, message, created_at)
      VALUES ($1, $2, $3, $4, $5, NOW())
      RETURNING id
    `;
    await pool.query(query, [body.name, body.email, body.phone, body.property_id, body.message]);

    // Disparo de webhook real para n8n
    const n8nWebhookUrl = process.env.N8N_LEAD_WEBHOOK_URL;
    if (n8nWebhookUrl) {
      await fetch(n8nWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
    }

    return NextResponse.json({ success: true, message: 'Lead persistido e webhook disparado' });
  } catch (error) {
    console.error('Erro ao salvar lead:', error);
    return NextResponse.json({ success: false, error: 'Erro ao processar lead' }, { status: 500 });
  }
}
