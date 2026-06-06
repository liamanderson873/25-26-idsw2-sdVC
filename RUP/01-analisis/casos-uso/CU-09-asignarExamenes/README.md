# Jorgestor > CU-09-asignarExamenes > AnÃ¡lisis

## informaciÃ³n del artefacto

- **Proyecto**: Jorgestor
- **Fase RUP**: Elaboration (ElaboraciÃ³n)
- **Disciplina**: AnÃ¡lisis
- **VersiÃ³n**: 1.0
- **Fecha**: 2026-05-24
- **Autor**: Equipo de desarrollo

## propÃ³sito

AnÃ¡lisis del caso de uso Asignar ExÃ¡menes. Vincula exÃ¡menes generados con alumnos.

## diagrama de colaboraciÃ³n

<div align=center>

|![AnÃ¡lisis: asignarExamenes()](https://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/diseno-secuencia-CU-09-asignarExamenes.puml&fmt=svg)|
|-|
|CÃ³digo fuente: [analisis-colaboracion-CU-09-asignarExamenes.puml](analisis-colaboracion-CU-09-asignarExamenes.puml)|

</div>

## realizaciÃ³n de diseÃ±o (secuencia)

<div align=center>

|![RealizaciÃ³n: CU-09-asignarExamenes](https://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/diseno-secuencia-CU-09-asignarExamenes.puml&fmt=svg)|
|-|
|CÃ³digo fuente: [analisis-secuencia-CU-09-asignarExamenes.puml](analisis-secuencia-CU-09-asignarExamenes.puml)|

</div>

## clases de anÃ¡lisis identificadas

### clases model (naranja #F2AC4E)
|Clase|Responsabilidad|Trazabilidad|
|-|-|-|
|**Exam**|El examen generado que serÃ¡ asignado|Modelo del dominio|
|**Student**|El alumno que recibirÃ¡ el examen|Modelo del dominio|
|**Grade**|Utilizado para filtrar o agrupar alumnos|Modelo del dominio|

### clases view (azul #629EF9)
|Clase|Responsabilidad|DerivaciÃ³n|
|-|-|-|
|**ExamAssignmentView**|Interfaz para introducir o confirmar destinatarios|Wireframe|

### clases controller (verde #b5bd68)
|Clase|Responsabilidad|Caso de uso|
|-|-|-|
|**AssignmentController**|Gestiona vinculaciÃ³n y valida alumnos/grados|asignarExamenes()|

## mensajes de colaboraciÃ³n

|Origen|Destino|Mensaje|IntenciÃ³n|
|-|-|-|-|
|**Docente**|**ExamAssignmentView**|`iniciarAsignacion()`|Solicitar inicio|
|**ExamAssignmentView**|**AssignmentController**|`obtenerExamenesGenerados()`|Consultar exÃ¡menes disponibles|
|**Docente**|**ExamAssignmentView**|`asignarAlumnos(listaAlumnos)`|Proporcionar destinatarios|
|**ExamAssignmentView**|**AssignmentController**|`validarYRegistrar(listaAlumnos)`|Registrar vinculaciÃ³n|
|**AssignmentController**|**Student**|`validarPerteneceGrado(grado)`|Verificar integridad|
|**AssignmentController**|**Exam**|`vincularAlumno(student)`|Crear relaciÃ³n|

## trazabilidad con artefactos previos

- **ContextualizaciÃ³n**: Transforma exÃ¡menes generados en exÃ¡menes asignados.
- **ValidaciÃ³n**: Asegura que alumnos correspondan al grado del examen.

```plantuml
@startuml asignarExamenes-analisis
skinparam linetype polyline

actor Docente
package asignarExamenes as "asignarExamenes()" {
    rectangle #629EF9 ExamAssignmentView
    rectangle #b5bd68 AssignmentController
    rectangle #F2AC4E Exam
    rectangle #F2AC4E Student
    rectangle #F2AC4E Grade
}

Docente -r-> ExamAssignmentView: iniciarAsignacion()
ExamAssignmentView -d-> AssignmentController: obtenerExamenesGenerados()
AssignmentController --> Exam: getGenerados()

Docente --> ExamAssignmentView: asignarAlumnos(listaAlumnos)
ExamAssignmentView --> AssignmentController: validarYRegistrar(listaAlumnos)
AssignmentController --> Student: validarPerteneceGrado(grado)
AssignmentController --> Exam: vincularAlumno(student)

@enduml
```

```plantuml
@startuml CU-09-asignarExamenes-diseno

skinparam linetype polyline

actor "Docente" as Actor
participant ":AssignmentController" as Controller <<boundary>>
participant ":AssignmentService" as Service <<control>>
participant ":StudentRepository" as SRepo <<entity>>
participant ":ExamRepository" as ERepo <<entity>>
participant "exam:Exam" as Entity <<entity>>

title DiseÃ±o TÃ©cnico: asignarExamenes() (GeneraciÃ³n de Hash)

Actor -> Controller : POST /api/assignments (AssignmentDTO)
activate Controller

Controller -> Service : assignExamsToStudents(dto)
activate Service

loop por cada emparejamiento (ExamID, StudentID)
    Service -> SRepo : findById(studentID)
    Service -> ERepo : findById(examID)
    
    Service -> Service : generateCorrectionHash(examData, studentData)
    note right
    **Algoritmo de Hash (MD5/SHA)**
    Combina: Asignatura + Alumno + Respuestas
    end note
    
    Service -> Entity : assignStudent(student)
    Service -> Entity : setCorrectionKey(generatedHash)
    
    Service -> ERepo : save(exam)
end

Service --> Controller : List<AssignmentSummary>
deactivate Service

Controller --> Actor : 200 OK
deactivate Controller

@enduml
```


















































