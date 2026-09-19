/**
 * Server component injected by the layout: emits a JSON script carrying the
 * smtpConfigured signal for the client, read once at mount. Credentials never
 * leave the server — the script contains only a boolean.
 */

import { isSmtpConfigured } from '@/lib/contact/config';

export default function AppConfig() {
  const smtpConfigured = isSmtpConfigured();
  const payload = JSON.stringify({ smtpConfigured });
  return (
    <script
      type="application/json"
      id="app-config"
      dangerouslySetInnerHTML={{ __html: payload }}
    />
  );
}