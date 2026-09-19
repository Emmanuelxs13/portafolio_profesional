/**
 * Layout principal de la aplicación
 * Envuelve todas las páginas con providers y metadata global.
 *
 * El documento se sirve con los defaults en español (lang, metadata, JSON-LD)
 * visibles para crawlers sin JavaScript; LocaleDocumentSync (cliente) mantiene
 * html.lang, los meta tags y el JSON-LD sincronizados con el idioma activo
 * tras la hidratación y en cada cambio de locale.
 */

import type { Metadata, Viewport } from 'next';
import { Bodoni_Moda, Work_Sans } from 'next/font/google';
import './globals.css';
import { I18nProvider } from '@/hooks/useI18n';
import ClientWhatsAppButton from '@/components/ClientWhatsAppButton';
import AppConfig from '@/components/AppConfig';
import SkipLink from '@/components/SkipLink';
import LocaleDocumentSync from '@/components/LocaleDocumentSync';
import { getProfileSync } from '@/lib/api';
import {
  buildJsonLd,
  getDocumentMeta,
  OG_IMAGE_PATH,
  personDataFromProfile,
  SITE_NAME,
  SITE_URL,
} from '@/lib/document-meta';

const bodoni = Bodoni_Moda({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const workSans = Work_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const defaultMeta = getDocumentMeta('es');
const defaultJsonLd = buildJsonLd(personDataFromProfile(getProfileSync('es')));

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: defaultMeta.title,
  description: defaultMeta.description,
  keywords: [
    'Emmanuel Berrio',
    'Full-Stack Developer',
    'React',
    'Next.js',
    'TypeScript',
    'Node.js',
    'Portfolio',
  ],
  authors: [{ name: 'Emmanuel Berrio Jiménez' }],
  creator: 'Emmanuel Berrio Jiménez',
  openGraph: {
    type: 'website',
    locale: defaultMeta.ogLocale,
    alternateLocale: ['en_US'],
    url: SITE_URL,
    siteName: SITE_NAME,
    title: defaultMeta.ogTitle,
    description: defaultMeta.ogDescription,
    images: [
      {
        url: OG_IMAGE_PATH,
        width: 1200,
        height: 630,
        alt: 'Emmanuel Berrio Jiménez — Full-Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultMeta.twitterTitle,
    description: defaultMeta.twitterDescription,
    images: [OG_IMAGE_PATH],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000000',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={defaultMeta.lang} className={`${bodoni.variable} ${workSans.variable}`}>
      <body className="antialiased">
        {/* JSON-LD base servido desde el servidor (es): los crawlers lo ven sin JS */}
        <script
          type="application/ld+json"
          id="json-ld"
          dangerouslySetInnerHTML={{ __html: defaultJsonLd }}
        />
        <I18nProvider>
          <SkipLink />
          <LocaleDocumentSync />
          <AppConfig />
          {children}
          <ClientWhatsAppButton />
        </I18nProvider>
      </body>
    </html>
  );
}