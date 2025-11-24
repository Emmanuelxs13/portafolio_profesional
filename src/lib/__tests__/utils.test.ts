/**
 * Tests para funciones de utilidad
 */

import { formatDate, slugify, truncateText, isValidEmail } from '@/lib/utils';

describe('Utils Functions', () => {
  describe('formatDate', () => {
    it('formats date correctly in Spanish', () => {
      const result = formatDate('2023-06', 'es');
      expect(result).toContain('2023');
    });

    it('returns "Actualidad" for present in Spanish', () => {
      const result = formatDate('present', 'es');
      expect(result).toBe('Actualidad');
    });

    it('returns "Present" for present in English', () => {
      const result = formatDate('present', 'en');
      expect(result).toBe('Present');
    });
  });

  describe('slugify', () => {
    it('converts text to slug', () => {
      expect(slugify('Hello World')).toBe('hello-world');
    });

    it('handles special characters', () => {
      expect(slugify('Hello World!')).toBe('hello-world');
    });

    it('handles accents', () => {
      expect(slugify('Niño')).toBe('nino');
    });
  });

  describe('truncateText', () => {
    it('truncates long text', () => {
      const longText = 'This is a very long text that should be truncated';
      const result = truncateText(longText, 3);
      expect(result).toBe('This is a...');
    });

    it('does not truncate short text', () => {
      const shortText = 'Short';
      const result = truncateText(shortText, 10);
      expect(result).toBe('Short');
    });
  });

  describe('isValidEmail', () => {
    it('validates correct email', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
    });

    it('rejects invalid email', () => {
      expect(isValidEmail('invalid-email')).toBe(false);
    });

    it('rejects email without @', () => {
      expect(isValidEmail('testexample.com')).toBe(false);
    });
  });
});
