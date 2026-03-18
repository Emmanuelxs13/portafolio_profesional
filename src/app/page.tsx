/**
 * Página Principal del Portafolio
 * Integra todos los componentes principales en una experiencia fluida
 */

'use client';

import { useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import About from '@/components/About';
import { useI18n } from '@/hooks/useI18n';
import { getProfileSync, getStatsSync } from '@/lib/api';

const ExperienceTimeline = dynamic(() => import('@/components/ExperienceTimeline'));
const EducationTimeline = dynamic(() => import('@/components/EducationTimeline'));
const ProjectsGrid = dynamic(() => import('@/components/ProjectsGrid'));
const CertificateList = dynamic(() => import('@/components/CertificateList'));
const ReferencesSection = dynamic(() => import('@/components/ReferencesSection'));
const ContactForm = dynamic(() => import('@/components/ContactForm'));
const Footer = dynamic(() => import('@/components/Footer'));

export default function Home() {
  const { locale, setLocale, t } = useI18n();

  const profile = useMemo(() => getProfileSync(locale), [locale]);
  const stats = useMemo(() => getStatsSync(locale), [locale]);

  // Detectar idioma del navegador al cargar (solo una vez)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLocale = localStorage.getItem('locale') as 'es' | 'en';
      if (savedLocale) {
        setLocale(savedLocale);
      } else {
        const browserLang = navigator.language.split('-')[0];
        if (browserLang === 'en' || browserLang === 'es') {
          setLocale(browserLang as 'es' | 'en');
        }
      }
    }
  }, [setLocale]);

  return (
    <>
      {/* Navegación */}
      <Nav t={t} locale={locale} onLanguageChange={setLocale} />

      {/* Contenido principal */}
      <main>
        {/* Hero Section */}
        <Hero t={t} name={profile.name} title={profile.title} />

        {/* About Section */}
        <About t={t} summary={profile.summary} stats={stats} locale={locale} />

        {/* Experience Section */}
        <div className="deferred-section">
          <ExperienceTimeline t={t} experiences={profile.experience} locale={locale} />
        </div>

        {/* Education Section */}
        <div className="deferred-section">
          <EducationTimeline t={t} education={profile.education} />
        </div>

        {/* Projects Section */}
        <div className="deferred-section">
          <ProjectsGrid t={t} projects={profile.projects} />
        </div>

        {/* Certificates Section */}
        <div className="deferred-section">
          <CertificateList t={t} certificates={profile.certificates} locale={locale} />
        </div>

        {/* References Section */}
        <div className="deferred-section">
          <ReferencesSection t={t} references={profile.references} />
        </div>

        {/* Contact Section */}
        <div className="deferred-section">
          <section
            id="contact"
            className="relative py-20 md:py-32 bg-linear-to-b from-black to-gray-900"
          >
            <div className="max-w-7xl mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                  {t('contact.title')}
                </h2>
                <p className="text-lg text-gray-400">{t('contact.subtitle')}</p>
              </motion.div>
              <ContactForm />
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <div className="deferred-section">
        <Footer t={t} social={profile.social} />
      </div>
    </>
  );
}
