/**
 * Componente Hero (Sección Principal)
 * 
 * Sección de bienvenida con:
 * - Animación de entrada con Framer Motion
 * - Nombre y título profesional
 * - Descripción breve
 * - Botones de CTA (Call to Action)
 * - Animación de texto tipo "typing"
 * - Fondo con gradiente y efectos visuales
 */

'use client';

import { motion } from 'framer-motion';
import { ArrowDownIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

interface HeroProps {
  /** Diccionario de traducciones */
  t: (key: string) => string;
  /** Nombre completo */
  name: string;
  /** Título profesional */
  title: string;
  /** Descripción/resumen breve */
  summary: string;
}

/**
 * Variantes de animación para contenedores
 * Orquesta la animación secuencial de los elementos hijos
 */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Delay entre animaciones de hijos
      delayChildren: 0.3, // Delay inicial antes de animar hijos
    },
  },
};

/**
 * Variantes de animación para items individuales
 * Animación de desvanecimiento y desplazamiento vertical
 */
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99] as const,
    },
  },
};

export default function Hero({ t, name, title, summary }: Readonly<HeroProps>) {
  /**
   * Maneja el scroll suave hacia una sección específica
   * @param sectionId - ID de la sección destino
   */
  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-900 via-gray-900 to-black"
    >
      {/* Efectos de fondo decorativos */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Círculo degradado azul */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 2 }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl"
        />
        {/* Círculo degradado púrpura */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl"
        />
        {/* Grid decorativo */}
        <div
          className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]"
          style={{
            maskImage: 'radial-gradient(ellipse at center, black, transparent 80%)',
          }}
        />
      </div>

      {/* Contenido principal */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-4xl mx-auto px-6 text-center"
      >
        {/* Saludo */}
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-blue-400 font-medium mb-4"
        >
          {t('hero.greeting')}
        </motion.p>

        {/* Nombre con animación de gradiente */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-blue-300">
            {name}
          </span>
        </motion.h1>

        {/* Título profesional */}
        <motion.h2
          variants={itemVariants}
          className="text-2xl md:text-4xl lg:text-5xl font-semibold text-gray-300 mb-8"
        >
          {title}
        </motion.h2>

        {/* Descripción */}
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          {summary}
        </motion.p>

        {/* Botones CTA */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          {/* Botón primario - Ver trabajo */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('#projects')}
            className="group relative px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold overflow-hidden shadow-lg shadow-blue-500/50 hover:shadow-xl hover:shadow-blue-500/60 transition-all duration-300"
          >
            {/* Efecto de hover con gradiente animado */}
            <span className="absolute inset-0 w-0 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 ease-out group-hover:w-full"></span>
            <span className="relative flex items-center gap-2">
              {t('hero.cta')}
              <ArrowDownIcon className="h-5 w-5 group-hover:translate-y-1 transition-transform" />
            </span>
          </motion.button>

          {/* Botón secundario - Contacto */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('#contact')}
            className="px-8 py-4 bg-gray-800 text-white rounded-lg font-semibold border-2 border-gray-700 hover:border-blue-500 hover:bg-gray-700 transition-all duration-300 flex items-center gap-2"
          >
            <EnvelopeIcon className="h-5 w-5" />
            {t('hero.ctaSecondary')}
          </motion.button>
        </motion.div>

        {/* Indicador de scroll */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 1.5,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ArrowDownIcon className="h-6 w-6 text-gray-500" />
        </motion.div>
      </motion.div>

      {/* Overlay de vignette para profundidad */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)',
        }}
      />
    </section>
  );
}
