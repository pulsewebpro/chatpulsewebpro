# PulseWebPro — carpeta unificada (Next.js + Tailwind + i18n + IA capada)

## 🚀 Arranque rápido
```bash
npm install
npm run dev
# abre http://localhost:3000
```

## 🧠 IA capada (mock / live)
- Por defecto, **mock** (sin claves). Edita `.env.local`:
```
PULSE_MODE=mock
OFFTOPIC_MSG=Solo puedo hablar de webs y negocios online. Cuéntame qué quieres crear 😊
```
- Para **live** con OpenAI:
```
PULSE_MODE=live
OPENAI_API_KEY=sk-...
```
> La ruta `/api/pulse` filtra temas ajenos y devuelve respuesta breve y accionable.

## 🌐 i18n
- `next-i18next` con ES/EN/FR. Cambia idioma en el header (🌐).
- Traducciones en `public/locales/{es,en,fr}/common.json`.

## 🖼 Preview PNG
- El componente `PreviewCard` genera un **PNG** del mock de landing y lo descarga con un clic.

## 📦 Estructura
- `pages/index.tsx`: Hero → ChatWizard → Trust → Plans → Testimonials → Footer
- Legales: `/legal/terms`, `/legal/privacy`, `/legal/cookies`
- IA: `pages/api/pulse.ts`
- Guardia de tema: `lib/pulseGuard.ts`
- Estilos: Tailwind + utilidades en `styles/globals.css`

## 🧩 Siguientes pasos (opcionales)
- Sustituir textos legales por definitivos.
- Integrar Stripe/planes reales (usar `.env.example` como guía).
- Sustituir avatar por el robot Pulse final.
- Añadir tests y despliegue (Vercel).
