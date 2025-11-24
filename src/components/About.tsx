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
   * Maneja la descarga del CV en el idioma seleccionado
   */
  const handleDownloadCV = () => {
    // La ruta apuntará al endpoint que genera el PDF
    const cvUrl = `/api/cv?lang=${locale}`;

    // Crear un enlace temporal y hacer clic programáticamente
    const link = document.createElement('a');
    link.href = cvUrl;
    link.download = `Emmanuel-Berrio-CV-${locale.toUpperCase()}.pdf`;
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <section
      id="about"
      className="relative py-20 md:py-32 bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden"
    >
      {/* Efectos de fondo decorativos mejorados */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 0.08, scale: 1 }}
          transition={{ duration: 2 }}
          className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 0.08, scale: 1 }}
          transition={{ duration: 2, delay: 0.3 }}
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl"
        />
        {/* Grid pattern sutil */}
        <div
          className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]"
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
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white">
            {t('about.title')}
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
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
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-blue-600 rounded-3xl transform rotate-6 opacity-20"
                animate={{
                  rotate: [6, -6, 6],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              {/* Container de imagen/avatar con mejor diseño */}
              <div className="relative bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-3xl overflow-hidden border-2 border-gray-700/50 shadow-2xl shadow-blue-500/20 backdrop-blur-sm">
                {/* Placeholder - Reemplazar con imagen real */}
                <div className="aspect-square flex items-center justify-center bg-gradient-to-br from-blue-600/90 via-purple-600/90 to-blue-700/90 relative overflow-hidden">
                  {/* Patrón de fondo sutil */}
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage:
                        'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                      backgroundSize: '40px 40px',
                    }}
                  />
                  <span className="text-9xl font-bold text-white opacity-40 relative z-10">EB</span>
                  {/* Efecto de brillo */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent"
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'linear',
                      repeatDelay: 2,
                    }}
                  />
                </div>
              </div>

              {/* Badge decorativo mejorado */}
              <motion.div
                initial={{ scale: 0, rotate: -10 }}
                whileInView={{ scale: 1, rotate: 0 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                className="absolute -bottom-4 -right-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-full shadow-xl shadow-green-500/50 font-semibold text-sm flex items-center gap-2 border-2 border-white/20"
              >
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
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
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed">{summary}</p>
            </motion.div>

            {/* Estadísticas con diseño mejorado */}
            <motion.div variants={fadeInUp} className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {statisticsData.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="group relative bg-gradient-to-br from-gray-800/80 via-gray-900/80 to-gray-800/80 p-6 rounded-2xl border border-gray-700/50 shadow-lg hover:shadow-2xl hover:shadow-blue-500/20 backdrop-blur-sm transition-all duration-300"
                  style={{
                    transitionDelay: `${index * 50}ms`,
                  }}
                >
                  {/* Efecto de brillo en hover */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-300" />

                  <stat.icon className="h-8 w-8 text-blue-400 mb-3 group-hover:text-blue-300 transition-colors duration-300 relative z-10" />
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1 relative z-10">
                    {stat.value}
                    {stat.suffix}
                  </div>
                  <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300 relative z-10">
                    {stat.label}
                  </div>

                  {/* Indicador decorativo */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-all duration-300" />
                </motion.div>
              ))}
            </motion.div>

            {/* Botón de descarga de CV mejorado */}
            <motion.div variants={fadeInUp}>
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDownloadCV}
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 text-white rounded-xl font-semibold overflow-hidden shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300"
              >
                {/* Efecto de brillo animado */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
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
