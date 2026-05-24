# Jorgestor > CU-23-verAlumnos > Análisis

> |[🏠️](/Jorgestor/RUP/README.md)|[ 📊](#)|[Detalle](/Jorgestor/RUP/00-casos-uso/02-detalle/CU-23-verAlumnos/README.md)|**Análisis**|Diseño|Desarrollo|Pruebas|
> |-|-|-|-|-|-|-|

## información del artefacto

- **Proyecto**: Jorgestor
- **Fase RUP**: Elaboration (Elaboración)
- **Disciplina**: Análisis
- **Versión**: 1.0
- **Fecha**: 2026-05-24
- **Autor**: Equipo de desarrollo

## propósito

Análisis del caso de uso Ver Alumnos. Enfocado en el listado y búsqueda de estudiantes.

## diagrama de colaboración

<div align=center>

|![Análisis: verAlumnos()](https://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/casos-uso/CU-23-verAlumnos/colaboracion.puml&fmt=svg)|
|-|
|Código fuente: [colaboracion.puml](colaboracion.puml)|

</div>

## clases de análisis identificadas

### clases model (naranja #F2AC4E)
|Clase|Responsabilidad|Trazabilidad|
|-|-|-|
|**Student**|Representa al alumno con sus datos personales|Modelo del dominio|

### clases view (azul #629EF9)
|Clase|Responsabilidad|Derivación|
|-|-|-|
|**StudentListView**|Interfaz para visualizar lista y solicitar filtrado de alumnos|Wireframe|

### clases controller (verde #b5bd68)
|Clase|Responsabilidad|Caso de uso|
|-|-|-|
|**StudentController**|Obtiene colección de alumnos y aplica filtros|verAlumnos()|

## mensajes de colaboración

|Origen|Destino|Mensaje|Intención|
|-|-|-|-|
|**Docente**|**StudentListView**|`solicitarVerAlumnos()`|Iniciar visualización|
|**StudentListView**|**StudentController**|`cargarAlumnos()`|Delegar recuperación|
|**StudentController**|**Student**|`consultarTodos()`|Consultar entidades|
|**Docente**|**StudentListView**|`aplicarFiltro(criterios)`|Solicitar filtrado|
|**StudentListView**|**StudentController**|`filtrar(criterios)`|Procesar criterios|

## trazabilidad con artefactos previos

- **Estados**: `ShowingStudents`, `FilteringStudents`.

```plantuml
@startuml verAlumnos-analisis
skinparam linetype polyline

actor Docente
package verAlumnos as "verAlumnos()" {
    rectangle #629EF9 StudentListView
    rectangle #b5bd68 StudentController
    rectangle #F2AC4E Student
}

Docente -r-> StudentListView: solicitarVerAlumnos()
StudentListView -d-> StudentController: cargarAlumnos()
StudentController --> Student: consultarTodos()

Docente --> StudentListView: aplicarFiltro(criterios)
StudentListView --> StudentController: filtrar(criterios)
StudentController --> Student: consultar(criterios)

@enduml
```
