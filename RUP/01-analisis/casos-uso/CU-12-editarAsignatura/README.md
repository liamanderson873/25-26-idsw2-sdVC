# Jorgestor > CU-12-editarAsignatura > AnÃ¡lisis

## informaciÃ³n del artefacto

- **Proyecto**: Jorgestor
- **Fase RUP**: Elaboration (ElaboraciÃ³n)
- **Disciplina**: AnÃ¡lisis
- **VersiÃ³n**: 1.0
- **Fecha**: 2026-05-24
- **Autor**: Equipo de desarrollo

## propÃ³sito

AnÃ¡lisis del caso de uso Editar Asignatura. ActÃºa como centro de operaciones para los recursos vinculados.

## diagrama de colaboraciÃ³n

<div align=center>

|![AnÃ¡lisis: editarAsignatura()](https://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/diseno-secuencia-CU-12-editarAsignatura.puml&fmt=svg)|
|-|
|CÃ³digo fuente: [analisis-colaboracion-CU-12-editarAsignatura.puml](analisis-colaboracion-CU-12-editarAsignatura.puml)|

</div>

## clases de anÃ¡lisis identificadas

### clases model (naranja #F2AC4E)
|Clase|Responsabilidad|Trazabilidad|
|-|-|-|
|**Subject**|La entidad asignatura que se estÃ¡ editando|Modelo del dominio|
|**Grade**|Grados asociados a la asignatura|Modelo del dominio|
|**Student**|Alumnos matriculados|Modelo del dominio|
|**Question**|Preguntas de la baterÃ­a de la asignatura|Modelo del dominio|

### clases view (azul #629EF9)
|Clase|Responsabilidad|DerivaciÃ³n|
|-|-|-|
|**SubjectEditView**|Interfaz que muestra informaciÃ³n y ofrece accesos a gestiÃ³n|Wireframe|

### clases controller (verde #b5bd68)
|Clase|Responsabilidad|Caso de uso|
|-|-|-|
|**SubjectController**|Orquesta ediciÃ³n, atributos y coordinaciÃ³n con otros CU|editarAsignatura()|

## mensajes de colaboraciÃ³n

|Origen|Destino|Mensaje|IntenciÃ³n|
|-|-|-|-|
|**Docente**|**SubjectEditView**|`modificarDatos(datos)`|Editar campos bÃ¡sicos|
|**SubjectEditView**|**SubjectController**|`guardar(datos)`|Solicitar actualizaciÃ³n|
|**SubjectController**|**Subject**|`actualizar(datos)`|Persistir cambios en entidad|
|**Docente**|**SubjectEditView**|`verBateriaPreguntas()`|Solicitar visualizaciÃ³n de preguntas|
|**SubjectEditView**|**SubjectController**|`abrirPreguntas()`|Redirigir a gestiÃ³n de preguntas|
|**Docente**|**SubjectEditView**|`eliminarAsignatura()`|Solicitar eliminaciÃ³n|
|**SubjectEditView**|**SubjectController**|`eliminar()`|Gestionar eliminaciÃ³n de asignatura|

## trazabilidad con artefactos previos

- **HUB**: ActÃºa como centro de operaciones para gestionar recursos vinculados.
- **Seguridad**: EliminaciÃ³n verifica si existen exÃ¡menes asociados.

```plantuml
@startuml editarAsignatura-analisis
skinparam linetype polyline

actor Docente
package editarAsignatura as "editarAsignatura()" {
    rectangle #629EF9 SubjectEditView
    rectangle #b5bd68 SubjectController
    rectangle #F2AC4E Subject
    rectangle #F2AC4E Grade
    rectangle #F2AC4E Student
    rectangle #F2AC4E Question
}

Docente -r-> SubjectEditView: modificarDatos(datos)
SubjectEditView -d-> SubjectController: guardar(datos)
SubjectController --> Subject: actualizar(datos)

Docente --> SubjectEditView: verBateriaPreguntas()
SubjectEditView --> SubjectController: abrirPreguntas()

Docente --> SubjectEditView: eliminarAsignatura()
SubjectEditView --> SubjectController: eliminar()
SubjectController --> Subject: delete()

@enduml
```
















































