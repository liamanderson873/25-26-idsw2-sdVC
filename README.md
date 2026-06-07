# Jorgestor — Sistema de Gestión de Exámenes

Sistema académico desarrollado en **IDSW2** para la generación automática, asignación y corrección de exámenes personalizados por alumno. Implementado con metodología **RUP** y patrón **BCE** (Boundary-Control-Entity).

---

## Stack

| Capa | Tecnología |
|---|---|
| Backend | Java 21 · Spring Boot 3.2.5 · Maven |
| Frontend | React · Vite · TanStack Query |
| Base de datos | PostgreSQL 17 |
| Seguridad | RBAC · Firmas SHA-256 · Auditoría completa |

---

## Inicio rápido

```powershell
.\start-all.ps1
```

| Rol | Usuario | Contraseña | Acceso |
|---|---|---|---|
| Docente | `docente` | `docente123` | Gestión completa del sistema |
| Administrador | `admin` | `admin123` | Gestión de docentes |

---

## Módulos funcionales

### Docente (43 casos de uso)

| Módulo | Operaciones |
|---|---|
| Grado | Crear · Ver · Editar · Eliminar |
| Asignatura | Crear · Ver · Editar · Eliminar |
| Alumno | Crear · Ver · Editar · Eliminar |
| Preguntas y Respuestas | Crear · Ver · Editar · Eliminar (preguntas y respuestas) |
| Configuración Global | Exportar · Importar (JSON con todo el sistema) |
| Examen | Generar · Asignar · Ver · Ver lista · Corregir · Cancelar |
| Sesión | Iniciar sesión · Cerrar sesión |
| Gestión | Completar gestión |

### Administrador Institucional (7 casos de uso)

Gestión de docentes (crear, ver, editar, eliminar) + inicio/cierre de sesión + completar gestión.

---

## Flujo principal de exámenes

```
Configurar banco de preguntas
        ↓
Generar exámenes por grado/asignatura   → PDF con hoja de respuestas por alumno
        ↓
Asignar a alumnos
        ↓
Simular entrega (auditoría SHA-256)
        ↓
Corregir (masiva por grupo o individual)
        ↓
Ver revisión por ejemplar
```

---

## Arquitectura — Baseline vs. As-Built

El diseño ha evolucionado desde el modelo teórico inicial hasta la implementación final siguiendo el proceso **JEDUF**.

### Modelo del Dominio (Entidad-Relación)

| Baseline | As-Built |
|:---:|:---:|
| <img width="400" src="https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/develop/RUP/00-baseline/diagramaEntidad/original.puml"/> | <img width="400" src="https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/develop/RUP/02-diseno/diagramas-arquitectonicos/diagrama-entidad-relacion.puml"/> |

### Ciclo de vida del examen

| Baseline | As-Built |
|:---:|:---:|
| <img width="300" src="https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/develop/RUP/00-baseline/diagramaEstadosExamen/original.puml"/> | <img width="460" src="https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/develop/RUP/02-diseno/diagramas-arquitectonicos/diagrama-estados-examen.puml"/> |

---

## Diagramas de actores y contexto

| Docente | Administrador Institucional |
|:---:|:---:|
| <img width="460" src="https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/develop/RUP/00-casos-uso/01-actores-casos-uso/actores-casos-uso.puml"/> | <img width="340" src="https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/develop/RUP/00-casos-uso/01-actores-casos-uso/actores-casos-uso-admin.puml"/> |

| Diagrama de contexto — Docente |
|:---:|
| <img width="700" src="https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/develop/RUP/00-casos-uso/01-actores-casos-uso/diagrama-contexto-docente.puml"/> |

---

## Artefactos RUP

| Disciplina | Contenido |
|---|---|
| [Casos de uso](RUP/00-casos-uso/) | Diagramas de actores y contexto (Docente y Administrador) |
| [Análisis](RUP/01-analisis/README.md) | 43 CUs × 2 diagramas BCE (colaboración + secuencia) |
| [Diseño](RUP/02-diseno/README.md) | 43 CUs × diagrama de secuencia de implementación + 4 diagramas arquitectónicos |
| [Evolución](RUP/EVOLUCION_DISENO.md) | Comparativa Baseline vs. As-Built |
