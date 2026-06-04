# Jorgestor > CU-36-eliminarRespuesta > AnÃ¡lisis

> |[ðŸ ï¸](/Jorgestor/RUP/README.md)|[ ðŸ“Š](#)|[Detalle](/Jorgestor/RUP/00-casos-uso/02-detalle/CU-36-eliminarRespuesta/README.md)|**AnÃ¡lisis**|DiseÃ±o|Desarrollo|Pruebas|
> |-|-|-|-|-|-|-|

## informaciÃ³n del artefacto

- **Proyecto**: Jorgestor
- **Fase RUP**: Elaboration (ElaboraciÃ³n)
- **Disciplina**: AnÃ¡lisis
- **VersiÃ³n**: 1.0
- **Fecha**: 2026-05-24
- **Autor**: Equipo de desarrollo

## propÃ³sito

AnÃ¡lisis tecnolÃ³gico agnÃ³stico del caso de uso Eliminar Respuesta, siguiendo la metodologÃ­a RUP. Permite analizar el flujo de confirmaciÃ³n y baja definitiva de una respuesta del sistema.

## diagrama de colaboraciÃ³n

<div align=center>

|![AnÃ¡lisis: eliminarRespuesta()](https://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/casos-uso/CU-36-eliminarRespuesta/analisis-colaboracion-CU-36-eliminarRespuesta.puml&fmt=svg)|
|-|
|CÃ³digo fuente: [analisis-colaboracion-CU-36-eliminarRespuesta.puml](analisis-colaboracion-CU-36-eliminarRespuesta.puml)|

</div>

## clases de anÃ¡lisis identificadas

### clases model (naranja #F2AC4E)
|Clase|Responsabilidad|Trazabilidad|
|-|-|-|
|**Answer**|Entidad que serÃ¡ eliminada del sistema|Modelo del dominio|

### clases view (azul #629EF9)
|Clase|Responsabilidad|DerivaciÃ³n|
|-|-|-|
|**AnswerDeletionView**|Interfaz que muestra informaciÃ³n de la respuesta y solicita confirmaciÃ³n|Wireframe|

### clases controller (verde #b5bd68)
|Clase|Responsabilidad|Caso de uso|
|-|-|-|
|**AnswerDeletionController**|Valida la posibilidad de borrado y coordina la eliminaciÃ³n|eliminarRespuesta()|

## mensajes de colaboraciÃ³n

|Origen|Destino|Mensaje|IntenciÃ³n|
|-|-|-|-|
|**Docente**|**AnswerDeletionView**|`solicitarEliminar()`|Iniciar el flujo de borrado|
|**AnswerDeletionView**|**Answer**|`getDatos()`|Obtener detalles para mostrar advertencia|
|**Docente**|**AnswerDeletionView**|`confirmarEliminar()`|Validar la acciÃ³n definitiva|
|**AnswerDeletionView**|**AnswerDeletionController**|`eliminarRespuesta(answer)`|Delegar la ejecuciÃ³n de la baja|
|**AnswerDeletionController**|**Answer**|`delete()`|Eliminar fÃ­sicamente la entidad|

## trazabilidad con artefactos previos

### con especificaciÃ³n detallada
- **Estados internos** â†’ `ConfirmandoEliminacion`, `EliminandoRespuesta`


```plantuml
@startuml eliminarRespuesta-analisis
skinparam linetype polyline

actor Docente
package eliminarRespuesta as "eliminarRespuesta()" {
    rectangle #629EF9 AnswerDeletionView
    rectangle #b5bd68 AnswerDeletionController
    rectangle #F2AC4E Answer
}

Docente -r-> AnswerDeletionView: solicitarEliminar()
AnswerDeletionView --> Answer: getDatos()
Docente --> AnswerDeletionView: confirmarEliminar()
AnswerDeletionView -d-> AnswerDeletionController: eliminarRespuesta()
AnswerDeletionController --> Answer: delete()

@enduml
```















































