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
    <section id="references" className="relative py-24 md:py-36 bg-(--color-bg)">
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
            className="inline-flex items-center justify-center w-16 h-16 bg-(--color-accent) rounded-2xl mb-6 shadow-xl shadow-black/40"
          >
            <UserGroupIcon className="h-8 w-8 text-white" />
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-semibold mb-4 text-(--color-ink)">
            {t('references.title')}
          </h2>
          <p className="text-lg text-(--color-muted) max-w-2xl mx-auto">
            {t('references.subtitle')}
          </p>
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
              className="group relative bg-(--color-panel) rounded-2xl p-8 border border-(--color-line) shadow-xl hover:shadow-2xl hover:shadow-black/40 backdrop-blur-sm transition-all duration-300"
            >
              {/* Efectos decorativos */}
              <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-(--color-accent)/0 via-(--color-accent-2)/0 to-transparent group-hover:from-(--color-accent)/10 group-hover:via-(--color-accent-2)/5 transition-all duration-500" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-(--color-accent)/10 rounded-full blur-3xl group-hover:bg-(--color-accent)/20 transition-all duration-500" />

              {/* Icono de comillas */}
              <motion.div
                initial={{ scale: 0, rotate: -45 }}
                whileInView={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="absolute top-6 right-6 w-12 h-12 bg-(--color-panel-2) rounded-full flex items-center justify-center"
              >
                <ChatBubbleLeftRightIcon className="h-6 w-6 text-(--color-accent)" />
              </motion.div>

              <div className="relative z-10">
                {/* Avatar placeholder */}
                <div className="w-16 h-16 bg-(--color-panel-2) rounded-full flex items-center justify-center border border-(--color-line) mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl font-semibold text-(--color-accent)">
                    {ref.name.charAt(0)}
                  </span>
                </div>

                {/* Nombre y título */}
                <h3 className="text-xl font-semibold text-(--color-ink) mb-1 group-hover:text-(--color-accent-2) transition-colors duration-300">
                  {ref.name}
                </h3>
                <p className="text-(--color-accent-2) text-sm font-medium mb-2">{ref.title}</p>

                {/* Empresa y relación */}
                <div className="flex items-center gap-2 mb-4 pb-4 border-b border-(--color-line)">
                  <BriefcaseIcon className="h-4 w-4 text-(--color-muted) shrink-0" />
                  <div className="text-sm text-(--color-muted)">
                    <div>{ref.company}</div>
                    <div className="text-xs text-(--color-line)">{ref.relationship}</div>
                  </div>
                </div>

                {/* Recomendación */}
                <p className="text-(--color-muted) text-sm leading-relaxed mb-4 group-hover:text-(--color-ink) transition-colors duration-300 line-clamp-6">
                  {ref.recommendation}
                </p>

                {/* Footer con fecha y LinkedIn */}
                <div className="flex items-center justify-between pt-4 border-t border-(--color-line)">
                  <span className="text-xs text-(--color-muted)">{formatDate(ref.date)}</span>
                </div>
              </div>

              {/* Borde brillante animado en hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-(--color-accent) via-(--color-accent-2) to-(--color-accent) opacity-20 blur-xl" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
