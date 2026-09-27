/**
 * Behavioral tests for the Education timeline: entries render their
 * description followed by an "Áreas de formación" bullet list, the EN locale
 * swaps heading copy, and an entry without highlights renders no block at all.
 */

import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import type { ReactNode } from 'react';
import EducationTimeline from '@/components/EducationTimeline';
import type { Education } from '@/types/profile';

jest.mock('framer-motion', () => {
  const VNode = ({ children }: { children?: ReactNode }) => <>{children}</>;
  const Div = ({
    children,
    className,
    id,
  }: {
    children?: ReactNode;
    className?: string;
    id?: string;
  }) => (
    <div id={id} className={className}>
      {children}
    </div>
  );
  return {
    motion: { div: Div, span: VNode, a: VNode, button: VNode },
    AnimatePresence: ({ children }: { children?: ReactNode }) => <>{children}</>,
  };
});

const makeEducation = (overrides: Partial<Education>): Education => ({
  id: 'edu-x',
  institution: 'Institution',
  degree: 'Degree',
  field: 'Field',
  from: '2024-01',
  to: 'present',
  description: 'Education description',
  ...overrides,
});

const esMonths: Record<string, string> = {
  'months.january': 'Enero',
  'months.february': 'Febrero',
  'months.march': 'Marzo',
  'months.april': 'Abril',
  'months.may': 'Mayo',
  'months.june': 'Junio',
  'months.july': 'Julio',
  'months.august': 'Agosto',
  'months.september': 'Septiembre',
  'months.october': 'Octubre',
  'months.november': 'Noviembre',
  'months.december': 'Diciembre',
};

const enT = (key: string) =>
  ({
    'months.january': 'January',
    'months.february': 'February',
    'months.march': 'March',
    'months.april': 'April',
    'months.may': 'May',
    'months.june': 'June',
    'months.july': 'July',
    'months.august': 'August',
    'months.september': 'September',
    'months.october': 'October',
    'months.november': 'November',
    'months.december': 'December',
    'education.title': 'Education',
    'education.subtitle': 'My educational background and certifications',
    'education.present': 'Present',
    'education.highlights': 'Areas of Study',
  }[key] ?? key);

const esT = (key: string) =>
  ({
    ...esMonths,
    'education.title': 'Formación Académica',
    'education.subtitle': 'Mi recorrido educativo y certificaciones',
    'education.present': 'Actualidad',
    'education.highlights': 'Áreas de formación',
  }[key] ?? key);

const fourEntries: Education[] = [
  makeEducation({
    id: 'edu-1',
    institution: 'I.U Pascual Bravo',
    degree: 'Ingeniería en Desarrollo de Software',
    field: 'Ingeniería de Software',
    description: 'Plan de estudios completo en Ingeniería de Desarrollo de Software.',
    highlights: [
      'Fundamentos de programación y lógica: algoritmia, estructuras de control, funciones',
      'Programación Orientada a Objetos: clases, herencia, abstracción y encapsulamiento',
    ],
  }),
  makeEducation({
    id: 'edu-2',
    institution: 'Institución Universitaria Salazar y Herrera - IUSH',
    degree: 'Técnico en Programación de Software',
    field: 'Programación de Software',
    from: '2022-02',
    to: '2023-05',
    description: 'Formación técnica en programación de software con énfasis en desarrollo web.',
    highlights: ['Desarrollo web front-end: HTML, CSS y JavaScript'],
  }),
  makeEducation({
    id: 'edu-3',
    institution: 'SENA',
    degree: 'Técnico en Programación de Software',
    field: 'Programación de Software',
    from: '2022-02',
    to: '2023-05',
    description: 'Programa técnico del SENA en programación de software.',
    highlights: ['Algoritmia y programación estructurada: variables y funciones'],
  }),
  makeEducation({
    id: 'edu-4',
    institution: 'Universidad de Antioquia',
    degree: 'Certificado de Inglés B2',
    field: 'Idiomas',
    from: '2019-08',
    to: '2023-12',
    description: 'Formación en inglés hasta nivel B2 (intermedio-avanzado).',
    highlights: ['Lectura técnica en inglés: documentación, guías y estándares'],
  }),
];

/** EN fixture, mirroring what buildProfile('en') hands the component. */
const fourEntriesEn: Education[] = fourEntries.map((edu) =>
  edu.id === 'edu-1'
    ? {
        ...edu,
        degree: 'Software Development Engineering',
        description: 'Full Software Development Engineering curriculum.',
        highlights: [
          'Programming and logic fundamentals: algorithms and control structures',
          'Object-Oriented Programming: classes, inheritance and encapsulation',
        ],
      }
    : edu.id === 'edu-4'
      ? {
          ...edu,
          degree: 'English B2 Certificate',
          description: 'English training up to B2 (upper-intermediate).',
          highlights: ['Technical reading in English: documentation, guides and standards'],
        }
      : { ...edu }
);

/** The card that contains a given institution's card content. */
const entryBy = (institution: string): HTMLElement => {
  const heading = screen.getByText(institution);
  const card = heading.closest('div.grow') ?? heading.parentElement;
  expect(card).not.toBeNull();
  return card as HTMLElement;
};

describe('EducationTimeline', () => {
  it('renders every education entry in a single timeline', () => {
    const { container } = render(<EducationTimeline t={esT} education={fourEntries} />);
    expect(screen.getByText('I.U Pascual Bravo')).toBeInTheDocument();
    expect(
      screen.getByText('Institución Universitaria Salazar y Herrera - IUSH')
    ).toBeInTheDocument();
    expect(screen.getByText('SENA')).toBeInTheDocument();
    expect(screen.getByText('Universidad de Antioquia')).toBeInTheDocument();
    expect(container.querySelectorAll('ul > li')).toHaveLength(5);
  });

  it('renders the highlights bullets under each entry description', () => {
    render(<EducationTimeline t={esT} education={fourEntries} />);
    const pascual = entryBy('I.U Pascual Bravo');
    expect(within(pascual).getByText('Áreas de formación')).toBeInTheDocument();
    const bullets = within(pascual).getAllByRole('listitem');
    expect(bullets).toHaveLength(2);
    expect(bullets[0]).toHaveTextContent(
      'Fundamentos de programación y lógica: algoritmia, estructuras de control, funciones'
    );
    expect(bullets[1]).toHaveTextContent(
      'Programación Orientada a Objetos: clases, herencia, abstracción y encapsulamiento'
    );
    // Description still renders alongside the new list
    expect(pascual).toHaveTextContent('Plan de estudios completo en Ingeniería de Desarrollo de Software.');
  });

  it('renders the EN highlights heading and EN bullet copy', () => {
    render(<EducationTimeline t={enT} education={fourEntriesEn} />);
    const pascual = entryBy('I.U Pascual Bravo');
    expect(within(pascual).getByText('Areas of Study')).toBeInTheDocument();
    expect(
      within(pascual).getByText('Programming and logic fundamentals: algorithms and control structures')
    ).toBeInTheDocument();
    expect(pascual).toHaveTextContent('Software Development Engineering');
  });

  it('renders an entry without highlights as no block at all', () => {
    render(
      <EducationTimeline
        t={esT}
        education={[makeEducation({ id: 'edu-bare', institution: 'Sin highlights' })]}
      />
    );
    const bare = entryBy('Sin highlights');
    expect(bare).toHaveTextContent('Education description');
    expect(within(bare).queryByText('Áreas de formación')).not.toBeInTheDocument();
    expect(within(bare).queryByRole('list')).not.toBeInTheDocument();
  });

  it('renders an entry with an empty highlights array as no block at all', () => {
    render(
      <EducationTimeline
        t={esT}
        education={[makeEducation({ id: 'edu-empty', institution: 'Lista vacía', highlights: [] })]}
      />
    );
    const empty = entryBy('Lista vacía');
    expect(within(empty).queryByText('Áreas de formación')).not.toBeInTheDocument();
    expect(within(empty).queryByRole('list')).not.toBeInTheDocument();
  });

  it('renders the present date as Actualidad and formats a closed range', () => {
    render(<EducationTimeline t={esT} education={fourEntries} />);
    expect(screen.getByText('Enero 2024 - Actualidad')).toBeInTheDocument();
    // edu-2 and edu-3 share the same closed range
    expect(screen.getAllByText('Febrero 2022 - Mayo 2023')).toHaveLength(2);
    expect(screen.getByText('Agosto 2019 - Diciembre 2023')).toBeInTheDocument();
  });

  it('renders all entries without duplicate-key warnings', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(<EducationTimeline t={esT} education={fourEntries} />);
    const keyWarnings = errorSpy.mock.calls.filter(([message]) =>
      String(message).includes('unique key')
    );
    expect(keyWarnings).toHaveLength(0);
    errorSpy.mockRestore();
  });

  it('renders the section heading and subtitle from the dictionary', () => {
    render(<EducationTimeline t={esT} education={fourEntries} />);
    expect(screen.getByText('Formación Académica')).toBeInTheDocument();
    expect(screen.getByText('Mi recorrido educativo y certificaciones')).toBeInTheDocument();
  });
});
