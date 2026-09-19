/**
 * ProjectFallbackImage
 *
 * Premium typographic placeholder rendered in place of a project screenshot:
 * gradient surface, monogram built from the project title, and a subtle ring
 * pattern. Decorative only (aria-hidden) — the card heading carries the name.
 * No JS-driven motion: reduced-motion is honored by the global
 * prefers-reduced-motion clamp on CSS transitions.
 */

'use client';

import { getInitials } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface ProjectFallbackImageProps {
  title: string;
  className?: string;
}

export default function ProjectFallbackImage({ title, className }: Readonly<ProjectFallbackImageProps>) {
  return (
    <div aria-hidden="true" className={cn('relative flex items-center justify-center overflow-hidden', className)}>
      {/* Gradient surface (semantic tokens only) */}
      <div className="absolute inset-0 bg-linear-to-br from-(--color-accent-2)/25 via-(--color-panel-2) to-(--color-accent)/20" />
      {/* Subtle ring pattern */}
      <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full border border-(--color-line)" />
      <div className="absolute -bottom-14 -left-14 h-52 w-52 rounded-full border border-(--color-line)" />
      <div className="absolute inset-0 bg-grid-white/[0.02]" />
      {/* Monogram */}
      <span className="relative text-5xl font-semibold tracking-[0.2em] text-(--color-ink)/70">
        {getInitials(title)}
      </span>
    </div>
  );
}