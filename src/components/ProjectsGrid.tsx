/**
 * Componente ProjectsGrid
 *
 * Grid de proyectos con:
 * - Tarjetas reutilizables (featured/compact) con labels y acciones localizados
 * - Filtro de proyectos destacados/todos
 * - Fallback tipográfico cuando no hay imagen registrada
 * - Accesibilidad: heading vinculado (aria-labelledby) y links con aria-label
 */

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '@/types/profile';
import { CodeBracketIcon } from '@heroicons/react/24/outline';
import ProjectCard from './ProjectCard';

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

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="relative py-24 md:py-36 bg-(--color-bg) overflow-hidden"
    >
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

          <h2 id="projects-heading" className="text-3xl md:text-5xl font-semibold mb-4 text-(--color-ink)">
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
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {displayedProjects.map((project) => (
              <ProjectCard key={project.id} project={project} t={t} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}