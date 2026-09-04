import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ status: 'ok', routes: ['/api/leads', '/api/properties', '/api/users'] });
}
