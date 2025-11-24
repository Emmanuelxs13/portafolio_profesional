/**
 * Componente ProjectsGrid
 *
 * Grid de proyectos con:
 * - Tarjetas de proyecto con hover effects
 * - Filtro de proyectos destacados/todos
 * - Modal para ver detalles completos
 * - Enlaces a demo y código fuente
 * - Imágenes optimizadas con Next/Image
 */

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Project } from '@/types/profile';
import { ArrowTopRightOnSquareIcon, CodeBracketIcon } from '@heroicons/react/24/outline';

interface ProjectsGridProps {
  t: (key: string) => string;
  projects: Project[];
}

export default function ProjectsGrid({ t, projects }: Readonly<ProjectsGridProps>) {
  const [showAll, setShowAll] = useState(false);

  // Filtrar proyectos a mostrar
  const displayedProjects = showAll ? projects : projects.filter((p) => p.featured);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section
      id="projects"
      className="relative py-20 md:py-32 bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden"
    >
      {/* Decoraciones de fondo */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
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
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-xl shadow-blue-500/30"
          >
            <CodeBracketIcon className="h-8 w-8 text-white" />
          </motion.div>

          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            {t('projects.title')}
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10">{t('projects.subtitle')}</p>

          {/* Toggle de filtro mejorado */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex rounded-xl bg-gray-800/80 backdrop-blur-sm p-1.5 border border-gray-700/50 shadow-xl"
          >
            <button
              onClick={() => setShowAll(false)}
              className={`relative px-8 py-3 rounded-lg text-sm font-semibold transition-all ${
                !showAll
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/50'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
              }`}
            >
              {t('projects.featured')}
            </button>
            <button
              onClick={() => setShowAll(true)}
              className={`relative px-8 py-3 rounded-lg text-sm font-semibold transition-all ${
                showAll
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/50'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
              }`}
            >
              {t('projects.all')}
            </button>
          </motion.div>
        </motion.div>

        {/* Grid de proyectos */}
        <AnimatePresence mode="wait">
          <motion.div
            key={showAll ? 'all' : 'featured'}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {displayedProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={cardVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative bg-gradient-to-br from-gray-800/90 via-gray-900/90 to-gray-800/90 rounded-2xl overflow-hidden border border-gray-700/50 hover:border-blue-500/50 shadow-xl hover:shadow-2xl hover:shadow-blue-500/30 backdrop-blur-sm transition-all duration-500"
              >
                {/* Efecto de brillo superior */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-transparent group-hover:from-blue-500/15 group-hover:via-purple-500/10 transition-all duration-500" />

                {/* Indicador decorativo en esquina */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/15 transition-all duration-500" />

                {/* Imagen del proyecto */}
                <div className="relative h-56 bg-gradient-to-br from-gray-900 to-black overflow-hidden">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <CodeBracketIcon className="h-24 w-24 text-gray-600/50 group-hover:text-gray-600/70 transition-colors duration-300" />
                    </div>
                  )}

                  {/* Overlay con enlaces mejorado */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-4">
                    {project.link && (
                      <motion.a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300"
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.2 }}
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ArrowTopRightOnSquareIcon className="h-6 w-6 text-white" />
                      </motion.a>
                    )}
                    {project.github && (
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-4 bg-gray-800/90 backdrop-blur-sm rounded-full hover:bg-gray-700 hover:shadow-2xl hover:shadow-gray-500/30 transition-all duration-300"
                        initial={{ scale: 0, rotate: 180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.3 }}
                        whileHover={{ scale: 1.2, rotate: -5 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <CodeBracketIcon className="h-6 w-6 text-white" />
                      </motion.a>
                    )}
                  </div>

                  {/* Badge destacado si es proyecto featured */}
                  {project.featured && (
                    <div className="absolute top-4 left-4 z-10">
                      <motion.span
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg shadow-yellow-500/50"
                      >
                        ⭐ Destacado
                      </motion.span>
                    </div>
                  )}
                </div>

                {/* Contenido mejorado */}
                <div className="relative z-10 p-6">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors duration-300 leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-5 line-clamp-3 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    {project.description}
                  </p>

                  {/* Tecnologías mejoradas */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.slice(0, 5).map((tech, techIndex) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: techIndex * 0.05 }}
                        whileHover={{ scale: 1.15, y: -3 }}
                        className="px-3 py-1.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/40 hover:to-purple-500/40 text-blue-300 text-xs font-medium rounded-full border border-blue-500/30 backdrop-blur-sm transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-blue-500/30 cursor-default"
                      >
                        {tech}
                      </motion.span>
                    ))}
                    {project.tech.length > 5 && (
                      <span className="px-3 py-1.5 text-gray-500 text-xs font-medium bg-gray-800/50 rounded-full border border-gray-700">
                        +{project.tech.length - 5}
                      </span>
                    )}
                  </div>

                  {/* Divider decorativo */}
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-4 group-hover:via-blue-500/50 transition-colors duration-500" />

                  {/* Enlaces como botones */}
                  <div className="flex gap-3">
                    {project.link && (
                      <motion.a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-sm font-semibold rounded-lg shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/50 transition-all duration-300"
                      >
                        <span>Ver Demo</span>
                        <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                      </motion.a>
                    )}
                    {project.github && (
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`${project.link ? '' : 'flex-1'} inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-700/80 hover:bg-gray-600 text-white text-sm font-semibold rounded-lg border border-gray-600/50 shadow-lg hover:shadow-xl transition-all duration-300`}
                      >
                        <CodeBracketIcon className="h-4 w-4" />
                        <span>Código</span>
                      </motion.a>
                    )}
                  </div>
                </div>

                {/* Borde brillante animado en hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 opacity-20 blur-xl animate-pulse" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
