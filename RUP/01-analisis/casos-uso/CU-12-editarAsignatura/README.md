# Jorgestor > CU-12-editarAsignatura > Análisis

> |[🏠️](/Jorgestor/RUP/README.md)|[ 📊](#)|[Detalle](/Jorgestor/RUP/00-casos-uso/02-detalle/CU-12-editarAsignatura/README.md)|**Análisis**|Diseño|Desarrollo|Pruebas|
> |-|-|-|-|-|-|-|

## información del artefacto

- **Proyecto**: Jorgestor
- **Fase RUP**: Elaboration (Elaboración)
- **Disciplina**: Análisis
- **Versión**: 1.0
- **Fecha**: 2026-05-24
- **Autor**: Equipo de desarrollo

## propósito

Análisis del caso de uso Editar Asignatura. Actúa como centro de operaciones para los recursos vinculados.

## diagrama de colaboración

<div align=center>

|![Análisis: editarAsignatura()](https://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/casos-uso/CU-12-editarAsignatura/colaboracion.puml&fmt=svg)|
|-|
|Código fuente: [colaboracion.puml](colaboracion.puml)|

</div>

## clases de análisis identificadas

### clases model (naranja #F2AC4E)
|Clase|Responsabilidad|Trazabilidad|
|-|-|-|
|**Subject**|La entidad asignatura que se está editando|Modelo del dominio|
|**Grade**|Grados asociados a la asignatura|Modelo del dominio|
|**Student**|Alumnos matriculados|Modelo del dominio|
|**Question**|Preguntas de la batería de la asignatura|Modelo del dominio|

### clases view (azul #629EF9)
|Clase|Responsabilidad|Derivación|
|-|-|-|
|**SubjectEditView**|Interfaz que muestra información y ofrece accesos a gestión|Wireframe|

### clases controller (verde #b5bd68)
|Clase|Responsabilidad|Caso de uso|
|-|-|-|
|**SubjectController**|Orquesta edición, atributos y coordinación con otros CU|editarAsignatura()|

## mensajes de colaboración

|Origen|Destino|Mensaje|Intención|
|-|-|-|-|
|**Docente**|**SubjectEditView**|`modificarDatos(datos)`|Editar campos básicos|
|**SubjectEditView**|**SubjectController**|`guardar(datos)`|Solicitar actualización|
|**SubjectController**|**Subject**|`actualizar(datos)`|Persistir cambios en entidad|
|**Docente**|**SubjectEditView**|`verBateriaPreguntas()`|Solicitar visualización de preguntas|
|**SubjectEditView**|**SubjectController**|`abrirPreguntas()`|Redirigir a gestión de preguntas|
|**Docente**|**SubjectEditView**|`eliminarAsignatura()`|Solicitar eliminación|
|**SubjectEditView**|**SubjectController**|`eliminar()`|Gestionar eliminación de asignatura|

## trazabilidad con artefactos previos

- **HUB**: Actúa como centro de operaciones para gestionar recursos vinculados.
- **Seguridad**: Eliminación verifica si existen exámenes asociados.

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
