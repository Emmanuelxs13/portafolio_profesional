/**
 * Contact form panel: renders either the real react-hook-form + zod form
 * (SMTP configured) or the mailto degraded fallback (SMTP unset). The signal
 * comes from the server-injected <AppConfig/> script, read once at mount.
 * No SMTP secret ever reaches the client.
 */

'use client';

import { useSyncExternalStore, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema, type ContactFormInput } from '@/lib/contact/schema';
import { buildMailtoHref, PUBLIC_CONTACT_EMAIL } from '@/lib/contact/mailto';
import { useI18n } from '@/hooks/useI18n';

const inputClass =
  'w-full p-3 rounded-xl bg-(--color-panel-2) border border-(--color-line) text-(--color-ink) placeholder:text-(--color-muted) focus:outline-none focus:border-(--color-accent) focus:ring-2 focus:ring-(--color-focus-ring) transition-colors';
const labelClass = 'block text-sm font-medium text-(--color-ink) mb-2';
const errorClass = 'mt-1.5 text-sm text-(--color-accent)';
const submitClass =
  'inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-(--color-accent) text-(--color-ink) font-semibold uppercase tracking-[0.2em] text-xs transition-colors duration-300 hover:bg-(--color-accent-hover) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-focus-ring) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg) disabled:opacity-60 disabled:cursor-not-allowed';

/**
 * Reads the smtpConfigured flag from the layout's <AppConfig/> JSON script.
 */
export function readSmtpConfiguredFromDom(): boolean {
  if (typeof document === 'undefined') {
    return false;
  }
  const node = document.getElementById('app-config');
  if (!node?.textContent) {
    return false;
  }
  try {
    const parsed = JSON.parse(node.textContent) as { smtpConfigured?: boolean };
    return parsed.smtpConfigured === true;
  } catch {
    return false;
  }
}

const noopSubscribe = () => () => {};

/**
 * Hydration-safe read of the layout's app-config script. The server snapshot
 * is null so SSR and the first client render agree; the client then resolves
 * the boolean once, without a setState-in-effect cascade.
 */
const readServerSnapshot = () => null;

export default function ContactFormPanel({ smtpConfigured }: { smtpConfigured?: boolean }) {
  const domConfig = useSyncExternalStore(
    noopSubscribe,
    readSmtpConfiguredFromDom,
    readServerSnapshot
  );
  const resolved = smtpConfigured ?? domConfig;

  if (resolved === null) {
    return <div aria-hidden="true" className="h-10" />;
  }
  return resolved ? <ContactFormSubmit /> : <MailtoPanel />;
}

function ContactFormSubmit() {
  const { t } = useI18n();
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormInput>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: '', email: '', subject: '', message: '', consent: false },
  });

  const onSubmit = handleSubmit(async (values) => {
    setStatus('idle');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        setStatus('success');
        reset();
        return;
      }
      const body = (await response.json().catch(() => null)) as
        | { fieldErrors?: Record<string, string[]> }
        | null;
      if (body?.fieldErrors) {
        const fields = ['name', 'email', 'subject', 'message'] as const;
        for (const field of fields) {
          const messages = body.fieldErrors[field];
          if (messages?.[0]) {
            setError(field, { type: 'server', message: messages[0] });
          }
        }
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  });

  return (
    <div className="mt-12">
      <form
        onSubmit={onSubmit}
        noValidate
        className="max-w-2xl mx-auto bg-(--color-panel) border border-(--color-line) rounded-2xl p-6 md:p-8 space-y-5"
        aria-label={t('contact.form.submit')}
      >
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="contact-name" className={labelClass}>
              {t('contact.form.name')}
            </label>
            <input
              id="contact-name"
              type="text"
              autoComplete="name"
              className={inputClass}
              placeholder={t('contact.form.namePlaceholder')}
              aria-invalid={errors.name ? true : undefined}
              aria-describedby={errors.name ? 'contact-name-error' : undefined}
              {...register('name')}
            />
            {errors.name?.message ? (
              <p id="contact-name-error" className={errorClass}>
                {t(errors.name.message)}
              </p>
            ) : null}
          </div>

          <div>
            <label htmlFor="contact-email" className={labelClass}>
              {t('contact.form.email')}
            </label>
            <input
              id="contact-email"
              type="email"
              autoComplete="email"
              className={inputClass}
              placeholder={t('contact.form.emailPlaceholder')}
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={errors.email ? 'contact-email-error' : undefined}
              {...register('email')}
            />
            {errors.email?.message ? (
              <p id="contact-email-error" className={errorClass}>
                {t(errors.email.message)}
              </p>
            ) : null}
          </div>
        </div>

        <div>
          <label htmlFor="contact-subject" className={labelClass}>
            {t('contact.form.subject')}
          </label>
          <input
            id="contact-subject"
            type="text"
            className={inputClass}
            placeholder={t('contact.form.subjectPlaceholder')}
            aria-invalid={errors.subject ? true : undefined}
            aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
            {...register('subject')}
          />
          {errors.subject?.message ? (
            <p id="contact-subject-error" className={errorClass}>
              {t(errors.subject.message)}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="contact-message" className={labelClass}>
            {t('contact.form.message')}
          </label>
          <textarea
            id="contact-message"
            rows={5}
            className={`${inputClass} resize-y`}
            placeholder={t('contact.form.messagePlaceholder')}
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={errors.message ? 'contact-message-error' : undefined}
            {...register('message')}
          />
          {errors.message?.message ? (
            <p id="contact-message-error" className={errorClass}>
              {t(errors.message.message)}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="contact-consent"
            className="flex items-start gap-3 text-sm text-(--color-muted) cursor-pointer"
          >
            <input
              id="contact-consent"
              type="checkbox"
              className="mt-0.5 h-4 w-4 accent-(--color-accent)"
              aria-invalid={errors.consent ? true : undefined}
              aria-describedby={errors.consent ? 'contact-consent-error' : undefined}
              {...register('consent')}
            />
            <span>{t('contact.form.consent')}</span>
          </label>
          {errors.consent?.message ? (
            <p id="contact-consent-error" className={errorClass}>
              {t(errors.consent.message)}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col items-start gap-3 pt-2">
          <button type="submit" disabled={isSubmitting} className={submitClass}>
            {isSubmitting ? t('contact.form.sending') : t('contact.form.submit')}
          </button>

          {status === 'success' ? (
            <p role="status" className="text-sm text-(--color-ink)">
              {t('contact.success.message')}
            </p>
          ) : null}
          {status === 'error' ? (
            <p role="alert" className="text-sm text-(--color-accent)">
              {t('contact.error.message')}
            </p>
          ) : null}
        </div>
      </form>
    </div>
  );
}

function MailtoPanel() {
  const { t } = useI18n();
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const href = buildMailtoHref(PUBLIC_CONTACT_EMAIL, subject, message);

  return (
    <div className="mt-12 max-w-2xl mx-auto bg-(--color-panel) border border-(--color-line) rounded-2xl p-6 md:p-8">
      <div className="space-y-5">
        <div>
          <label htmlFor="mailto-subject" className={labelClass}>
            {t('contact.form.subject')}
          </label>
          <input
            id="mailto-subject"
            type="text"
            className={inputClass}
            placeholder={t('contact.form.subjectPlaceholder')}
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="mailto-message" className={labelClass}>
            {t('contact.form.message')}
          </label>
          <textarea
            id="mailto-message"
            rows={5}
            className={`${inputClass} resize-y`}
            placeholder={t('contact.form.messagePlaceholder')}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
        </div>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <a href={href} className={submitClass}>
            {t('contact.mailto.send')}
          </a>
          <p className="text-sm text-(--color-muted)">{t('contact.mailto.hint')}</p>
        </div>
      </div>
    </div>
  );
}