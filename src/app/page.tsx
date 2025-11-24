/**
 * Página Principal del Portafolio
 * Integra todos los componentes principales en una experiencia fluida
 */

'use client';

import { useEffect, useState } from 'react';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import About from '@/components/About';
import ExperienceTimeline from '@/components/ExperienceTimeline';
import ProjectsGrid from '@/components/ProjectsGrid';
import CertificateList from '@/components/CertificateList';
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

  // Cargar datos del perfil al montar el componente
  useEffect(() => {
    const loadData = async () => {
      try {
        const [profileData, statsData] = await Promise.all([getProfile(), getStats()]);
        setProfile(profileData);
        setStats(statsData);
      } catch (error) {
        console.error('Error loading profile:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Detectar idioma del navegador al cargar
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLocale = localStorage.getItem('locale') as 'es' | 'en';
      if (savedLocale) {
        setLocale(savedLocale);
      } else {
        const browserLang = navigator.language.split('-')[0];
        if (browserLang === 'en' || browserLang === 'es') {
          setLocale(browserLang);
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
        <Hero t={t} name={profile.name} title={profile.title} summary={profile.summary} />

        {/* About Section */}
        <About t={t} summary={profile.summary} stats={stats} locale={locale} />

        {/* Experience Section */}
        <ExperienceTimeline t={t} experiences={profile.experience} locale={locale} />

        {/* Projects Section */}
        <ProjectsGrid t={t} projects={profile.projects} />

        {/* Certificates Section */}
        <CertificateList t={t} certificates={profile.certificates} locale={locale} />

        {/* Contact Section */}
        <ContactForm t={t} />
      </main>

      {/* Footer */}
      <Footer t={t} social={profile.social} />
    </>
  );
}
