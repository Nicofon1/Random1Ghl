# Análisis de Monetización y Modelo de Negocio - CustomBlock Studio

Este documento analiza cómo cobran los competidores y propone un modelo de negocio para **CustomBlock Studio** que sea competitivo, sustentable y económico para el usuario.

## 1. Análisis de la Competencia (Precios SaaS)

| Herramienta | Plan Gratis | Plan Pro (Freelance/Small Team) | Plan Team/Enterprise | Modelo de Cobro |
| :--- | :--- | :--- | :--- | :--- |
| **Chromatic** | 5k snapshots | **$149/mes** (Starter - 35k) | Custom (+$0.008/snap) | Por snapshot (visual testing) |
| **Builder.io** | Básico | **$24/mes** | Custom | Por usuario + Créditos AI |
| **Plasmic** | Ilimitado (2 editores) | **$10/usuario/mes** | $12/usuario/mes | Por usuario (asiento) |
| **Framer** | 10 CMS / Badge | **$15-$30/mes** | $100/mes (Scale) | Por sitio + Por editor |
| **Webflow** | 2 sitios (no custom domain) | **$18-$29/mes** | $49/asiento/mes | Por sitio + Espacios de trabajo |
| **Subframe** | 1 proyecto / 5 págs | **$29/editor/mes** | Custom | Por editor mensual |

**Tendencia del mercado**: La mayoría cobra entre **$15 y $30 USD mensuales por usuario/asiento**. Esto se vuelve costoso rápidamente para equipos pequeños o freelancers con varios proyectos.

---

## 2. Nuestra Ventaja: Un SaaS Veloz y Accesible

Dado que **CustomBlock Studio** se está construyendo como una herramienta SaaS puramente centralizada en la nube, podemos ofrecer portabilidad instantánea entre dispositivos y facilitar enormemente el trabajo en equipo.

### Propuesta de Modelo: Freemium / Suscripción

#### A. Plan Starter (Core Free) - $0
- Gestión de bloques almacenados en la nube con límites moderados (Rate Limiting via Upstash).
- Previsualización y edición de variables CSS.
- Exportación manual de código.
- **Ideal para**: Desarrolladores individuales y evaluación inicial de la plataforma.

#### B. Plan Pro (Suscripción Individual) - ~$5 - $9 / mes
*Un precio disruptivo que es 3x-5x más barato que la competencia.*
- Sincronización en la nube para múltiples máquinas.
- Generación de código con AI (créditos moderados).
- Backup automático de la base de datos de bloques.
- Acceso a una librería "Premium" de bloques pre-construidos por nosotros.

#### C. Plan Team (Multi-User) - ~$15 - $20 / mes (Total, NO por usuario)
- Hasta 5 usuarios incluidos.
- Repositorio de bloques compartido.
- Roles de editor/observador para diseñadores y devs.
- **Ventaja**: El costo por usuario bajaría a ~$3-$4 USD, imbatible frente a los $29 de Subframe o Webflow.

---

## 3. ¿Por qué es Sustentable?

1. **Bajos Costos Operativos (Stack Serverless)**: Utilizando Neon Postgres (Branching/RLS) y Upstash Redis sobre servidores de costo-beneficio óptimo como Hetzner y Coolify, los gastos escalan de forma eficiente.
2. **Fidelidad**: Un precio accesible reduce la tasa de cancelación (churn).
3. **Escalabilidad**: Podemos vender "Packs de Bloques" específicos (e.g. "E-commerce Premium Pack") como compras únicas (One-time purchase) para ingresos adicionales.

---

## 4. Estrategia de Lanzamiento
- **Oferta B2C y B2B**: Planes competitivos anuales o licencias especiales "Lifetime Deal" para capturar liquidez temprana (bootstrap) y fondear los costos iniciales de Cloud.
- **Objetivo**: Validar el mercado y cubrir la base de infraestructura sin necesidad de Venture Capital intensivo.

---
*Estimación realizada el: 2026-03-09*
