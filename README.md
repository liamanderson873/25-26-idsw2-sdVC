# 🎓 Jorgestor: Sistema de Gestión de Exámenes Inteligente

Bienvenido al repositorio oficial de **Jorgestor**, una solución integral para la generación, asignación y auditoría de exámenes, desarrollada bajo los estándares de **Ingeniería del Software II (IDSW2)**.

---

## 🚀 Navegación por el Proyecto

Accede rápidamente a las fases clave del desarrollo:

1.  **[Análisis y Requisitos (RUP)](RUP/01-analisis/README.md)**: Detallado de casos de uso y diagramas de robustez iniciales.
2.  **[Diseño Arquitectónico (RUP)](RUP/02-diseno/README.md)**: Definición de la estructura de datos y estados.
3.  **[Trazabilidad Teórica IDSW2](TRAZABILIDAD_TEORICA.md)**: Justificación académica de cada decisión técnica.
4.  **[Evolución del Diseño (Antes vs. Después)](RUP/EVOLUCION_DISENO.md)**: Comparativa técnica entre el modelado inicial y la implementación final.

---

## 📈 Evolución del Modelado (Análisis vs. Realidad)

A continuación, se presenta la evolución del sistema siguiendo la metodología **JEDUF** (Just Enough Design Up Front). Los diagramas se renderizan en tiempo real:

### 1. Modelo de Datos (Diagrama Entidad-Relación)

| **Baseline (Modelado Original)** | **As-Built (Implementado Final)** |
| :---: | :---: |
| ![Modelado Original](https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/documents/modelos/diagramas/diagramaEntidad/diagramaEntidad.puml) | ![Implementación Final](https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/develop/RUP/02-diseno/diagrama-entidad-relacion.puml) |

### 2. Ciclo de Vida (Diagrama de Estados)

| **Flujo Original** | **Flujo Real Evolucionado** |
| :---: | :---: |
| ![Estados Original](https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/documents/modelos/diagramas/diagramaEstados/diagramaEstadosExamen/diagramaEstadosExamen.puml) | ![Estados Final](https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/develop/RUP/02-diseno/diagrama-estados-examen.puml) |

---

## 🛠️ Tecnologías y Estándares

-   **Backend**: Java 21 + Spring Boot 3.2.5 (Arquitectura en capas).
-   **Frontend**: React + Vite (Estética Premium Apple Style).
-   **Base de Datos**: PostgreSQL 17 (3FN y ACID).
-   **Seguridad**: RBAC (Control de acceso por roles) y firmas SHA-256.

---

## 🚀 Cómo Iniciar el Ecosistema

Para levantar el sistema completo (Frontend + Backend) con un solo comando:

```powershell
.\start-all.ps1
```

*Credenciales de prueba:*
- **Administrador:** `admin` / `admin123`
- **Docente:** `docente` / `docente123`

---
*Este proyecto es la culminación de la aplicación práctica de la Ingeniería del Software, transformando requisitos complejos en un sistema robusto, mantenible y visualmente excepcional.*
