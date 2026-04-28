/**
 * Componente About (Sobre Mí)
 *
 * Sección que muestra:
 * - Foto profesional o avatar
 * - Descripción detallada del perfil
 * - Estadísticas clave (años de experiencia, proyectos, etc.)
 * - Botón para descargar CV
 * - Animaciones de entrada con Framer Motion
 */

'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  ArrowDownTrayIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  CodeBracketIcon,
} from '@heroicons/react/24/outline';

interface AboutProps {
  /** Diccionario de traducciones */
  t: (key: string) => string;
  /** Descripción/resumen profesional */
  summary: string;
  /** Estadísticas del perfil */
  stats: {
    yearsOfExperience: number;
    projectsCompleted: number;
    certificatesEarned: number;
    technologiesUsed: number;
  };
  /** Idioma actual para descargar CV correspondiente */
  locale: string;
}

/**
 * Variantes de animación para fade-in desde abajo
 */
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] as const },
  },
};

/**
 * Variantes para animación de contenedores con stagger
 */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export default function About({ t, summary, stats, locale }: Readonly<AboutProps>) {
  /**
   * Estadísticas a mostrar con íconos
   */
  const statisticsData = [
    {
      icon: BriefcaseIcon,
      value: stats.yearsOfExperience,
      label: t('about.yearsExperience'),
      suffix: '+',
    },
    {
      icon: CodeBracketIcon,
      value: stats.projectsCompleted,
      label: t('about.projectsCompleted'),
      suffix: '+',
    },
    {
      icon: AcademicCapIcon,
      value: stats.certificatesEarned,
      label: 'Certificaciones',
      suffix: '',
    },
  ];

  /**
   * Maneja la descarga del CV
   */
  const handleDownloadCV = () => {
    // Ruta directa al archivo PDF en la carpeta data
    const cvUrl = '/CV-Emmanuel_Berrio.pdf';
    const downloadName = locale === 'en' ? 'CV-Emmanuel_Berrio_EN.pdf' : 'CV-Emmanuel_Berrio.pdf';

    // Crear un enlace temporal y hacer clic programáticamente
    const link = document.createElement('a');
    link.href = cvUrl;
    link.download = downloadName;
    link.target = '_blank'; // Abre en nueva pestaña si falla la descarga
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="about" className="relative py-24 md:py-36 bg-(--color-bg) overflow-hidden">
      {/* Efectos de fondo decorativos mejorados */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 0.08, scale: 1 }}
          transition={{ duration: 2 }}
          className="absolute top-0 left-1/4 w-96 h-96 bg-(--color-accent-2) rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 0.08, scale: 1 }}
          transition={{ duration: 2, delay: 0.3 }}
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-(--color-accent) rounded-full blur-3xl"
        />
        {/* Grid pattern sutil */}
        <div
          className="absolute inset-0 bg-grid-white/[0.02] bg-size-[50px_50px]"
          style={{
            maskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black, transparent)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Encabezado de sección */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-4 text-(--color-ink)">
            {t('about.title')}
          </h2>
          <p className="text-lg md:text-xl text-(--color-muted) max-w-2xl mx-auto">
            {t('about.subtitle')}
          </p>
        </motion.div>

        {/* Contenido principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Lado izquierdo - Imagen/Avatar mejorado */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeInUp}
            className="relative order-2 lg:order-1"
          >
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Fondo decorativo con gradiente animado */}
              <div className="absolute inset-0 bg-linear-to-br from-(--color-accent)/20 via-(--color-accent-2)/20 to-(--color-accent)/20 rounded-3xl transform rotate-6" />

              {/* Container de imagen/avatar con mejor diseño */}
              <div className="relative bg-(--color-panel) rounded-3xl overflow-hidden border border-(--color-line) shadow-2xl shadow-black/40 backdrop-blur-sm">
                {/* Imagen de perfil */}
                <div className="aspect-square relative overflow-hidden">
                  <Image
                    src="/img/about/fotoPerfil.JPG"
                    alt="Emmanuel Berrio - Software Developer"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 500px"
                  />
                  {/* Overlay muy sutil para mejor contraste sin opacar la imagen */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/5 to-transparent" />
                </div>
              </div>

              {/* Badge decorativo mejorado */}
              <motion.div
                initial={{ scale: 0, rotate: -10 }}
                whileInView={{ scale: 1, rotate: 0 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                className="absolute -bottom-4 -right-4 bg-(--color-accent) text-(--color-ink) px-6 py-3 rounded-full shadow-xl shadow-black/40 font-semibold text-xs uppercase tracking-[0.3em] flex items-center gap-2 border border-(--color-line)"
              >
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/80 opacity-70"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                </span>
                Disponible
              </motion.div>
            </div>
          </motion.div>

          {/* Lado derecho - Descripción y estadísticas mejoradas */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
            className="space-y-8 order-1 lg:order-2"
          >
            {/* Descripción con mejor tipografía */}
            <motion.div variants={fadeInUp}>
              <p className="text-lg md:text-xl text-(--color-muted) leading-relaxed">{summary}</p>
            </motion.div>

            {/* Estadísticas con diseño mejorado */}
            <motion.div variants={fadeInUp} className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {statisticsData.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="group relative bg-(--color-panel) p-6 rounded-2xl border border-(--color-line) shadow-lg hover:shadow-2xl hover:shadow-black/40 backdrop-blur-sm transition-all duration-300"
                  style={{
                    transitionDelay: `${index * 50}ms`,
                  }}
                >
                  {/* Efecto de brillo en hover */}
                  <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-(--color-accent)/0 to-(--color-accent-2)/0 group-hover:from-(--color-accent)/10 group-hover:to-(--color-accent-2)/10 transition-all duration-300" />

                  <stat.icon className="h-8 w-8 text-(--color-accent) mb-3 group-hover:text-(--color-accent-2) transition-colors duration-300 relative z-10" />
                  <div className="text-3xl md:text-4xl font-semibold text-(--color-ink) mb-1 relative z-10">
                    {stat.value}
                    {stat.suffix}
                  </div>
                  <div className="text-xs uppercase tracking-[0.2em] text-(--color-muted) group-hover:text-(--color-ink) transition-colors duration-300 relative z-10">
                    {stat.label}
                  </div>

                  {/* Indicador decorativo */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-(--color-accent)/10 rounded-full blur-2xl group-hover:bg-(--color-accent)/20 transition-all duration-300" />
                </motion.div>
              ))}
            </motion.div>

            {/* Botón de descarga de CV mejorado */}
            <motion.div variants={fadeInUp}>
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDownloadCV}
                className="group relative px-8 py-4 bg-(--color-accent) text-(--color-ink) uppercase tracking-[0.25em] text-xs font-semibold overflow-hidden shadow-xl shadow-black/40 transition-all duration-300"
              >
                {/* Efecto de brillo animado */}
                <motion.div
                  className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent"
                  animate={{
                    x: ['-200%', '200%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear',
                    repeatDelay: 1,
                  }}
                />
                <span className="relative flex items-center justify-center gap-2">
                  <ArrowDownTrayIcon className="h-5 w-5 group-hover:translate-y-1 transition-transform duration-300" />
                  <span className="font-semibold">{t('about.downloadCV')}</span>
                </span>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
