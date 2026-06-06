# Jorgestor > CU-02-generarExamenes > AnÃ¡lisis

## informaciÃ³n del artefacto

- **Proyecto**: Jorgestor
- **Fase RUP**: Elaboration (ElaboraciÃ³n)
- **Disciplina**: AnÃ¡lisis
- **VersiÃ³n**: 1.0
- **Fecha**: 2026-05-24
- **Autor**: Equipo de desarrollo

## propÃ³sito

AnÃ¡lisis tecnolÃ³gico agnÃ³stico del caso de uso Generar ExÃ¡menes, siguiendo la metodologÃ­a RUP. Permite analizar la lÃ³gica de generaciÃ³n aleatoria/ponderada de exÃ¡menes segÃºn parÃ¡metros.

## diagrama de colaboraciÃ³n

<div align=center>

|![AnÃ¡lisis: generarExamenes()](https://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/diseno-secuencia-CU-02-generarExamenes.puml&fmt=svg)|
|-|
|CÃ³digo fuente: [analisis-colaboracion-CU-02-generarExamenes.puml](analisis-colaboracion-CU-02-generarExamenes.puml)|

</div>

## realizaciÃ³n de diseÃ±o (secuencia)

<div align=center>

|![RealizaciÃ³n: CU-02-generarExamenes](https://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/diseno-secuencia-CU-02-generarExamenes.puml&fmt=svg)|
|-|
|CÃ³digo fuente: [analisis-secuencia-CU-02-generarExamenes.puml](analisis-secuencia-CU-02-generarExamenes.puml)|

</div>

## clases de anÃ¡lisis identificadas

### clases model (naranja #F2AC4E)
|Clase|Responsabilidad|Trazabilidad|
|-|-|-|
|**Subject**|Contenedor de los temas y preguntas|Modelo del dominio|
|**Topic**|Sirve para filtrar las preguntas|Modelo del dominio|
|**Question**|Elemento base con dificultad asociada|Modelo del dominio|
|**Exam**|Entidad resultante que agrupa las preguntas seleccionadas|Modelo del dominio|

### clases view (azul #629EF9)
|Clase|Responsabilidad|DerivaciÃ³n|
|-|-|-|
|**GenerationView**|Interfaz que permite introducir parÃ¡metros, solicitar y confirmar generaciÃ³n|Wireframe|

### clases controller (verde #b5bd68)
|Clase|Responsabilidad|Caso de uso|
|-|-|-|
|**GenerationController**|Valida datos, filtra preguntas y ejecuta algoritmo de generaciÃ³n|generarExamenes()|

## mensajes de colaboraciÃ³n

|Origen|Destino|Mensaje|IntenciÃ³n|
|-|-|-|-|
|**Docente**|**GenerationView**|`seleccionarAsignatura()`|Elegir asignatura base|
|**GenerationView**|**GenerationController**|`obtenerTemas(asignatura)`|Consultar temas disponibles|
|**GenerationController**|**Subject**|`getTemas()`|Acceder a los temas de la asignatura|
|**Docente**|**GenerationView**|`generarExamenes(parametros)`|Solicitar generaciÃ³n|
|**GenerationView**|**GenerationController**|`generar(parametros)`|Ejecutar la generaciÃ³n de exÃ¡menes|
|**GenerationController**|**Question**|`filtrarPorParametros(parametros)`|Obtener banco de preguntas|
|**GenerationController**|**Exam**|`crearExamen(preguntas)`|Crear instancias de exÃ¡menes|

## trazabilidad con artefactos previos

### con especificaciÃ³n detallada
- **Estados internos** â†’ `RequiringGeneration`, `ProvidingData`, `ProvidingConfirmation`


```plantuml
@startuml generarExamenes-analisis
skinparam linetype polyline

actor Docente
package generarExamenes as "generarExamenes()" {
    rectangle #629EF9 GenerationView
    rectangle #b5bd68 GenerationController
    rectangle #F2AC4E Subject
    rectangle #F2AC4E Topic
    rectangle #F2AC4E Question
    rectangle #F2AC4E Exam
}

Docente -r-> GenerationView: seleccionarAsignatura()
GenerationView -d-> GenerationController: obtenerTemas(asignatura)
GenerationController --> Subject: getTemas()
Subject --> Topic

Docente --> GenerationView: generarExamenes(parametros)
GenerationView --> GenerationController: generar(parametros)
GenerationController --> Question: filtrarPorParametros(parametros)
GenerationController --> Exam: crearExamen(preguntas)

@enduml
```

```plantuml
@startuml CU-02-generarExamenes-diseno

skinparam linetype polyline

actor "Docente" as Actor
participant ":ExamGenerationController" as Controller <<boundary>>
participant ":ExamGenerationService" as Service <<control>>
participant ":QuestionRepository" as QRepo <<entity>>
participant ":ExamRepository" as ERepo <<entity>>
participant "exam:Exam" as Entity <<entity>>

title DiseÃ±o TÃ©cnico: generarExamenes() (Algoritmo Aleatorio)

Actor -> Controller : POST /api/exams/generate (GenerateExamDTO)
activate Controller

Controller -> Service : generateExams(dto)
activate Service

Service -> QRepo : findAvailableQuestions(subject, topics, difficulty)
activate QRepo
return List<Question>

alt isPersonalized == true
    loop por cada alumno
        Service -> Service : shuffleAndPickQuestions(questions, count)
        Service -> Entity : new Exam(picked_questions)
        Service -> ERepo : save(exam)
    end
else isPersonalized == false (Modelo Ãšnico)
    Service -> Service : shuffleAndPickQuestions(questions, count)
    loop por cada alumno
        Service -> Entity : new Exam(shared_questions)
        Service -> ERepo : save(exam)
    end
end

Service --> Controller : GenerationReport
deactivate Service

Controller --> Actor : 201 Created (JSON Report)
deactivate Controller

@enduml
```


















































