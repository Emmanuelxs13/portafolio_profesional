/**
 * Componente ExperienceTimeline (Mejorado)
 * Timeline horizontal en desktop con diseño moderno y mejor UX
 */

'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import {
  BriefcaseIcon,
  CalendarIcon,
  CheckCircleIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import { Experience } from '@/types/profile';
import { formatDate, calculateDuration } from '@/lib/utils';

interface ExperienceTimelineProps {
  t: (key: string) => string;
  experiences: Experience[];
  locale: string;
}

export default function ExperienceTimeline({
  t,
  experiences,
  locale,
}: Readonly<ExperienceTimelineProps>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={containerRef}
      id="experience"
      className="relative py-24 md:py-36 bg-(--color-bg) overflow-hidden"
    >
      {/* Decoración de fondo */}
      <motion.div style={{ opacity }} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-(--color-accent-2)/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-(--color-accent)/10 rounded-full blur-3xl" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-(--color-accent) rounded-2xl mb-6 shadow-xl shadow-black/40"
          >
            <BriefcaseIcon className="h-8 w-8 text-white" />
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-semibold mb-4 text-(--color-ink)">
            {t('experience.title')}
          </h2>
          <p className="text-lg text-(--color-muted) max-w-2xl mx-auto">
            {t('experience.subtitle')}
          </p>
        </motion.div>

        {/* Timeline - Horizontal en desktop, vertical en mobile */}
        <div className="relative">
          {/* Mobile: Timeline vertical */}
          <div className="md:hidden space-y-8">
            {experiences.map((exp, index) => (
              <ExperienceCard key={exp.id} exp={exp} index={index} locale={locale} t={t} isMobile />
            ))}
          </div>

          {/* Desktop: Timeline horizontal con grid */}
          <div className="hidden md:block">
            <div className="relative">
              {/* Línea horizontal */}
              <div className="absolute top-32 left-0 right-0 h-px bg-linear-to-r from-transparent via-(--color-line) to-transparent" />

              {/* Grid horizontal */}
              <div className="grid grid-cols-3 gap-8">
                {experiences.map((exp, index) => (
                  <ExperienceCard
                    key={exp.id}
                    exp={exp}
                    index={index}
                    locale={locale}
                    t={t}
                    isMobile={false}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Componente de tarjeta de experiencia
interface ExperienceCardProps {
  exp: Experience;
  index: number;
  locale: string;
  t: (key: string) => string;
  isMobile: boolean;
}

function ExperienceCard({ exp, index, locale, t, isMobile }: ExperienceCardProps) {
  const cardVariants = {
    hidden: { opacity: 0, y: isMobile ? 30 : 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 12,
        delay: index * 0.2,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={cardVariants}
      whileHover={{ y: -8, scale: 1.02 }}
      className="relative group"
    >
      {/* Indicador circular en timeline (solo desktop) */}
      {!isMobile && (
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.2 + 0.3, type: 'spring' }}
          className="absolute -top-2 left-1/2 transform -translate-x-1/2 z-10"
        >
          <div className="w-12 h-12 bg-(--color-accent) rounded-full flex items-center justify-center shadow-lg shadow-black/40 group-hover:scale-125 transition-transform duration-300">
            <div className="w-4 h-4 bg-white rounded-full" />
          </div>
        </motion.div>
      )}

      {/* Tarjeta */}
      <div
        className={`bg-(--color-panel) rounded-2xl p-6 lg:p-8 border border-(--color-line) shadow-xl hover:shadow-2xl hover:shadow-black/40 backdrop-blur-sm transition-all duration-300 ${!isMobile ? 'mt-20' : ''}`}
      >
        {/* Efectos decorativos */}
        <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-(--color-accent)/0 via-(--color-accent-2)/0 to-transparent group-hover:from-(--color-accent)/10 group-hover:via-(--color-accent-2)/5 transition-all duration-500" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-(--color-accent)/10 rounded-full blur-3xl group-hover:bg-(--color-accent)/20 transition-all duration-500" />

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-start gap-4 mb-4">
            <div className="shrink-0 w-12 h-12 bg-(--color-panel-2) rounded-xl flex items-center justify-center border border-(--color-line) group-hover:scale-110 transition-transform duration-300">
              <BriefcaseIcon className="h-6 w-6 text-(--color-accent)" />
            </div>
            <div className="grow">
              <h3 className="text-xl lg:text-2xl font-semibold text-(--color-ink) group-hover:text-(--color-accent-2) transition-colors duration-300 mb-1">
                {exp.title}
              </h3>
              <p className="text-(--color-accent-2) font-medium">{exp.company}</p>
            </div>
          </div>

          {/* Fechas y duración */}
          <div className="flex items-center gap-2 text-sm text-(--color-muted) mb-4 pb-4 border-b border-(--color-line)">
            <CalendarIcon className="h-4 w-4 shrink-0" />
            <span>
              {formatDate(exp.from, locale)} - {formatDate(exp.to, locale)}
            </span>
            <span className="text-(--color-line)">•</span>
            <span className="text-(--color-muted)">
              {calculateDuration(exp.from, exp.to, locale)}
            </span>
          </div>

          {/* Descripción */}
          <p className="text-(--color-muted) text-sm leading-relaxed mb-4 group-hover:text-(--color-ink) transition-colors duration-300">
            {exp.description}
          </p>

          {/* Logros */}
          {exp.achievements && exp.achievements.length > 0 && (
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm font-medium text-(--color-ink)">
                <SparklesIcon className="h-4 w-4 text-(--color-accent-2)" />
                {t('experience.achievements')}
              </div>
              <ul className="space-y-2 pl-6">
                {exp.achievements.slice(0, 3).map((achievement, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 + i * 0.1 }}
                    className="flex items-start gap-2 text-sm text-(--color-muted) group-hover:text-(--color-ink) transition-colors duration-300"
                  >
                    <CheckCircleIcon className="h-4 w-4 text-(--color-accent) shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{achievement}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          )}

          {/* Tecnologías */}
          {exp.technologies && exp.technologies.length > 0 && (
            <div className="pt-4 border-t border-(--color-line)">
              <div className="flex flex-wrap gap-2">
                {exp.technologies.slice(0, 6).map((tech, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.2 + i * 0.05 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="px-3 py-1.5 bg-(--color-panel-2) text-(--color-ink) text-xs uppercase tracking-[0.15em] rounded-full border border-(--color-line) backdrop-blur-sm transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-black/30"
                  >
                    {tech}
                  </motion.span>
                ))}
                {exp.technologies.length > 6 && (
                  <span className="px-3 py-1.5 text-(--color-muted) text-xs font-medium">
                    +{exp.technologies.length - 6} más
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Borde brillante animado en hover */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-(--color-accent) via-(--color-accent-2) to-(--color-accent) opacity-20 blur-xl" />
        </div>
      </div>
    </motion.div>
  );
}
