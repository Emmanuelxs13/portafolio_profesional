/**
 * Componente ExperienceTimeline
 *
 * Timeline vertical (spine + dots, cards a la derecha) que renderiza N roles
 * desde el modelo de perfil, ordenados del más reciente al más antiguo.
 * - Badge CURRENT localizado cuando `current` es true, junto al periodo formateado
 *   (con fecha de fin explícita).
 * - Sin columnas fijas: escala a N >= 1, sin solapamiento ni overflow horizontal.
 * - Micro-interacciones CSS (respetan `prefers-reduced-motion`).
 */

import {
  BriefcaseIcon,
  CalendarIcon,
  CheckCircleIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import { Experience } from '@/types/profile';
import { formatDate, calculateDuration } from '@/lib/utils';

interface ExperienceTimelineProps {
  t: (key: string) => string;
  experiences: Experience[];
  locale: string;
}

/**
 * Ordena los roles del más reciente al más antiguo por fecha de inicio
 * (formato YYYY-MM, orden lexicográfico válido). Empates: id para orden estable.
 */
export function sortExperiencesNewestFirst(experiences: Experience[]): Experience[] {
  return [...experiences].sort((a, b) => b.from.localeCompare(a.from) || a.id.localeCompare(b.id));
}

export default function ExperienceTimeline({
  t,
  experiences,
  locale,
}: Readonly<ExperienceTimelineProps>) {
  const sorted = sortExperiencesNewestFirst(experiences);

  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="relative py-24 md:py-36 bg-(--color-bg) overflow-hidden"
    >
      {/* Decoración de fondo */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-(--color-gradient-start)/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-(--color-gradient-mid)/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-(--color-accent) rounded-(--radius-card) mb-6 shadow-(--shadow-card)">
            <BriefcaseIcon className="h-8 w-8 text-(--color-ink)" aria-hidden="true" />
          </div>
          <h2 id="experience-title" className="text-3xl md:text-5xl font-semibold mb-4 text-(--color-ink)">
            {t('experience.title')}
          </h2>
          <p className="text-lg text-(--color-muted) max-w-2xl mx-auto">
            {t('experience.subtitle')}
          </p>
        </div>

        {/* Spine vertical: línea + dots, tarjetas a la derecha */}
        <div className="relative">
          <div
            aria-hidden
            className="absolute bottom-4 left-4 top-4 w-px bg-linear-to-b from-(--color-accent)/70 via-(--color-border) to-transparent md:left-7"
          />
          <ol className="space-y-10">
            {sorted.map((exp) => (
              <ExperienceCard key={exp.id} exp={exp} locale={locale} t={t} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

interface ExperienceCardProps {
  exp: Experience;
  locale: string;
  t: (key: string) => string;
}

function ExperienceCard({ exp, locale, t }: ExperienceCardProps) {
  return (
    <li className="relative">
      {/* Indicador sobre la línea */}
      <span aria-hidden className="absolute left-4 md:left-7 top-9 -translate-x-1/2 z-10">
        <span className="block w-3.5 h-3.5 rounded-full bg-(--color-accent) ring-4 ring-(--color-accent)/25" />
      </span>

      <article className="group relative ml-10 md:ml-14 rounded-(--radius-card) border border-(--color-border) bg-(--color-surface-2) p-6 lg:p-8 shadow-(--shadow-card) transition-all duration-(--duration-base) ease-(--ease-out-soft) hover:-translate-y-1 hover:border-(--color-border-strong) hover:shadow-(--shadow-card-raised)">
        {/* Efecto decorativo en hover */}
        <div
          aria-hidden
          className="absolute inset-0 rounded-(--radius-card) bg-linear-to-br from-(--color-gradient-start)/10 via-(--color-gradient-mid)/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-(--duration-base) pointer-events-none"
        />

        <div className="relative">
          <header className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2 mb-4">
            <div>
              <h3 className="text-xl lg:text-2xl font-semibold text-(--color-ink) group-hover:text-(--color-accent-2) transition-colors duration-(--duration-base)">
                {exp.title}
              </h3>
              <p className="text-(--color-accent-2) font-medium">{exp.company}</p>
              {exp.location && (
                <p className="text-sm text-(--color-text-tertiary)">{exp.location}</p>
              )}
            </div>
            {exp.current && (
              <span className="inline-flex items-center gap-1.5 rounded-(--radius-pill) border border-(--color-accent)/25 bg-(--color-accent)/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-(--color-accent-hover)">
                <SparklesIcon className="h-3.5 w-3.5" aria-hidden="true" />
                {t('experience.current')}
              </span>
            )}
          </header>

          {/* Periodo y duración */}
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-(--color-muted) mb-4 pb-4 border-b border-(--color-border)">
            <CalendarIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
            <time dateTime={exp.from}>{formatDate(exp.from, locale)}</time>
            <span aria-hidden>–</span>
            <time dateTime={exp.to}>{formatDate(exp.to, locale)}</time>
            <span className="text-(--color-border-strong)" aria-hidden>
              •
            </span>
            <span>{calculateDuration(exp.from, exp.to, locale)}</span>
          </p>

          {/* Descripción */}
          <p className="text-(--color-muted) text-sm leading-relaxed mb-5 group-hover:text-(--color-ink) transition-colors duration-(--duration-base)">
            {exp.description}
          </p>

          {/* Logros — sin bloque cuando la lista está vacía */}
          {exp.achievements.length > 0 && (
            <div className="space-y-2 mb-5">
              <p className="flex items-center gap-2 text-sm font-medium text-(--color-ink)">
                <SparklesIcon className="h-4 w-4 text-(--color-accent-2)" aria-hidden="true" />
                {t('experience.achievements')}
              </p>
              <ul className="space-y-2">
                {exp.achievements.map((achievement, i) => (
                  <li
                    key={`${exp.id}-achievement-${i}`}
                    className="flex items-start gap-2 text-sm text-(--color-muted)"
                  >
                    <CheckCircleIcon className="h-4 w-4 text-(--color-accent) shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="leading-relaxed">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tecnologías — sin bloque cuando la lista está vacía */}
          {exp.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-4 border-t border-(--color-border)">
              {exp.technologies.map((tech) => (
                <span
                  key={`${exp.id}-tech-${tech}`}
                  className="px-3 py-1.5 bg-(--color-surface-3) text-(--color-text-secondary) text-xs uppercase tracking-[0.15em] rounded-(--radius-pill) border border-(--color-border) backdrop-blur-sm transition-all duration-(--duration-base) group-hover:border-(--color-border-strong)"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>
    </li>
  );
}