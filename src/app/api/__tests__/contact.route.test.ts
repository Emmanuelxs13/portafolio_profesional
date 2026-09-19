/**
 * Route tests for POST /api/contact.
 * The mailer module is mocked: no real SMTP connection is ever made.
 */

import { POST } from '@/app/api/contact/route';
import { sendContactEmail } from '@/lib/contact/mailer';

// next/server is imported by the route but references the Request/Response
// globals that jest-environment-jsdom v30 no longer provides. The stub keeps
// the status/body contract (NextResponse.json(body, { status })) so the
// route's own 200/400/500/503 branching is exercised for real.
jest.mock('next/server', () => ({
  NextResponse: {
    json: (body: unknown, init?: { status?: number }) => ({
      status: init?.status ?? 200,
      body,
      json: async () => body,
    }),
  },
}));

jest.mock('@/lib/contact/mailer', () => ({ sendContactEmail: jest.fn() }));

const mockedSendContactEmail = sendContactEmail as jest.Mock;

const ENV_KEYS = [
  'SMTP_HOST',
  'SMTP_PORT',
  'SMTP_USER',
  'SMTP_PASS',
  'CONTACT_FROM',
  'CONTACT_TO',
] as const;

const validPayload = {
  name: 'Emmanuel Berrio',
  email: 'emmanuel@example.com',
  subject: 'Oportunidad laboral',
  message: 'Me gustaría conversar sobre una vacante para tu equipo.',
  consent: true,
};

const originalEnv: Record<(typeof ENV_KEYS)[number], string | undefined> = {
  SMTP_HOST: undefined,
  SMTP_PORT: undefined,
  SMTP_USER: undefined,
  SMTP_PASS: undefined,
  CONTACT_FROM: undefined,
  CONTACT_TO: undefined,
};

beforeAll(() => {
  for (const key of ENV_KEYS) {
    originalEnv[key] = process.env[key];
  }
});

afterEach(() => {
  for (const key of ENV_KEYS) {
    if (originalEnv[key] === undefined) {
      delete process.env[key];
    } else {
      process.env[key] = originalEnv[key];
    }
  }
  mockedSendContactEmail.mockReset();
});

const configureSmtp = () => {
  process.env.SMTP_HOST = 'smtp.resend.com';
  process.env.SMTP_PORT = '465';
  process.env.SMTP_USER = 'resend';
  process.env.SMTP_PASS = 're_test_only_placeholder';
  process.env.CONTACT_FROM = 'from@example.com';
  process.env.CONTACT_TO = 'to@example.com';
};

const post = (body: unknown): Request => ({ json: async () => body }) as unknown as Request;

const postMalformed = (): Request => ({
  json: async () => {
    throw new SyntaxError('Unexpected token {');
  },
}) as unknown as Request;

describe('POST /api/contact', () => {
  it('returns 200 and sends the email on a valid payload with SMTP configured', async () => {
    configureSmtp();
    mockedSendContactEmail.mockResolvedValue(undefined);

    const response = await POST(post(validPayload));

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ message: 'message_sent' });
    expect(mockedSendContactEmail).toHaveBeenCalledTimes(1);
    expect(mockedSendContactEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Emmanuel Berrio',
        email: 'emmanuel@example.com',
        message: validPayload.message,
        consent: true,
      })
    );
  });

  it('returns 400 with field errors and never sends on invalid payload', async () => {
    configureSmtp();
    const response = await POST(post({ ...validPayload, email: 'not-an-email' }));

    expect(response.status).toBe(400);
    const body = await response.json();
    expect(body.error).toBe('validation_failed');
    expect(body.fieldErrors.email).toBeDefined();
    expect(body.fieldErrors.email[0]).toBe('contact.form.emailInvalid');
    expect(mockedSendContactEmail).not.toHaveBeenCalled();
  });

  it('returns 400 on malformed JSON and never sends', async () => {
    configureSmtp();
    const response = await POST(postMalformed());

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual(
      expect.objectContaining({ error: 'validation_failed' })
    );
    expect(mockedSendContactEmail).not.toHaveBeenCalled();
  });

  it('returns 503 when SMTP is not configured and never sends', async () => {
    const response = await POST(post(validPayload));

    expect(response.status).toBe(503);
    const body = await response.json();
    expect(body.error).toBe('smtp_not_configured');
    expect(mockedSendContactEmail).not.toHaveBeenCalled();
  });

  it('returns a generic 500 on transport failure without leaking internals', async () => {
    configureSmtp();
    mockedSendContactEmail.mockRejectedValue(
      new Error('ECONNECTION smtp.resend.com:465 connection refused')
    );

    const response = await POST(post(validPayload));

    expect(response.status).toBe(500);
    const body = await response.json();
    expect(body.error).toBe('send_failed');
    const serialized = JSON.stringify(body);
    expect(serialized).not.toContain('smtp.resend.com');
    expect(serialized).not.toContain('ECONNECTION');
    expect(serialized).not.toContain('re_test_only_placeholder');
  });
});