/**
 * ProjectCard
 *
 * Featured (large, premium) and compact variants with:
 * - Localized badge, actions and labels
 * - Designed fallback when no registered image asset exists
 * - Keyboard-accessible focus styles (focus-visible outline)
 * - No JS-driven motion: prefers-reduced-motion honored via the global clamp
 */

'use client';

import Image from 'next/image';
import { ArrowTopRightOnSquareIcon, CodeBracketIcon } from '@heroicons/react/24/outline';
import { Project } from '@/types/profile';
import { resolveProjectImage } from '@/lib/profile/projectImages';
import ProjectFallbackImage from './ProjectFallbackImage';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
  t: (key: string) => string;
  /** Test seam / override for image resolution (checked before rendering). */
  resolveImage?: (image?: string) => string | null;
}

const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-accent)';

export default function ProjectCard({
  project,
  t,
  resolveImage = resolveProjectImage,
}: Readonly<ProjectCardProps>) {
  const featured = project.featured;
  const image = resolveImage(project.image);

  return (
    <article
      className={cn(
        'relative flex flex-col overflow-hidden rounded-2xl border border-(--color-line) bg-(--color-panel) shadow-xl transition-colors duration-500 hover:border-(--color-accent)',
        featured && 'md:col-span-2 md:flex-row'
      )}
    >
      {/* Visual: registered image or designed fallback */}
      <div
        className={cn(
          'relative overflow-hidden bg-(--color-panel-2)',
          featured ? 'h-64 md:h-auto md:w-1/2' : 'h-48'
        )}
      >
        {image ? (
          <Image
            src={image}
            alt={project.title}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <ProjectFallbackImage title={project.title} className="h-full w-full" />
        )}

        {featured && (
          <div className="absolute left-4 top-4 z-10">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-(--color-accent-2) px-3 py-1.5 text-xs font-bold text-(--color-bg) shadow-lg shadow-black/40">
              <span aria-hidden="true">⭐</span>
              <span>{t('projects.badge')}</span>
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div
        className={cn(
          'relative z-10 flex flex-1 flex-col gap-3',
          featured ? 'md:w-1/2 p-8' : 'p-6'
        )}
      >
        {featured && project.role && (
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-(--color-accent)">
            {project.role}
          </p>
        )}

        <h3
          className={cn(
            'font-semibold leading-tight text-(--color-ink)',
            featured ? 'text-2xl' : 'text-xl'
          )}
        >
          {project.title}
        </h3>

        <p
          className={cn(
            'text-sm leading-relaxed text-(--color-muted)',
            featured ? 'line-clamp-3' : 'line-clamp-2'
          )}
        >
          {project.description}
        </p>

        {featured && project.highlights && project.highlights.length > 0 && (
          <ul className="flex flex-col gap-2 text-sm text-(--color-muted)">
            {project.highlights.map((highlight) => (
              <li key={highlight} className="flex items-start gap-2">
                <span
                  aria-hidden="true"
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-(--color-accent)"
                />
                {highlight}
              </li>
            ))}
          </ul>
        )}

        {project.tech.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-(--color-line) bg-(--color-panel-2) px-3 py-1 text-xs font-medium text-(--color-ink)"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        <div className={cn('flex flex-wrap gap-3', featured ? 'mt-auto pt-2' : 'mt-auto')}>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${t('projects.viewDemo')}: ${project.title}`}
              className={cn(
                'inline-flex items-center gap-2 rounded-lg bg-(--color-accent) px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-(--color-ink) transition-colors duration-300 hover:bg-(--color-accent-2)',
                focusRing
              )}
            >
              {t('projects.viewDemo')}
              <ArrowTopRightOnSquareIcon className="h-4 w-4" aria-hidden="true" />
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${t('projects.code')}: ${project.title}`}
              className={cn(
                'inline-flex items-center gap-2 rounded-lg border border-(--color-line) bg-(--color-panel-2) px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-(--color-ink) transition-colors duration-300 hover:border-(--color-accent)',
                focusRing
              )}
            >
              {t('projects.code')}
              <CodeBracketIcon className="h-4 w-4" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}