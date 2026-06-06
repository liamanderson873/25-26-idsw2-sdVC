# Jorgestor > CU-20-verPreguntas > AnÃ¡lisis

## informaciÃ³n del artefacto

- **Proyecto**: Jorgestor
- **Fase RUP**: Elaboration (ElaboraciÃ³n)
- **Disciplina**: AnÃ¡lisis
- **VersiÃ³n**: 1.0
- **Fecha**: 2026-05-24
- **Autor**: Equipo de desarrollo

## propÃ³sito

AnÃ¡lisis del caso de uso Ver Preguntas. Enfocado en la visualizaciÃ³n y filtrado de la baterÃ­a.

## diagrama de colaboraciÃ³n

<div align=center>

|![AnÃ¡lisis: verPreguntas()](https://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/diseno-secuencia-CU-20-verPreguntas.puml&fmt=svg)|
|-|
|CÃ³digo fuente: [analisis-colaboracion-CU-20-verPreguntas.puml](analisis-colaboracion-CU-20-verPreguntas.puml)|

</div>

## clases de anÃ¡lisis identificadas

### clases model (naranja #F2AC4E)
|Clase|Responsabilidad|Trazabilidad|
|-|-|-|
|**Question**|Representa cada pregunta en el sistema|Modelo del dominio|
|**Subject**|Necesario para filtrado contextual|Modelo del dominio|

### clases view (azul #629EF9)
|Clase|Responsabilidad|DerivaciÃ³n|
|-|-|-|
|**QuestionListView**|Interfaz para visualizar lista y solicitar filtrado|Wireframe|

### clases controller (verde #b5bd68)
|Clase|Responsabilidad|Caso de uso|
|-|-|-|
|**QuestionController**|Recupera lista y aplica criterios de filtrado|verPreguntas()|

## mensajes de colaboraciÃ³n

|Origen|Destino|Mensaje|IntenciÃ³n|
|-|-|-|-|
|**Docente**|**QuestionListView**|`solicitarVerPreguntas()`|Iniciar visualizaciÃ³n|
|**QuestionListView**|**QuestionController**|`obtenerLista(contexto)`|Delegar recuperaciÃ³n|
|**QuestionController**|**Question**|`consultar(contexto)`|Consultar entidades|
|**Docente**|**QuestionListView**|`aplicarFiltro(criterios)`|Solicitar filtrado|
|**QuestionListView**|**QuestionController**|`filtrar(criterios)`|Procesar criterios|

## trazabilidad con artefactos previos

- **Estados**: `ShowingQuestions` (lista inicial), `FilteringQuestions` (resultados filtrados).

```plantuml
@startuml verPreguntas-analisis
skinparam linetype polyline

actor Docente
package verPreguntas as "verPreguntas()" {
    rectangle #629EF9 QuestionListView
    rectangle #b5bd68 QuestionController
    rectangle #F2AC4E Question
    rectangle #F2AC4E Subject
}

Docente -r-> QuestionListView: solicitarVerPreguntas()
QuestionListView -d-> QuestionController: obtenerLista(contexto)
QuestionController --> Question: consultar(contexto)

Docente --> QuestionListView: aplicarFiltro(criterios)
QuestionListView --> QuestionController: filtrar(criterios)
QuestionController --> Question: consultar(criterios)

@enduml
```
















































