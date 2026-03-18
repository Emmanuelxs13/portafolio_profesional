import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'Endpoint de CV no configurado todavía.' }, { status: 501 });
}
