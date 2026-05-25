# Jorgestor > CU-09-asignarExamenes > Análisis

> |[🏠️](/Jorgestor/RUP/README.md)|[ 📊](#)|[Detalle](/Jorgestor/RUP/00-casos-uso/02-detalle/CU-09-asignarExamenes/README.md)|**Análisis**|Diseño|Desarrollo|Pruebas|
> |-|-|-|-|-|-|-|

## información del artefacto

- **Proyecto**: Jorgestor
- **Fase RUP**: Elaboration (Elaboración)
- **Disciplina**: Análisis
- **Versión**: 1.0
- **Fecha**: 2026-05-24
- **Autor**: Equipo de desarrollo

## propósito

Análisis del caso de uso Asignar Exámenes. Vincula exámenes generados con alumnos.

## diagrama de colaboración

<div align=center>

|![Análisis: asignarExamenes()](https://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/casos-uso/CU-09-asignarExamenes/colaboracion.puml&fmt=svg)|
|-|
|Código fuente: [colaboracion.puml](colaboracion.puml)|

</div>

## realización de diseño (secuencia)

<div align=center>

|![Realización: CU-09-asignarExamenes](https://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/casos-uso/CU-09-asignarExamenes/secuencia.puml&fmt=svg)|
|-|
|Código fuente: [secuencia.puml](secuencia.puml)|

</div>

## clases de análisis identificadas

### clases model (naranja #F2AC4E)
|Clase|Responsabilidad|Trazabilidad|
|-|-|-|
|**Exam**|El examen generado que será asignado|Modelo del dominio|
|**Student**|El alumno que recibirá el examen|Modelo del dominio|
|**Grade**|Utilizado para filtrar o agrupar alumnos|Modelo del dominio|

### clases view (azul #629EF9)
|Clase|Responsabilidad|Derivación|
|-|-|-|
|**ExamAssignmentView**|Interfaz para introducir o confirmar destinatarios|Wireframe|

### clases controller (verde #b5bd68)
|Clase|Responsabilidad|Caso de uso|
|-|-|-|
|**AssignmentController**|Gestiona vinculación y valida alumnos/grados|asignarExamenes()|

## mensajes de colaboración

|Origen|Destino|Mensaje|Intención|
|-|-|-|-|
|**Docente**|**ExamAssignmentView**|`iniciarAsignacion()`|Solicitar inicio|
|**ExamAssignmentView**|**AssignmentController**|`obtenerExamenesGenerados()`|Consultar exámenes disponibles|
|**Docente**|**ExamAssignmentView**|`asignarAlumnos(listaAlumnos)`|Proporcionar destinatarios|
|**ExamAssignmentView**|**AssignmentController**|`validarYRegistrar(listaAlumnos)`|Registrar vinculación|
|**AssignmentController**|**Student**|`validarPerteneceGrado(grado)`|Verificar integridad|
|**AssignmentController**|**Exam**|`vincularAlumno(student)`|Crear relación|

## trazabilidad con artefactos previos

- **Contextualización**: Transforma exámenes generados en exámenes asignados.
- **Validación**: Asegura que alumnos correspondan al grado del examen.

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

title Diseño Técnico: asignarExamenes() (Generación de Hash)

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
