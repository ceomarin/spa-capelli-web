# Spa-Capelli Web

Sitio web oficial de **Spa-Capelli Centro de Estética** — Quilicura, Santiago.

Construido con [Astro](https://astro.build) + [TinaCMS](https://tina.io), desplegado en **GitHub Pages**.

---

## Stack

| Capa | Tecnología |
|---|---|
| Framework | Astro 4 (static output) |
| CMS | TinaCMS (local mode + Tina Cloud opcional) |
| Datos | JSON en `src/content/spa/` con tipos TypeScript en `src/data/index.ts` |
| Deploy | GitHub Pages vía GitHub Actions (`gh-pages` branch) |
| Imágenes | Archivos externos en `public/images/` (no embebidas) |

---

## Estructura del proyecto

```
spa-capelli-web/
├── .github/
│   └── workflows/deploy.yml     # CI/CD → GitHub Pages
├── .tina/
│   └── config.ts                # Esquema TinaCMS (todos los campos editables)
├── public/
│   ├── images/                  # ← Aquí van las imágenes del sitio
│   └── favicon.svg
├── src/
│   ├── components/              # Un componente por sección
│   │   ├── Nav.astro
│   │   ├── Hero.astro
│   │   ├── About.astro
│   │   ├── Services.astro
│   │   ├── Treatments.astro
│   │   ├── WhyUs.astro
│   │   ├── Testimonials.astro
│   │   ├── Contact.astro
│   │   ├── Footer.astro
│   │   └── PrivacyModal.astro
│   ├── content/spa/             # ← ÚNICA FUENTE DE VERDAD (JSON editables)
│   │   ├── config.json          # Nombre, teléfono, redes, hero
│   │   ├── quick-services.json  # Barra de servicios rápidos
│   │   ├── about.json           # Sección "Nosotras"
│   │   ├── services.json        # 6 servicios con precios
│   │   ├── treatments.json      # 3 categorías de tratamientos
│   │   ├── why-us.json          # Tarjetas ¿Por qué elegirnos?
│   │   ├── testimonials.json    # Testimonios de clientas
│   │   ├── schedule.json        # Horario de atención
│   │   └── privacy.json         # Política de privacidad
│   ├── data/
│   │   └── index.ts             # Tipos TypeScript + importaciones
│   ├── layouts/
│   │   └── BaseLayout.astro     # HTML base, SEO, meta seguridad
│   ├── pages/
│   │   └── index.astro          # Página principal
│   └── styles/
│       └── global.css           # Design tokens + reset + utilidades
├── astro.config.mjs
├── tsconfig.json
└── package.json
```

---

## Imágenes requeridas

Coloca los siguientes archivos en `public/images/`:

| Archivo | Uso | Tamaño recomendado |
|---|---|---|
| `hero.jpg` | Imagen principal del hero (lado derecho) | 800×900px |
| `about.jpg` | Foto sección "Nosotras" | 480×600px |
| `treatments-banner.jpg` | Banner sección tratamientos | 1100×420px |
| `og-image.jpg` | Preview para redes sociales (Open Graph) | 1200×630px |

---

## Instalación y desarrollo local

```bash
# 1. Clonar el repositorio
git clone https://github.com/ceomarin/spa-capelli-web.git
cd spa-capelli-web

# 2. Instalar dependencias
npm install

# 3. Copiar variables de entorno
cp .env.example .env.local

# 4. Iniciar servidor de desarrollo CON TinaCMS
npm run dev
# → Astro:   http://localhost:4321
# → TinaCMS: http://localhost:4321/admin

# Solo Astro (sin CMS):
npm run dev:astro
```

---

## Edición de contenido (TinaCMS local)

1. Ejecutar `npm run dev`
2. Ir a `http://localhost:4321/admin`
3. Editar cualquier campo (precios, textos, horario, etc.)
4. Los cambios se guardan automáticamente en los archivos JSON de `src/content/spa/`
5. Hacer commit y push → el CI despliega automáticamente

---

## Deploy a GitHub Pages

### Configuración inicial del repositorio

```bash
# En GitHub → Settings → Pages:
# Source: "GitHub Actions" (NO "Deploy from branch")
```

### Deploy automático

Cualquier push a `main` dispara el workflow `.github/workflows/deploy.yml` que:
1. Instala dependencias
2. Ejecuta `tinacms build && astro build`
3. Sube el artefacto a GitHub Pages

El sitio queda disponible en: `https://ceomarin.github.io/spa-capelli-web`

### Deploy manual (opcional)

```bash
# Desde la pestaña Actions en GitHub → "Deploy Spa Capelli" → "Run workflow"
```

---

## Edición de datos sin CMS

Todos los textos, precios y configuración están en `src/content/spa/*.json`.
Son archivos JSON planos — se pueden editar con cualquier editor de texto.

**Ejemplo — cambiar un precio en `services.json`:**
```json
{
  "items": [
    {
      "number": "01",
      "name": "Belleza Capilar",
      "priceFrom": "$9.000",   ← editar aquí
      ...
    }
  ]
}
```

---

## TinaCMS Cloud (edición online desde producción)

Para habilitar edición visual directamente en el sitio publicado:

1. Crear cuenta en [tina.io](https://tina.io) (plan gratuito disponible)
2. Crear un proyecto y obtener `Client ID` y `Token`
3. En GitHub → Settings → Secrets → Actions, agregar:
   - `TINA_CLIENT_ID` = tu client ID
   - `TINA_TOKEN` = tu token
4. El workflow ya está preparado para inyectarlos en el build

---

## Seguridad

- HTTPS garantizado por GitHub Pages
- Meta headers de seguridad en `BaseLayout.astro`: `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`
- Sin cookies, sin tracking de terceros
- Sin formularios (contacto exclusivo vía WhatsApp externo)
- Sin dependencias de runtime (sitio 100% estático)

---

## Actualizar dependencias

```bash
npm update
# o para actualizaciones mayores:
npx npm-check-updates -u && npm install
```
