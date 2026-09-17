/**
 * Schema tests for the contact form zod validation.
 * Error messages are i18n dictionary keys resolved by the client via t().
 */

import { contactFormSchema } from '@/lib/contact/schema';

const validPayload = {
  name: 'Emmanuel Berrio',
  email: 'emmanuel@example.com',
  subject: 'Oportunidad laboral',
  message: 'Me gustaría conversar sobre una vacante para tu equipo.',
  consent: true,
};

describe('contactFormSchema', () => {
  it('accepts a fully valid payload', () => {
    const result = contactFormSchema.safeParse(validPayload);
    expect(result.success).toBe(true);
  });

  it('accepts a payload without the optional subject', () => {
    const result = contactFormSchema.safeParse({ ...validPayload, subject: undefined });
    expect(result.success).toBe(true);
  });

  it('trims surrounding whitespace from name, email and message', () => {
    const result = contactFormSchema.safeParse({
      ...validPayload,
      name: '  Emmanuel Berrio  ',
      email: '  emmanuel@example.com  ',
      message: '  Me gustaría conversar sobre una vacante para tu equipo.  ',
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe('Emmanuel Berrio');
      expect(result.data.email).toBe('emmanuel@example.com');
      expect(result.data.message).toBe('Me gustaría conversar sobre una vacante para tu equipo.');
    }
  });

  it('rejects a name shorter than 2 characters after trimming', () => {
    const result = contactFormSchema.safeParse({ ...validPayload, name: '  A  ' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues).toHaveLength(1);
      expect(result.error.issues[0].message).toBe('contact.form.nameTooShort');
    }
  });

  it('rejects a name longer than 100 characters', () => {
    const result = contactFormSchema.safeParse({ ...validPayload, name: 'A'.repeat(101) });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues).toHaveLength(1);
      expect(result.error.issues[0].message).toBe('contact.form.nameTooLong');
    }
  });

  it('rejects an invalid email format', () => {
    const result = contactFormSchema.safeParse({ ...validPayload, email: 'not-an-email' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues).toHaveLength(1);
      expect(result.error.issues[0].message).toBe('contact.form.emailInvalid');
    }
  });

  it('rejects an email longer than 254 characters', () => {
    const result = contactFormSchema.safeParse({
      ...validPayload,
      email: `${'a'.repeat(243)}@example.com`,
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues).toHaveLength(1);
      expect(result.error.issues[0].message).toBe('contact.form.emailTooLong');
    }
  });

  it('rejects a subject longer than 200 characters', () => {
    const result = contactFormSchema.safeParse({ ...validPayload, subject: 'X'.repeat(201) });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues).toHaveLength(1);
      expect(result.error.issues[0].message).toBe('contact.form.subjectTooLong');
    }
  });

  it('rejects a message shorter than 10 characters', () => {
    const result = contactFormSchema.safeParse({ ...validPayload, message: 'Muy corto' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues).toHaveLength(1);
      expect(result.error.issues[0].message).toBe('contact.form.messageTooShort');
    }
  });

  it('rejects a message longer than 5000 characters', () => {
    const result = contactFormSchema.safeParse({ ...validPayload, message: 'M'.repeat(5001) });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues).toHaveLength(1);
      expect(result.error.issues[0].message).toBe('contact.form.messageTooLong');
    }
  });

  it('rejects an unchecked consent checkbox', () => {
    const result = contactFormSchema.safeParse({ ...validPayload, consent: false });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues).toHaveLength(1);
      expect(result.error.issues[0].message).toBe('contact.form.consentRequired');
    }
  });

  it('rejects an empty payload with a localized required error per field', () => {
    const result = contactFormSchema.safeParse({});
    expect(result.success).toBe(false);
    if (!result.success) {
      const messages = result.error.issues.map((issue) => issue.message).sort();
      expect(messages).toEqual(
        [
          'contact.form.required',
          'contact.form.required',
          'contact.form.required',
          'contact.form.consentRequired',
        ].sort()
      );
    }
  });

  it('rejects empty string fields with their specific localized errors', () => {
    const result = contactFormSchema.safeParse({
      name: '',
      email: '',
      message: '',
      consent: false,
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const messages = result.error.issues.map((issue) => issue.message).sort();
      expect(messages).toEqual(
        [
          'contact.form.nameTooShort',
          'contact.form.emailInvalid',
          'contact.form.messageTooShort',
          'contact.form.consentRequired',
        ].sort()
      );
    }
  });
});