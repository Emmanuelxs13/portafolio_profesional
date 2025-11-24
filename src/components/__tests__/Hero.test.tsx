/**
 * Tests para el componente Hero
 */

import { render, screen } from '@testing-library/react';
import Hero from '@/components/Hero';
import '@testing-library/jest-dom';

// Mock de Framer Motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
}));

const mockT = (key: string) => {
  const translations: Record<string, string> = {
    'hero.greeting': 'Hola, soy',
    'hero.subtitle': 'Transformando ideas en experiencias digitales excepcionales',
    'hero.cta': 'Ver proyectos',
    'hero.ctaSecondary': 'Contáctame',
  };
  return translations[key] || key;
};

describe('Hero Component', () => {
  const mockProps = {
    t: mockT,
    name: 'Emmanuel Berrio Jiménez',
    title: 'Desarrollador de Software FullStack',
  };

  it('renders hero component with name', () => {
    render(<Hero {...mockProps} />);
    expect(screen.getByText('Emmanuel Berrio Jiménez')).toBeInTheDocument();
  });

  it('renders title correctly', () => {
    render(<Hero {...mockProps} />);
    expect(screen.getByText('Desarrollador de Software FullStack')).toBeInTheDocument();
  });

  it('renders subtitle with translation', () => {
    render(<Hero {...mockProps} />);
    expect(
      screen.getByText('Transformando ideas en experiencias digitales excepcionales')
    ).toBeInTheDocument();
  });

  it('renders both CTA buttons', () => {
    render(<Hero {...mockProps} />);
    expect(screen.getByText('Ver proyectos')).toBeInTheDocument();
    expect(screen.getByText('Contáctame')).toBeInTheDocument();
  });
});
