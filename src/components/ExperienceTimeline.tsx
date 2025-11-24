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
      className="relative py-20 md:py-32 bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden"
    >
      {/* Decoración de fondo */}
      <motion.div style={{ opacity }} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
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
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-xl shadow-blue-500/30"
          >
            <BriefcaseIcon className="h-8 w-8 text-white" />
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            {t('experience.title')}
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">{t('experience.subtitle')}</p>
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
              <div className="absolute top-32 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

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
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/50 group-hover:scale-125 transition-transform duration-300">
            <div className="w-4 h-4 bg-white rounded-full" />
          </div>
        </motion.div>
      )}

      {/* Tarjeta */}
      <div
        className={`bg-gradient-to-br from-gray-800/90 via-gray-900/90 to-gray-800/90 rounded-2xl p-6 lg:p-8 border border-gray-700/50 shadow-xl hover:shadow-2xl hover:shadow-blue-500/20 backdrop-blur-sm transition-all duration-300 ${!isMobile ? 'mt-20' : ''}`}
      >
        {/* Efectos decorativos */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-transparent group-hover:from-blue-500/10 group-hover:via-purple-500/5 transition-all duration-500" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-all duration-500" />

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-start gap-4 mb-4">
            <div className="shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center border border-blue-500/30 group-hover:scale-110 transition-transform duration-300">
              <BriefcaseIcon className="h-6 w-6 text-blue-400" />
            </div>
            <div className="grow">
              <h3 className="text-xl lg:text-2xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300 mb-1">
                {exp.title}
              </h3>
              <p className="text-blue-400 font-medium">{exp.company}</p>
            </div>
          </div>

          {/* Fechas y duración */}
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-4 pb-4 border-b border-gray-700/50">
            <CalendarIcon className="h-4 w-4 shrink-0" />
            <span>
              {formatDate(exp.from, locale)} - {formatDate(exp.to, locale)}
            </span>
            <span className="text-gray-500">•</span>
            <span className="text-gray-500">{calculateDuration(exp.from, exp.to, locale)}</span>
          </div>

          {/* Descripción */}
          <p className="text-gray-400 text-sm leading-relaxed mb-4 group-hover:text-gray-300 transition-colors duration-300">
            {exp.description}
          </p>

          {/* Logros */}
          {exp.achievements && exp.achievements.length > 0 && (
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-300">
                <SparklesIcon className="h-4 w-4 text-yellow-400" />
                {t('experience.achievements')}
              </div>
              <ul className="space-y-2 pl-6">
                {exp.achievements.slice(0, 3).map((achievement, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 + i * 0.1 }}
                    className="flex items-start gap-2 text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300"
                  >
                    <CheckCircleIcon className="h-4 w-4 text-green-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{achievement}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          )}

          {/* Tecnologías */}
          {exp.technologies && exp.technologies.length > 0 && (
            <div className="pt-4 border-t border-gray-700/50">
              <div className="flex flex-wrap gap-2">
                {exp.technologies.slice(0, 6).map((tech, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.2 + i * 0.05 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="px-3 py-1.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 text-blue-300 text-xs rounded-full border border-blue-500/30 backdrop-blur-sm transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-blue-500/20"
                  >
                    {tech}
                  </motion.span>
                ))}
                {exp.technologies.length > 6 && (
                  <span className="px-3 py-1.5 text-gray-500 text-xs font-medium">
                    +{exp.technologies.length - 6} más
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Borde brillante animado en hover */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 opacity-20 blur-xl" />
        </div>
      </div>
    </motion.div>
  );
}
