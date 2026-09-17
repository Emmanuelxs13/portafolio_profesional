/**
 * SkipLink tests: the layout renders a keyboard-focusable skip link before the
 * main content that targets <main id="main">, with a localized label.
 */

import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { I18nProvider, useI18n } from '@/hooks/useI18n';
import SkipLink from '@/components/SkipLink';

function SkipHarness() {
  const { setLocale } = useI18n();
  return (
    <>
      <button type="button" onClick={() => setLocale('en')}>
        switch-en
      </button>
      <button type="button" onClick={() => setLocale('es')}>
        switch-es
      </button>
      <SkipLink />
    </>
  );
}

describe('SkipLink', () => {
  it('renders a focusable link to the main content with the es label', () => {
    render(
      <I18nProvider>
        <SkipHarness />
      </I18nProvider>
    );

    const link = screen.getByRole('link', { name: 'Saltar al contenido' });
    expect(link).toHaveAttribute('href', '#main');

    link.focus();
    expect(document.activeElement).toBe(link);
  });

  it('localizes the label for the en locale', () => {
    render(
      <I18nProvider>
        <SkipHarness />
      </I18nProvider>
    );

    fireEvent.click(screen.getByText('switch-en'));

    const link = screen.getByRole('link', { name: 'Skip to content' });
    expect(link).toHaveAttribute('href', '#main');
  });
});