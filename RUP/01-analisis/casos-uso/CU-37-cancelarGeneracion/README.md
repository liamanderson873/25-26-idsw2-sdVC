# Jorgestor > CU-37-cancelarGeneracion > AnÃ¡lisis

> |[ðŸ ï¸](/Jorgestor/RUP/README.md)|[ ðŸ“Š](#)|[Detalle](/Jorgestor/RUP/00-casos-uso/02-detalle/CU-37-cancelarGeneracion/README.md)|**AnÃ¡lisis**|DiseÃ±o|Desarrollo|Pruebas|
> |-|-|-|-|-|-|-|

## informaciÃ³n del artefacto

- **Proyecto**: Jorgestor
- **Fase RUP**: Elaboration (ElaboraciÃ³n)
- **Disciplina**: AnÃ¡lisis
- **VersiÃ³n**: 1.0
- **Fecha**: 2026-05-24
- **Autor**: Equipo de desarrollo

## propÃ³sito

AnÃ¡lisis tecnolÃ³gico agnÃ³stico del caso de uso Cancelar GeneraciÃ³n, siguiendo la metodologÃ­a RUP. Permite analizar el proceso de abortar la generaciÃ³n de exÃ¡menes y asegurar la consistencia del sistema.

## diagrama de colaboraciÃ³n

<div align=center>

|![AnÃ¡lisis: cancelarGeneracion()](https://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/casos-uso/CU-37-cancelarGeneracion/analisis-colaboracion-CU-37-cancelarGeneracion.puml&fmt=svg)|
|-|
|CÃ³digo fuente: [analisis-colaboracion-CU-37-cancelarGeneracion.puml](analisis-colaboracion-CU-37-cancelarGeneracion.puml)|

</div>

## clases de anÃ¡lisis identificadas

### clases model (naranja #F2AC4E)
|Clase|Responsabilidad|Trazabilidad|
|-|-|-|
|**Exam**|Instancias temporales de exÃ¡menes generados a descartar|Modelo del dominio|

### clases view (azul #629EF9)
|Clase|Responsabilidad|DerivaciÃ³n|
|-|-|-|
|**CancelGenerationView**|Interfaz que solicita confirmaciÃ³n al docente para cancelar|Wireframe|

### clases controller (verde #b5bd68)
|Clase|Responsabilidad|Caso de uso|
|-|-|-|
|**ExamGenerationController**|Gestiona la lÃ³gica de cancelaciÃ³n y descarte de datos temporales|cancelarGeneracion()|

## mensajes de colaboraciÃ³n

|Origen|Destino|Mensaje|IntenciÃ³n|
|-|-|-|-|
|**Docente**|**CancelGenerationView**|`cancelarGeneracion()`|Solicitar abortar el proceso actual|
|**CancelGenerationView**|**Docente**|`pedirConfirmacion()`|Asegurar la intenciÃ³n del usuario|
|**Docente**|**CancelGenerationView**|`confirmar()`|Validar la cancelaciÃ³n definitiva|
|**CancelGenerationView**|**ExamGenerationController**|`descartarGeneracion()`|Coordinar la eliminaciÃ³n de temporales|
|**ExamGenerationController**|**Exam**|`delete()`|Eliminar las instancias de examen creadas|

## trazabilidad con artefactos previos

### con especificaciÃ³n detallada
- **Decisiones** â†’ La cancelaciÃ³n implica la eliminaciÃ³n de instancias temporales de `Exam`.


```plantuml
@startuml cancelarGeneracion-analisis
skinparam linetype polyline

actor Docente
package cancelarGeneracion as "cancelarGeneracion()" {
    rectangle #629EF9 CancelGenerationView
    rectangle #b5bd68 ExamGenerationController
    rectangle #F2AC4E Exam
}

Docente -r-> CancelGenerationView: cancelarGeneracion()
CancelGenerationView --> Docente: pedirConfirmacion()
Docente --> CancelGenerationView: confirmar()
CancelGenerationView -d-> ExamGenerationController: descartarGeneracion()
ExamGenerationController --> Exam: delete()

@enduml
```















































