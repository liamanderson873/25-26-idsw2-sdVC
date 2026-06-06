# Jorgestor > CU-15-editarDocente > AnÃ¡lisis

## informaciÃ³n del artefacto

- **Proyecto**: Jorgestor
- **Fase RUP**: Elaboration (ElaboraciÃ³n)
- **Disciplina**: AnÃ¡lisis
- **VersiÃ³n**: 1.0
- **Fecha**: 2026-05-24
- **Autor**: Equipo de desarrollo

## propÃ³sito

AnÃ¡lisis del caso de uso Editar Docente.

## diagrama de colaboraciÃ³n

<div align=center>

|![AnÃ¡lisis: editarDocente()](https://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/diseno-secuencia-CU-15-editarDocente.puml&fmt=svg)|
|-|
|CÃ³digo fuente: [analisis-colaboracion-CU-15-editarDocente.puml](analisis-colaboracion-CU-15-editarDocente.puml)|

</div>

## clases de anÃ¡lisis identificadas

### clases model (naranja #F2AC4E)
|Clase|Responsabilidad|Trazabilidad|
|-|-|-|
|**Docent**|La entidad docente que se estÃ¡ editando|Modelo del dominio|

### clases view (azul #629EF9)
|Clase|Responsabilidad|DerivaciÃ³n|
|-|-|-|
|**DocentEditView**|Interfaz que muestra datos actuales y permite modificaciÃ³n o eliminaciÃ³n|Wireframe|

### clases controller (verde #b5bd68)
|Clase|Responsabilidad|Caso de uso|
|-|-|-|
|**DocentController**|Gestiona actualizaciÃ³n y lÃ³gica de eliminaciÃ³n|editarDocente()|

## mensajes de colaboraciÃ³n

|Origen|Destino|Mensaje|IntenciÃ³n|
|-|-|-|-|
|**AdministradorInstitucional**|**DocentEditView**|`modificarDatos(datos)`|Introducir cambios|
|**DocentEditView**|**DocentController**|`guardar(datos)`|Solicitar actualizaciÃ³n|
|**DocentController**|**Docent**|`actualizar(datos)`|Persistir cambios|
|**AdministradorInstitucional**|**DocentEditView**|`eliminarDocente()`|Solicitar eliminaciÃ³n|
|**DocentEditView**|**DocentController**|`eliminar()`|Gestionar eliminaciÃ³n|
|**DocentController**|**Docent**|`delete()`|Eliminar entidad|

## trazabilidad con artefactos previos

- **Identificadores**: DNI y usuario actÃºan como claves de integridad.

```plantuml
@startuml editarDocente-analisis
skinparam linetype polyline

actor AdministradorInstitucional
package editarDocente as "editarDocente()" {
    rectangle #629EF9 DocentEditView
    rectangle #b5bd68 DocentController
    rectangle #F2AC4E Docent
}

AdministradorInstitucional -r-> DocentEditView: modificarDatos(datos)
DocentEditView -d-> DocentController: guardar(datos)
DocentController --> Docent: actualizar(datos)

AdministradorInstitucional --> DocentEditView: eliminarDocente()
DocentEditView --> DocentController: eliminar()
DocentController --> Docent: delete()

@enduml
```
















































