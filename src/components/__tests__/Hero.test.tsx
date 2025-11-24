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

const mockT = (key: string) => key;

describe('Hero Component', () => {
  const mockProps = {
    t: mockT,
    name: 'Emmanuel Berrio Jiménez',
    title: 'Desarrollador Full-Stack',
    summary: 'Test summary',
  };

  it('renders hero component with name', () => {
    render(<Hero {...mockProps} />);
    expect(screen.getByText('Emmanuel Berrio Jiménez')).toBeInTheDocument();
  });

  it('renders title correctly', () => {
    render(<Hero {...mockProps} />);
    expect(screen.getByText('Desarrollador Full-Stack')).toBeInTheDocument();
  });

  it('renders summary', () => {
    render(<Hero {...mockProps} />);
    expect(screen.getByText('Test summary')).toBeInTheDocument();
  });

  it('renders CTA buttons', () => {
    render(<Hero {...mockProps} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });
});
