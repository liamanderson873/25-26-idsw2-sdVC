# Jorgestor > CU-32-completarGestion > AnÃ¡lisis

## informaciÃ³n del artefacto

- **Proyecto**: Jorgestor
- **Fase RUP**: Elaboration (ElaboraciÃ³n)
- **Disciplina**: AnÃ¡lisis
- **VersiÃ³n**: 1.0
- **Fecha**: 2026-05-24
- **Autor**: Equipo de desarrollo

## propÃ³sito

AnÃ¡lisis tecnolÃ³gico agnÃ³stico del caso de uso Completar GestiÃ³n, siguiendo la metodologÃ­a RUP. Permite analizar la transiciÃ³n desde estados de gestiÃ³n hacia la disponibilidad general del sistema.

## diagrama de colaboraciÃ³n

<div align=center>

|![AnÃ¡lisis: completarGestion()](https://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/casos-uso/CU-32-completarGestion/analisis-colaboracion-CU-32-completarGestion.puml&fmt=svg)|
|-|
|CÃ³digo fuente: [analisis-colaboracion-CU-32-completarGestion.puml](analisis-colaboracion-CU-32-completarGestion.puml)|

</div>

## clases de anÃ¡lisis identificadas

### clases model (naranja #F2AC4E)
|Clase|Responsabilidad|Trazabilidad|
|-|-|-|
|**SystemState**|Representa el estado global y la navegaciÃ³n del sistema|Modelo del dominio|

### clases view (azul #629EF9)
|Clase|Responsabilidad|DerivaciÃ³n|
|-|-|-|
|**ManagementView**|Interfaz comÃºn para Ã¡reas de gestiÃ³n que permite finalizar la operaciÃ³n|Wireframe|

### clases controller (verde #b5bd68)
|Clase|Responsabilidad|Caso de uso|
|-|-|-|
|**ManagementController**|Gestiona la transiciÃ³n de estado y asegura el procesado de cambios|completarGestion()|

## mensajes de colaboraciÃ³n

|Origen|Destino|Mensaje|IntenciÃ³n|
|-|-|-|-|
|**Usuario**|**ManagementView**|`completarGestion()`|Solicitar la finalizaciÃ³n de la gestiÃ³n actual|
|**ManagementView**|**ManagementController**|`finalizar()`|Coordinar el retorno al estado de disponibilidad|
|**ManagementController**|**SystemState**|`setDisponible()`|Actualizar el estado global del sistema|

## trazabilidad con artefactos previos

### con especificaciÃ³n detallada
- **Estados internos** â†’ `PresentandoOpciones`


```plantuml
@startuml completarGestion-analisis
skinparam linetype polyline

actor Usuario
package completarGestion as "completarGestion()" {
    rectangle #629EF9 ManagementView
    rectangle #b5bd68 ManagementController
    rectangle #F2AC4E SystemState
}

Usuario -r-> ManagementView: completarGestion()
ManagementView --> ManagementController: finalizar()
ManagementController --> SystemState: setDisponible()

@enduml
```
















































