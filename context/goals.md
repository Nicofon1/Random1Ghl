# Objetivos y Visión del Proyecto (Goals) - CustomBlock Studio

Este documento sirve como la **"Estrella del Norte"** (North Star) para el desarrollo de CustomBlock Studio. Define de manera exhaustiva la visión, los módulos funcionales, la arquitectura deseada y los objetivos a largo plazo de la plataforma.

---

## 1. Visión General (North Star)
**CustomBlock Studio** es un ecosistema moderno de diseño y gestión de componentes frontend basado en la nube (SaaS). Su propósito es resolver el puente entre el código de componentes aislados (shadcn, Tailwind UI, HTML/CSS crudo) y un entorno visual de "Studio" sincronizado donde se puedan gestionar variables globales, previsualizar componentes a escala y adaptarlos usando IA.

**Público Objetivo**: Freelancers, agencias boutique y desarrolladores independientes que necesitan un "cuaderno de bocetos" rápido y centralizado en la nube para gestionar sus bloques de UI en cualquier dispositivo.

---

## 2. Módulos Principales y Características (Funcionalidad Core)

La plataforma se divide en **4 pilares fundamentales**:

### A. Global Settings (El "Cerebro" del Sistema de Diseño)
Panel de control persistente (Sidebar) que define las "Design Tokens" (variables raíz) de la aplicación.
- **Colores**: Configuración de `Primary`, `Secondary` y `Accent` colors mediante selectores visuales.
- **Tipografía**: Selección dinámica de fuentes de Google Fonts (Display Font y Body Font).
- **Iconografía**: Control global de tamaño (`Size`), peso (`Weight`) y color (`Color`) para Material Symbols o iconos base.
- **Sincronización en Tiempo Real**: Cualquier cambio en estas variables actualiza instantáneamente todos los componentes previsualizados mediante la inyección de variables CSS (`:root`).
- **Exportación Rápida**: Botón para copiar el "Global CSS Variables" (incluyendo los tags de importación de fuentes) listo para pegar en constructores de sitios externos como GoHighLevel (GHL) o Webflow.

### B. Library Studio (Gestor de Componentes)
El centro de mando para almacenar y organizar los bloques de UI.
- **Grilla de Previsualización (Catalog View)**: Tarjetas inteligentes con `aspect-ratio: 16/9` y `transform: scale()` para mostrar miniaturas completas de los bloques sin renderizar barras de scroll (Iframe Sandbox minimizado).
- **Gestión de Categorías**: Sistema robusto para etiquetar y filtrar bloques dinámicamente.
- **Creación y Edición Rápida**: Formularios limpios para insertar HTML y CSS crudo.
- **Aislamiento (Sandboxing)**: Cada bloque se renderiza en un `<iframe>` para evitar conflictos de estilos, inyectando dinámicamente el bloque `<style>` de las variables globales.

### C. AI Playground (Extractor y Editor con IA) - *[En Desarrollo]*
Un entorno de edición a pantalla dividida ultra-potente impulsado por Gemini (u otros LLMs).
- **Limpieza de Código ("Extractor")**: Capacidad de pegar código sucio (ej. exportado de Figma o constructores visuales) y que la IA lo limpie, separando el HTML del CSS y haciéndolo modular.
- **Adaptación al Sistema de Diseño**: Un botón mágico (o prompt) para que la IA escanee el código del bloque y reemplace valores estáticos (colores hardcodeados, fuentes, px fijos) por las variables globales CSS var(--color-primary), etc.
- **Iteración Conversacional**: Un chat lateral para pedirle a la IA: "Haz este botón más grande", "Cambia el grid a 3 columnas", viendo los resultados en el marco de previsualización en vivo.

### D. Icon Studio - *[Futuro]*
Un espacio dedicado exclusivamente a la búsqueda, personalización y abstracción de iconos.
- Explorador visual de Material Symbols.
- Adaptación automática a las variables globales de icono configuradas en el cerebro del sistema.

---

## 3. Flujo de Trabajo del Usuario (El "Happy Path")

1. **Configuración Inicial**: El usuario define sus colores corporativos y fuentes en el Sidebar. Copia las variables globales a su proyecto principal (ej. GHL).
2. **Ingesta de Componentes**: El usuario obtiene un diseño (de Tailwind UI, ChatGPT, o codificado a mano).
3. **Refinamiento AI (Playground)**: Si el código está sucio, lo pasa por el AI Playground para que se adopte al "CustomBlock Standard" usando las variables CSS.
4. **Almacenamiento**: El componente perfeccionado se guarda en la "Library" bajo una categoría específica (ej. "Pricing Tables").
5. **Reutilización**: Al iniciar un nuevo proyecto para un cliente, el usuario simplemente cambia los Global Settings; TODOS los componentes de su librería adoptan automáticamente el nuevo branding.
6. **Exportación**: El usuario copia el código del componente deseado y lo pega en la plataforma de su elección (GHL, Webflow, React, etc.), sabiendo que se verá idéntico gracias a las variables globales previamente instaladas.

---

## 4. Fundamentos Arquitectónicos (Tech Stack Moderno)

- **Frontend / Framework**: Next.js (App Router), React, TailwindCSS. (Diseño oscuro, glassmorphism, estéticas premium).
- **Base de Datos & ORM**: Neon (Postgres Serverless con Branching y RLS) con Drizzle ORM para tipado estricto y queries seguras.
- **Autenticación (Auth)**: Clerk, garantizando identidad segura, gestión de sesiones y protección veloz de rutas.
- **Seguridad & Caché**: Zod para validación estricta de inputs, combinado con Upstash (Redis) para rate-limiting agresivo contra bots.
- **Despliegue (Infra)**: Servidores de Hetzner orquestados mediante Coolify.
- **Comunicación**: Interacciones ágiles con `postMessage` hacia los Iframes encapsulados, minimizando dependencias pesadas de estado global.

---

## 5. Modelo de Negocios y Metas a Corto/Mediano Plazo

Según lo establecido en el documento de `monetizacion.md`:
- **Fase 1 (Actual)**: Consolidación del producto Cloud (SaaS) MVP. Construcción de UX/UI impecable (Clerk + Neon DB integrados) para enamorar a los primeros "Early Birds".
- **Fase 2 (Crecimiento)**: Optimización del Rate-limiting global mediante Upstash, monetización activa y escalamiento en Hetzner con Coolify.
- **Lanzamiento / Funding**: Ofertas promocionales de introducción para estabilizar ingresos recurrentes mensuales (MRR).
- **Suscripción Pro**: Modelo mensual disruptivamente barato enfocado al volumen y la productividad B2B ágil.

---

Este archivo marca la dirección a seguir. Cada nuevo feature (Endpoint, Componente React, Integración AI) debe alinearse con el cumplimiento de estos módulos y satisfacer el flujo de trabajo final.
