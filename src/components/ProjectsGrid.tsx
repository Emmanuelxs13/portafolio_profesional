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

  return (
    <section id="projects" className="relative py-20 md:py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">{t('projects.title')}</h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">{t('projects.subtitle')}</p>

          {/* Toggle de filtro */}
          <div className="inline-flex rounded-lg bg-gray-800 p-1">
            <button
              onClick={() => setShowAll(false)}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                !showAll ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              {t('projects.featured')}
            </button>
            <button
              onClick={() => setShowAll(true)}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                showAll ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              {t('projects.all')}
            </button>
          </div>
        </motion.div>

        {/* Grid de proyectos */}
        <AnimatePresence mode="wait">
          <motion.div
            key={showAll ? 'all' : 'featured'}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {displayedProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative bg-gradient-to-br from-gray-800/90 via-gray-900/90 to-gray-800/90 rounded-2xl overflow-hidden border border-gray-700/50 hover:border-blue-500/50 shadow-xl hover:shadow-2xl hover:shadow-blue-500/20 backdrop-blur-sm transition-all duration-300"
              >
                {/* Efecto de brillo superior */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-transparent group-hover:from-blue-500/10 group-hover:via-purple-500/5 transition-all duration-500" />

                {/* Indicador decorativo en esquina */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-all duration-500" />

                {/* Imagen del proyecto */}
                <div className="relative h-52 bg-gradient-to-br from-gray-900 to-black overflow-hidden">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <CodeBracketIcon className="h-24 w-24 text-gray-600/50" />
                    </div>
                  )}

                  {/* Overlay con enlaces mejorado */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    {project.link && (
                      <motion.a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full hover:shadow-xl hover:shadow-blue-500/50 transition-all duration-300"
                        whileHover={{ scale: 1.15, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
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
                        className="p-4 bg-gray-800/90 backdrop-blur-sm rounded-full hover:bg-gray-700 hover:shadow-xl hover:shadow-gray-500/30 transition-all duration-300"
                        whileHover={{ scale: 1.15, rotate: -5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <CodeBracketIcon className="h-6 w-6 text-white" />
                      </motion.a>
                    )}
                  </div>
                </div>

                {/* Contenido mejorado */}
                <div className="relative z-10 p-6">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    {project.description}
                  </p>

                  {/* Tecnologías mejoradas */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.slice(0, 4).map((tech, techIndex) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: techIndex * 0.05 }}
                        whileHover={{ scale: 1.1, y: -2 }}
                        className="px-3 py-1.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 text-blue-300 text-xs rounded-full border border-blue-500/30 backdrop-blur-sm transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-blue-500/20"
                      >
                        {tech}
                      </motion.span>
                    ))}
                    {project.tech.length > 4 && (
                      <span className="px-3 py-1.5 text-gray-500 text-xs font-medium">
                        +{project.tech.length - 4} más
                      </span>
                    )}
                  </div>
                </div>

                {/* Borde brillante animado en hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 opacity-20 blur-xl" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
