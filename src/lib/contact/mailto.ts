/**
 * Mailto degraded-state helpers for the contact section.
 * Used when SMTP is not configured: a link opens the visitor's mail client
 * with the subject and body prefilled from their input.
 */

export const PUBLIC_CONTACT_EMAIL = 'emmanuelberriojimenez13@gmail.com';

export function buildMailtoHref(to: string, subject: string, body: string): string {
  const params = new URLSearchParams();
  if (subject) {
    params.set('subject', subject);
  }
  if (body) {
    params.set('body', body);
  }
  const query = params.toString();
  return query ? `mailto:${to}?${query}` : `mailto:${to}`;
}