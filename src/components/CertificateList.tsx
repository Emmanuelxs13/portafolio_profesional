/**
 * Componente CertificateList - Lista de certificaciones mejorada
 */

'use client';

import { motion } from 'framer-motion';
import { Certificate } from '@/types/profile';
import {
  AcademicCapIcon,
  ArrowTopRightOnSquareIcon,
  CheckBadgeIcon,
} from '@heroicons/react/24/outline';
import { formatDate } from '@/lib/utils';

interface CertificateListProps {
  t: (key: string) => string;
  certificates: Certificate[];
  locale: string;
}

export default function CertificateList({
  t,
  certificates,
  locale,
}: Readonly<CertificateListProps>) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  return (
    <section id="certificates" className="relative py-24 md:py-36 bg-(--color-bg)">
      {/* Decoración de fondo */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-10 w-64 h-64 bg-(--color-accent-2)/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-10 w-80 h-80 bg-(--color-accent)/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header mejorado */}
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
            className="inline-flex items-center justify-center w-16 h-16 bg-(--color-accent-2) rounded-2xl mb-6 shadow-xl shadow-black/40"
          >
            <CheckBadgeIcon className="h-8 w-8 text-white" />
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-semibold mb-4 text-(--color-ink)">
            {t('certificates.title')}
          </h2>
          <p className="text-lg text-(--color-muted) max-w-2xl mx-auto">
            {t('certificates.subtitle')}
          </p>
        </motion.div>

        {/* Grid de certificaciones mejorado */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {certificates.map((cert) => (
            <motion.div
              key={cert.id}
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative bg-(--color-panel) rounded-2xl p-6 border border-(--color-line) shadow-xl hover:shadow-2xl hover:shadow-black/40 backdrop-blur-sm transition-all duration-300"
            >
              {/* Efectos decorativos */}
              <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-(--color-accent)/0 via-(--color-accent-2)/0 to-transparent group-hover:from-(--color-accent)/10 group-hover:via-(--color-accent-2)/5 transition-all duration-500" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-(--color-accent-2)/10 rounded-full blur-3xl group-hover:bg-(--color-accent-2)/20 transition-all duration-500" />

              <div className="relative z-10">
                {/* Header con icono */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="shrink-0 w-14 h-14 bg-(--color-panel-2) rounded-xl flex items-center justify-center border border-(--color-line) group-hover:scale-110 transition-transform duration-300">
                    <AcademicCapIcon className="h-7 w-7 text-(--color-accent-2)" />
                  </div>
                  <div className="grow">
                    <h3 className="text-lg font-semibold text-(--color-ink) group-hover:text-(--color-accent-2) transition-colors duration-300 leading-tight mb-2">
                      {cert.name}
                    </h3>
                  </div>
                </div>

                {/* Emisor */}
                <div className="mb-3">
                  <p className="text-(--color-accent) font-medium text-sm">{cert.issuer}</p>
                </div>

                {/* Fecha */}
                <div className="mb-4 pb-4 border-b border-(--color-line)">
                  <p className="text-(--color-muted) text-sm">{formatDate(cert.date, locale)}</p>
                </div>

                {/* ID de credencial (si existe) */}
                {cert.credentialId && (
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-(--color-panel-2) border border-(--color-line) rounded-full text-xs text-(--color-muted) font-mono">
                      ID: {cert.credentialId.slice(0, 12)}...
                    </span>
                  </div>
                )}

                {/* Botón ver credencial */}
                {cert.url && (
                  <motion.a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-(--color-accent-2) text-(--color-bg) text-xs uppercase tracking-[0.2em] font-semibold rounded-lg shadow-lg shadow-black/40 transition-all duration-300"
                  >
                    <span>{t('certificates.viewCredential')}</span>
                    <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                  </motion.a>
                )}
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
