# Conversation Log

## Sesión 21/05/2026

- **Inicio de proyecto**: Configuración de repositorios de Modelado, Implementación y Teoría.
- **Definición de alcance**: Actualización de `QUE_HACE.md` con la descripción oficial de Jorgestor.
- **Configuración de Workflow**: Creación de ramas `develop` y `task/01-analisis-puro`.
- **Estructuración RUP**: Creación de la carpeta `RUP/` siguiendo la inspiración de `pySigHor`.
- **Análisis CU-01 (Corregir Exámenes)**:
  - Lectura de requisitos detallados (Diagrama de estados).
  - Identificación de clases de análisis (Boundary-Control-Entity).
  - Creación de documento de análisis puro en `RUP/01-analisis/CU-01-corregirExamenes.md`.
  - **Ajuste de alcance**: Se simplifica la corrección eliminando la IA del compromiso directo del sistema en `QUE_HACE.md` y el análisis de CU-01.


## [11:30] Sesión de inicio: Infraestructura, Alcance y Análisis Puro (CU-01)

**Prompt principal:**
> "tengo que hacer un proyecto para clase en el que tengo que codificar enteramente contido un proyecto que tenemos modelado... el modelado lo tengo todo en un github... quiero trabajar como lo he hecho en el repo de modelado... vamos a hacer primero el analysis y diseño y una vez lo tengamos hacemos la implementacion."

**Resultado técnico:**
1.  **Sincronización de Recursos**: Clonación y análisis de los repositorios de Modelado (Jorgestor), Teoría (IDSW2) y Referencia (pySigHor del profesor).
2.  **Infraestructura RUP**: Implementación de la estructura de carpetas basada en el proceso unificado pragmático:
    - `RUP/00-casos-uso/`: Repositorio de modelos originales.
    - `RUP/01-analisis/`: Espacio para el análisis tecnológico agnóstico.
    - `RUP/02-diseno/`: (Preparado para la siguiente fase).
3.  **Hito de Alcance**: Edición única de `QUE_HACE.md` definiendo el compromiso del sistema: "Sistema para docentes que automatiza la generación de exámenes personalizados a partir de una batería de preguntas y facilita su posterior corrección."
4.  **Análisis Puro de CU-01 (Corregir Exámenes)**:
    - Creación de `RUP/01-analisis/CU-01-corregirExamenes.md`.
    - Identificación de clases BCE: `CorrectionView` (Boundary), `CorrectionController` (Control), `Exam` y `Student` (Entities).
5.  **Git Workflow**: Inicialización de la rama `develop` y la primera rama de tarea `feat/analisis-puro-cu01`.

**Decisiones clave:**
- **Inspiración en pySigHor**: Se decidió adoptar la metodología del profesor para garantizar la trazabilidad académica y profesional del proyecto.
- **Sinceridad en el Alcance**: Se eliminó la mención a "Inteligencia Artificial" en el `QUE_HACE.md` tras discutir que la corrección será simplificada/externa, priorizando la honestidad del entregable profesional.
- **Tecnología Agnóstica**: Se mantuvo el análisis en un nivel abstracto para permitir una decisión tecnológica fundamentada en la fase de diseño.

- **Análisis CU-02 (Generar Exámenes)**:
  - Lectura de requisitos detallados (Parámetros obligatorios: asignatura, temas, preguntas, dificultad, etc.).
  - Identificación de clases de análisis (BCE).
  - Creación de documento de análisis puro en `RUP/01-analisis/CU-02-generarExamenes.md`.

## [12:00] Análisis Puro de CU-02

**Prompt:** "ok pues seguimos con el siguiente"

**Resultado:**
- Creación de la rama `feat/analisis-puro-cu02` (mezclando los cambios de la rama anterior para mantener consistencia).
- Análisis de los parámetros de generación: Se identificaron 7 campos obligatorios para la generación de exámenes.
- Documentación del análisis puro en `RUP/01-analisis/CU-02-generarExamenes.md`.

**Decisión:**
- Se mantiene la consistencia con el CU-01 usando el patrón Boundary-Control-Entity.
- Se ha identificado la necesidad de entidades adicionales como `Subject`, `Topic` y `Question`, que no eran tan críticas en el CU-01.

## [12:15] Cierre de Sesión 1: Análisis de CU-01 y CU-02 completados

**Resumen de la Sesión:**
Se ha establecido el flujo de trabajo definitivo y se han completado los dos casos de uso más prioritarios en su fase de Análisis Puro.

**Flujo de Trabajo Establecido (para futuras sesiones):**
1.  **Metodología**: RUP Pragmático (Inspiración `pySigHor`).
2.  **Estructura**: `RUP/00-casos-uso`, `RUP/01-analisis`, `RUP/02-diseno`.
3.  **Git**: Trabajo por ramas de tarea (`feat/analisis-puro-cu-XX`) con Pull Request hacia `develop`.
4.  **Prioridad**: Seguir estrictamente el orden de `CasosDeUsoPriorizados.md`.
5.  **Documentación**: Actualizar `conversation-log.md` al final de cada bloque de trabajo con prompts y decisiones.

**Entregables de hoy:**
- `QUE_HACE.md` finalizado.
- Estructura `RUP/` creada.
- `RUP/01-analisis/CU-01-corregirExamenes.md` (Agnóstico, sin IA).
- `RUP/01-analisis/CU-02-generarExamenes.md` (Identificación de parámetros y entidades).

## [14:45] Bloque de Análisis 2: Configuración e Importaciones (CU-03 a CU-06)

**Resumen:**
Se ha completado el análisis puro de un bloque de 4 casos de uso, siguiendo el nuevo flujo de trabajo de "agrupación por Pull Request".

**Entregables:**
- `RUP/01-analisis/CU-03-importarConfiguracionGlobal.md`: Gestión masiva de sistema.
- `RUP/01-analisis/CU-04-exportarConfiguracionGlobal.md`: Backup y exportación masiva.
- `RUP/01-analisis/CU-05-importarAlumnos.md`: Población específica de estudiantes.
- `RUP/01-analisis/CU-06-importarPreguntas.md`: Gestión de batería de preguntas (general y contextual).

**Git Workflow:**
- Rama: `feat/analisis-puro-bloque-2`
- PR pendiente hacia `develop` con el resumen del bloque.

## [15:30] Bloque de Análisis 3: Exportaciones y CRUD principal (CU-07 a CU-18)

**Resumen:**
Aceleración del proceso agrupando los casos de uso restantes en tres grandes bloques. Se completó el Bloque 3 con 12 casos de uso centrados en exportaciones específicas, asignación de exámenes y las operaciones de creación y edición (CRUD) de las entidades principales del sistema.

**Entregables:**
- Exportaciones: `CU-07-exportarAlumnos.md`, `CU-08-exportarPreguntas.md`.
- Asignación: `CU-09-asignarExamenes.md`.
- CRUD Preguntas: `CU-10-crearPregunta.md`, `CU-11-editarPregunta.md`.
- CRUD Asignaturas: `CU-12-editarAsignatura.md`, `CU-18-crearAsignatura.md`.
- CRUD Docentes (Admin): `CU-13-crearDocente.md`, `CU-15-editarDocente.md`.
- CRUD Alumnos: `CU-14-crearAlumno.md`, `CU-16-editarAlumno.md`.
- CRUD Grados: `CU-17-crearGrado.md`.

**Git Workflow:**
- Rama: `feat/analisis-puro-bloque-3`
- PR pendiente hacia `develop` con el resumen del bloque.

---
