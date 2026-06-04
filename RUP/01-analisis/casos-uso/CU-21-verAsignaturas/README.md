# Jorgestor > CU-21-verAsignaturas > AnÃ¡lisis

> |[ðŸ ï¸](/Jorgestor/RUP/README.md)|[ ðŸ“Š](#)|[Detalle](/Jorgestor/RUP/00-casos-uso/02-detalle/CU-21-verAsignaturas/README.md)|**AnÃ¡lisis**|DiseÃ±o|Desarrollo|Pruebas|
> |-|-|-|-|-|-|-|

## informaciÃ³n del artefacto

- **Proyecto**: Jorgestor
- **Fase RUP**: Elaboration (ElaboraciÃ³n)
- **Disciplina**: AnÃ¡lisis
- **VersiÃ³n**: 1.0
- **Fecha**: 2026-05-24
- **Autor**: Equipo de desarrollo

## propÃ³sito

AnÃ¡lisis del caso de uso Ver Asignaturas. Enfocado en la visualizaciÃ³n y filtrado de las materias.

## diagrama de colaboraciÃ³n

<div align=center>

|![AnÃ¡lisis: verAsignaturas()](https://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/diseno-secuencia-CU-21-verAsignaturas.puml&fmt=svg)|
|-|
|CÃ³digo fuente: [analisis-colaboracion-CU-21-verAsignaturas.puml](analisis-colaboracion-CU-21-verAsignaturas.puml)|

</div>

## clases de anÃ¡lisis identificadas

### clases model (naranja #F2AC4E)
|Clase|Responsabilidad|Trazabilidad|
|-|-|-|
|**Subject**|Representa la asignatura con su informaciÃ³n bÃ¡sica y relaciones|Modelo del dominio|
|**Student**|Necesario para contabilizar o listar los alumnos matriculados|Modelo del dominio|
|**Grade**|Necesario para mostrar los grados asociados|Modelo del dominio|

### clases view (azul #629EF9)
|Clase|Responsabilidad|DerivaciÃ³n|
|-|-|-|
|**SubjectListView**|Interfaz para visualizar lista y solicitar filtrado|Wireframe|

### clases controller (verde #b5bd68)
|Clase|Responsabilidad|Caso de uso|
|-|-|-|
|**SubjectController**|Recupera lista completa y procesa solicitudes de filtrado|verAsignaturas()|

## mensajes de colaboraciÃ³n

|Origen|Destino|Mensaje|IntenciÃ³n|
|-|-|-|-|
|**Docente**|**SubjectListView**|`solicitarVerAsignaturas()`|Iniciar visualizaciÃ³n|
|**SubjectListView**|**SubjectController**|`obtenerLista()`|Delegar recuperaciÃ³n|
|**SubjectController**|**Subject**|`consultarTodos()`|Consultar entidades|
|**Docente**|**SubjectListView**|`aplicarFiltro(criterios)`|Solicitar filtrado|
|**SubjectListView**|**SubjectController**|`filtrar(criterios)`|Procesar criterios|

## trazabilidad con artefactos previos

- **Estados**: `ShowingSubjects`, `FilteringSubjects`.

```plantuml
@startuml verAsignaturas-analisis
skinparam linetype polyline

actor Docente
package verAsignaturas as "verAsignaturas()" {
    rectangle #629EF9 SubjectListView
    rectangle #b5bd68 SubjectController
    rectangle #F2AC4E Subject
    rectangle #F2AC4E Student
    rectangle #F2AC4E Grade
}

Docente -r-> SubjectListView: solicitarVerAsignaturas()
SubjectListView -d-> SubjectController: obtenerLista()
SubjectController --> Subject: consultarTodos()
Subject --> Student
Subject --> Grade

Docente --> SubjectListView: aplicarFiltro(criterios)
SubjectListView --> SubjectController: filtrar(criterios)
SubjectController --> Subject: consultar(criterios)

@enduml
```















































