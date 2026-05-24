# Jorgestor > CU-32-completarGestion > Análisis

> |[🏠️](/Jorgestor/RUP/README.md)|[ 📊](#)|[Detalle](/Jorgestor/RUP/00-casos-uso/02-detalle/CU-32-completarGestion/README.md)|**Análisis**|Diseño|Desarrollo|Pruebas|
> |-|-|-|-|-|-|-|

## información del artefacto

- **Proyecto**: Jorgestor
- **Fase RUP**: Elaboration (Elaboración)
- **Disciplina**: Análisis
- **Versión**: 1.0
- **Fecha**: 2026-05-24
- **Autor**: Equipo de desarrollo

## propósito

Análisis tecnológico agnóstico del caso de uso Completar Gestión, siguiendo la metodología RUP. Permite analizar la transición desde estados de gestión hacia la disponibilidad general del sistema.

## diagrama de colaboración

<div align=center>

|![Análisis: completarGestion()](https://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/casos-uso/CU-32-completarGestion/colaboracion.puml&fmt=svg)|
|-|
|Código fuente: [colaboracion.puml](colaboracion.puml)|

</div>

## clases de análisis identificadas

### clases model (naranja #F2AC4E)
|Clase|Responsabilidad|Trazabilidad|
|-|-|-|
|**SystemState**|Representa el estado global y la navegación del sistema|Modelo del dominio|

### clases view (azul #629EF9)
|Clase|Responsabilidad|Derivación|
|-|-|-|
|**ManagementView**|Interfaz común para áreas de gestión que permite finalizar la operación|Wireframe|

### clases controller (verde #b5bd68)
|Clase|Responsabilidad|Caso de uso|
|-|-|-|
|**ManagementController**|Gestiona la transición de estado y asegura el procesado de cambios|completarGestion()|

## mensajes de colaboración

|Origen|Destino|Mensaje|Intención|
|-|-|-|-|
|**Usuario**|**ManagementView**|`completarGestion()`|Solicitar la finalización de la gestión actual|
|**ManagementView**|**ManagementController**|`finalizar()`|Coordinar el retorno al estado de disponibilidad|
|**ManagementController**|**SystemState**|`setDisponible()`|Actualizar el estado global del sistema|

## trazabilidad con artefactos previos

### con especificación detallada
- **Estados internos** → `PresentandoOpciones`


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
