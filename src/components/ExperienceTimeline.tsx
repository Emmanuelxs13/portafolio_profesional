/**
 * Componente ExperienceTimeline
 *
 * Timeline visual de la experiencia laboral con:
 * - Línea de tiempo vertical
 * - Tarjetas de experiencia con información detallada
 * - Animaciones de entrada progresivas
 * - Fechas formateadas y duración calculada
 * - Lista de logros y tecnologías
 */

'use client';

import { motion } from 'framer-motion';
import { BriefcaseIcon, CalendarIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { Experience } from '@/types/profile';
import { formatDate, calculateDuration } from '@/lib/utils';

interface ExperienceTimelineProps {
  /** Diccionario de traducciones */
  t: (key: string) => string;
  /** Array de experiencias laborales */
  experiences: Experience[];
  /** Idioma actual para formateo de fechas */
  locale: string;
}

/**
 * Variantes de animación para fade-in desde la derecha
 */
const fadeInRight = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] as const },
  },
};

export default function ExperienceTimeline({
  t,
  experiences,
  locale,
}: Readonly<ExperienceTimelineProps>) {
  return (
    <section
      id="experience"
      className="relative py-20 md:py-32 bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden"
    >
      {/* Encabezado de sección */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            {t('experience.title')}
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">{t('experience.subtitle')}</p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Línea vertical del timeline (solo visible en desktop) */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-transparent"></div>

          {/* Items de experiencia */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                variants={fadeInRight}
                transition={{ delay: index * 0.15 }}
                className={`relative flex flex-col md:flex-row items-center gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Contenido de la tarjeta */}
                <div className="w-full md:w-[calc(50%-2rem)]">
                  <motion.div
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 border border-gray-700 shadow-xl hover:shadow-2xl hover:border-blue-500/50 transition-all duration-300"
                  >
                    {/* Encabezado de la tarjeta */}
                    <div className="flex items-start gap-4 mb-6">
                      {/* Ícono de empresa */}
                      <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                        <BriefcaseIcon className="h-6 w-6 text-white" />
                      </div>

                      {/* Título y empresa */}
                      <div className="flex-1">
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
                          {exp.title}
                        </h3>
                        <p className="text-blue-400 font-semibold mb-2">{exp.company}</p>

                        {/* Fechas y duración */}
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <CalendarIcon className="h-4 w-4" />
                          <span>
                            {formatDate(exp.from, locale)} - {formatDate(exp.to, locale)}
                          </span>
                          <span className="text-gray-600">•</span>
                          <span>{calculateDuration(exp.from, exp.to, locale)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Descripción */}
                    <p className="text-gray-300 mb-6 leading-relaxed">{exp.description}</p>

                    {/* Logros principales */}
                    {exp.achievements && exp.achievements.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
                          {t('experience.achievements')}
                        </h4>
                        <ul className="space-y-2">
                          {exp.achievements.map((achievement, achIndex) => (
                            <li key={achIndex} className="flex items-start gap-2 text-gray-300">
                              <CheckCircleIcon className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                              <span className="text-sm">{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Tecnologías utilizadas */}
                    {exp.technologies && exp.technologies.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
                          {t('experience.technologies')}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 bg-gray-700/50 text-blue-400 text-xs font-medium rounded-full border border-gray-600"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </div>

                {/* Nodo del timeline (punto central) - solo visible en desktop */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: index * 0.15 + 0.3,
                      type: 'spring',
                      stiffness: 200,
                    }}
                    className="w-6 h-6 bg-blue-600 rounded-full border-4 border-gray-900 shadow-lg shadow-blue-500/50"
                  />
                </div>

                {/* Espacio para el otro lado del timeline */}
                <div className="hidden md:block w-[calc(50%-2rem)]"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
