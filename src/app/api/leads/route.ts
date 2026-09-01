import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(req: Request) {
  try {
    const rawBody = await req.json();
    
    // Validação estrutural do payload da Meta Graph API (Leads ads)
    const leadData = {
      lead_id: rawBody.entry?.[0]?.changes?.[0]?.value?.lead_id || rawBody.lead_id,
      form_id: rawBody.entry?.[0]?.changes?.[0]?.value?.form_id || rawBody.form_id,
      created_time: new Date().toISOString(),
      source: 'meta_ads_lead_webhook',
      payload: rawBody
    };

    console.log('Recebendo lead da Meta:', leadData);

    // Inserir no PostgreSQL
    await pool.query(
      'INSERT INTO leads (tenant_id, data) VALUES ($1, $2)',
      [rawBody.tenant_id || 'default', JSON.stringify(leadData)]
    );

    // Disparo para CRM/N8N
    const n8nWebhookUrl = process.env.N8N_LEAD_WEBHOOK_URL;
    if (n8nWebhookUrl) {
      await fetch(n8nWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Meta-Signature': req.headers.get('x-hub-signature-256') || ''
        },
        body: JSON.stringify(leadData),
      });
    }

    return NextResponse.json({ success: true, lead_id: leadData.lead_id });
  } catch (error) {
    console.error('Erro na captura:', error);
    return NextResponse.json({ success: false, error: 'Falha interna de captura' }, { status: 500 });
  }
}
