/**
 * Layout principal de la aplicación
 * Envuelve todas las páginas con providers y metadata global
 */

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { I18nProvider } from '@/hooks/useI18n';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Emmanuel Berrio Jiménez | Full-Stack Developer',
  description:
    'Portafolio profesional de Emmanuel Berrio Jiménez - Desarrollador Full-Stack especializado en React, Next.js, TypeScript y Node.js',
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
    locale: 'es_ES',
    alternateLocale: ['en_US'],
    url: 'https://emmanuelberrio.dev',
    title: 'Emmanuel Berrio Jiménez | Full-Stack Developer',
    description: 'Portafolio profesional de Emmanuel Berrio Jiménez',
    siteName: 'Emmanuel Berrio Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Emmanuel Berrio Jiménez | Full-Stack Developer',
    description: 'Portafolio profesional de Emmanuel Berrio Jiménez',
  },
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#000000',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="antialiased">
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
