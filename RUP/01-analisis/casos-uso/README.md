# Análisis de Casos de Uso — Jorgestor

Esta carpeta contiene el análisis BCE (Boundary-Control-Entity) de cada caso de uso del sistema Jorgestor.

## Casos de uso analizados

### Gestión de Exámenes
- [CU-01 Corregir Exámenes](CU-01-corregirExamenes/)
- [CU-02 Generar Exámenes](CU-02-generarExamenes/)
- [CU-09 Asignar Exámenes](CU-09-asignarExamenes/)
- [CU-37 Cancelar Generación](CU-37-cancelarGeneracion/)

### Configuración e Importación / Exportación
- [CU-03 Importar Configuración Global](CU-03-importarConfiguracionGlobal/)
- [CU-04 Exportar Configuración Global](CU-04-exportarConfiguracionGlobal/)
- [CU-05 Importar Alumnos](CU-05-importarAlumnos/)
- [CU-06 Importar Preguntas](CU-06-importarPreguntas/)
- [CU-07 Exportar Alumnos](CU-07-exportarAlumnos/) *(abstracto)*
- [CU-08 Exportar Preguntas](CU-08-exportarPreguntas/) *(abstracto)*
- [CU-38 Importar Asignaturas](CU-38-importarAsignaturas/) *(abstracto)*
- [CU-39 Importar Grados](CU-39-importarGrados/) *(abstracto)*
- [CU-40 Exportar Asignaturas](CU-40-exportarAsignaturas/) *(abstracto)*
- [CU-41 Exportar Grados](CU-41-exportarGrados/) *(abstracto)*

### Gestión de Preguntas y Respuestas
- [CU-10 Crear Pregunta](CU-10-crearPregunta/)
- [CU-11 Editar Pregunta](CU-11-editarPregunta/)
- [CU-20 Ver Preguntas](CU-20-verPreguntas/)
- [CU-25 Eliminar Pregunta](CU-25-eliminarPregunta/)
- [CU-33 Ver Respuestas](CU-33-verRespuestas/)
- [CU-34 Crear Respuesta](CU-34-crearRespuesta/)
- [CU-35 Editar Respuesta](CU-35-editarRespuesta/)
- [CU-36 Eliminar Respuesta](CU-36-eliminarRespuesta/)

### Gestión de Alumnos
- [CU-14 Crear Alumno](CU-14-crearAlumno/)
- [CU-16 Editar Alumno](CU-16-editarAlumno/)
- [CU-23 Ver Alumnos](CU-23-verAlumnos/)
- [CU-28 Eliminar Alumno](CU-28-eliminarAlumno/)

### Gestión de Asignaturas
- [CU-18 Crear Asignatura](CU-18-crearAsignatura/)
- [CU-12 Editar Asignatura](CU-12-editarAsignatura/)
- [CU-21 Ver Asignaturas](CU-21-verAsignaturas/)
- [CU-26 Eliminar Asignatura](CU-26-eliminarAsignatura/)

### Gestión de Grados
- [CU-17 Crear Grado](CU-17-crearGrado/)
- [CU-19 Editar Grado](CU-19-editarGrado/)
- [CU-22 Ver Grados](CU-22-verGrados/)
- [CU-27 Eliminar Grado](CU-27-eliminarGrado/)

### Gestión de Docentes
- [CU-13 Crear Docente](CU-13-crearDocente/)
- [CU-15 Editar Docente](CU-15-editarDocente/)
- [CU-24 Ver Docentes](CU-24-verDocentes/)
- [CU-29 Eliminar Docente](CU-29-eliminarDocente/)

### Sesión y Navegación
- [CU-30 Iniciar Sesión](CU-30-iniciarSesion/)
- [CU-31 Cerrar Sesión](CU-31-cerrarSesion/)
- [CU-32 Completar Gestión](CU-32-completarGestion/)

## Estructura de cada análisis

Cada carpeta contiene:
- **README.md**: análisis MVC detallado, responsabilidades y trazabilidad.
- **analisis-colaboracion-CUxx.puml**: diagrama de colaboración entre objetos BCE.
- **analisis-secuencia-CUxx.puml**: diagrama de secuencia de análisis.
