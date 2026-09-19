/**
 * ContactFormPanel tests: the real form renders when SMTP is configured and
 * the mailto fallback renders when it is not. No request ever reaches the API
 * when client-side validation fails, and success/error feedback is localized.
 */

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import type { ReactNode } from 'react';
import ContactFormPanel, { readSmtpConfiguredFromDom } from '@/components/ContactFormPanel';
import { I18nProvider } from '@/hooks/useI18n';

const wrap = (ui: ReactNode) => <I18nProvider>{ui}</I18nProvider>;

describe('ContactFormPanel', () => {
  describe('mailto degraded state (SMTP unset)', () => {
    it('renders a mailto link and no form submit path', () => {
      render(wrap(<ContactFormPanel smtpConfigured={false} />));

      const link = screen.getByRole('link', { name: 'Enviar por email' });
      expect(link).toHaveAttribute('href', 'mailto:emmanuelberriojimenez13@gmail.com');
      expect(screen.queryByRole('button', { name: 'Enviar mensaje' })).toBeNull();
      expect(
        screen.getByText('Se abrirá tu cliente de correo con el mensaje listo para enviar')
      ).toBeInTheDocument();
    });

    it('prefills the mailto subject and body from the typed input', () => {
      render(wrap(<ContactFormPanel smtpConfigured={false} />));

      fireEvent.change(screen.getByLabelText('Asunto'), {
        target: { value: 'Pregunta & más?' },
      });
      fireEvent.change(screen.getByLabelText('Mensaje'), {
        target: { value: 'Hola equipo!' },
      });

      const link = screen.getByRole('link', { name: 'Enviar por email' });
      expect(link).toHaveAttribute(
        'href',
        'mailto:emmanuelberriojimenez13@gmail.com?subject=Pregunta+%26+m%C3%A1s%3F&body=Hola+equipo%21'
      );
    });
  });

  describe('real form (SMTP configured)', () => {
    it('renders all fields plus consent and no mailto link', () => {
      render(wrap(<ContactFormPanel smtpConfigured={true} />));

      expect(screen.getByLabelText('Nombre')).toBeInTheDocument();
      expect(screen.getByLabelText('Email')).toBeInTheDocument();
      expect(screen.getByLabelText('Asunto')).toBeInTheDocument();
      expect(screen.getByLabelText('Mensaje')).toBeInTheDocument();
      expect(screen.getByLabelText('Acepto la política de privacidad')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Enviar mensaje' })).toBeInTheDocument();
      expect(screen.queryByRole('link', { name: 'Enviar por email' })).toBeNull();
    });

    it('blocks invalid submissions client-side without calling the API', async () => {
      const fetchMock = jest.fn();
      global.fetch = fetchMock as unknown as typeof fetch;
      render(wrap(<ContactFormPanel smtpConfigured={true} />));

      fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'A' } });
      fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'not-an-email' } });
      fireEvent.change(screen.getByLabelText('Mensaje'), { target: { value: 'corto' } });
      fireEvent.click(screen.getByRole('button', { name: 'Enviar mensaje' }));

      await screen.findByText('El nombre debe tener al menos 2 caracteres');
      expect(screen.getByText('Ingresa un email válido')).toBeInTheDocument();
      expect(screen.getByText('El mensaje debe tener al menos 10 caracteres')).toBeInTheDocument();
      expect(screen.getByText('Debes aceptar la política de privacidad')).toBeInTheDocument();
      expect(fetchMock).not.toHaveBeenCalled();
      expect(screen.getByLabelText('Nombre')).toHaveAttribute('aria-invalid', 'true');
    });

    it('submits valid data to the API and shows a localized success message', async () => {
      const fetchMock = jest
        .fn()
        .mockResolvedValue({ ok: true, status: 200, json: async () => ({ message: 'message_sent' }) });
      global.fetch = fetchMock as unknown as typeof fetch;
      render(wrap(<ContactFormPanel smtpConfigured={true} />));

      fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'Emmanuel Berrio' } });
      fireEvent.change(screen.getByLabelText('Email'), {
        target: { value: 'emmanuel@example.com' },
      });
      fireEvent.change(screen.getByLabelText('Asunto'), { target: { value: 'Oportunidad' } });
      fireEvent.change(screen.getByLabelText('Mensaje'), {
        target: { value: 'Me gustaría conversar sobre una vacante para tu equipo.' },
      });
      fireEvent.click(screen.getByLabelText('Acepto la política de privacidad'));
      fireEvent.click(screen.getByRole('button', { name: 'Enviar mensaje' }));

      expect(await screen.findByText('¡Mensaje enviado! Te responderé pronto.')).toBeInTheDocument();
      expect(fetchMock).toHaveBeenCalledTimes(1);
      const [url, init] = fetchMock.mock.calls[0];
      expect(url).toBe('/api/contact');
      expect(init.method).toBe('POST');
      expect(JSON.parse(init.body as string)).toEqual(
        expect.objectContaining({
          name: 'Emmanuel Berrio',
          email: 'emmanuel@example.com',
          consent: true,
        })
      );
    });

    it('shows a localized generic error when the API responds with a failure', async () => {
      const fetchMock = jest.fn().mockResolvedValue({
        ok: false,
        status: 500,
        json: async () => ({ error: 'send_failed' }),
      });
      global.fetch = fetchMock as unknown as typeof fetch;
      render(wrap(<ContactFormPanel smtpConfigured={true} />));

      fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'Emmanuel Berrio' } });
      fireEvent.change(screen.getByLabelText('Email'), {
        target: { value: 'emmanuel@example.com' },
      });
      fireEvent.change(screen.getByLabelText('Mensaje'), {
        target: { value: 'Me gustaría conversar sobre una vacante para tu equipo.' },
      });
      fireEvent.click(screen.getByLabelText('Acepto la política de privacidad'));
      fireEvent.click(screen.getByRole('button', { name: 'Enviar mensaje' }));

      await waitFor(() => {
        expect(fetchMock).toHaveBeenCalledTimes(1);
      });
      expect(
        await screen.findByText('Error al enviar. Intenta de nuevo.')
      ).toBeInTheDocument();
    });
  });
});

describe('readSmtpConfiguredFromDom', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('reads true from an injected app-config script', () => {
    document.body.innerHTML =
      '<script type="application/json" id="app-config">{"smtpConfigured":true}</script>';
    expect(readSmtpConfiguredFromDom()).toBe(true);
  });

  it('reads false from an injected false flag', () => {
    document.body.innerHTML =
      '<script type="application/json" id="app-config">{"smtpConfigured":false}</script>';
    expect(readSmtpConfiguredFromDom()).toBe(false);
  });

  it('returns false when the script node is missing', () => {
    document.body.innerHTML = '';
    expect(readSmtpConfiguredFromDom()).toBe(false);
  });

  it('returns false for malformed JSON', () => {
    document.body.innerHTML = '<script type="application/json" id="app-config">{oops}</script>';
    expect(readSmtpConfiguredFromDom()).toBe(false);
  });
});