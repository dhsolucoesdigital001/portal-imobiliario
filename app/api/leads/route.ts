import { NextResponse } from 'next/server';
import { Pool } from 'pg';
import { z } from 'zod';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const LeadSchema = z.object({
  name: z.string().min(3),
  phone: z.string().min(10),
  property_id: z.string().uuid(),
  city: z.string(),
  uf: z.string().length(2),
});

export async function POST(req: Request) {
  try {
    const rawBody = await req.json();
    const validation = LeadSchema.safeParse(rawBody);

    if (!validation.success) {
      return NextResponse.json({ success: false, error: validation.error.format() }, { status: 400 });
    }

    const { name, phone, property_id, city, uf } = validation.data;

    // Persiste no banco de dados
    await pool.query(
        'INSERT INTO leads (name, phone, property_id, city, uf) VALUES ($1, $2, $3, $4, $5)',
        [name, phone, property_id, city, uf]
    );

    // Disparo de webhook real para n8n
    const n8nWebhookUrl = process.env.N8N_LEAD_WEBHOOK_URL;
    if (n8nWebhookUrl) {
      await fetch(n8nWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validation.data),
      });
    }

    return NextResponse.json({ success: true, message: 'Lead capturado e webhook disparado' });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Erro ao processar lead' }, { status: 500 });
  }
}
