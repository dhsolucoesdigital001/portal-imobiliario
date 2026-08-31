import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('CNM XML enfileirado simulado:', body);
    return NextResponse.json({ success: true, message: 'Processamento enfileirado (simulado).' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
