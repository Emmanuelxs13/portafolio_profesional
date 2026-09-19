/**
 * Tests para el componente Hero
 */

import { fireEvent, render, screen } from '@testing-library/react';
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
    'hero.info': 'Programador FullStack · Medellín, Colombia',
    'hero.location': 'Ubicación',
    'hero.impact': 'Interfaces elaboradas, sistemas resilientes, impacto medible.',
  };
  return translations[key] || key;
};

const enT = (key: string) => {
  const translations: Record<string, string> = {
    'hero.greeting': "Hi, I'm",
    'hero.subtitle': 'Transforming ideas into exceptional digital experiences',
    'hero.cta': 'View projects',
    'hero.ctaSecondary': 'Contact me',
    'hero.info': 'FullStack Developer · Medellín, Colombia',
    'hero.location': 'Location',
    'hero.impact': 'Crafted interfaces, resilient systems, measurable impact.',
  };
  return translations[key] || key;
};

const mockProps = {
  t: mockT,
  name: 'Emmanuel Berrio Jiménez',
  title: 'Desarrollador de Software FullStack',
  location: 'Medellín, Colombia',
};

describe('Hero Component', () => {

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

describe('Hero CTA wiring', () => {
  it('primary CTA scrolls the page to the #projects anchor', () => {
    const scrollIntoView = jest.fn();
    Element.prototype.scrollIntoView = scrollIntoView;
    render(
      <>
        <Hero {...mockProps} />
        <section id="projects" />
      </>
    );
    fireEvent.click(screen.getByText('Ver proyectos'));
    expect(scrollIntoView).toHaveBeenCalledTimes(1);
  });

  it('secondary CTA scrolls the page to the #contact anchor', () => {
    const scrollIntoView = jest.fn();
    Element.prototype.scrollIntoView = scrollIntoView;
    render(
      <>
        <Hero {...mockProps} />
        <section id="contact" />
      </>
    );
    fireEvent.click(screen.getByText('Contáctame'));
    expect(scrollIntoView).toHaveBeenCalledTimes(1);
  });
});

describe('Hero localized strings', () => {
  it('renders the localized info label and location strings in Spanish', () => {
    render(<Hero {...mockProps} />);
    expect(
      screen.getByText('Programador FullStack · Medellín, Colombia')
    ).toBeInTheDocument();
    expect(screen.getByText('Ubicación')).toBeInTheDocument();
    expect(
      screen.getByText('Interfaces elaboradas, sistemas resilientes, impacto medible.')
    ).toBeInTheDocument();
  });

  it('renders English localized strings', () => {
    render(<Hero {...mockProps} t={enT} />);
    expect(screen.getByText('View projects')).toBeInTheDocument();
    expect(screen.getByText('FullStack Developer · Medellín, Colombia')).toBeInTheDocument();
    expect(screen.getByText('Location')).toBeInTheDocument();
    expect(screen.getByText('Crafted interfaces, resilient systems, measurable impact.')).toBeInTheDocument();
  });
});
