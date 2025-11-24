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
    <section
      id="certificates"
      className="relative py-20 md:py-32 bg-gradient-to-b from-gray-900 via-black to-gray-900"
    >
      {/* Decoración de fondo */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-10 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-10 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl" />
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
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl mb-6 shadow-xl shadow-yellow-500/30"
          >
            <CheckBadgeIcon className="h-8 w-8 text-white" />
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
            {t('certificates.title')}
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">{t('certificates.subtitle')}</p>
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
              className="group relative bg-gradient-to-br from-gray-800/90 via-gray-900/90 to-gray-800/90 rounded-2xl p-6 border border-gray-700/50 shadow-xl hover:shadow-2xl hover:shadow-yellow-500/20 backdrop-blur-sm transition-all duration-300"
            >
              {/* Efectos decorativos */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-yellow-500/0 via-orange-500/0 to-transparent group-hover:from-yellow-500/10 group-hover:via-orange-500/5 transition-all duration-500" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 rounded-full blur-3xl group-hover:bg-yellow-500/10 transition-all duration-500" />

              <div className="relative z-10">
                {/* Header con icono */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="shrink-0 w-14 h-14 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-xl flex items-center justify-center border border-yellow-500/30 group-hover:scale-110 transition-transform duration-300">
                    <AcademicCapIcon className="h-7 w-7 text-yellow-400" />
                  </div>
                  <div className="grow">
                    <h3 className="text-lg font-bold text-white group-hover:text-yellow-300 transition-colors duration-300 leading-tight mb-2">
                      {cert.name}
                    </h3>
                  </div>
                </div>

                {/* Emisor */}
                <div className="mb-3">
                  <p className="text-orange-400 font-medium text-sm">{cert.issuer}</p>
                </div>

                {/* Fecha */}
                <div className="mb-4 pb-4 border-b border-gray-700/50">
                  <p className="text-gray-500 text-sm">{formatDate(cert.date, locale)}</p>
                </div>

                {/* ID de credencial (si existe) */}
                {cert.credentialId && (
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-yellow-500/10 border border-yellow-500/30 rounded-full text-xs text-yellow-400 font-mono">
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
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white text-sm font-semibold rounded-lg shadow-lg shadow-yellow-500/30 hover:shadow-xl hover:shadow-yellow-500/50 transition-all duration-300"
                  >
                    <span>{t('certificates.viewCredential')}</span>
                    <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                  </motion.a>
                )}
              </div>

              {/* Borde brillante animado en hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-500 opacity-20 blur-xl" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
