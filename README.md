# 🎓 Jorgestor: Sistema de Gestión de Exámenes Inteligente

[![IDSW2](https://img.shields.io/badge/Asignatura-IDSW2-blue?style=for-the-badge&logo=spring)](../../)
[![RUP](https://img.shields.io/badge/Metodología-RUP-orange?style=for-the-badge&logo=blueprint)](../../)
[![Premium UI](https://img.shields.io/badge/Estética-Premium%20Apple-lightgrey?style=for-the-badge&logo=apple)](../../)

Bienvenido al repositorio oficial de **Jorgestor**, una solución integral para la generación, asignación y auditoría de exámenes, desarrollada bajo los estándares de **Ingeniería del Software II (IDSW2)**.

---

## 🚀 Centro de Mando: Navegación Visual

| [📂 ANÁLISIS](RUP/01-analisis/README.md) | [📂 DISEÑO](RUP/02-diseno/README.md) | [📂 TRAZABILIDAD](TRAZABILIDAD_TEORICA.md) | [📂 EVOLUCIÓN](RUP/EVOLUCION_DISENO.md) |
| :---: | :---: | :---: | :---: |
| ![Análisis](https://img.shields.io/badge/-Análisis%20MVC-white?style=flat&logo=diagramsdotnet&logoColor=black) | ![Diseño](https://img.shields.io/badge/-Arquitectura%20N:M-white?style=flat&logo=postgresql&logoColor=black) | ![Trazabilidad](https://img.shields.io/badge/-Teoría%20IDSW2-white?style=flat&logo=gitbook&logoColor=black) | ![Evolución](https://img.shields.io/badge/-Antes%20vs%20Después-white?style=flat&logo=chartjs&logoColor=black) |

---

## 📈 Evolución del Modelado (Baseline vs. Realidad)

A continuación, se presenta la evolución técnica del sistema siguiendo la metodología **JEDUF** (Just Enough Design Up Front). Los diagramas se sincronizan con la arquitectura final implementada:

### 1. Arquitectura de Datos (Entidad-Relación)

| **Diseño Original (Baseline)** | **Implementación Final (As-Built)** |
| :---: | :---: |
| ![Original](https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/develop/RUP/00-baseline/diagramaEntidad/original.puml) | ![Final](https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/develop/RUP/02-diseno/diagrama-entidad-relacion.puml) |

### 2. Comportamiento (Ciclo de Vida del Examen)

| **Flujo Teórico** | **Flujo Real de Auditoría** |
| :---: | :---: |
| ![Original](https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/develop/RUP/00-baseline/diagramaEstadosExamen/original.puml) | ![Final](https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/develop/RUP/02-diseno/diagrama-estados-examen.puml) |

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
