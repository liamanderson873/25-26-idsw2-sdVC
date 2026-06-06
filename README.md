# 🎓 Jorgestor: Sistema de Gestión de Exámenes Inteligente

[![IDSW2](https://img.shields.io/badge/Asignatura-IDSW2-blue?style=for-the-badge&logo=spring)](../../)
[![RUP](https://img.shields.io/badge/Metodología-RUP-orange?style=for-the-badge&logo=blueprint)](../../)
[![Premium UI](https://img.shields.io/badge/Estética-Premium%20Apple-lightgrey?style=for-the-badge&logo=apple)](../../)

Bienvenido al repositorio oficial de **Jorgestor**, una solución integral para la generación, asignación y auditoría de exámenes, desarrollada bajo los estándares de **Ingeniería del Software II (IDSW2)**.

---

## 🚀 Centro de Mando: Navegación Visual

Haz clic en los badges para explorar las fases del proyecto:

| [![Análisis](https://img.shields.io/badge/Disciplina-Análisis-blue?style=for-the-badge&logo=diagramsdotnet)](RUP/01-analisis/README.md) | [![Diseño](https://img.shields.io/badge/Disciplina-Diseño-orange?style=for-the-badge&logo=postgresql)](RUP/02-diseno/README.md) | [![Trazabilidad](https://img.shields.io/badge/IDSW2-Teoría-lightgrey?style=for-the-badge&logo=gitbook)](TRAZABILIDAD_TEORICA.md) | [![Evolución](https://img.shields.io/badge/Modelado-Evolución-success?style=for-the-badge&logo=chartjs)](RUP/EVOLUCION_DISENO.md) |
| :---: | :---: | :---: | :---: |

---

## 📈 Evolución del Modelado (Baseline vs. Realidad)

Demostración del proceso de **Diseño Evolutivo (JEDUF)**. Los diagramas se sincronizan con la arquitectura final implementada:

### 1. Modelo del Dominio (Entidad-Relación)

| **Diseño Original (Baseline)** | **Implementación Final (As-Built)** |
| :---: | :---: |
| ![Original](https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/develop/RUP/00-baseline/diagramaEntidad/original.puml) | ![Final](https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/develop/RUP/02-diseno/diagramas-arquitectonicos/diagrama-entidad-relacion.puml) |

### 2. Comportamiento (Ciclo de Vida del Examen)

| **Flujo Teórico** | **Flujo Real de Auditoría** |
| :---: | :---: |
| ![Original](https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/develop/RUP/00-baseline/diagramaEstadosExamen/original.puml) | ![Final](https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/develop/RUP/02-diseno/diagramas-arquitectonicos/diagrama-estados-examen.puml) |

---

## 🛠️ Stack Tecnológico Premium

- **Backend**: `Java 21` + `Spring Boot 3.2.5` + `PostgreSQL 17`.
- **Frontend**: `React` + `Vite` + `TanStack Query`.
- **Seguridad**: Autenticación `RBAC`, Firmas `SHA-256` y Auditoría Técnica.
- **Calidad**: 100% libre de emojis, estética compacta de alta densidad.

---

## 🚀 Cómo Iniciar el Sistema

```powershell
.\start-all.ps1
```

*Credenciales de acceso:*
- **Administrador:** `admin` / `admin123`
- **Docente:** `docente` / `docente123`

---
*Este repositorio es una prueba empírica de la aplicación de la ingeniería del software para resolver problemas académicos complejos de forma profesional.*
