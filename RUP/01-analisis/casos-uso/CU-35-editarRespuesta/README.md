# Jorgestor > CU-35-editarRespuesta > AnÃ¡lisis

> |[ðŸ ï¸](/Jorgestor/RUP/README.md)|[ ðŸ“Š](#)|[Detalle](/Jorgestor/RUP/00-casos-uso/02-detalle/CU-35-editarRespuesta/README.md)|**AnÃ¡lisis**|DiseÃ±o|Desarrollo|Pruebas|
> |-|-|-|-|-|-|-|

## informaciÃ³n del artefacto

- **Proyecto**: Jorgestor
- **Fase RUP**: Elaboration (ElaboraciÃ³n)
- **Disciplina**: AnÃ¡lisis
- **VersiÃ³n**: 1.0
- **Fecha**: 2026-05-24
- **Autor**: Equipo de desarrollo

## propÃ³sito

AnÃ¡lisis tecnolÃ³gico agnÃ³stico del caso de uso Editar Respuesta, siguiendo la metodologÃ­a RUP. Permite analizar el proceso de modificaciÃ³n de una respuesta existente.

## diagrama de colaboraciÃ³n

<div align=center>

|![AnÃ¡lisis: editarRespuesta()](https://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/casos-uso/CU-35-editarRespuesta/analisis-colaboracion-CU-35-editarRespuesta.puml&fmt=svg)|
|-|
|CÃ³digo fuente: [analisis-colaboracion-CU-35-editarRespuesta.puml](analisis-colaboracion-CU-35-editarRespuesta.puml)|

</div>

## clases de anÃ¡lisis identificadas

### clases model (naranja #F2AC4E)
|Clase|Responsabilidad|Trazabilidad|
|-|-|-|
|**Answer**|Entidad que contiene la informaciÃ³n de la respuesta a editar|Modelo del dominio|

### clases view (azul #629EF9)
|Clase|Responsabilidad|DerivaciÃ³n|
|-|-|-|
|**AnswerEditionView**|Interfaz para visualizar y modificar datos de la respuesta|Wireframe|

### clases controller (verde #b5bd68)
|Clase|Responsabilidad|Caso de uso|
|-|-|-|
|**AnswerEditionController**|Gestiona la carga, validaciÃ³n y persistencia de cambios|editarRespuesta()|

## mensajes de colaboraciÃ³n

|Origen|Destino|Mensaje|IntenciÃ³n|
|-|-|-|-|
|**Docente**|**AnswerEditionView**|`solicitarEditar()`|Iniciar la ediciÃ³n de una respuesta|
|**AnswerEditionView**|**AnswerEditionController**|`getDatos(answer)`|Recuperar informaciÃ³n actual|
|**AnswerEditionController**|**Answer**|`read()`|Consultar el estado de la entidad|
|**Docente**|**AnswerEditionView**|`modificarCampos()`|Introducir cambios en la interfaz|
|**Docente**|**AnswerEditionView**|`confirmarGuardar()`|Solicitar la persistencia de cambios|
|**AnswerEditionView**|**AnswerEditionController**|`actualizarRespuesta(datos)`|Coordinar la actualizaciÃ³n|
|**AnswerEditionController**|**Answer**|`update()`|Persistir las modificaciones|

## trazabilidad con artefactos previos

### con especificaciÃ³n detallada
- **Estados internos** â†’ `EditandoDatos`, `GuardandoDatos`


```plantuml
@startuml editarRespuesta-analisis
skinparam linetype polyline

actor Docente
package editarRespuesta as "editarRespuesta()" {
    rectangle #629EF9 AnswerEditionView
    rectangle #b5bd68 AnswerEditionController
    rectangle #F2AC4E Answer
}

Docente -r-> AnswerEditionView: solicitarEditar()
AnswerEditionView --> AnswerEditionController: getDatos()
AnswerEditionController --> Answer: read()
Docente --> AnswerEditionView: modificarCampos()
Docente --> AnswerEditionView: confirmarGuardar()
AnswerEditionView -d-> AnswerEditionController: actualizarRespuesta()
AnswerEditionController --> Answer: update()

@enduml
```















































