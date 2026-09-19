/**
 * Skip-link de accesibilidad: primer elemento focalizable del layout. Está
 * oculto visualmente hasta recibir foco de teclado y apunta al contenido
 * principal (<main id="main">).
 */

'use client';

import { useI18n } from '@/hooks/useI18n';

export default function SkipLink() {
  const { t } = useI18n();
  return (
    <a href="#main" className="skip-link">
      {t('a11y.skipLink')}
    </a>
  );
}