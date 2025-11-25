/**
 * Página Principal del Portafolio
 * Integra todos los componentes principales en una experiencia fluida
 */

'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import About from '@/components/About';
import ExperienceTimeline from '@/components/ExperienceTimeline';
import EducationTimeline from '@/components/EducationTimeline';
import ProjectsGrid from '@/components/ProjectsGrid';
import CertificateList from '@/components/CertificateList';
import ReferencesSection from '@/components/ReferencesSection';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';
import { useI18n } from '@/hooks/useI18n';
import { Profile } from '@/types/profile';
import { getProfile, getStats } from '@/lib/api';

export default function Home() {
  const { locale, setLocale, t } = useI18n();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [stats, setStats] = useState({
    yearsOfExperience: 0,
    projectsCompleted: 0,
    certificatesEarned: 0,
    technologiesUsed: 0,
  });
  const [loading, setLoading] = useState(true);

  // Cargar datos del perfil cuando cambie el idioma
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [profileData, statsData] = await Promise.all([
          getProfile(locale as 'es' | 'en'),
          getStats(locale as 'es' | 'en'),
        ]);
        setProfile(profileData);
        setStats(statsData);
      } catch (error) {
        console.error('Error loading profile:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [locale]); // Recargar cuando cambie el idioma

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

  if (loading || !profile) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

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
        <ExperienceTimeline t={t} experiences={profile.experience} locale={locale} />

        {/* Education Section */}
        <EducationTimeline t={t} education={profile.education} />

        {/* Projects Section */}
        <ProjectsGrid t={t} projects={profile.projects} />

        {/* Certificates Section */}
        <CertificateList t={t} certificates={profile.certificates} locale={locale} />

        {/* References Section */}
        <ReferencesSection t={t} references={profile.references} />

        {/* Contact Section */}
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
      </main>

      {/* Footer */}
      <Footer t={t} social={profile.social} />
    </>
  );
}
