# Jorgestor > CU-27-eliminarGrado > AnÃ¡lisis

> |[ðŸ ï¸](/Jorgestor/RUP/README.md)|[ ðŸ“Š](#)|[Detalle](/Jorgestor/RUP/00-casos-uso/02-detalle/CU-27-eliminarGrado/README.md)|**AnÃ¡lisis**|DiseÃ±o|Desarrollo|Pruebas|
> |-|-|-|-|-|-|-|

## informaciÃ³n del artefacto

- **Proyecto**: Jorgestor
- **Fase RUP**: Elaboration (ElaboraciÃ³n)
- **Disciplina**: AnÃ¡lisis
- **VersiÃ³n**: 1.0
- **Fecha**: 2026-05-24
- **Autor**: Equipo de desarrollo

## propÃ³sito

AnÃ¡lisis tecnolÃ³gico agnÃ³stico del caso de uso Eliminar Grado, siguiendo la metodologÃ­a RUP. Permite analizar el flujo y la validaciÃ³n de la baja de un grado en el sistema, considerando su impacto en los alumnos.

## diagrama de colaboraciÃ³n

<div align=center>

|![AnÃ¡lisis: eliminarGrado()](https://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/diseno-secuencia-CU-27-eliminarGrado.puml&fmt=svg)|
|-|
|CÃ³digo fuente: [analisis-colaboracion-CU-27-eliminarGrado.puml](analisis-colaboracion-CU-27-eliminarGrado.puml)|

</div>

## clases de anÃ¡lisis identificadas

### clases model (naranja #F2AC4E)
|Clase|Responsabilidad|Trazabilidad|
|-|-|-|
|**Grade**|Entidad que representa el grado a eliminar|Modelo del dominio|
|**Student**|Entidad relacionada para informar del impacto de la eliminaciÃ³n|Modelo del dominio|

### clases view (azul #629EF9)
|Clase|Responsabilidad|DerivaciÃ³n|
|-|-|-|
|**GradeDeleteView**|Interfaz que permite visualizar informaciÃ³n, advertencias y confirmar la eliminaciÃ³n|Wireframe|

### clases controller (verde #b5bd68)
|Clase|Responsabilidad|Caso de uso|
|-|-|-|
|**GradeController**|Gestiona la lÃ³gica de eliminaciÃ³n y procesa la baja de la entidad|eliminarGrado()|

## mensajes de colaboraciÃ³n

|Origen|Destino|Mensaje|IntenciÃ³n|
|-|-|-|-|
|**Docente**|**GradeDeleteView**|`solicitarEliminar()`|Solicitar la eliminaciÃ³n de un grado|
|**GradeDeleteView**|**Grade**|`getDatos()`|Obtener informaciÃ³n del grado|
|**GradeDeleteView**|**Student**|`getAlumnosAfectados()`|Obtener lista de alumnos que pertenecen al grado|
|**Docente**|**GradeDeleteView**|`confirmarEliminar()`|Confirmar la acciÃ³n de borrado|
|**GradeDeleteView**|**GradeController**|`eliminarGrado()`|Delegar la eliminaciÃ³n al controlador|
|**GradeController**|**Grade**|`delete()`|Eliminar fÃ­sicamente la entidad|

## trazabilidad con artefactos previos

### con especificaciÃ³n detallada
- **Estados internos** â†’ `ConfirmingDeletion`, `DeletingGrade`


```plantuml
@startuml eliminarGrado-analisis
skinparam linetype polyline

actor Docente
package eliminarGrado as "eliminarGrado()" {
    rectangle #629EF9 GradeDeleteView
    rectangle #b5bd68 GradeController
    rectangle #F2AC4E Grade
    rectangle #F2AC4E Student
}

Docente -r-> GradeDeleteView: solicitarEliminar()
GradeDeleteView --> Grade: getDatos()
GradeDeleteView --> Student: getAlumnosAfectados()
Docente --> GradeDeleteView: confirmarEliminar()
GradeDeleteView -d-> GradeController: eliminarGrado()
GradeController --> Grade: delete()

@enduml
```















































