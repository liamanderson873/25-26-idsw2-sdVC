# Jorgestor > CU-34-crearRespuesta > AnÃ¡lisis

> |[ðŸ ï¸](/Jorgestor/RUP/README.md)|[ ðŸ“Š](#)|[Detalle](/Jorgestor/RUP/00-casos-uso/02-detalle/CU-34-crearRespuesta/README.md)|**AnÃ¡lisis**|DiseÃ±o|Desarrollo|Pruebas|
> |-|-|-|-|-|-|-|

## informaciÃ³n del artefacto

- **Proyecto**: Jorgestor
- **Fase RUP**: Elaboration (ElaboraciÃ³n)
- **Disciplina**: AnÃ¡lisis
- **VersiÃ³n**: 1.0
- **Fecha**: 2026-05-24
- **Autor**: Equipo de desarrollo

## propÃ³sito

AnÃ¡lisis tecnolÃ³gico agnÃ³stico del caso de uso Crear Respuesta, siguiendo la metodologÃ­a RUP. Permite analizar el proceso de alta de una nueva respuesta vinculada a una pregunta.

## diagrama de colaboraciÃ³n

<div align=center>

|![AnÃ¡lisis: crearRespuesta()](https://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/casos-uso/CU-34-crearRespuesta/analisis-colaboracion-CU-34-crearRespuesta.puml&fmt=svg)|
|-|
|CÃ³digo fuente: [analisis-colaboracion-CU-34-crearRespuesta.puml](analisis-colaboracion-CU-34-crearRespuesta.puml)|

</div>

## clases de anÃ¡lisis identificadas

### clases model (naranja #F2AC4E)
|Clase|Responsabilidad|Trazabilidad|
|-|-|-|
|**Answer**|Entidad que almacena el contenido y validez de la respuesta|Modelo del dominio|
|**Question**|Entidad a la que se asocia la nueva respuesta|Modelo del dominio|

### clases view (azul #629EF9)
|Clase|Responsabilidad|DerivaciÃ³n|
|-|-|-|
|**AnswerCreationView**|Interfaz para introducir datos mÃ­nimos y confirmar la creaciÃ³n|Wireframe|

### clases controller (verde #b5bd68)
|Clase|Responsabilidad|Caso de uso|
|-|-|-|
|**AnswerCreationController**|Valida datos y coordina la creaciÃ³n de la entidad|crearRespuesta()|

## mensajes de colaboraciÃ³n

|Origen|Destino|Mensaje|IntenciÃ³n|
|-|-|-|-|
|**Docente**|**AnswerCreationView**|`solicitarCrear()`|Manifestar intenciÃ³n de crear respuesta|
|**AnswerCreationView**|**Docente**|`pedirDatos()`|Solicitar contenido y veracidad|
|**Docente**|**AnswerCreationView**|`proporcionarDatos()`|Introducir la informaciÃ³n requerida|
|**AnswerCreationView**|**AnswerCreationController**|`crearRespuesta(datos)`|Delegar la lÃ³gica de creaciÃ³n|
|**AnswerCreationController**|**Answer**|`new()`|Instanciar la nueva entidad|
|**AnswerCreationController**|**Question**|`addAnswer(answer)`|Vincular la respuesta a la pregunta|

## trazabilidad con artefactos previos

### con especificaciÃ³n detallada
- **Estados internos** â†’ `SolicitandoDatosRespuesta`, `ProcesandoCreacion`


```plantuml
@startuml crearRespuesta-analisis
skinparam linetype polyline

actor Docente
package crearRespuesta as "crearRespuesta()" {
    rectangle #629EF9 AnswerCreationView
    rectangle #b5bd68 AnswerCreationController
    rectangle #F2AC4E Answer
    rectangle #F2AC4E Question
}

Docente -r-> AnswerCreationView: solicitarCrear()
AnswerCreationView --> Docente: pedirDatos()
Docente --> AnswerCreationView: proporcionarDatos()
AnswerCreationView -d-> AnswerCreationController: crearRespuesta()
AnswerCreationController --> Answer: new()
AnswerCreationController --> Question: addAnswer()

@enduml
```















































