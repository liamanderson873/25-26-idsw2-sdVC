# Disciplina de Análisis: Requisitos y Robustez

Esta sección documenta la fase de análisis de **Jorgestor**, donde se definen los requisitos funcionales y la lógica de robustez de los procesos core.

---

## Casos de Uso de Análisis

### Gestión de Exámenes
- **[CU-01] Corregir Exámenes** — [Detalle](casos-uso/CU-01-corregirExamenes/)
- **[CU-02] Generar Examen** — [Detalle](casos-uso/CU-02-generarExamenes/)
- **[CU-09] Asignar Exámenes** — [Detalle](casos-uso/CU-09-asignarExamenes/)
- **[CU-37] Cancelar Generación** — [Detalle](casos-uso/CU-37-cancelarGeneracion/)

### Configuración e Importación / Exportación
- **[CU-03] Importar Configuración Global** — [Detalle](casos-uso/CU-03-importarConfiguracionGlobal/)
- **[CU-04] Exportar Configuración Global** — [Detalle](casos-uso/CU-04-exportarConfiguracionGlobal/)
- **[CU-05] Importar Alumnos** — [Detalle](casos-uso/CU-05-importarAlumnos/)
- **[CU-06] Importar Preguntas** — [Detalle](casos-uso/CU-06-importarPreguntas/)
- **[CU-07] Exportar Alumnos** *(abstracto)* — [Detalle](casos-uso/CU-07-exportarAlumnos/)
- **[CU-08] Exportar Preguntas** *(abstracto)* — [Detalle](casos-uso/CU-08-exportarPreguntas/)
- **[CU-38] Importar Asignaturas** *(abstracto)* — [Detalle](casos-uso/CU-38-importarAsignaturas/)
- **[CU-39] Importar Grados** *(abstracto)* — [Detalle](casos-uso/CU-39-importarGrados/)
- **[CU-40] Exportar Asignaturas** *(abstracto)* — [Detalle](casos-uso/CU-40-exportarAsignaturas/)
- **[CU-41] Exportar Grados** *(abstracto)* — [Detalle](casos-uso/CU-41-exportarGrados/)

### Gestión de Preguntas y Respuestas
- **Preguntas**: [Crear](casos-uso/CU-10-crearPregunta/) / [Editar](casos-uso/CU-11-editarPregunta/) / [Ver](casos-uso/CU-20-verPreguntas/) / [Eliminar](casos-uso/CU-25-eliminarPregunta/)
- **Respuestas**: [Ver](casos-uso/CU-33-verRespuestas/) / [Crear](casos-uso/CU-34-crearRespuesta/) / [Editar](casos-uso/CU-35-editarRespuesta/) / [Eliminar](casos-uso/CU-36-eliminarRespuesta/)

### Gestión de Alumnos
- **Alumnos**: [Crear](casos-uso/CU-14-crearAlumno/) / [Editar](casos-uso/CU-16-editarAlumno/) / [Ver](casos-uso/CU-23-verAlumnos/) / [Eliminar](casos-uso/CU-28-eliminarAlumno/)

### Gestión de Asignaturas
- **Asignaturas**: [Crear](casos-uso/CU-18-crearAsignatura/) / [Editar](casos-uso/CU-12-editarAsignatura/) / [Ver](casos-uso/CU-21-verAsignaturas/) / [Eliminar](casos-uso/CU-26-eliminarAsignatura/)

### Gestión de Grados
- **Grados**: [Crear](casos-uso/CU-17-crearGrado/) / [Editar](casos-uso/CU-19-editarGrado/) / [Ver](casos-uso/CU-22-verGrados/) / [Eliminar](casos-uso/CU-27-eliminarGrado/)

### Gestión de Docentes
- **Docentes**: [Crear](casos-uso/CU-13-crearDocente/) / [Editar](casos-uso/CU-15-editarDocente/) / [Ver](casos-uso/CU-24-verDocentes/) / [Eliminar](casos-uso/CU-29-eliminarDocente/)

### Sesión y Navegación
- **[CU-30] Iniciar Sesión** — [Detalle](casos-uso/CU-30-iniciarSesion/)
- **[CU-31] Cerrar Sesión** — [Detalle](casos-uso/CU-31-cerrarSesion/)
- **[CU-32] Completar Gestión** — [Detalle](casos-uso/CU-32-completarGestion/)

---

## Estructura de cada análisis

Cada carpeta de análisis contiene:
- **README.md**: análisis MVC detallado, responsabilidades y trazabilidad.
- **analisis-colaboracion-CUxx.puml**: diagrama de colaboración entre objetos BCE.
- **analisis-secuencia-CUxx.puml**: diagrama de secuencia de análisis.

---

[Volver al Panel Maestro](../../README.md)
