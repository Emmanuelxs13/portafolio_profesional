# Portfolio Profesional - Emmanuel Berrio Jiménez

Sitio web de portafolio profesional desarrollado con Next.js, TypeScript y Tailwind CSS.

## Características principales

- Diseño moderno y responsive
- Multilenguaje (Español/Inglés)
- Optimización para rendimiento y SEO
- Animaciones fluidas con Framer Motion
- Botón flotante de WhatsApp
- Múltiples canales de contacto (Email, Teléfono, LinkedIn, GitHub)

## Stack Tecnológico

- **Next.js 16** – Framework React
- **TypeScript 5** – Tipado estático
- **Tailwind CSS 4** – Estilos utility-first
- **Framer Motion 12** – Animaciones
- **React Hook Form + Zod** – Validación de formularios

## Inicio rápido

```bash
# Clonar repositorio
git clone https://github.com/Emmanuelxs13/portafolio_profesional.git
cd portafolio_profesional

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

Accede a [http://localhost:3000](http://localhost:3000) en tu navegador.

## Scripts disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Compilar para producción
npm run start    # Servidor de producción
npm run lint     # Ejecutar linter
npm run test     # Ejecutar tests
```

## Estructura del proyecto

```
src/
├── app/              # App Router (páginas y rutas)
├── components/       # Componentes React
├── data/             # Datos del portfolio (profile.json)
├── hooks/            # Custom hooks (i18n)
├── lib/              # Utilidades
└── types/            # Tipos TypeScript
```

## Personalización

Edita el archivo `src/data/profile.json` con tu información personal:

```json
{
  "name": "Tu Nombre",
  "title": "Tu Título",
  "email": "tu@email.com",
  "phone": "+57 XXX XXX XXXX",
  "experience": [...],
  "projects": [...],
  "skills": {...}
}
```

## Despliegue

### Vercel (Recomendado)

1. Sube tu repositorio a GitHub
2. Importa el proyecto en [Vercel](https://vercel.com)
3. El despliegue será automático

También compatible con: Netlify, AWS Amplify, Cloudflare Pages

## Contacto

El portafolio incluye varias formas de contacto:

- Email directo
- Llamada telefónica
- WhatsApp (botón flotante con mensaje predeterminado)
- LinkedIn
- GitHub

## Autor

**Emmanuel Berrio Jiménez**

- LinkedIn: [Emmanuel Berrio Jiménez](https://www.linkedin.com/in/emmanuel-berrio-jimenez/)
- GitHub: [@Emmanuelxs13](https://github.com/Emmanuelxs13)
- Email: emmanuelberriojimenez13@gmail.com
- WhatsApp: +57 301 524 9169

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.

---
