/**
 * Componente Hero (Sección Principal)
 *
 * Sección de bienvenida optimizada para laptop/desktop:
 * - Diseño minimalista y elegante
 * - Animaciones sutiles con Framer Motion
 * - Jerarquía visual clara: nombre → rol → frase de impacto
 * - Layout limpio y balanceado
 * - Frase breve que funciona como gancho rápido
 * - Responsive y profesional para reclutadores internacionales
 */

'use client';

import { motion } from 'framer-motion';
import { ArrowDownIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

interface HeroProps {
  /** Diccionario de traducciones */
  t: (key: string) => string;
  /** Nombre completo */
  name: string;
  /** Título profesional */
  title: string;
  /** Descripción breve */
  summary?: string;
  /** Ubicación */
  location?: string;
  /** Email de contacto */
  email?: string;
  /** Enlace a LinkedIn */
  linkedin?: string;
  /** Enlace a GitHub */
  github?: string;
  /** Sitio personal */
  website?: string;
}

/**
 * Variantes de animación para contenedores
 * Animación más sutil y profesional
 */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

/**
 * Variantes de animación para items individuales
 * Movimiento más suave y natural
 */
const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function Hero({
  t,
  name,
  title,
  summary,
  location,
  email,
  linkedin,
  github,
  website,
}: Readonly<HeroProps>) {
  /**
   * Maneja el scroll suave hacia una sección específica
   * @param sectionId - ID de la sección destino
   */
  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Fondo editorial */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 left-0 w-[520px] h-[520px] bg-(--color-accent-2)/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[520px] h-[520px] bg-(--color-accent)/12 rounded-full blur-3xl" />
        <div className="absolute top-28 left-0 w-full h-px bg-linear-to-r from-transparent via-(--color-line) to-transparent" />
        <div className="absolute bottom-24 left-0 w-full h-px bg-linear-to-r from-transparent via-(--color-line) to-transparent" />
      </div>

      {/* Contenido principal */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-6xl mx-auto px-6 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center"
      >
        <div className="text-left">
          <motion.div variants={itemVariants} className="flex items-center gap-4 mb-6">
            <span className="text-xs uppercase tracking-[0.4em] text-(--color-muted)">
              {t('hero.greeting')}
            </span>
            <span className="h-px w-16 bg-(--color-line)" />
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold leading-tight text-(--color-ink)"
          >
            {name}
          </motion.h1>

          <motion.h2
            variants={itemVariants}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl italic text-(--color-muted) mt-4"
          >
            {title}
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg md:text-xl text-(--color-muted) max-w-xl mt-8 leading-relaxed"
          >
            {t('hero.subtitle')}
          </motion.p>

          {summary && (
            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-base text-(--color-muted) max-w-xl mt-6 leading-relaxed line-clamp-2"
            >
              {summary}
            </motion.p>
          )}

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mt-10">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => scrollToSection('#projects')}
              className="group inline-flex items-center gap-3 px-7 py-3.5 bg-(--color-accent) text-(--color-ink) font-semibold uppercase tracking-[0.25em] text-xs shadow-[0_20px_40px_rgba(227,59,46,0.25)]"
            >
              {t('hero.cta')}
              <ArrowDownIcon className="h-4 w-4 group-hover:translate-y-0.5 transition-transform duration-300" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => scrollToSection('#contact')}
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-(--color-line) text-(--color-ink) uppercase tracking-[0.25em] text-xs"
            >
              <EnvelopeIcon className="h-4 w-4" />
              {t('hero.ctaSecondary')}
            </motion.button>
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="relative">
          <div className="absolute -top-6 right-0 text-(--color-line) text-8xl font-semibold">
            01
          </div>
          <div className="border border-(--color-line) bg-(--color-panel) p-8">
            <div className="text-(--color-muted) text-xs uppercase tracking-[0.4em] mb-6">
              {t('Informacion')}
            </div>
            
            <div className="mt-8 h-px bg-(--color-line)" />
            <div className="mt-6 text-sm text-(--color-muted)">
              Interfaces elaboradas, sistemas resilientes, impacto medible.
            </div>

            <div className="mt-8 grid gap-4 text-xs uppercase tracking-[0.2em] text-(--color-muted)">
              {location && (
                <div className="flex items-center justify-between border-b border-(--color-line) pb-3">
                  <span>Ubicación</span>
                  <span className="text-(--color-ink) normal-case tracking-normal">{location}</span>
                </div>
              )}
              {email && (
                <div className="flex items-center justify-between border-b border-(--color-line) pb-3">
                  <span>Email</span>
                  <a
                    href={`mailto:${email}`}
                    className="text-(--color-ink) normal-case tracking-normal hover:text-(--color-accent) transition-colors"
                  >
                    {email}
                  </a>
                </div>
              )}
              <div className="flex flex-wrap gap-3">
                {linkedin && (
                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-(--color-line) px-3 py-2 text-(--color-ink) hover:border-(--color-accent) transition-colors"
                  >
                    LinkedIn
                  </a>
                )}
                {github && (
                  <a
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-(--color-line) px-3 py-2 text-(--color-ink) hover:border-(--color-accent) transition-colors"
                  >
                    GitHub
                  </a>
                )}
                {website && (
                  <a
                    href={website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-(--color-line) px-3 py-2 text-(--color-ink) hover:border-(--color-accent) transition-colors"
                  >
                    Portfolio
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 0.6, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2, ease: 'easeInOut' }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden md:flex flex-col items-center gap-3"
      >
        <span className="text-xs uppercase tracking-[0.4em] text-(--color-muted)">Scroll</span>
        <ArrowDownIcon className="h-5 w-5 text-(--color-muted)" />
      </motion.div>
    </section>
  );
}
