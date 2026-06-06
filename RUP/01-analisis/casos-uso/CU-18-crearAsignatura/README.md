# Jorgestor > CU-18-crearAsignatura > AnÃ¡lisis

## informaciÃ³n del artefacto

- **Proyecto**: Jorgestor
- **Fase RUP**: Elaboration (ElaboraciÃ³n)
- **Disciplina**: AnÃ¡lisis
- **VersiÃ³n**: 1.0
- **Fecha**: 2026-05-24
- **Autor**: Equipo de desarrollo

## propÃ³sito

AnÃ¡lisis del caso de uso Crear Asignatura. Implica la inicializaciÃ³n de recursos vinculados.

## diagrama de colaboraciÃ³n

<div align=center>

|![AnÃ¡lisis: crearAsignatura()](https://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/diseno-secuencia-CU-18-crearAsignatura.puml&fmt=svg)|
|-|
|CÃ³digo fuente: [analisis-colaboracion-CU-18-crearAsignatura.puml](analisis-colaboracion-CU-18-crearAsignatura.puml)|

</div>

## clases de anÃ¡lisis identificadas

### clases model (naranja #F2AC4E)
|Clase|Responsabilidad|Trazabilidad|
|-|-|-|
|**Subject**|La nueva entidad asignatura|Modelo del dominio|
|**QuestionBank**|BaterÃ­a de preguntas asociada (conceptual)|AnÃ¡lisis|
|**Student**|Alumnos matriculados|Modelo del dominio|
|**Grade**|Grados asociados|Modelo del dominio|

### clases view (azul #629EF9)
|Clase|Responsabilidad|DerivaciÃ³n|
|-|-|-|
|**SubjectCreationView**|Interfaz para introducir datos mÃ­nimos, alumnos y grados|Wireframe|

### clases controller (verde #b5bd68)
|Clase|Responsabilidad|Caso de uso|
|-|-|-|
|**SubjectController**|Gestiona creaciÃ³n e inicializaciÃ³n de recursos vinculados|crearAsignatura()|

## mensajes de colaboraciÃ³n

|Origen|Destino|Mensaje|IntenciÃ³n|
|-|-|-|-|
|**Docente**|**SubjectCreationView**|`solicitarCreacion()`|Iniciar proceso|
|**Docente**|**SubjectCreationView**|`introducirDatos(nombre, codigo, curso)`|Enviar informaciÃ³n obligatoria|
|**SubjectCreationView**|**SubjectController**|`crearAsignatura(datos)`|Delegar creaciÃ³n|
|**SubjectController**|**Subject**|`inicializar(datos)`|Crear entidad|
|**SubjectController**|**QuestionBank**|`crearBateria()`|Inicializar espacio de trabajo|
|**SubjectController**|**SubjectCreationView**|`notificarExitoYRedirigir()`|Informar y pasar a ediciÃ³n|

## trazabilidad con artefactos previos

- **Recursos**: Desencadena la creaciÃ³n de un espacio de trabajo (baterÃ­a de preguntas).

```plantuml
@startuml crearAsignatura-analisis
skinparam linetype polyline

actor Docente
package crearAsignatura as "crearAsignatura()" {
    rectangle #629EF9 SubjectCreationView
    rectangle #b5bd68 SubjectController
    rectangle #F2AC4E Subject
    rectangle #F2AC4E QuestionBank
    rectangle #F2AC4E Student
    rectangle #F2AC4E Grade
}

Docente -r-> SubjectCreationView: solicitarCreacion()
Docente --> SubjectCreationView: introducirDatos(nombre, codigo, curso)
SubjectCreationView -d-> SubjectController: crearAsignatura(datos)
SubjectController --> Subject: inicializar(datos)
SubjectController --> QuestionBank: crearBateria()
SubjectController --> SubjectCreationView: notificarExitoYRedirigir()

@enduml
```
















































