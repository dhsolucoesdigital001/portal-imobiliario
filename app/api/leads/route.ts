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
  message: z.string().optional(),
  email: z.string().email().optional(),
  city: z.string().optional(),
  uf: z.string().length(2).optional(),
});

export async function POST(req: Request) {
  try {
    const rawBody = await req.json();
    const validation = LeadSchema.safeParse(rawBody);

    if (!validation.success) {
      return NextResponse.json({ success: false, error: validation.error.format() }, { status: 400 });
    }

    const { name, phone, property_id, message, email, city, uf } = validation.data;

    // Persiste no banco de dados
    const query = `
      INSERT INTO leads (name, phone, property_id, message, email, city, uf, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
      RETURNING id
    `;
    await pool.query(query, [name, phone, property_id, message || null, email || null, city || null, uf || null]);

    // Disparo de webhook real para n8n
    const n8nWebhookUrl = process.env.N8N_LEAD_WEBHOOK_URL;
    if (n8nWebhookUrl) {
      await fetch(n8nWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validation.data),
      });
    }

    return NextResponse.json({ success: true, message: 'Lead persistido e webhook disparado' });
  } catch (error) {
    console.error('Erro ao salvar lead:', error);
    return NextResponse.json({ success: false, message: 'Erro interno ao salvar lead' }, { status: 500 });
  }
}
