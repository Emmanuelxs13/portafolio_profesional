/**
 * AppConfig server-component tests: the layout emits a JSON script carrying
 * the smtpConfigured signal without ever exposing credentials.
 */

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AppConfig from '@/components/AppConfig';

const ENV_KEYS = [
  'SMTP_HOST',
  'SMTP_PORT',
  'SMTP_USER',
  'SMTP_PASS',
  'CONTACT_FROM',
  'CONTACT_TO',
] as const;

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
});

const configureSmtp = () => {
  process.env.SMTP_HOST = 'smtp.resend.com';
  process.env.SMTP_PORT = '465';
  process.env.SMTP_USER = 'resend';
  process.env.SMTP_PASS = 're_test_only_placeholder';
  process.env.CONTACT_FROM = 'from@example.com';
  process.env.CONTACT_TO = 'to@example.com';
};

describe('AppConfig', () => {
  it('emits smtpConfigured:true as a JSON script when SMTP env is set', () => {
    configureSmtp();
    const { container } = render(<AppConfig />);
    const node = container.querySelector('script#app-config');
    expect(node).not.toBeNull();
    expect(node?.textContent).toBe('{"smtpConfigured":true}');
  });

  it('emits smtpConfigured:false when SMTP env is unset', () => {
    render(<AppConfig />);
    const node = document.getElementById('app-config');
    expect(node).not.toBeNull();
    expect(node?.textContent).toBe('{"smtpConfigured":false}');
  });

  it('never renders credentials into the document', () => {
    configureSmtp();
    render(<AppConfig />);
    const serialized = document.getElementById('app-config')?.textContent ?? '';
    expect(serialized).not.toContain('re_test_only_placeholder');
    expect(serialized).not.toContain('smtp.resend.com');
    expect(screen.queryByText(/re_/)).toBeNull();
  });
});