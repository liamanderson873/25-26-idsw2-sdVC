# Jorgestor > CU-19-editarGrado > AnÃ¡lisis

## informaciÃ³n del artefacto

- **Proyecto**: Jorgestor
- **Fase RUP**: Elaboration (ElaboraciÃ³n)
- **Disciplina**: AnÃ¡lisis
- **VersiÃ³n**: 1.0
- **Fecha**: 2026-05-24
- **Autor**: Equipo de desarrollo

## propÃ³sito

AnÃ¡lisis del caso de uso Editar Grado.

## diagrama de colaboraciÃ³n

<div align=center>

|![AnÃ¡lisis: editarGrado()](https://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/diseno-secuencia-CU-19-editarGrado.puml&fmt=svg)|
|-|
|CÃ³digo fuente: [analisis-colaboracion-CU-19-editarGrado.puml](analisis-colaboracion-CU-19-editarGrado.puml)|

</div>

## clases de anÃ¡lisis identificadas

### clases model (naranja #F2AC4E)
|Clase|Responsabilidad|Trazabilidad|
|-|-|-|
|**Grade**|Entidad que representa el grado acadÃ©mico|Modelo del dominio|
|**Student**|Entidades asociadas al grado|Modelo del dominio|

### clases view (azul #629EF9)
|Clase|Responsabilidad|DerivaciÃ³n|
|-|-|-|
|**GradeEditView**|Interfaz para visualizar, modificar o solicitar eliminaciÃ³n|Wireframe|

### clases controller (verde #b5bd68)
|Clase|Responsabilidad|Caso de uso|
|-|-|-|
|**GradeController**|Gestiona lÃ³gica de ediciÃ³n, validaciÃ³n y coordinaciÃ³n|editarGrado()|

## mensajes de colaboraciÃ³n

|Origen|Destino|Mensaje|IntenciÃ³n|
|-|-|-|-|
|**Docente**|**GradeEditView**|`verDatosActuales()`|Solicitar visualizaciÃ³n|
|**GradeEditView**|**GradeController**|`obtenerDatos()`|Delegar recuperaciÃ³n|
|**GradeController**|**Grade**|`getDatos()`|Consultar entidad|
|**Docente**|**GradeEditView**|`modificarCampos(datos)`|Introducir cambios|
|**GradeEditView**|**GradeController**|`guardar(datos)`|Solicitar persistencia|
|**GradeController**|**Grade**|`actualizar(datos)`|Persistir cambios|
|**Docente**|**GradeEditView**|`eliminarGrado()`|Solicitar eliminaciÃ³n|
|**GradeEditView**|**GradeController**|`eliminar()`|Gestionar eliminaciÃ³n|

## trazabilidad con artefactos previos

- **Estados**: `EditingData`, `SavingData` (procesamiento de guardado o eliminaciÃ³n).

```plantuml
@startuml editarGrado-analisis
skinparam linetype polyline

actor Docente
package editarGrado as "editarGrado()" {
    rectangle #629EF9 GradeEditView
    rectangle #b5bd68 GradeController
    rectangle #F2AC4E Grade
    rectangle #F2AC4E Student
}

Docente -r-> GradeEditView: verDatosActuales()
GradeEditView -d-> GradeController: obtenerDatos()
GradeController --> Grade: getDatos()

Docente --> GradeEditView: modificarCampos(datos)
GradeEditView --> GradeController: guardar(datos)
GradeController --> Grade: actualizar(datos)

Docente --> GradeEditView: eliminarGrado()
GradeEditView --> GradeController: eliminar()
GradeController --> Grade: delete()

@enduml
```
















































