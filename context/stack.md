# Tech Stack - CustomBlock Studio

Este documento define las tecnologías centrales elegidas para construir y escalar la plataforma en su modelo SaaS impulsado por la nube. Nuestra infraestructura está diseñada para ser rápida, segura y altamente escalable.

## Stack Principal

| Capa | Herramienta | Función |
| :--- | :--- | :--- |
| **Auth & Security** | **Clerk** | Gestión de identidad, autenticación (B2C/B2B) y manejo seguro de sesiones. |
| **Database** | **Neon** | Base de datos Postgres Serverless. Aporta escalabilidad, Row Level Security (RLS) y Branching para entornos de desarrollo. |
| **ORM** | **Drizzle** | Interacción con la base de datos rápida, ligera, con tipado estricto (Type-Safe) y uso de Prepared Statements. |
| **Validation** | **Zod** | Validación robusta de esquemas y filtrado de la "basura" en los endpoints antes de tocar la DB. |
| **Shield & Cache** | **Upstash** | Redis Serverless para Rate Limiting extremo y protección contra bots/DDoS. |
| **Hosting & DevOps** | **Coolify + Hetzner** | Autohospedaje tipo PaaS (Platform as a Service) gestionando contenedores en servidores dedicados de alto rendimiento en Hetzner (gran balance costo/potencia). |
| **Frontend Framework** | **Next.js (App Router)** | Renderizado híbrido (SSR/CSR), manejo de las rutas UI y las API Routes conectadas al backend. |

---

*Última actualización: 2026-03-21*
