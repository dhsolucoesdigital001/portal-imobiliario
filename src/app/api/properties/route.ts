import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get('limit') || '50', 10);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const skip = (page - 1) * limit;

    const [properties, total] = await prisma.$transaction([
      prisma.property.findMany({
        take: limit,
        skip: skip,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          title: true,
          price: true,
          city: true,
          state: true,
          type: true,
          bedrooms: true,
        },
      }),
      prisma.property.count(),
    ]);

    // Otimização: Adicionado cache-control para reduzir carga na DB e melhorar tempo de resposta na borda
    return new NextResponse(JSON.stringify({ success: true, count: properties.length, total }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    });
  } catch (error) {
    console.error('Erro ao buscar propriedades:', error);
    return NextResponse.json({ success: false, error: 'Erro ao buscar propriedades' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.title || !body.price || !body.city || !body.state) {
      return NextResponse.json({ success: false, error: 'Campos obrigatórios ausentes' }, { status: 400 });
    }
    const property = await prisma.property.create({
      data: {
        tenantId: body.tenantId || 'default',
        title: body.title,
        price: parseFloat(body.price),
        city: body.city,
        state: body.state,
        type: body.type || 'outros',
        bedrooms: parseInt(body.bedrooms || '0', 10),
      }
    });

    return NextResponse.json({ success: true, id: property.id }, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar propriedade:', error);
    return NextResponse.json({ success: false, error: 'Falha ao processar a criação de propriedade' }, { status: 500 });
  }
}
