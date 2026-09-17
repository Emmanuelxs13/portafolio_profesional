/**
 * Unit tests for project image resolution.
 *
 * The resolver maps a project's `image` field to a path only when the asset
 * is registered as existing (KNOWN_PROJECT_IMAGES), so cards never render
 * next/image pointing at a missing file.
 */

import { resolveProjectImage } from '@/lib/profile/projectImages';

describe('resolveProjectImage', () => {
  it('returns the image path when the asset is registered as existing', () => {
    expect(resolveProjectImage('/projects/imagiq.webp', ['/projects/imagiq.webp'])).toBe(
      '/projects/imagiq.webp'
    );
  });

  it('returns null when the asset is not registered as existing', () => {
    expect(resolveProjectImage('/projects/imagiq.webp')).toBeNull();
  });

  it('returns null when the project declares no image', () => {
    expect(resolveProjectImage()).toBeNull();
    expect(resolveProjectImage('')).toBeNull();
  });
});