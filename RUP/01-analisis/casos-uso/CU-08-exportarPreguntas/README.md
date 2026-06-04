# Jorgestor > CU-08-exportarPreguntas > AnÃ¡lisis

> |[ðŸ ï¸](/Jorgestor/RUP/README.md)|[ ðŸ“Š](#)|[Detalle](/Jorgestor/RUP/00-casos-uso/02-detalle/CU-08-exportarPreguntas/README.md)|**AnÃ¡lisis**|DiseÃ±o|Desarrollo|Pruebas|
> |-|-|-|-|-|-|-|

## informaciÃ³n del artefacto

- **Proyecto**: Jorgestor
- **Fase RUP**: Elaboration (ElaboraciÃ³n)
- **Disciplina**: AnÃ¡lisis
- **VersiÃ³n**: 1.0
- **Fecha**: 2026-05-24
- **Autor**: Equipo de desarrollo

## propÃ³sito

AnÃ¡lisis del caso de uso Exportar Preguntas.

## diagrama de colaboraciÃ³n

<div align=center>

|![AnÃ¡lisis: exportarPreguntas()](https://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/casos-uso/CU-08-exportarPreguntas/analisis-colaboracion-CU-08-exportarPreguntas.puml&fmt=svg)|
|-|
|CÃ³digo fuente: [analisis-colaboracion-CU-08-exportarPreguntas.puml](analisis-colaboracion-CU-08-exportarPreguntas.puml)|

</div>

## clases de anÃ¡lisis identificadas

### clases model (naranja #F2AC4E)
|Clase|Responsabilidad|Trazabilidad|
|-|-|-|
|**Question**|Representa la pregunta con enunciado y metadatos|Modelo del dominio|
|**Answer**|Contiene las opciones de respuesta|Modelo del dominio|

### clases view (azul #629EF9)
|Clase|Responsabilidad|DerivaciÃ³n|
|-|-|-|
|**QuestionExportView**|Interfaz para gestionar exportaciÃ³n|Wireframe|

### clases controller (verde #b5bd68)
|Clase|Responsabilidad|Caso de uso|
|-|-|-|
|**ExportController**|Orquesta recopilaciÃ³n y asegura integridad|exportarPreguntas()|

## mensajes de colaboraciÃ³n

|Origen|Destino|Mensaje|IntenciÃ³n|
|-|-|-|-|
|**Docente**|**QuestionExportView**|`exportarPreguntas()`|Solicitar exportaciÃ³n|
|**QuestionExportView**|**ExportController**|`recopilarPreguntas()`|Delegar recopilaciÃ³n|
|**ExportController**|**Question**|`obtenerPreguntas()`|Consultar fuente|
|**ExportController**|**Answer**|`obtenerRespuestas(pregunta)`|Consultar respuestas asociadas|
|**ExportController**|**QuestionExportView**|`notificarExito()`|Informar resultado|

## trazabilidad con artefactos previos

- **Integridad**: Debe incluir todas las respuestas asociadas a cada pregunta.

```plantuml
@startuml exportarPreguntas-analisis
skinparam linetype polyline

actor Docente
package exportarPreguntas as "exportarPreguntas()" {
    rectangle #629EF9 QuestionExportView
    rectangle #b5bd68 ExportController
    rectangle #F2AC4E Question
    rectangle #F2AC4E Answer
}

Docente -r-> QuestionExportView: exportarPreguntas()
QuestionExportView -d-> ExportController: recopilarPreguntas()
ExportController --> Question: obtenerPreguntas()
ExportController --> Answer: obtenerRespuestas(pregunta)
ExportController --> QuestionExportView: notificarExito()

@enduml
```















































