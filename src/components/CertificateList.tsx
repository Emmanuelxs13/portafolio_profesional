/**
 * Componente CertificateList - Lista de certificaciones
 */

'use client';

import { motion } from 'framer-motion';
import { Certificate } from '@/types/profile';
import { AcademicCapIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
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
  return (
    <section id="certificates" className="py-20 md:py-32 bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            {t('certificates.title')}
          </h2>
          <p className="text-lg text-gray-400">{t('certificates.subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                  <AcademicCapIcon className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-1">{cert.name}</h3>
                  <p className="text-blue-400 text-sm mb-2">{cert.issuer}</p>
                  <p className="text-gray-500 text-sm">{formatDate(cert.date, locale)}</p>
                  {cert.url && (
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300 mt-2"
                    >
                      {t('certificates.viewCredential')}
                      <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
