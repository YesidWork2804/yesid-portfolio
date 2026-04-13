# Portafolio (Angular + Tailwind)

Portafolio profesional construido con **Angular 18 (standalone)**, **TailwindCSS** e **i18n (ngx-translate)**.

Incluye:

- Proyectos (cards + modal con galería)
- Impacto real (métricas + evidencia + timeline)
- Experiencia
- Contacto (links directos)
- Modo oscuro y animaciones por viewport

## Stack

- Angular 18 (standalone)
- TailwindCSS
- ngx-translate

## Scripts

- `npm run start`
  - Dev server en `http://localhost:4200/`
- `npm run build:prod`
  - Build de producción (output en `dist/portafolio/`)

## Deploy en Netlify

### Configuración recomendada

- **Build command**: `npm run build:prod`
- **Publish directory**: `dist/portafolio/browser`

### SPA routing (sin 404)

Este repo incluye `public/_redirects` para que Netlify redireccione rutas a `index.html`.

## SEO

- `SeoService` actualiza dinámicamente:
  - `<title>`
  - `meta[name="description"]`
  - `og:title`, `og:description`, `og:url`
  - canonical
  - JSON-LD (`Person`)

Nota: Ajusta dominios reales en `public/robots.txt` y `public/sitemap.xml` reemplazando `YOUR_DOMAIN`.

## Checklist Lighthouse (objetivo 90+)

- Medir en incógnito (sin extensiones)
- Medir sobre build de producción (`dist`)
- Verificar que imágenes del hero no sean lazy
- Evitar fuentes bloqueantes (preload/async)
- Revisar tamaño de bundles con budgets
