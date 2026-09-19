/**
 * Dictionary parity tests for the useI18n translations (es/en).
 */

import { translations } from '@/hooks/useI18n';

describe('useI18n dictionary', () => {
  it('defines the exact same key set in es and en', () => {
    const esKeys = Object.keys(translations.es).sort();
    const enKeys = Object.keys(translations.en).sort();
    expect(esKeys).toEqual(enKeys);
  });

  it('provides the data-plane UI keys in both locales', () => {
    expect(translations.es['nav.education']).toBe('Formación');
    expect(translations.en['nav.education']).toBe('Education');
    expect(translations.es['projects.viewDemo']).toBe('Ver Demo');
    expect(translations.en['projects.viewDemo']).toBe('View Demo');
    expect(translations.es['projects.code']).toBe('Código');
    expect(translations.en['projects.code']).toBe('Code');
    expect(translations.es['projects.badge']).toBe('Destacado');
    expect(translations.en['projects.badge']).toBe('Featured');
    expect(translations.es['contact.form.emailInvalid']).toBe('Ingresa un email válido');
    expect(translations.en['contact.form.emailInvalid']).toBe('Enter a valid email');
    expect(translations.es['contact.form.nameTooShort']).toBe(
      'El nombre debe tener al menos 2 caracteres'
    );
    expect(translations.en['contact.form.nameTooShort']).toBe(
      'Name must be at least 2 characters'
    );
    expect(translations.es['contact.form.messageTooShort']).toBe(
      'El mensaje debe tener al menos 10 caracteres'
    );
    expect(translations.en['contact.form.messageTooShort']).toBe(
      'Message must be at least 10 characters'
    );
    expect(translations.es['contact.mailto.send']).toBe('Enviar por email');
    expect(translations.en['contact.mailto.send']).toBe('Send via email');
  });
});