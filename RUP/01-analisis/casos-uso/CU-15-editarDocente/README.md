# Jorgestor > CU-15-editarDocente > Análisis

> |[🏠️](/Jorgestor/RUP/README.md)|[ 📊](#)|[Detalle](/Jorgestor/RUP/00-casos-uso/02-detalle/CU-15-editarDocente/README.md)|**Análisis**|Diseño|Desarrollo|Pruebas|
> |-|-|-|-|-|-|-|

## información del artefacto

- **Proyecto**: Jorgestor
- **Fase RUP**: Elaboration (Elaboración)
- **Disciplina**: Análisis
- **Versión**: 1.0
- **Fecha**: 2026-05-24
- **Autor**: Equipo de desarrollo

## propósito

Análisis del caso de uso Editar Docente.

## diagrama de colaboración

<div align=center>

|![Análisis: editarDocente()](https://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/casos-uso/CU-15-editarDocente/colaboracion.puml&fmt=svg)|
|-|
|Código fuente: [colaboracion.puml](colaboracion.puml)|

</div>

## clases de análisis identificadas

### clases model (naranja #F2AC4E)
|Clase|Responsabilidad|Trazabilidad|
|-|-|-|
|**Docent**|La entidad docente que se está editando|Modelo del dominio|

### clases view (azul #629EF9)
|Clase|Responsabilidad|Derivación|
|-|-|-|
|**DocentEditView**|Interfaz que muestra datos actuales y permite modificación o eliminación|Wireframe|

### clases controller (verde #b5bd68)
|Clase|Responsabilidad|Caso de uso|
|-|-|-|
|**DocentController**|Gestiona actualización y lógica de eliminación|editarDocente()|

## mensajes de colaboración

|Origen|Destino|Mensaje|Intención|
|-|-|-|-|
|**AdministradorInstitucional**|**DocentEditView**|`modificarDatos(datos)`|Introducir cambios|
|**DocentEditView**|**DocentController**|`guardar(datos)`|Solicitar actualización|
|**DocentController**|**Docent**|`actualizar(datos)`|Persistir cambios|
|**AdministradorInstitucional**|**DocentEditView**|`eliminarDocente()`|Solicitar eliminación|
|**DocentEditView**|**DocentController**|`eliminar()`|Gestionar eliminación|
|**DocentController**|**Docent**|`delete()`|Eliminar entidad|

## trazabilidad con artefactos previos

- **Identificadores**: DNI y usuario actúan como claves de integridad.

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
