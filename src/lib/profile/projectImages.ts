/**
 * Project image asset registry.
 *
 * A project card only renders next/image when the asset is registered here as
 * existing. Any other `image` value (missing, empty, or a not-yet-shipped
 * asset) resolves to null and the card renders the designed fallback instead —
 * so we never point next/image at a file that does not exist, which would log
 * a missing-asset error in the console.
 *
 * Screenshots are additive: when a new asset ships to public/projects, add its
 * path here (prefer webp/avif per the image strategy).
 */

export const KNOWN_PROJECT_IMAGES: string[] = [];

/**
 * Resolves a project image to a renderable path, or null when the asset is
 * missing/unregistered (fallback is rendered instead).
 *
 * @param image - the project `image` field value
 * @param known - registered existing asset paths (defaults to the registry)
 */
export function resolveProjectImage(
  image?: string,
  known: string[] = KNOWN_PROJECT_IMAGES
): string | null {
  if (!image) return null;
  return known.includes(image) ? image : null;
}