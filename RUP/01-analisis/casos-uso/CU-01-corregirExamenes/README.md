# Jorgestor > CU-01-corregirExamenes > AnÃ¡lisis

## informaciÃ³n del artefacto

- **Proyecto**: Jorgestor
- **Fase RUP**: Elaboration (ElaboraciÃ³n)
- **Disciplina**: AnÃ¡lisis
- **VersiÃ³n**: 1.0
- **Fecha**: 2026-05-24
- **Autor**: Equipo de desarrollo

## propÃ³sito

AnÃ¡lisis tecnolÃ³gico agnÃ³stico del caso de uso Corregir ExÃ¡menes, siguiendo la metodologÃ­a RUP. Permite analizar el flujo y la validaciÃ³n de correcciÃ³n de exÃ¡menes de los alumnos.

## diagrama de colaboraciÃ³n

<div align=center>

|![AnÃ¡lisis: corregirExamenes()](https://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/casos-uso/CU-01-corregirExamenes/analisis-colaboracion-CU-01-corregirExamenes.puml&fmt=svg)|
|-|
|CÃ³digo fuente: [analisis-colaboracion-CU-01-corregirExamenes.puml](analisis-colaboracion-CU-01-corregirExamenes.puml)|

</div>

## realizaciÃ³n de diseÃ±o (secuencia)

<div align=center>

|![RealizaciÃ³n: CU-01-corregirExamenes](https://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/casos-uso/CU-01-corregirExamenes/analisis-secuencia-CU-01-corregirExamenes.puml&fmt=svg)|
|-|
|CÃ³digo fuente: [analisis-secuencia-CU-01-corregirExamenes.puml](analisis-secuencia-CU-01-corregirExamenes.puml)|

</div>

## clases de anÃ¡lisis identificadas

### clases model (naranja #F2AC4E)
|Clase|Responsabilidad|Trazabilidad|
|-|-|-|
|**Exam**|Representa el examen en el sistema, conteniendo la Clave de CorrecciÃ³n y el estado (Corregido/Pendiente)|Modelo del dominio|
|**Student**|Asocia la correcciÃ³n al alumno correspondiente mediante la clave|Modelo del dominio|

### clases view (azul #629EF9)
|Clase|Responsabilidad|DerivaciÃ³n|
|-|-|-|
|**CorrectionView**|Interfaz que permite solicitar inicio, introducir exÃ¡menes, confirmar, y ver estado|Wireframe|

### clases controller (verde #b5bd68)
|Clase|Responsabilidad|Caso de uso|
|-|-|-|
|**CorrectionController**|Gestiona el flujo de la correcciÃ³n, valida datos y actualiza estados|corregirExamenes()|

## mensajes de colaboraciÃ³n

|Origen|Destino|Mensaje|IntenciÃ³n|
|-|-|-|-|
|**Docente**|**CorrectionView**|`iniciarCorreccion()`|Solicitar el inicio de la correcciÃ³n|
|**CorrectionView**|**CorrectionController**|`corregirExamenes(archivos)`|Delegar la lÃ³gica de correcciÃ³n|
|**CorrectionController**|**Exam**|`validarClave()`|Validar clave de correcciÃ³n del examen|
|**CorrectionController**|**Student**|`asociarAlumno()`|Asociar el examen corregido al alumno|
|**CorrectionController**|**Exam**|`actualizarEstado(Corregido)`|Actualizar estado del examen a corregido|

## trazabilidad con artefactos previos

### con especificaciÃ³n detallada
- **Estados internos** â†’ `RequiringCorrection`, `ProvidingDoneExams`, `ProvidingConfirmation`


```plantuml
@startuml corregirExamenes-analisis
skinparam linetype polyline

actor Docente
package corregirExamenes as "corregirExamenes()" {
    rectangle #629EF9 CorrectionView
    rectangle #b5bd68 CorrectionController
    rectangle #F2AC4E Exam
    rectangle #F2AC4E Student
}

Docente -r-> CorrectionView: iniciarCorreccion()
CorrectionView -d-> CorrectionController: corregirExamenes(archivos)
CorrectionController --> Exam: validarClave()
CorrectionController --> Student: asociarAlumno()
CorrectionController --> Exam: actualizarEstado(Corregido)

@enduml
```

```plantuml
@startuml CU-01-corregirExamenes-diseno

skinparam linetype polyline
skinparam backgroundColor white

actor "Docente" as Actor
participant ":CorrectionController" as Controller <<boundary>>
participant ":CorrectionService" as Service <<control>>
participant "engine:ICorrectionEngine" as Engine <<interface>>
participant ":ExamRepository" as Repo <<entity>>
participant "exam:Exam" as Entity <<entity>>

title DiseÃ±o TÃ©cnico: corregirExamenes() (DelegaciÃ³n IA)

Actor -> Controller : POST /api/exams/correct (batch_data)
activate Controller

Controller -> Service : correctBatch(batch_data)
activate Service

note over Service
**SimulaciÃ³n de DelegaciÃ³n**
El servicio depende de una abstracciÃ³n
para la detecciÃ³n de imÃ¡genes.
end note

Service -> Engine : processImages(batch_data)
activate Engine
return detected_results (List<DetectionDTO>)

loop por cada resultado detectado
    Service -> Repo : findByCorrectionKey(dto.key)
    activate Repo
    Repo --> Service : exam
    deactivate Repo
    
    Service -> Entity : compareAndCalculateScore(dto.answers)
    activate Entity
    Entity --> Service : final_score
    deactivate Entity
    
    Service -> Entity : updateStatus(CORRECTED, final_score)
    Service -> Repo : save(exam)
end

Service --> Controller : List<CorrectionSummary>
deactivate Service

Controller --> Actor : 200 OK (CorrectionReport)
deactivate Controller

@enduml
```

