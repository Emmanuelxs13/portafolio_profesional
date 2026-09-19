/**
 * Mailto fallback tests: prefilled subject/body construction for the
 * degraded (SMTP unset) contact path.
 */

import { buildMailtoHref, PUBLIC_CONTACT_EMAIL } from '@/lib/contact/mailto';

describe('buildMailtoHref', () => {
  it('builds a mailto link with subject and body prefilled', () => {
    expect(buildMailtoHref('a@b.com', 'Hola', 'Buen día')).toBe(
      'mailto:a@b.com?subject=Hola&body=Buen+d%C3%ADa'
    );
  });

  it('URL-encodes special characters in subject and body', () => {
    expect(buildMailtoHref('a@b.com', 'Pregunta & respuestas?', '50% off + más')).toBe(
      'mailto:a@b.com?subject=Pregunta+%26+respuestas%3F&body=50%25+off+%2B+m%C3%A1s'
    );
  });

  it('omits the body parameter when empty', () => {
    expect(buildMailtoHref('a@b.com', 'Hola', '')).toBe('mailto:a@b.com?subject=Hola');
  });

  it('omits the subject parameter when empty', () => {
    expect(buildMailtoHref('a@b.com', '', 'Cuerpo')).toBe('mailto:a@b.com?body=Cuerpo');
  });

  it('returns a bare mailto when subject and body are both empty', () => {
    expect(buildMailtoHref('a@b.com', '', '')).toBe('mailto:a@b.com');
  });

  it('exposes the public contact address used by the fallback', () => {
    expect(PUBLIC_CONTACT_EMAIL).toMatch(/^[^@\s]+@[^@\s]+\.[^@\s]+$/);
  });
});