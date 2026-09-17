/**
 * Mailer tests (nodemailer transport). The transport is mocked: no real SMTP
 * connection is ever made.
 */

import nodemailer from 'nodemailer';
import { createTransporter, sendContactEmail } from '@/lib/contact/mailer';
import type { SmtpConfig } from '@/lib/contact/config';

jest.mock('nodemailer', () => ({ createTransport: jest.fn() }));

const mockedCreateTransport = nodemailer.createTransport as jest.Mock;

const config465: SmtpConfig = {
  host: 'smtp.resend.com',
  port: 465,
  user: 'resend',
  pass: 're_test_only_placeholder',
  from: 'from@example.com',
  to: 'to@example.com',
};

const config587: SmtpConfig = { ...config465, port: 587 };

const values = {
  name: 'Emmanuel Berrio',
  email: 'sender@example.com',
  message: 'Me gustaría conversar sobre una vacante para tu equipo.',
  consent: true as const,
};

describe('createTransporter', () => {
  beforeEach(() => {
    mockedCreateTransport.mockReset();
  });

  it('creates a secure TLS transporter for port 465 with Resend credentials', () => {
    createTransporter(config465);
    expect(mockedCreateTransport).toHaveBeenCalledTimes(1);
    expect(mockedCreateTransport).toHaveBeenCalledWith({
      host: 'smtp.resend.com',
      port: 465,
      secure: true,
      auth: { user: 'resend', pass: 're_test_only_placeholder' },
    });
  });

  it('creates a STARTTLS transporter (secure: false) for port 587', () => {
    createTransporter(config587);
    expect(mockedCreateTransport).toHaveBeenCalledTimes(1);
    expect(mockedCreateTransport).toHaveBeenCalledWith(
      expect.objectContaining({ port: 587, secure: false })
    );
  });
});

describe('sendContactEmail', () => {
  const sendMail = jest.fn();

  beforeEach(() => {
    sendMail.mockReset();
    mockedCreateTransport.mockReset();
    mockedCreateTransport.mockReturnValue({ sendMail });
  });

  it('sends the message through the transporter with derived options', async () => {
    sendMail.mockResolvedValue({ messageId: 'm1' });
    const subject = 'Oportunidad laboral';
    await expect(
      sendContactEmail({ ...values, subject }, config465)
    ).resolves.toBeUndefined();
    expect(mockedCreateTransport).toHaveBeenCalledTimes(1);
    expect(sendMail).toHaveBeenCalledTimes(1);
    expect(sendMail).toHaveBeenCalledWith({
      from: 'from@example.com',
      to: 'to@example.com',
      replyTo: 'sender@example.com',
      subject: `Portfolio contact: ${subject}`,
      text: expect.stringContaining('Emmanuel Berrio'),
    });
  });

  it('uses a neutral default subject when none is provided', async () => {
    sendMail.mockResolvedValue({ messageId: 'm2' });
    await expect(sendContactEmail(values, config465)).resolves.toBeUndefined();
    expect(sendMail).toHaveBeenCalledWith(
      expect.objectContaining({ subject: 'Portfolio contact message' })
    );
  });

  it('propagates a transport failure so the route can answer 500', async () => {
    sendMail.mockRejectedValue(new Error('connection refused'));
    await expect(sendContactEmail(values, config465)).rejects.toThrow('connection refused');
  });

  it('rejects when no SMTP config is available', async () => {
    await expect(sendContactEmail(values, null)).rejects.toThrow('SMTP not configured');
    expect(mockedCreateTransport).not.toHaveBeenCalled();
  });

  it('reads the real env config when none is passed and rejects when unset', async () => {
    const previous = {
      SMTP_HOST: process.env.SMTP_HOST,
      SMTP_USER: process.env.SMTP_USER,
      SMTP_PORT: process.env.SMTP_PORT,
      SMTP_PASS: process.env.SMTP_PASS,
      CONTACT_FROM: process.env.CONTACT_FROM,
      CONTACT_TO: process.env.CONTACT_TO,
    };
    delete process.env.SMTP_HOST;
    delete process.env.SMTP_USER;
    delete process.env.SMTP_PORT;
    delete process.env.SMTP_PASS;
    delete process.env.CONTACT_FROM;
    delete process.env.CONTACT_TO;
    try {
      await expect(sendContactEmail(values)).rejects.toThrow('SMTP not configured');
    } finally {
      for (const [key, value] of Object.entries(previous)) {
        if (value === undefined) {
          delete process.env[key];
        } else {
          process.env[key] = value;
        }
      }
    }
  });
});