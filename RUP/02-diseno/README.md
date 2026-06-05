# 🏗️ Diseño Arquitectónico y Estructura de Datos

Esta sección documenta la arquitectura técnica final de **Jorgestor**, reflejando las decisiones de diseño evolucionadas (JEDUF) para cumplir con los requisitos académicos de IDSW2.

---

## 📊 Modelo de Datos (Entidad-Relación)

Se ha implementado un esquema robusto en **PostgreSQL 17** que soporta:
- **Transversalidad**: Asignaturas compartidas entre varios grados.
- **Matriculación Dinámica**: Alumnos vinculados a múltiples materias independientemente de su curso.
- **Auditoría Técnica**: Registro histórico de cada marca realizada en los exámenes.

![Diagrama ER Final](https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/develop/RUP/02-diseno/diagrama-entidad-relacion.puml)

> [!TIP]
> [Ver código fuente del diagrama (PlantUML)](diagrama-entidad-relacion.puml)

---

## 🔄 Ciclo de Vida del Examen

El ciclo de vida del ejemplar de examen ha sido expandido para incluir la fase de auditoría y validación previa a la calificación.

![Diagrama de Estados Final](https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/develop/RUP/02-diseno/diagrama-estados-examen.puml)

> [!TIP]
> [Ver código fuente del diagrama (PlantUML)](diagrama-estados-examen.puml)

---

## 📂 Organización de la Capa de Diseño

- **[/casos-uso](casos-uso/)**: Realizaciones de diseño para cada caso de uso.
- **[diagrama-clases-diseno.puml](diagrama-clases-diseno.puml)**: Detalle técnico de la implementación en Java.

---
[⬅️ Volver al Inicio](../../README.md)
