/**
 * Componente ReferencesSection
 * Muestra las recomendaciones profesionales con diseño de tarjetas moderno
 */

'use client';

import { motion } from 'framer-motion';
import { UserGroupIcon, ChatBubbleLeftRightIcon, BriefcaseIcon } from '@heroicons/react/24/outline';
import { Reference } from '@/types/profile';

interface ReferencesSectionProps {
  t: (key: string) => string;
  references: Reference[];
}

export default function ReferencesSection({ t, references }: Readonly<ReferencesSectionProps>) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 12,
      },
    },
  };

  // Formatear fecha
  const formatDate = (date: string) => {
    const [year, month] = date.split('-');
    const months = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];
    return `${months[Number.parseInt(month, 10) - 1]} ${year}`;
  };

  return (
    <section id="references" className="relative py-20 md:py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
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
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mb-6 shadow-xl shadow-green-500/30"
          >
            <UserGroupIcon className="h-8 w-8 text-white" />
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 via-emerald-400 to-green-400 bg-clip-text text-transparent">
            {t('references.title')}
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">{t('references.subtitle')}</p>
        </motion.div>

        {/* Grid de referencias */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {references.map((ref) => (
            <motion.div
              key={ref.id}
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative bg-gradient-to-br from-gray-800/90 via-gray-900/90 to-gray-800/90 rounded-2xl p-8 border border-gray-700/50 shadow-xl hover:shadow-2xl hover:shadow-green-500/20 backdrop-blur-sm transition-all duration-300"
            >
              {/* Efectos decorativos */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-500/0 via-emerald-500/0 to-transparent group-hover:from-green-500/10 group-hover:via-emerald-500/5 transition-all duration-500" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full blur-3xl group-hover:bg-green-500/10 transition-all duration-500" />

              {/* Icono de comillas */}
              <motion.div
                initial={{ scale: 0, rotate: -45 }}
                whileInView={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="absolute top-6 right-6 w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center"
              >
                <ChatBubbleLeftRightIcon className="h-6 w-6 text-green-400" />
              </motion.div>

              <div className="relative z-10">
                {/* Avatar placeholder */}
                <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center border-2 border-green-500/30 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl font-bold text-green-400">{ref.name.charAt(0)}</span>
                </div>

                {/* Nombre y título */}
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-green-300 transition-colors duration-300">
                  {ref.name}
                </h3>
                <p className="text-green-400 text-sm font-medium mb-2">{ref.title}</p>

                {/* Empresa y relación */}
                <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-700/50">
                  <BriefcaseIcon className="h-4 w-4 text-gray-500 shrink-0" />
                  <div className="text-sm text-gray-400">
                    <div>{ref.company}</div>
                    <div className="text-xs text-gray-500">{ref.relationship}</div>
                  </div>
                </div>

                {/* Recomendación */}
                <p className="text-gray-400 text-sm leading-relaxed mb-4 group-hover:text-gray-300 transition-colors duration-300 line-clamp-6">
                  {ref.recommendation}
                </p>

                {/* Footer con fecha y LinkedIn */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
                  <span className="text-xs text-gray-500">{formatDate(ref.date)}</span>
                  {ref.linkedin && (
                    <motion.a
                      href={ref.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-xs text-green-400 hover:text-green-300 font-medium flex items-center gap-1 transition-colors"
                    >
                      Ver perfil
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </motion.a>
                  )}
                </div>
              </div>

              {/* Borde brillante animado en hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500 via-emerald-500 to-green-500 opacity-20 blur-xl" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
