/**
 * Config tests for SMTP readiness detection (env-driven, no secrets in code).
 */

import { getSmtpConfig, isSmtpConfigured } from '@/lib/contact/config';

const ENV_KEYS = [
  'SMTP_HOST',
  'SMTP_PORT',
  'SMTP_USER',
  'SMTP_PASS',
  'CONTACT_FROM',
  'CONTACT_TO',
] as const;

const validEnv: Record<(typeof ENV_KEYS)[number], string> = {
  SMTP_HOST: 'smtp.resend.com',
  SMTP_PORT: '465',
  SMTP_USER: 'resend',
  SMTP_PASS: 're_test_only_placeholder',
  CONTACT_FROM: 'from@example.com',
  CONTACT_TO: 'to@example.com',
};

const originalEnv: Record<string, string | undefined> = {};

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
});

const applyEnv = (values: Partial<Record<(typeof ENV_KEYS)[number], string>>) => {
  for (const key of ENV_KEYS) {
    if (values[key] === undefined) {
      delete process.env[key];
    } else {
      process.env[key] = values[key];
    }
  }
};

describe('isSmtpConfigured / getSmtpConfig', () => {
  it('is true with the full valid env set and parses the port as an integer', () => {
    applyEnv(validEnv);
    expect(isSmtpConfigured()).toBe(true);
    const config = getSmtpConfig();
    expect(config).not.toBeNull();
    expect(config?.host).toBe('smtp.resend.com');
    expect(config?.port).toBe(465);
    expect(config?.user).toBe('resend');
    expect(config?.pass).toBe('re_test_only_placeholder');
    expect(config?.from).toBe('from@example.com');
    expect(config?.to).toBe('to@example.com');
  });

  it('accepts port 587 and reports secure=false at the mailer boundary', () => {
    applyEnv({ ...validEnv, SMTP_PORT: '587' });
    expect(isSmtpConfigured()).toBe(true);
    expect(getSmtpConfig()?.port).toBe(587);
  });

  it('is false when SMTP_PASS is missing', () => {
    applyEnv({ ...validEnv, SMTP_PASS: undefined });
    expect(isSmtpConfigured()).toBe(false);
    expect(getSmtpConfig()).toBeNull();
  });

  it('is false when SMTP_HOST is missing', () => {
    applyEnv({ ...validEnv, SMTP_HOST: undefined });
    expect(isSmtpConfigured()).toBe(false);
    expect(getSmtpConfig()).toBeNull();
  });

  it('is false when CONTACT_TO is missing', () => {
    applyEnv({ ...validEnv, CONTACT_TO: undefined });
    expect(isSmtpConfigured()).toBe(false);
  });

  it('is false when CONTACT_FROM is missing', () => {
    applyEnv({ ...validEnv, CONTACT_FROM: undefined });
    expect(isSmtpConfigured()).toBe(false);
  });

  it('is false when the port is not a number', () => {
    applyEnv({ ...validEnv, SMTP_PORT: 'abc' });
    expect(isSmtpConfigured()).toBe(false);
  });

  it('is false when the port is out of range', () => {
    applyEnv({ ...validEnv, SMTP_PORT: '70000' });
    expect(isSmtpConfigured()).toBe(false);
    applyEnv({ ...validEnv, SMTP_PORT: '0' });
    expect(isSmtpConfigured()).toBe(false);
  });

  it('is false when a value is whitespace only', () => {
    applyEnv({ ...validEnv, SMTP_PASS: '   ' });
    expect(isSmtpConfigured()).toBe(false);
  });

  it('is false when nothing is set', () => {
    applyEnv({});
    expect(isSmtpConfigured()).toBe(false);
  });
});