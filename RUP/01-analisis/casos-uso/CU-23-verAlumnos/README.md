# Jorgestor > CU-23-verAlumnos > AnÃ¡lisis

## informaciÃ³n del artefacto

- **Proyecto**: Jorgestor
- **Fase RUP**: Elaboration (ElaboraciÃ³n)
- **Disciplina**: AnÃ¡lisis
- **VersiÃ³n**: 1.0
- **Fecha**: 2026-05-24
- **Autor**: Equipo de desarrollo

## propÃ³sito

AnÃ¡lisis del caso de uso Ver Alumnos. Enfocado en el listado y bÃºsqueda de estudiantes.

## diagrama de colaboraciÃ³n

<div align=center>

|![AnÃ¡lisis: verAlumnos()](https://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/diseno-secuencia-CU-23-verAlumnos.puml&fmt=svg)|
|-|
|CÃ³digo fuente: [analisis-colaboracion-CU-23-verAlumnos.puml](analisis-colaboracion-CU-23-verAlumnos.puml)|

</div>

## clases de anÃ¡lisis identificadas

### clases model (naranja #F2AC4E)
|Clase|Responsabilidad|Trazabilidad|
|-|-|-|
|**Student**|Representa al alumno con sus datos personales|Modelo del dominio|

### clases view (azul #629EF9)
|Clase|Responsabilidad|DerivaciÃ³n|
|-|-|-|
|**StudentListView**|Interfaz para visualizar lista y solicitar filtrado de alumnos|Wireframe|

### clases controller (verde #b5bd68)
|Clase|Responsabilidad|Caso de uso|
|-|-|-|
|**StudentController**|Obtiene colecciÃ³n de alumnos y aplica filtros|verAlumnos()|

## mensajes de colaboraciÃ³n

|Origen|Destino|Mensaje|IntenciÃ³n|
|-|-|-|-|
|**Docente**|**StudentListView**|`solicitarVerAlumnos()`|Iniciar visualizaciÃ³n|
|**StudentListView**|**StudentController**|`cargarAlumnos()`|Delegar recuperaciÃ³n|
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
















































