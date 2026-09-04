import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const properties = await prisma.property.findMany({
      take: 50,
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json({ success: true, data: properties });
  } catch (error) {
    console.error('Erro ao buscar propriedades:', error);
    return NextResponse.json({ success: false, error: 'Erro ao buscar propriedades' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const property = await prisma.property.create({
      data: {
        tenantId: body.tenantId || 'default',
        title: body.title,
        price: body.price,
        city: body.city,
        state: body.state,
        type: body.type,
        bedrooms: body.bedrooms,
      }
    });

    return NextResponse.json({ success: true, id: property.id }, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar propriedade:', error);
    return NextResponse.json({ success: false, error: 'Falha ao processar a criação de propriedade' }, { status: 500 });
  }
}
