# 🚀 Guía de Despliegue

Esta guía te ayudará a desplegar tu portafolio profesional en producción.

## 📋 Pre-requisitos

- [ ] Cuenta en [Vercel](https://vercel.com) (recomendado) o servicio de hosting alternativo
- [ ] Repositorio Git (GitHub, GitLab, Bitbucket)
- [ ] Variables de entorno configuradas (si usas funcionalidades de email)

## 🎯 Opción 1: Despliegue en Vercel (Recomendado)

Vercel es la opción más sencilla y optimizada para Next.js.

### Pasos:

1. **Push tu código a GitHub**

```bash
git remote add origin https://github.com/tu-usuario/portafolio_profesional.git
git branch -M main
git push -u origin main
```

2. **Conectar con Vercel**

- Ve a [vercel.com](https://vercel.com)
- Click en "Add New Project"
- Importa tu repositorio de GitHub
- Vercel detectará automáticamente que es un proyecto Next.js

3. **Configurar Variables de Entorno**

En el dashboard de Vercel, ve a Settings > Environment Variables y añade:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu-email@gmail.com
SMTP_PASS=tu-contraseña-de-aplicacion
CONTACT_EMAIL=tu-email-receptor@example.com
NEXT_PUBLIC_SITE_URL=https://tu-dominio.vercel.app
```

4. **Deploy**

- Click en "Deploy"
- Vercel construirá y desplegará automáticamente
- Recibirás una URL de producción

### Configuración de Dominio Personalizado

1. En Vercel Dashboard > Settings > Domains
2. Añade tu dominio personalizado
3. Configura los DNS según las instrucciones de Vercel

## 🐳 Opción 2: Docker

Si prefieres usar Docker:

1. **Crear Dockerfile**

```dockerfile
FROM node:18-alpine AS base

# Dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Runner
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000
CMD ["node", "server.js"]
```

2. **Construir imagen**

```bash
docker build -t portafolio-profesional .
```

3. **Ejecutar contenedor**

```bash
docker run -p 3000:3000 portafolio-profesional
```

## ☁️ Opción 3: Otros Servicios Cloud

### Netlify

```bash
npm run build
```

Configura en Netlify:

- Build command: `npm run build`
- Publish directory: `.next`

### Railway

1. Conecta tu repo en [railway.app](https://railway.app)
2. Railway detectará Next.js automáticamente
3. Añade variables de entorno
4. Deploy

### AWS Amplify

```bash
npm install -g @aws-amplify/cli
amplify init
amplify add hosting
amplify publish
```

## 🔧 Configuración Post-Despliegue

### 1. Verificar Performance

Ejecuta Lighthouse en tu sitio desplegado:

```bash
npm install -g lighthouse
lighthouse https://tu-sitio.com --view
```

Objetivo: Score > 90 en todas las métricas

### 2. Configurar Analytics (Opcional)

```bash
npm install @vercel/analytics
```

```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### 3. Setup SEO

Verifica:

- [ ] Sitemap.xml generado
- [ ] robots.txt configurado
- [ ] Meta tags correctos
- [ ] Open Graph tags
- [ ] Schema.org markup

### 4. Monitoreo

Configura alertas para:

- Errores de servidor (500)
- Caída del servicio
- Tiempo de respuesta lento

## 🔄 CI/CD con GitHub Actions

Crea `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Lint
        run: npm run lint

      - name: Build
        run: npm run build

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## ✅ Checklist de Despliegue

Antes de lanzar en producción:

- [ ] Build exitoso localmente (`npm run build`)
- [ ] Tests pasando (`npm test`)
- [ ] Lint sin errores (`npm run lint`)
- [ ] Variables de entorno configuradas
- [ ] Datos del perfil actualizados (`data/profile.json`)
- [ ] Imágenes de proyectos añadidas
- [ ] Links de redes sociales verificados
- [ ] Email de contacto funcional
- [ ] Dominio personalizado configurado (si aplica)
- [ ] SSL/HTTPS habilitado
- [ ] Performance > 90 en Lighthouse
- [ ] Accesibilidad verificada
- [ ] Responsive en móvil/tablet/desktop
- [ ] SEO optimizado
- [ ] Analytics configurado (opcional)

## 🐛 Troubleshooting

### Error: Module not found

```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Error de Build en Vercel

Verifica que:

- Node version coincida (18.x)
- Todas las dependencias estén en `dependencies` (no `devDependencies`)
- Variables de entorno estén configuradas

### Imágenes no se cargan

Verifica:

- Rutas sean relativas a `public/`
- Usa `next/image` para optimización
- Configura `domains` en `next.config.js` si usas imágenes externas

## 📊 Monitoreo de Performance

### Métricas Clave

- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1
- **TTFB** (Time to First Byte): < 600ms

### Herramientas

- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)
- [WebPageTest](https://www.webpagetest.org/)
- Vercel Analytics (built-in)

## 🔐 Seguridad

Recomendaciones:

1. **Headers de Seguridad**

```typescript
// next.config.js
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
];

module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};
```

2. **Rate Limiting** para API routes
3. **CORS** configurado correctamente
4. **Input Validation** con Zod

## 📞 Soporte

Si encuentras problemas:

1. Revisa la documentación de Next.js
2. Consulta los logs en Vercel Dashboard
3. Busca en [Stack Overflow](https://stackoverflow.com/questions/tagged/next.js)
4. Abre un issue en el repositorio

---

**¡Feliz despliegue! 🚀**
