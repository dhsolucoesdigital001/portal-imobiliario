import { NextResponse } from 'next/server';

// Mock inicial da estrutura de dados de uma propriedade
interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
}

export async function GET() {
  // TODO: Conectar com banco de dados (Prisma/PostgreSQL)
  const properties: Property[] = [];
  return NextResponse.json({ success: true, data: properties });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // TODO: Validar com Zod e salvar no banco
    console.log('Recebendo nova propriedade:', body);
    return NextResponse.json({ success: true, id: 'mock-id-123' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Falha ao processar' }, { status: 500 });
  }
}
