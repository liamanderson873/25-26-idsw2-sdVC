<div align=right>

|[![](https://img.shields.io/badge/-Inicio-FFF?style=flat&logo=Emlakjet&logoColor=black)](/README.md) [![](https://img.shields.io/badge/-RUP-FFF?style=flat&logo=Elsevier&logoColor=black)](/RUP/README.md)|
|-:|

</div>

# Diseño — Jorgestor

Disciplina de diseño RUP. Cada caso de uso tiene un diagrama de secuencia a nivel de implementación (Spring Boot / React / PostgreSQL). Además, cuatro diagramas arquitectónicos describen la estructura global del sistema.

## Diagramas arquitectónicos

<div align=center>

|Modelo del dominio (ER)|Ciclo de vida del examen|
|:-:|:-:|
|<img width="420" src="https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/02-diseno/diagramas-arquitectonicos/diagrama-entidad-relacion.puml"/>|<img width="420" src="https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/02-diseno/diagramas-arquitectonicos/diagrama-estados-examen.puml"/>|

|Clases de diseño (Backend)|Arquitectura física y stack|
|:-:|:-:|
|<img width="420" src="https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/02-diseno/diagramas-arquitectonicos/diagrama-clases-diseno.puml"/>|<img width="420" src="https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/02-diseno/diagramas-arquitectonicos/diagrama-arquitectura-stack.puml"/>|

</div>

## Casos de uso (43)

### Gestión de Exámenes

|CU|Caso de uso|
|-|-|
[CU-01](casos-uso/CU-01-corregirExamenes/)|Corregir Exámenes
[CU-02](casos-uso/CU-02-generarExamenes/)|Generar Exámenes
[CU-09](casos-uso/CU-09-asignarExamenes/)|Asignar Exámenes
[CU-37](casos-uso/CU-37-cancelarGeneracion/)|Cancelar Generación
[CU-42](casos-uso/CU-42-verExamen/)|Ver Examen
[CU-43](casos-uso/CU-43-verExamenes/)|Ver Exámenes

### Configuración Global

|CU|Caso de uso|
|-|-|
[CU-03](casos-uso/CU-03-importarConfiguracionGlobal/)|Importar Configuración Global
[CU-04](casos-uso/CU-04-exportarConfiguracionGlobal/)|Exportar Configuración Global
[CU-05](casos-uso/CU-05-importarAlumnos/)|Importar Alumnos
[CU-06](casos-uso/CU-06-importarPreguntas/)|Importar Preguntas
[CU-07](casos-uso/CU-07-exportarAlumnos/)|Exportar Alumnos *(abstracto)*
[CU-08](casos-uso/CU-08-exportarPreguntas/)|Exportar Preguntas *(abstracto)*
[CU-38](casos-uso/CU-38-importarAsignaturas/)|Importar Asignaturas *(abstracto)*
[CU-39](casos-uso/CU-39-importarGrados/)|Importar Grados *(abstracto)*
[CU-40](casos-uso/CU-40-exportarAsignaturas/)|Exportar Asignaturas *(abstracto)*
[CU-41](casos-uso/CU-41-exportarGrados/)|Exportar Grados *(abstracto)*

### Preguntas y Respuestas

|CU|Caso de uso|
|-|-|
[CU-10](casos-uso/CU-10-crearPregunta/)|Crear Pregunta
[CU-11](casos-uso/CU-11-editarPregunta/)|Editar Pregunta
[CU-20](casos-uso/CU-20-verPreguntas/)|Ver Preguntas
[CU-25](casos-uso/CU-25-eliminarPregunta/)|Eliminar Pregunta
[CU-33](casos-uso/CU-33-verRespuestas/)|Ver Respuestas
[CU-34](casos-uso/CU-34-crearRespuesta/)|Crear Respuesta
[CU-35](casos-uso/CU-35-editarRespuesta/)|Editar Respuesta
[CU-36](casos-uso/CU-36-eliminarRespuesta/)|Eliminar Respuesta

### Alumnos · Asignaturas · Grados

|CU|Caso de uso|
|-|-|
[CU-14](casos-uso/CU-14-crearAlumno/)|Crear Alumno
[CU-16](casos-uso/CU-16-editarAlumno/)|Editar Alumno
[CU-23](casos-uso/CU-23-verAlumnos/)|Ver Alumnos
[CU-28](casos-uso/CU-28-eliminarAlumno/)|Eliminar Alumno
[CU-12](casos-uso/CU-12-editarAsignatura/)|Editar Asignatura
[CU-18](casos-uso/CU-18-crearAsignatura/)|Crear Asignatura
[CU-21](casos-uso/CU-21-verAsignaturas/)|Ver Asignaturas
[CU-26](casos-uso/CU-26-eliminarAsignatura/)|Eliminar Asignatura
[CU-17](casos-uso/CU-17-crearGrado/)|Crear Grado
[CU-19](casos-uso/CU-19-editarGrado/)|Editar Grado
[CU-22](casos-uso/CU-22-verGrados/)|Ver Grados
[CU-27](casos-uso/CU-27-eliminarGrado/)|Eliminar Grado

### Docentes · Sesión

|CU|Caso de uso|
|-|-|
[CU-13](casos-uso/CU-13-crearDocente/)|Crear Docente
[CU-15](casos-uso/CU-15-editarDocente/)|Editar Docente
[CU-24](casos-uso/CU-24-verDocentes/)|Ver Docentes
[CU-29](casos-uso/CU-29-eliminarDocente/)|Eliminar Docente
[CU-30](casos-uso/CU-30-iniciarSesion/)|Iniciar Sesión
[CU-31](casos-uso/CU-31-cerrarSesion/)|Cerrar Sesión
[CU-32](casos-uso/CU-32-completarGestion/)|Completar Gestión
