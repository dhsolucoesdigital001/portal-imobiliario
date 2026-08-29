import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Simula disparo de webhook para n8n
    const n8nWebhookUrl = process.env.N8N_LEAD_WEBHOOK_URL;
    
    if (n8nWebhookUrl) {
      await fetch(n8nWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
    }

    return NextResponse.json({ success: true, message: 'Lead capturado e webhook disparado' });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Erro ao processar lead' }, { status: 500 });
  }
}
