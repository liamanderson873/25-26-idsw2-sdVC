# Jorgestor > CU-29-eliminarDocente > AnÃ¡lisis

> |[ðŸ ï¸](/Jorgestor/RUP/README.md)|[ ðŸ“Š](#)|[Detalle](/Jorgestor/RUP/00-casos-uso/02-detalle/CU-29-eliminarDocente/README.md)|**AnÃ¡lisis**|DiseÃ±o|Desarrollo|Pruebas|
> |-|-|-|-|-|-|-|

## informaciÃ³n del artefacto

- **Proyecto**: Jorgestor
- **Fase RUP**: Elaboration (ElaboraciÃ³n)
- **Disciplina**: AnÃ¡lisis
- **VersiÃ³n**: 1.0
- **Fecha**: 2026-05-24
- **Autor**: Equipo de desarrollo

## propÃ³sito

AnÃ¡lisis tecnolÃ³gico agnÃ³stico del caso de uso Eliminar Docente, siguiendo la metodologÃ­a RUP. Permite analizar el flujo y la validaciÃ³n de la baja de un docente en el sistema.

## diagrama de colaboraciÃ³n

<div align=center>

|![AnÃ¡lisis: eliminarDocente()](https://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/diseno-secuencia-CU-29-eliminarDocente.puml&fmt=svg)|
|-|
|CÃ³digo fuente: [analisis-colaboracion-CU-29-eliminarDocente.puml](analisis-colaboracion-CU-29-eliminarDocente.puml)|

</div>

## clases de anÃ¡lisis identificadas

### clases model (naranja #F2AC4E)
|Clase|Responsabilidad|Trazabilidad|
|-|-|-|
|**Teacher**|Entidad docente que se desea eliminar|Modelo del dominio|

### clases view (azul #629EF9)
|Clase|Responsabilidad|DerivaciÃ³n|
|-|-|-|
|**TeacherDeleteView**|Interfaz que permite revisar datos, visualizar advertencias y confirmar la eliminaciÃ³n|Wireframe|

### clases controller (verde #b5bd68)
|Clase|Responsabilidad|Caso de uso|
|-|-|-|
|**TeacherController**|Gestiona la lÃ³gica de baja del docente y verifica permisos|eliminarDocente()|

## mensajes de colaboraciÃ³n

|Origen|Destino|Mensaje|IntenciÃ³n|
|-|-|-|-|
|**Administrador**|**TeacherDeleteView**|`solicitarEliminar()`|Solicitar la eliminaciÃ³n de un docente|
|**TeacherDeleteView**|**Teacher**|`getDatos()`|Obtener informaciÃ³n del docente|
|**Administrador**|**TeacherDeleteView**|`confirmarEliminar()`|Confirmar la acciÃ³n de borrado|
|**TeacherDeleteView**|**TeacherController**|`eliminarDocente()`|Delegar la eliminaciÃ³n al controlador|
|**TeacherController**|**Teacher**|`delete()`|Eliminar fÃ­sicamente la entidad|

## trazabilidad con artefactos previos

### con especificaciÃ³n detallada
- **Estados internos** â†’ `ConfirmingDeletion`, `DeletingTeacher`


```plantuml
@startuml eliminarDocente-analisis
skinparam linetype polyline

actor Administrador
package eliminarDocente as "eliminarDocente()" {
    rectangle #629EF9 TeacherDeleteView
    rectangle #b5bd68 TeacherController
    rectangle #F2AC4E Teacher
}

Administrador -r-> TeacherDeleteView: solicitarEliminar()
TeacherDeleteView --> Teacher: getDatos()
Administrador --> TeacherDeleteView: confirmarEliminar()
TeacherDeleteView -d-> TeacherController: eliminarDocente()
TeacherController --> Teacher: delete()

@enduml
```















































