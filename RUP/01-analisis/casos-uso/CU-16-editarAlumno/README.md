# Jorgestor > CU-16-editarAlumno > AnÃ¡lisis

## informaciÃ³n del artefacto

- **Proyecto**: Jorgestor
- **Fase RUP**: Elaboration (ElaboraciÃ³n)
- **Disciplina**: AnÃ¡lisis
- **VersiÃ³n**: 1.0
- **Fecha**: 2026-05-24
- **Autor**: Equipo de desarrollo

## propÃ³sito

AnÃ¡lisis del caso de uso Editar Alumno. Permite modificar informaciÃ³n personal o eliminar el registro.

## diagrama de colaboraciÃ³n

<div align=center>

|![AnÃ¡lisis: editarAlumno()](https://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/diseno-secuencia-CU-16-editarAlumno.puml&fmt=svg)|
|-|
|CÃ³digo fuente: [analisis-colaboracion-CU-16-editarAlumno.puml](analisis-colaboracion-CU-16-editarAlumno.puml)|

</div>

## clases de anÃ¡lisis identificadas

### clases model (naranja #F2AC4E)
|Clase|Responsabilidad|Trazabilidad|
|-|-|-|
|**Student**|La entidad alumno que se estÃ¡ editando|Modelo del dominio|

### clases view (azul #629EF9)
|Clase|Responsabilidad|DerivaciÃ³n|
|-|-|-|
|**StudentEditView**|Interfaz para visualizaciÃ³n y ediciÃ³n de datos (DNI, Nombre, Apellidos)|Wireframe|

### clases controller (verde #b5bd68)
|Clase|Responsabilidad|Caso de uso|
|-|-|-|
|**StudentController**|Coordina actualizaciÃ³n de datos y gestiona eliminaciÃ³n|editarAlumno()|

## mensajes de colaboraciÃ³n

|Origen|Destino|Mensaje|IntenciÃ³n|
|-|-|-|-|
|**Docente**|**StudentEditView**|`modificarDatos(datos)`|Introducir cambios|
|**StudentEditView**|**StudentController**|`guardar(datos)`|Solicitar actualizaciÃ³n|
|**StudentController**|**Student**|`actualizar(datos)`|Persistir cambios|
|**Docente**|**StudentEditView**|`eliminarAlumno()`|Solicitar eliminaciÃ³n|
|**StudentEditView**|**StudentController**|`eliminar()`|Gestionar eliminaciÃ³n|
|**StudentController**|**Student**|`delete()`|Eliminar entidad|

## trazabilidad con artefactos previos

- **IdentificaciÃ³n**: Permite mantener actualizados los datos identificativos de los estudiantes.

```plantuml
@startuml editarAlumno-analisis
skinparam linetype polyline

actor Docente
package editarAlumno as "editarAlumno()" {
    rectangle #629EF9 StudentEditView
    rectangle #b5bd68 StudentController
    rectangle #F2AC4E Student
}

Docente -r-> StudentEditView: modificarDatos(datos)
StudentEditView -d-> StudentController: guardar(datos)
StudentController --> Student: actualizar(datos)

Docente --> StudentEditView: eliminarAlumno()
StudentEditView --> StudentController: eliminar()
StudentController --> Student: delete()

@enduml
```
















































