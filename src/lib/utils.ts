/**
 * Librería de utilidades generales
 * Contiene funciones auxiliares reutilizables en toda la aplicación
 */

/**
 * Combina clases de CSS de manera condicional
 * Útil para aplicar clases dinámicas en componentes
 * 
 * @param classes - Lista de clases CSS o condiciones
 * @returns String con las clases combinadas
 * 
 * @example
 * cn('bg-blue-500', isActive && 'text-white', 'hover:bg-blue-600')
 * // Si isActive es true: 'bg-blue-500 text-white hover:bg-blue-600'
 * // Si isActive es false: 'bg-blue-500 hover:bg-blue-600'
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Formatea una fecha en formato localizado
 * 
 * @param date - String de fecha en formato YYYY-MM o "present"
 * @param locale - Código de idioma (es, en)
 * @returns Fecha formateada o "Actualidad"/"Present"
 * 
 * @example
 * formatDate('2023-06', 'es') // 'Jun 2023'
 * formatDate('present', 'es') // 'Actualidad'
 */
export function formatDate(date: string, locale: string = 'es'): string {
  if (date === 'present') {
    return locale === 'es' ? 'Actualidad' : 'Present';
  }

  const [year, month] = date.split('-');
  const dateObj = new Date(parseInt(year), parseInt(month) - 1);

  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
  }).format(dateObj);
}

/**
 * Calcula el tiempo transcurrido entre dos fechas
 * 
 * @param from - Fecha inicial en formato YYYY-MM
 * @param to - Fecha final en formato YYYY-MM o "present"
 * @param locale - Código de idioma (es, en)
 * @returns String con el tiempo transcurrido (ej: "2 años 3 meses")
 */
export function calculateDuration(from: string, to: string, locale: string = 'es'): string {
  const [yearFrom, monthFrom] = from.split('-').map(Number);
  
  let yearTo, monthTo;
  if (to === 'present') {
    const now = new Date();
    yearTo = now.getFullYear();
    monthTo = now.getMonth() + 1;
  } else {
    [yearTo, monthTo] = to.split('-').map(Number);
  }

  const totalMonths = (yearTo - yearFrom) * 12 + (monthTo - monthFrom);
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  const yearText = locale === 'es' ? 'año' : 'year';
  const yearsText = locale === 'es' ? 'años' : 'years';
  const monthText = locale === 'es' ? 'mes' : 'month';
  const monthsText = locale === 'es' ? 'meses' : 'months';

  if (years > 0 && months > 0) {
    return `${years} ${years === 1 ? yearText : yearsText} ${months} ${months === 1 ? monthText : monthsText}`;
  } else if (years > 0) {
    return `${years} ${years === 1 ? yearText : yearsText}`;
  } else {
    return `${months} ${months === 1 ? monthText : monthsText}`;
  }
}

/**
 * Trunca un texto a un número específico de palabras
 * 
 * @param text - Texto a truncar
 * @param words - Número máximo de palabras
 * @returns Texto truncado con "..." si fue recortado
 */
export function truncateText(text: string, words: number = 20): string {
  const wordArray = text.split(' ');
  if (wordArray.length <= words) return text;
  return wordArray.slice(0, words).join(' ') + '...';
}

/**
 * Sanitiza un string para usarlo como ID HTML válido
 * 
 * @param text - Texto a convertir
 * @returns String válido para usar como ID
 * 
 * @example
 * slugify('Hello World!') // 'hello-world'
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Eliminar acentos
    .replace(/[^a-z0-9]+/g, '-') // Reemplazar no-alfanuméricos con -
    .replace(/^-+|-+$/g, ''); // Eliminar - al inicio y final
}

/**
 * Delay asíncrono para testing o UX
 * 
 * @param ms - Milisegundos de espera
 * @returns Promise que se resuelve después del delay
 * 
 * @example
 * await delay(1000); // Espera 1 segundo
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Valida si un email tiene formato válido
 * 
 * @param email - Email a validar
 * @returns true si el email es válido
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Obtiene las iniciales de un nombre
 * 
 * @param name - Nombre completo
 * @returns Iniciales (máximo 2 letras)
 * 
 * @example
 * getInitials('Emmanuel Berrio Jiménez') // 'EB'
 */
export function getInitials(name: string): string {
  const words = name.trim().split(' ');
  if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}
