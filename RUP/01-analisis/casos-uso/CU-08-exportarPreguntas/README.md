# Jorgestor > CU-08-exportarPreguntas > Análisis

## información del artefacto

- **Proyecto**: Jorgestor
- **Fase RUP**: Elaboration (Elaboración)
- **Disciplina**: Análisis
- **Versión**: 1.0
- **Fecha**: 2026-05-24
- **Autor**: Equipo de desarrollo

## propósito

Análisis del caso de uso Exportar Preguntas.

## diagrama de colaboración

<div align=center>

|![Análisis: exportarPreguntas()](https://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/casos-uso/CU-08-exportarPreguntas/analisis-colaboracion-CU-08-exportarPreguntas.puml&fmt=svg)|
|-|
|Código fuente: [analisis-colaboracion-CU-08-exportarPreguntas.puml](analisis-colaboracion-CU-08-exportarPreguntas.puml)|

</div>

## clases de análisis identificadas

### clases model (naranja #F2AC4E)
|Clase|Responsabilidad|Trazabilidad|
|-|-|-|
|**Question**|Representa la pregunta con enunciado y metadatos|Modelo del dominio|
|**Answer**|Contiene las opciones de respuesta|Modelo del dominio|

### clases view (azul #629EF9)
|Clase|Responsabilidad|Derivación|
|-|-|-|
|**QuestionExportView**|Interfaz para gestionar exportación|Wireframe|

### clases controller (verde #b5bd68)
|Clase|Responsabilidad|Caso de uso|
|-|-|-|
|**ExportController**|Orquesta recopilación y asegura integridad|exportarPreguntas()|

## mensajes de colaboración

|Origen|Destino|Mensaje|Intención|
|-|-|-|-|
|**Docente**|**QuestionExportView**|`exportarPreguntas()`|Solicitar exportación|
|**QuestionExportView**|**ExportController**|`recopilarPreguntas()`|Delegar recopilación|
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
















































