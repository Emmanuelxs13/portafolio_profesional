/**
 * POST /api/contact
 * Validates the contact payload with the shared zod schema, then delivers it
 * via nodemailer + Resend SMTP. Never logs or exposes message content or
 * credentials: failures return a generic 500/503 body only.
 *
 * - 400: validation failed (field errors, localized key per field)
 * - 503: SMTP not configured (the UI falls back to mailto in this state)
 * - 200: message delivered
 * - 500: transport failure (generic body)
 */

import { z } from 'zod';
import { NextResponse } from 'next/server';
import { contactFormSchema } from '@/lib/contact/schema';
import { isSmtpConfigured } from '@/lib/contact/config';
import { sendContactEmail } from '@/lib/contact/mailer';

export async function POST(request: Request): Promise<Response> {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'validation_failed', fieldErrors: {} },
      { status: 400 }
    );
  }

  const parsed = contactFormSchema.safeParse(payload);
  if (!parsed.success) {
    const { fieldErrors } = z.flattenError(parsed.error);
    return NextResponse.json(
      { error: 'validation_failed', fieldErrors },
      { status: 400 }
    );
  }

  if (!isSmtpConfigured()) {
    return NextResponse.json({ error: 'smtp_not_configured' }, { status: 503 });
  }

  try {
    await sendContactEmail(parsed.data);
    return NextResponse.json({ message: 'message_sent' }, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'send_failed' }, { status: 500 });
  }
}