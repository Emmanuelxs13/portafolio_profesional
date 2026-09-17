/**
 * Nodemailer transporter for Resend SMTP (server-side only).
 * The transport is mocked in tests: no real SMTP connection is ever made.
 */

import nodemailer from 'nodemailer';
import type { ContactFormValues } from '@/lib/contact/schema';
import { getSmtpConfig, type SmtpConfig } from '@/lib/contact/config';

export function createTransporter(config: SmtpConfig) {
  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.port === 465,
    auth: { user: config.user, pass: config.pass },
  });
}

export async function sendContactEmail(
  values: ContactFormValues,
  config: SmtpConfig | null = getSmtpConfig()
): Promise<void> {
  if (!config) {
    throw new Error('SMTP not configured');
  }
  const transporter = createTransporter(config);
  const subject =
    values.subject && values.subject.trim()
      ? `Portfolio contact: ${values.subject.trim()}`
      : 'Portfolio contact message';
  await transporter.sendMail({
    from: config.from,
    to: config.to,
    replyTo: values.email,
    subject,
    text: `Name: ${values.name}\nEmail: ${values.email}\n\n${values.message}`,
  });
}