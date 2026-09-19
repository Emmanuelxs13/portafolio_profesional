/**
 * Contact form schema (shared client/server).
 * Error messages are i18n dictionary keys resolved by the UI via t().
 */

import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z
    .string({ error: 'contact.form.required' })
    .trim()
    .min(2, { message: 'contact.form.nameTooShort' })
    .max(100, { message: 'contact.form.nameTooLong' }),
  email: z
    .string({ error: 'contact.form.required' })
    .trim()
    .max(254, { message: 'contact.form.emailTooLong' })
    .pipe(z.email({ message: 'contact.form.emailInvalid' })),
  subject: z
    .string()
    .trim()
    .max(200, { message: 'contact.form.subjectTooLong' })
    .optional(),
  message: z
    .string({ error: 'contact.form.required' })
    .trim()
    .min(10, { message: 'contact.form.messageTooShort' })
    .max(5000, { message: 'contact.form.messageTooLong' }),
  consent: z
    .boolean({ error: 'contact.form.consentRequired' })
    .refine((value) => value === true, { message: 'contact.form.consentRequired' }),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

/** Input form state (consent is a plain boolean until checked). */
export type ContactFormInput = z.input<typeof contactFormSchema>;