# 🏗️ Disciplina de Diseño: Arquitectura y Realizaciones

Bienvenido a la capa de diseño de **Jorgestor**. Esta sección documenta la arquitectura técnica final y cómo se han materializado los casos de uso en el software.

---

## 🏛️ Diagramas de Arquitectura (As-Built)

Estos diagramas representan la estructura técnica jerárquica y el comportamiento real del sistema.

### 1. Modelo de Datos (Entidad-Relación)
Representa la persistencia en PostgreSQL 17, incluyendo las relaciones N:M de transversalidad y matriculación.

![Diagrama ER Final](https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/develop/RUP/02-diseno/diagramas-arquitectonicos/diagrama-entidad-relacion.puml)
> [🔗 Ver Código Fuente](diagramas-arquitectonicos/diagrama-entidad-relacion.puml)

### 2. Estructura de Clases (Diseño Técnico)
Detalla la organización interna del Backend en Java/Spring Boot (Controllers, Services, Repositories).

![Diagrama de Clases](https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/develop/RUP/02-diseno/diagramas-arquitectonicos/diagrama-clases-diseno.puml)
> [🔗 Ver Código Fuente](diagramas-arquitectonicos/diagrama-clases-diseno.puml)

### 3. Ciclo de Vida del Examen (Estados)
Define la progresión de estados desde la generación hasta el cierre de acta.

![Diagrama de Estados Final](https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/develop/RUP/02-diseno/diagramas-arquitectonicos/diagrama-estados-examen.puml)
> [🔗 Ver Código Fuente](diagramas-arquitectonicos/diagrama-estados-examen.puml)

---

## 🎯 Realizaciones de Diseño (Casos de Uso)

Cada caso de uso tiene su propia realización técnica documentada:

| Categoría | Casos de Uso | Acceso Directo |
| :--- | :--- | :---: |
| **Evaluación Core** | Corregir, Generar, Exportar y Asignar | [![Link](https://img.shields.io/badge/-Realizaciones-blue?style=for-the-badge)](casos-uso/) |
| **Importación** | Carga masiva de Alumnos y Preguntas | [![Link](https://img.shields.io/badge/-Realizaciones-green?style=for-the-badge)](casos-uso/) |
| **Administración** | CRUDs de Alumnos, Asignaturas, Grados, etc. | [![Link](https://img.shields.io/badge/-Realizaciones-lightgrey?style=for-the-badge)](casos-uso/) |

---
[⬅️ Volver al Panel Maestro](../../README.md)
