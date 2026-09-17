/**
 * SMTP configuration signal (server-side).
 * Reads SMTP env vars at call time so tests and deployments can toggle them.
 * Never exposes secrets to the client: this module is only imported server-side.
 */

export interface SmtpConfig {
  host: string;
  port: number;
  user: string;
  pass: string;
  from: string;
  to: string;
}

export const SMTP_ENV_KEYS = [
  'SMTP_HOST',
  'SMTP_PORT',
  'SMTP_USER',
  'SMTP_PASS',
  'CONTACT_FROM',
  'CONTACT_TO',
] as const;

const readEnv = (name: string): string => (process.env[name] ?? '').trim();

/**
 * Resolves the SMTP configuration from the environment, or null when any
 * required variable is missing, whitespace-only, or the port is invalid.
 */
export function getSmtpConfig(): SmtpConfig | null {
  const host = readEnv('SMTP_HOST');
  const portRaw = readEnv('SMTP_PORT');
  const user = readEnv('SMTP_USER');
  const pass = readEnv('SMTP_PASS');
  const from = readEnv('CONTACT_FROM');
  const to = readEnv('CONTACT_TO');

  if (!host || !user || !pass || !from || !to) {
    return null;
  }
  if (!/^\d+$/.test(portRaw)) {
    return null;
  }
  const port = Number(portRaw);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    return null;
  }

  return { host, port, user, pass, from, to };
}

/**
 * True only when every required SMTP env var is present and valid.
 */
export function isSmtpConfigured(): boolean {
  return getSmtpConfig() !== null;
}