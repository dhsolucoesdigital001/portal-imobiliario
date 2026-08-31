import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Inserir no PostgreSQL
    await pool.query(
      'INSERT INTO leads (tenant_id, data) VALUES ($1, $2)',
      [body.tenant_id || 'default', JSON.stringify(body)]
    );

    // Simula disparo de webhook para n8n
    const n8nWebhookUrl = process.env.N8N_LEAD_WEBHOOK_URL;
    if (n8nWebhookUrl) {
      await fetch(n8nWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
    }

    return NextResponse.json({ success: true, message: 'Lead capturado e salvo no banco' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Erro ao processar lead' }, { status: 500 });
  }
}
