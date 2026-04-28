/**
 * Componente EducationTimeline
 * Timeline visual de educación con animaciones y diseño atractivo
 */

'use client';

import { motion } from 'framer-motion';
import { AcademicCapIcon, CalendarIcon, BuildingLibraryIcon } from '@heroicons/react/24/outline';
import { Education } from '@/types/profile';

interface EducationTimelineProps {
  t: (key: string) => string;
  education: Education[];
}

export default function EducationTimeline({ t, education }: Readonly<EducationTimelineProps>) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 12,
      },
    },
  };

  // Formatear fechas
  const formatDate = (date: string) => {
    if (date === 'present') return t('education.present');
    const [year, month] = date.split('-');
    const months = [
      t('months.january'),
      t('months.february'),
      t('months.march'),
      t('months.april'),
      t('months.may'),
      t('months.june'),
      t('months.july'),
      t('months.august'),
      t('months.september'),
      t('months.october'),
      t('months.november'),
      t('months.december'),
    ];
    return `${months[Number.parseInt(month, 10) - 1]} ${year}`;
  };

  return (
    <section id="education" className="relative py-24 md:py-36 bg-(--color-bg)">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
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
            <AcademicCapIcon className="h-8 w-8 text-white" />
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-semibold mb-4 text-(--color-ink)">
            {t('education.title')}
          </h2>
          <p className="text-lg text-(--color-muted) max-w-2xl mx-auto">
            {t('education.subtitle')}
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="relative"
        >
          {/* Línea vertical decorativa */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-linear-to-b from-(--color-line) via-(--color-line) to-transparent hidden md:block" />

          <div className="space-y-8">
            {education.map((edu) => (
              <motion.div
                key={edu.id}
                variants={itemVariants}
                whileHover={{ scale: 1.02, x: 10 }}
                className="group relative"
              >
                <div className="relative bg-(--color-panel) rounded-2xl p-6 lg:p-8 border border-(--color-line) shadow-xl hover:shadow-2xl hover:shadow-black/40 backdrop-blur-sm transition-all duration-300 ml-0 md:ml-20">
                  {/* Punto indicador en timeline */}
                  <div className="absolute -left-4 top-8 hidden md:flex items-center justify-center w-8 h-8 bg-(--color-accent) rounded-full shadow-lg shadow-black/40 group-hover:scale-125 transition-transform duration-300">
                    <div className="w-3 h-3 bg-white rounded-full" />
                  </div>

                  {/* Efectos decorativos */}
                  <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-(--color-accent)/0 via-(--color-accent-2)/0 to-transparent group-hover:from-(--color-accent)/10 group-hover:via-(--color-accent-2)/5 transition-all duration-500" />
                  <div className="absolute top-0 right-0 w-32 h-32 bg-(--color-accent)/10 rounded-full blur-3xl group-hover:bg-(--color-accent)/20 transition-all duration-500" />

                  <div className="relative z-10 flex flex-col md:flex-row md:items-start gap-6">
                    {/* Icono de institución */}
                    <div className="shrink-0">
                      <div className="w-16 h-16 bg-(--color-panel-2) rounded-xl flex items-center justify-center border border-(--color-line) group-hover:scale-110 transition-transform duration-300">
                        <BuildingLibraryIcon className="h-8 w-8 text-(--color-accent)" />
                      </div>
                    </div>

                    {/* Contenido */}
                    <div className="grow">
                      {/* Título y fechas */}
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                        <div>
                          <h3 className="text-xl lg:text-2xl font-semibold text-(--color-ink) group-hover:text-(--color-accent-2) transition-colors duration-300 mb-1">
                            {edu.degree}
                          </h3>
                          <p className="text-lg text-(--color-accent-2) font-medium">
                            {edu.institution}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 text-(--color-muted) group-hover:text-(--color-ink) transition-colors duration-300">
                          <CalendarIcon className="h-5 w-5 shrink-0" />
                          <span className="text-sm whitespace-nowrap">
                            {formatDate(edu.from)} - {formatDate(edu.to)}
                          </span>
                        </div>
                      </div>

                      {/* Field */}
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-(--color-panel-2) rounded-full border border-(--color-line) mb-4">
                        <span className="text-xs uppercase tracking-[0.2em] text-(--color-muted) font-medium">
                          {edu.field}
                        </span>
                      </div>

                      {/* Descripción */}
                      {edu.description && (
                        <p className="text-(--color-muted) leading-relaxed group-hover:text-(--color-ink) transition-colors duration-300">
                          {edu.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Borde brillante animado en hover */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-(--color-accent) via-(--color-accent-2) to-(--color-accent) opacity-20 blur-xl" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
