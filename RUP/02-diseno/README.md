# 🏗️ Disciplina de Diseño: Arquitectura y Realizaciones

Bienvenido a la capa de diseño de **Jorgestor**. Aquí se documentan las decisiones técnicas y las realizaciones de los casos de uso que dan soporte a la implementación final.

---

## 🏛️ Diagramas Arquitectónicos (As-Built)

Estos diagramas representan la estructura técnica real del software tras su evolución.

| **Diagrama de Entidad-Relación** | **Ciclo de Vida (Estados)** |
| :---: | :---: |
| [![ER Final](https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/develop/RUP/02-diseno/diagramas-arquitectonicos/diagrama-entidad-relacion.puml)](diagramas-arquitectonicos/diagrama-entidad-relacion.puml) | [![Estados Final](https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/develop/RUP/02-diseno/diagramas-arquitectonicos/diagrama-estados-examen.puml)](diagramas-arquitectonicos/diagrama-estados-examen.puml) |
| [Ver Código UML](diagramas-arquitectonicos/diagrama-entidad-relacion.puml) | [Ver Código UML](diagramas-arquitectonicos/diagrama-estados-examen.puml) |

---

## 🎯 Realizaciones de Diseño (Casos de Uso)

A continuación, se listan los diagramas de interacción y clases para los procesos core del sistema.

### Procesos Core de Evaluación
- **[CU-01] Corregir Exámenes**: [![Link](https://img.shields.io/badge/-Realización-blue?style=flat-square)](casos-uso/CU-01-corregirExamenes/)
- **[CU-02] Generar Examen**: [![Link](https://img.shields.io/badge/-Realización-blue?style=flat-square)](casos-uso/CU-02-generarExamenes/)
- **[CU-04] Exportar Examen**: [![Link](https://img.shields.io/badge/-Realización-blue?style=flat-square)](casos-uso/CU-04-exportarExamen/)
- **[CU-09] Asignar Exámenes**: [![Link](https://img.shields.io/badge/-Realización-blue?style=flat-square)](casos-uso/CU-09-asignarExamenes/)

### Procesos de Importación Masiva
- **[CU-05] Importar Alumnos**: [![Link](https://img.shields.io/badge/-Realización-green?style=flat-square)](casos-uso/CU-05-importarAlumnos/)
- **[CU-06] Importar Preguntas**: [![Link](https://img.shields.io/badge/-Realización-green?style=flat-square)](casos-uso/CU-06-importarPreguntas/)

### Gestión de Maestros (CRUDs)
- **Gestión de Preguntas**: [Ver Realizaciones](casos-uso/CU-10-crearPregunta/)
- **Gestión de Alumnos**: [Ver Realizaciones](casos-uso/CU-14-crearAlumno/)
- **Gestión de Asignaturas**: [Ver Realizaciones](casos-uso/CU-18-crearAsignatura/)

---
[⬅️ Volver al Panel Maestro](../../README.md)
