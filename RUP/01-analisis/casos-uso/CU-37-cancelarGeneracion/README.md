# Jorgestor > CU-37-cancelarGeneracion > Análisis

## información del artefacto

- **Proyecto**: Jorgestor
- **Fase RUP**: Elaboration (Elaboración)
- **Disciplina**: Análisis
- **Versión**: 1.0
- **Fecha**: 2026-05-24
- **Autor**: Equipo de desarrollo

## propósito

Análisis tecnológico agnóstico del caso de uso Cancelar Generación, siguiendo la metodología RUP. Permite analizar el proceso de abortar la generación de exámenes y asegurar la consistencia del sistema.

## diagrama de colaboración

<div align=center>

|![Análisis: cancelarGeneracion()](https://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/casos-uso/CU-37-cancelarGeneracion/analisis-colaboracion-CU-37-cancelarGeneracion.puml&fmt=svg)|
|-|
|Código fuente: [analisis-colaboracion-CU-37-cancelarGeneracion.puml](analisis-colaboracion-CU-37-cancelarGeneracion.puml)|

</div>

## clases de análisis identificadas

### clases model (naranja #F2AC4E)
|Clase|Responsabilidad|Trazabilidad|
|-|-|-|
|**Exam**|Instancias temporales de exámenes generados a descartar|Modelo del dominio|

### clases view (azul #629EF9)
|Clase|Responsabilidad|Derivación|
|-|-|-|
|**CancelGenerationView**|Interfaz que solicita confirmación al docente para cancelar|Wireframe|

### clases controller (verde #b5bd68)
|Clase|Responsabilidad|Caso de uso|
|-|-|-|
|**ExamGenerationController**|Gestiona la lógica de cancelación y descarte de datos temporales|cancelarGeneracion()|

## mensajes de colaboración

|Origen|Destino|Mensaje|Intención|
|-|-|-|-|
|**Docente**|**CancelGenerationView**|`cancelarGeneracion()`|Solicitar abortar el proceso actual|
|**CancelGenerationView**|**Docente**|`pedirConfirmacion()`|Asegurar la intención del usuario|
|**Docente**|**CancelGenerationView**|`confirmar()`|Validar la cancelación definitiva|
|**CancelGenerationView**|**ExamGenerationController**|`descartarGeneracion()`|Coordinar la eliminación de temporales|
|**ExamGenerationController**|**Exam**|`delete()`|Eliminar las instancias de examen creadas|

## trazabilidad con artefactos previos

### con especificación detallada
- **Decisiones** �?' La cancelación implica la eliminación de instancias temporales de `Exam`.


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
















































