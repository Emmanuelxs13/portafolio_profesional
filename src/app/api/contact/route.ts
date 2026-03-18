import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json(
    { message: 'Endpoint de contacto no configurado todavía.' },
    { status: 501 }
  );
}
