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
    <section id="projects" className="relative py-24 md:py-36 bg-(--color-bg) overflow-hidden">
      {/* Decoraciones de fondo */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-(--color-accent-2)/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-10 w-80 h-80 bg-(--color-accent)/10 rounded-full blur-3xl" />
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
            className="inline-flex items-center justify-center w-16 h-16 bg-(--color-accent) rounded-2xl mb-6 shadow-xl shadow-black/40"
          >
            <CodeBracketIcon className="h-8 w-8 text-white" />
          </motion.div>

          <h2 className="text-3xl md:text-5xl font-semibold mb-4 text-(--color-ink)">
            {t('projects.title')}
          </h2>
          <p className="text-lg text-(--color-muted) max-w-2xl mx-auto mb-10">
            {t('projects.subtitle')}
          </p>

          {/* Toggle de filtro mejorado */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex rounded-xl bg-(--color-panel) backdrop-blur-sm p-1.5 border border-(--color-line) shadow-xl"
          >
            <button
              onClick={() => setShowAll(false)}
              className={`relative px-8 py-3 rounded-lg text-sm font-semibold transition-all ${
                !showAll
                  ? 'bg-(--color-accent) text-(--color-ink) shadow-lg shadow-black/40'
                  : 'text-(--color-muted) hover:text-(--color-ink) hover:bg-(--color-panel-2)'
              }`}
            >
              {t('projects.featured')}
            </button>
            <button
              onClick={() => setShowAll(true)}
              className={`relative px-8 py-3 rounded-lg text-sm font-semibold transition-all ${
                showAll
                  ? 'bg-(--color-accent) text-(--color-ink) shadow-lg shadow-black/40'
                  : 'text-(--color-muted) hover:text-(--color-ink) hover:bg-(--color-panel-2)'
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
                className="group relative bg-(--color-panel) rounded-2xl overflow-hidden border border-(--color-line) hover:border-(--color-accent) shadow-xl hover:shadow-2xl hover:shadow-black/40 backdrop-blur-sm transition-all duration-500"
              >
                {/* Efecto de brillo superior */}
                <div className="absolute inset-0 bg-linear-to-br from-(--color-accent)/0 via-(--color-accent-2)/0 to-transparent group-hover:from-(--color-accent)/15 group-hover:via-(--color-accent-2)/10 transition-all duration-500" />

                {/* Indicador decorativo en esquina */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-(--color-accent)/10 rounded-full blur-3xl group-hover:bg-(--color-accent)/20 transition-all duration-500" />

                {/* Imagen del proyecto */}
                <div className="relative h-56 bg-(--color-panel-2) overflow-hidden">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <CodeBracketIcon className="h-24 w-24 text-(--color-line) group-hover:text-(--color-muted) transition-colors duration-300" />
                    </div>
                  )}

                  {/* Overlay con enlaces mejorado */}
                  <div className="absolute inset-0 bg-linear-to-t from-black via-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-4">
                    {project.link && (
                      <motion.a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-4 bg-(--color-accent) rounded-full hover:shadow-2xl hover:shadow-black/50 transition-all duration-300"
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
                        className="p-4 bg-(--color-panel) backdrop-blur-sm rounded-full hover:bg-(--color-panel-2) hover:shadow-2xl hover:shadow-black/40 transition-all duration-300"
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
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-(--color-accent-2) text-(--color-bg) text-xs font-bold rounded-full shadow-lg shadow-black/40"
                      >
                        ⭐ Destacado
                      </motion.span>
                    </div>
                  )}
                </div>

                {/* Contenido mejorado */}
                <div className="relative z-10 p-6">
                  <h3 className="text-xl font-semibold text-(--color-ink) mb-3 group-hover:text-(--color-accent-2) transition-colors duration-300 leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-(--color-muted) text-sm mb-5 line-clamp-3 leading-relaxed group-hover:text-(--color-ink) transition-colors duration-300">
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
                        className="px-3 py-1.5 bg-(--color-panel-2) text-(--color-ink) text-xs font-medium rounded-full border border-(--color-line) backdrop-blur-sm transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-black/30 cursor-default"
                      >
                        {tech}
                      </motion.span>
                    ))}
                    {project.tech.length > 5 && (
                      <span className="px-3 py-1.5 text-(--color-muted) text-xs font-medium bg-(--color-panel-2) rounded-full border border-(--color-line)">
                        +{project.tech.length - 5}
                      </span>
                    )}
                  </div>

                  {/* Divider decorativo */}
                  <div className="h-px bg-linear-to-r from-transparent via-(--color-line) to-transparent mb-4 group-hover:via-(--color-accent)/60 transition-colors duration-500" />

                  {/* Enlaces como botones */}
                  <div className="flex gap-3">
                    {project.link && (
                      <motion.a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-(--color-accent) text-(--color-ink) text-xs uppercase tracking-[0.2em] font-semibold rounded-lg shadow-lg shadow-black/40 transition-all duration-300"
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
                  <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-(--color-accent) via-(--color-accent-2) to-(--color-accent) opacity-20 blur-xl animate-pulse" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
