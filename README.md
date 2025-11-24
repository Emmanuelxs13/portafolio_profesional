# 🚀 Portfolio Profesional - Emmanuel Berrio Jiménez

Portfolio web profesional desarrollado con las últimas tecnologías y mejores prácticas de desarrollo frontend.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

## ✨ Características

- 🎨 **Diseño Moderno y Responsive**: Interfaz adaptable a todos los dispositivos
- 🌐 **Multilenguaje (i18n)**: Soporte para Español e Inglés
- ⚡ **Rendimiento Optimizado**: Carga rápida y SEO optimizado
- 🎭 **Animaciones Fluidas**: Transiciones suaves con Framer Motion
- 📱 **PWA Ready**: Instalable como aplicación nativa
- ♿ **Accesible**: Cumple con estándares WCAG AA
- 🧪 **Testing Completo**: Tests unitarios con Jest y React Testing Library
- 📧 **Formulario de Contacto**: Con validación y manejo de errores
- 📄 **Generación de CV**: Descarga de currículum en PDF

## 🛠️ Tecnologías

### Core
- **[Next.js 16](https://nextjs.org/)** - Framework React con App Router
- **[TypeScript 5](https://www.typescriptlang.org/)** - Tipado estático
- **[React 19](https://react.dev/)** - Biblioteca UI

### Estilos y UI
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Framework CSS utility-first
- **[Framer Motion 12](https://www.framer.com/motion/)** - Animaciones fluidas
- **[Headless UI](https://headlessui.dev/)** - Componentes accesibles
- **[Heroicons](https://heroicons.com/)** - Iconos SVG

### Formularios y Validación
- **[React Hook Form](https://react-hook-form.com/)** - Gestión de formularios
- **[Zod](https://zod.dev/)** - Validación de esquemas

### Testing
- **[Jest](https://jestjs.io/)** - Framework de testing
- **[React Testing Library](https://testing-library.com/)** - Testing de componentes

### Desarrollo
- **[ESLint](https://eslint.org/)** - Linting de código
- **[Prettier](https://prettier.io/)** - Formateo de código

## 📋 Requisitos Previos

- **Node.js**: >= 18.17.0
- **npm**: >= 9.0.0

## 🚀 Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/portafolio-profesional.git
cd portafolio-profesional
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
# Copiar el archivo de ejemplo
cp .env.example .env.local

# Editar .env.local con tus credenciales
# SMTP para el formulario de contacto (opcional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu-email@gmail.com
SMTP_PASS=tu-app-password
EMAIL_TO=destino@ejemplo.com
```

4. **Iniciar el servidor de desarrollo**
```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📜 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia el servidor de desarrollo
npm run build        # Compila la aplicación para producción
npm run start        # Inicia el servidor de producción
npm run lint         # Ejecuta ESLint
npm run format       # Formatea el código con Prettier
npm run test         # Ejecuta los tests en modo watch
npm run test:ci      # Ejecuta los tests una vez (para CI/CD)
```

## 📁 Estructura del Proyecto

```
portafolio_profesional/
├── public/                 # Archivos estáticos
│   └── images/            # Imágenes del portfolio
├── src/
│   ├── app/               # App Router de Next.js
│   │   ├── api/          # API Routes
│   │   │   ├── contact/  # Endpoint de contacto
│   │   │   └── cv/       # Generación de CV
│   │   ├── layout.tsx    # Layout principal
│   │   ├── page.tsx      # Página home
│   │   └── privacy/      # Página de privacidad
│   ├── components/        # Componentes React
│   │   ├── __tests__/    # Tests de componentes
│   │   ├── About.tsx     # Sección sobre mí
│   │   ├── CertificateList.tsx
│   │   ├── ContactForm.tsx
│   │   ├── ExperienceTimeline.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx      # Sección hero
│   │   ├── Nav.tsx       # Navegación
│   │   └── ProjectsGrid.tsx
│   ├── data/             # Datos del portfolio
│   │   └── profile.json  # Información personal
│   ├── hooks/            # Custom hooks
│   │   └── useI18n.tsx   # Hook de i18n
│   ├── lib/              # Utilidades
│   │   ├── __tests__/    # Tests de utilidades
│   │   ├── api.ts        # Funciones de API
│   │   └── utils.ts      # Funciones helper
│   └── types/            # Definiciones TypeScript
│       └── profile.ts    # Tipos del portfolio
├── .env.example          # Variables de entorno
├── .eslintrc.json        # Configuración ESLint
├── .prettierrc           # Configuración Prettier
├── jest.config.js        # Configuración Jest
├── next.config.js        # Configuración Next.js
├── package.json          # Dependencias
├── postcss.config.js     # Configuración PostCSS
├── tailwind.config.ts    # Configuración Tailwind
└── tsconfig.json         # Configuración TypeScript
```

## 🎨 Personalización

### 1. Datos del Portfolio

Edita `src/data/profile.json` para personalizar tu información:

```json
{
  "name": "Tu Nombre",
  "title": "Tu Título Profesional",
  "email": "tu@email.com",
  "experience": [...],
  "projects": [...],
  "certificates": [...],
  "skills": {...}
}
```

### 2. Estilos

Los colores y temas se configuran en `tailwind.config.ts`:

```typescript
export default {
  theme: {
    extend: {
      colors: {
        primary: {...},
        secondary: {...}
      }
    }
  }
}
```

### 3. Traducciones

Edita las traducciones en `src/hooks/useI18n.tsx`:

```typescript
const translations = {
  es: { ... },
  en: { ... }
}
```

## 🧪 Testing

El proyecto incluye tests unitarios para componentes y utilidades:

```bash
# Ejecutar tests en modo watch
npm run test

# Ejecutar tests una vez con coverage
npm run test:ci -- --coverage

# Ejecutar tests específicos
npm run test -- Hero
```

Ejemplo de test:

```typescript
describe('Hero Component', () => {
  it('renders hero component with name', () => {
    render(<Hero {...mockProps} />);
    expect(screen.getByText('Emmanuel Berrio Jiménez')).toBeInTheDocument();
  });
});
```

## 📧 Configuración del Formulario de Contacto

El formulario de contacto utiliza Nodemailer para enviar emails. Configura las variables de entorno:

1. **Gmail** (recomendado para desarrollo):
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu-email@gmail.com
SMTP_PASS=tu-app-password  # Contraseña de aplicación de Gmail
EMAIL_TO=destino@ejemplo.com
```

2. Genera una contraseña de aplicación en [Google Account Security](https://myaccount.google.com/security)

3. El código ya está preparado en `src/app/api/contact/route.ts`

## 🚀 Despliegue

### Vercel (Recomendado)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/tu-usuario/portafolio-profesional)

1. Push a GitHub/GitLab/Bitbucket
2. Importa el proyecto en [Vercel](https://vercel.com)
3. Configura las variables de entorno
4. Deploy automático

### Otras Plataformas

Ver guía completa en [DEPLOYMENT.md](DEPLOYMENT.md)

- Netlify
- AWS Amplify
- Azure Static Web Apps
- Cloudflare Pages

## 📚 Documentación Adicional

- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Guía completa de despliegue
- **[TECHNICAL.md](TECHNICAL.md)** - Documentación técnica detallada

## 🔒 Privacidad y Seguridad

- Todas las credenciales sensibles se gestionan mediante variables de entorno
- El formulario de contacto incluye validación y sanitización
- Las dependencias se auditan regularmente con `npm audit`
- Cumple con GDPR y políticas de privacidad

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'feat: add amazing feature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

**Convenciones de commits**: Seguimos [Conventional Commits](https://www.conventionalcommits.org/)

```
feat: nueva característica
fix: corrección de bug
docs: cambios en documentación
style: formato, no afecta código
refactor: refactorización de código
test: añadir o actualizar tests
chore: tareas de mantenimiento
```

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver [LICENSE](LICENSE) para más detalles.

## 👤 Autor

**Emmanuel Berrio Jiménez**
- LinkedIn: [Emmanuel Berrio](https://linkedin.com/in/emmanuel-berrio)
- GitHub: [@emmanuelberrio](https://github.com/emmanuelberrio)
- Email: contact@emmanuelberrio.com

## 🙏 Agradecimientos

- [Next.js](https://nextjs.org/) por el increíble framework
- [Vercel](https://vercel.com/) por el hosting
- [Tailwind CSS](https://tailwindcss.com/) por el sistema de diseño
- La comunidad open source por las increíbles herramientas

## 📊 Estado del Proyecto

- ✅ Diseño y UI completado
- ✅ Funcionalidad core implementada
- ✅ Tests unitarios
- ✅ Documentación
- 🔄 SEO optimización (en progreso)
- 🔄 PWA implementación (en progreso)
- 📋 Blog integración (planeado)

---

⭐ Si te gusta este proyecto, ¡dale una estrella!

**Hecho con ❤️ y TypeScript**
