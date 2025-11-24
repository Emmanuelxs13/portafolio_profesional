/**
 * Componente Hero (Sección Principal)
 *
 * Sección de bienvenida optimizada para laptop/desktop:
 * - Diseño minimalista y elegante
 * - Animaciones sutiles con Framer Motion
 * - Jerarquía visual clara: nombre → rol → frase de impacto
 * - Layout limpio y balanceado
 * - Frase breve que funciona como gancho rápido
 * - Responsive y profesional para reclutadores internacionales
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
  /** Descripción breve no se usa aquí para evitar saturación */
  summary?: string;
}

/**
 * Variantes de animación para contenedores
 * Animación más sutil y profesional
 */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

/**
 * Variantes de animación para items individuales
 * Movimiento más suave y natural
 */
const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function Hero({ t, name, title }: Readonly<HeroProps>) {
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-900 via-black to-black"
    >
      {/* Efectos de fondo decorativos mejorados y más atractivos */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradientes animados principales - Más vibrantes */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: -100 }}
          animate={{
            opacity: [0.15, 0.2, 0.15],
            scale: [0.8, 1.1, 0.8],
            x: [-100, -50, -100],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-500 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 100 }}
          animate={{
            opacity: [0.15, 0.25, 0.15],
            scale: [0.8, 1.2, 0.8],
            x: [100, 50, 100],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 10,
            delay: 0.5,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="absolute bottom-1/4 -right-20 w-[700px] h-[700px] bg-gradient-to-tl from-purple-600 via-purple-500 to-pink-500 rounded-full blur-3xl"
        />

        {/* Círculo adicional en el centro para más profundidad */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: [0.08, 0.12, 0.08],
            scale: [0.9, 1.3, 0.9],
          }}
          transition={{
            duration: 12,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 rounded-full blur-3xl opacity-10"
        />

        {/* Partículas flotantes decorativas */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          {/* Partícula 1 */}
          <motion.div
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full blur-sm"
          />
          {/* Partícula 2 */}
          <motion.div
            animate={{
              y: [0, 40, 0],
              x: [0, -25, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 8,
              delay: 1,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute top-1/3 right-1/4 w-3 h-3 bg-purple-400 rounded-full blur-sm"
          />
          {/* Partícula 3 */}
          <motion.div
            animate={{
              y: [0, -25, 0],
              x: [0, 15, 0],
              opacity: [0.25, 0.55, 0.25],
            }}
            transition={{
              duration: 7,
              delay: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute bottom-1/3 left-1/3 w-2.5 h-2.5 bg-cyan-400 rounded-full blur-sm"
          />
          {/* Partícula 4 */}
          <motion.div
            animate={{
              y: [0, 35, 0],
              x: [0, -20, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 9,
              delay: 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-pink-400 rounded-full blur-sm"
          />
        </motion.div>

        {/* Grid decorativo mejorado con efecto shimmer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.02, 0.04, 0.02] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]"
          style={{
            maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black, transparent)',
          }}
        />

        {/* Líneas decorativas diagonales */}
        <div className="absolute inset-0">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{
              opacity: [0.03, 0.06, 0.03],
              x: [-100, 100, -100],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"
          />
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{
              opacity: [0.03, 0.06, 0.03],
              x: [100, -100, 100],
            }}
            transition={{
              duration: 20,
              delay: 2,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400/30 to-transparent"
          />
        </div>

        {/* Efecto de resplandor en las esquinas */}
        <motion.div
          animate={{
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 5,
            delay: 1,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-purple-500/20 to-transparent rounded-full blur-3xl"
        />
      </div>

      {/* Contenido principal - Layout optimizado para laptop/desktop */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
      >
        {/* Saludo minimalista */}
        <motion.p
          variants={itemVariants}
          className="text-base md:text-lg text-blue-400/90 font-medium mb-6 tracking-wide"
        >
          {t('hero.greeting')}
        </motion.p>

        {/* Nombre - Elemento principal con mayor peso visual */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-50 to-white">
            {name}
          </span>
        </motion.h1>

        {/* Título profesional - Jerarquía clara */}
        <motion.h2
          variants={itemVariants}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-300/95 mb-8 leading-tight"
        >
          {title}
        </motion.h2>

        {/* Frase de impacto - Breve, clara y atractiva */}
        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg md:text-xl text-gray-400/90 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          {t('hero.subtitle')}
        </motion.p>

        {/* Botones CTA - Diseño limpio y profesional */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          {/* Botón primario - Ver proyectos */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => scrollToSection('#projects')}
            className="group relative px-8 py-3.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg font-semibold overflow-hidden shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300"
          >
            <span className="relative flex items-center gap-2">
              {t('hero.cta')}
              <ArrowDownIcon className="h-4 w-4 group-hover:translate-y-0.5 transition-transform duration-300" />
            </span>
          </motion.button>

          {/* Botón secundario - Contacto */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => scrollToSection('#contact')}
            className="px-8 py-3.5 bg-transparent text-gray-300 rounded-lg font-semibold border-2 border-gray-700/80 hover:border-blue-500/60 hover:bg-gray-800/50 transition-all duration-300 flex items-center gap-2"
          >
            <EnvelopeIcon className="h-4 w-4" />
            {t('hero.ctaSecondary')}
          </motion.button>
        </motion.div>

        {/* Indicador de scroll animado - Sutil y elegante */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 0.5, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 1.2,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden md:block"
        >
          <ArrowDownIcon className="h-5 w-5 text-gray-500" />
        </motion.div>
      </motion.div>

      {/* Vignette sutil para profundidad */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 100% 80% at 50% 50%, transparent 0%, rgba(0,0,0,0.3) 100%)',
        }}
      />
    </section>
  );
}
