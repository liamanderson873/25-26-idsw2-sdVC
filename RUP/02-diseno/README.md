# Disciplina de Diseño: Realizaciones Técnicas

Esta sección presenta el catálogo de todas las realizaciones de diseño del sistema **Jorgestor**, detallando cómo interactúan los objetos del sistema para cumplir los requisitos.

---

## Estructura y Comportamiento Global

Antes de entrar en el detalle de cada caso de uso, se definen los pilares arquitectónicos del sistema:

### [Modelo del Dominio (As-Built)](diagramas-arquitectonicos/diagrama-entidad-relacion.puml)
<img width="760" src="https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/develop/RUP/02-diseno/diagramas-arquitectonicos/diagrama-entidad-relacion.puml"/>

### [Ciclo de Vida del Examen](diagramas-arquitectonicos/diagrama-estados-examen.puml)
<img width="700" src="https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/develop/RUP/02-diseno/diagramas-arquitectonicos/diagrama-estados-examen.puml"/>

### [Arquitectura de Clases de Diseño (Backend)](diagramas-arquitectonicos/diagrama-clases-diseno.puml)
<img width="900" src="https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/develop/RUP/02-diseno/diagramas-arquitectonicos/diagrama-clases-diseno.puml"/>

### [Arquitectura Física y Stack Tecnológico](diagramas-arquitectonicos/diagrama-arquitectura-stack.puml)
<img width="700" src="https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/develop/RUP/02-diseno/diagramas-arquitectonicos/diagrama-arquitectura-stack.puml"/>

---

## Catálogo de Realizaciones de Diseño

### Gestión de Exámenes

#### [CU-01] Corregir Exámenes
Lógica de calificación masiva e individual con validación técnica.
<img width="750" alt="Secuencia CU-01" src="https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/develop/RUP/02-diseno/casos-uso/CU-01-corregirExamenes/diseno-secuencia-CU-01-corregirExamenes.puml"/>
> [Ir a Carpeta de Realización](casos-uso/CU-01-corregirExamenes/)

---

#### [CU-02] Generar Examen
Selección aleatoria estratificada por dificultad; cada alumno recibe un examen personalizado.
<img width="750" alt="Secuencia CU-02" src="https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/develop/RUP/02-diseno/casos-uso/CU-02-generarExamenes/diseno-secuencia-CU-02-generarExamenes.puml"/>
> [Ir a Carpeta de Realización](casos-uso/CU-02-generarExamenes/)

---

#### [CU-09] Asignar Exámenes
Vinculación de alumnos al examen con generación de firmas SHA-256.
<img width="750" alt="Secuencia CU-09" src="https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/develop/RUP/02-diseno/casos-uso/CU-09-asignarExamenes/diseno-secuencia-CU-09-asignarExamenes.puml"/>
> [Ir a Carpeta de Realización](casos-uso/CU-09-asignarExamenes/)

---

#### [CU-37] Cancelar Generación
Eliminación de un examen no asignado.
<img width="750" alt="Secuencia CU-37" src="https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/develop/RUP/02-diseno/casos-uso/CU-37-cancelarGeneracion/diseno-secuencia-CU-37-cancelarGeneracion.puml"/>
> [Ir a Carpeta de Realización](casos-uso/CU-37-cancelarGeneracion/)

---

### Configuración e Importación / Exportación

#### [CU-03] Importar Configuración Global
Carga completa del sistema desde un fichero JSON.
<img width="750" alt="Secuencia CU-03" src="https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/develop/RUP/02-diseno/casos-uso/CU-03-importarConfiguracionGlobal/diseno-secuencia-CU-03-importarConfiguracionGlobal.puml"/>
> [Ir a Carpeta de Realización](casos-uso/CU-03-importarConfiguracionGlobal/)

---

#### [CU-04] Exportar Configuración Global
Exportación de toda la configuración del sistema a JSON descargable.
<img width="750" alt="Secuencia CU-04" src="https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/develop/RUP/02-diseno/casos-uso/CU-04-exportarConfiguracionGlobal/diseno-secuencia-CU-04-exportarConfiguracionGlobal.puml"/>
> [Ir a Carpeta de Realización](casos-uso/CU-04-exportarConfiguracionGlobal/)

---

#### [CU-05] Importar Alumnos
Carga masiva de alumnos desde CSV.
<img width="750" alt="Secuencia CU-05" src="https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/develop/RUP/02-diseno/casos-uso/CU-05-importarAlumnos/diseno-secuencia-CU-05-importarAlumnos.puml"/>
> [Ir a Carpeta de Realización](casos-uso/CU-05-importarAlumnos/)

---

#### [CU-06] Importar Preguntas
Carga masiva de preguntas y respuestas desde CSV.
<img width="750" alt="Secuencia CU-06" src="https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/develop/RUP/02-diseno/casos-uso/CU-06-importarPreguntas/diseno-secuencia-CU-06-importarPreguntas.puml"/>
> [Ir a Carpeta de Realización](casos-uso/CU-06-importarPreguntas/)

---

#### CUs Abstractos del Módulo de Exportación *(incluidos por CU-04)*

| CU | Operación |
|---|---|
| [CU-07](casos-uso/CU-07-exportarAlumnos/) | Exportar Alumnos |
| [CU-08](casos-uso/CU-08-exportarPreguntas/) | Exportar Preguntas |
| [CU-40](casos-uso/CU-40-exportarAsignaturas/) | Exportar Asignaturas |
| [CU-41](casos-uso/CU-41-exportarGrados/) | Exportar Grados |

#### CUs Abstractos del Módulo de Importación *(incluidos por CU-03)*

| CU | Operación |
|---|---|
| [CU-38](casos-uso/CU-38-importarAsignaturas/) | Importar Asignaturas |
| [CU-39](casos-uso/CU-39-importarGrados/) | Importar Grados |

---

### Gestión de Preguntas y Respuestas

| CU | Operación | Carpeta |
|---|---|---|
| CU-10 | Crear Pregunta | [Realización](casos-uso/CU-10-crearPregunta/) |
| CU-11 | Editar Pregunta | [Realización](casos-uso/CU-11-editarPregunta/) |
| CU-20 | Ver Preguntas | [Realización](casos-uso/CU-20-verPreguntas/) |
| CU-25 | Eliminar Pregunta | [Realización](casos-uso/CU-25-eliminarPregunta/) |
| CU-33 | Ver Respuestas | [Realización](casos-uso/CU-33-verRespuestas/) |
| CU-34 | Crear Respuesta | [Realización](casos-uso/CU-34-crearRespuesta/) |
| CU-35 | Editar Respuesta | [Realización](casos-uso/CU-35-editarRespuesta/) |
| CU-36 | Eliminar Respuesta | [Realización](casos-uso/CU-36-eliminarRespuesta/) |

---

### Gestión de Alumnos

| CU | Operación | Carpeta |
|---|---|---|
| CU-14 | Crear Alumno | [Realización](casos-uso/CU-14-crearAlumno/) |
| CU-16 | Editar Alumno | [Realización](casos-uso/CU-16-editarAlumno/) |
| CU-23 | Ver Alumnos | [Realización](casos-uso/CU-23-verAlumnos/) |
| CU-28 | Eliminar Alumno | [Realización](casos-uso/CU-28-eliminarAlumno/) |

---

### Gestión de Asignaturas

| CU | Operación | Carpeta |
|---|---|---|
| CU-18 | Crear Asignatura | [Realización](casos-uso/CU-18-crearAsignatura/) |
| CU-12 | Editar Asignatura | [Realización](casos-uso/CU-12-editarAsignatura/) |
| CU-21 | Ver Asignaturas | [Realización](casos-uso/CU-21-verAsignaturas/) |
| CU-26 | Eliminar Asignatura | [Realización](casos-uso/CU-26-eliminarAsignatura/) |

---

### Gestión de Grados

| CU | Operación | Carpeta |
|---|---|---|
| CU-17 | Crear Grado | [Realización](casos-uso/CU-17-crearGrado/) |
| CU-19 | Editar Grado | [Realización](casos-uso/CU-19-editarGrado/) |
| CU-22 | Ver Grados | [Realización](casos-uso/CU-22-verGrados/) |
| CU-27 | Eliminar Grado | [Realización](casos-uso/CU-27-eliminarGrado/) |

---

### Gestión de Docentes

| CU | Operación | Carpeta |
|---|---|---|
| CU-13 | Crear Docente | [Realización](casos-uso/CU-13-crearDocente/) |
| CU-15 | Editar Docente | [Realización](casos-uso/CU-15-editarDocente/) |
| CU-24 | Ver Docentes | [Realización](casos-uso/CU-24-verDocentes/) |
| CU-29 | Eliminar Docente | [Realización](casos-uso/CU-29-eliminarDocente/) |

---

### Sesión y Navegación

| CU | Operación | Carpeta |
|---|---|---|
| CU-30 | Iniciar Sesión | [Realización](casos-uso/CU-30-iniciarSesion/) |
| CU-31 | Cerrar Sesión | [Realización](casos-uso/CU-31-cerrarSesion/) |
| CU-32 | Completar Gestión | [Realización](casos-uso/CU-32-completarGestion/) |

---

[Volver al Panel Maestro](../../README.md)
