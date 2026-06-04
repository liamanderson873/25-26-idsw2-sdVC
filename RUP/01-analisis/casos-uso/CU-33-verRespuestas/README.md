# Jorgestor > CU-33-verRespuestas > AnÃ¡lisis

> |[ðŸ ï¸](/Jorgestor/RUP/README.md)|[ ðŸ“Š](#)|[Detalle](/Jorgestor/RUP/00-casos-uso/02-detalle/CU-33-verRespuestas/README.md)|**AnÃ¡lisis**|DiseÃ±o|Desarrollo|Pruebas|
> |-|-|-|-|-|-|-|

## informaciÃ³n del artefacto

- **Proyecto**: Jorgestor
- **Fase RUP**: Elaboration (ElaboraciÃ³n)
- **Disciplina**: AnÃ¡lisis
- **VersiÃ³n**: 1.0
- **Fecha**: 2026-05-24
- **Autor**: Equipo de desarrollo

## propÃ³sito

AnÃ¡lisis tecnolÃ³gico agnÃ³stico del caso de uso Ver Respuestas, siguiendo la metodologÃ­a RUP. Permite analizar la lÃ³gica de visualizaciÃ³n y filtrado de las respuestas asociadas a una pregunta.

## diagrama de colaboraciÃ³n

<div align=center>

|![AnÃ¡lisis: verRespuestas()](https://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/casos-uso/CU-33-verRespuestas/analisis-colaboracion-CU-33-verRespuestas.puml&fmt=svg)|
|-|
|CÃ³digo fuente: [analisis-colaboracion-CU-33-verRespuestas.puml](analisis-colaboracion-CU-33-verRespuestas.puml)|

</div>

## clases de anÃ¡lisis identificadas

### clases model (naranja #F2AC4E)
|Clase|Responsabilidad|Trazabilidad|
|-|-|-|
|**Answer**|Representa una respuesta con su contenido y veracidad|Modelo del dominio|
|**Question**|Representa la pregunta a la que pertenecen las respuestas|Modelo del dominio|

### clases view (azul #629EF9)
|Clase|Responsabilidad|DerivaciÃ³n|
|-|-|-|
|**AnswerListView**|Interfaz que muestra la lista de respuestas y permite filtrar|Wireframe|

### clases controller (verde #b5bd68)
|Clase|Responsabilidad|Caso de uso|
|-|-|-|
|**AnswerConsultationController**|Gestiona la recuperaciÃ³n y el filtrado de respuestas|verRespuestas()|

## mensajes de colaboraciÃ³n

|Origen|Destino|Mensaje|IntenciÃ³n|
|-|-|-|-|
|**Docente**|**AnswerListView**|`solicitarVerRespuestas()`|Solicitar la lista de respuestas|
|**AnswerListView**|**AnswerConsultationController**|`getRespuestas(question)`|Recuperar respuestas de la entidad|
|**AnswerConsultationController**|**Answer**|`find(question)`|Consultar entidades vinculadas|
|**AnswerListView**|**Docente**|`mostrarLista()`|Presentar las respuestas al usuario|
|**Docente**|**AnswerListView**|`solicitarFiltro()`|Aplicar criterios de filtrado|
|**AnswerListView**|**AnswerConsultationController**|`filtrar(criterios)`|Procesar el filtro solicitado|

## trazabilidad con artefactos previos

### con especificaciÃ³n detallada
- **Estados internos** â†’ `MostrandoRespuestas`, `FiltrandoRespuestas`


```plantuml
@startuml verRespuestas-analisis
skinparam linetype polyline

actor Docente
package verRespuestas as "verRespuestas()" {
    rectangle #629EF9 AnswerListView
    rectangle #b5bd68 AnswerConsultationController
    rectangle #F2AC4E Answer
    rectangle #F2AC4E Question
}

Docente -r-> AnswerListView: solicitarVerRespuestas()
AnswerListView --> AnswerConsultationController: getRespuestas()
AnswerConsultationController --> Answer: find()
AnswerConsultationController --> Question: getDatos()
Docente --> AnswerListView: solicitarFiltro()
AnswerListView --> AnswerConsultationController: filtrar()

@enduml
```















































