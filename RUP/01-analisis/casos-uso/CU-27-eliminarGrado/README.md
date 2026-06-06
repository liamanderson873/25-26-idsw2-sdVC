# Jorgestor > CU-27-eliminarGrado > Análisis

## información del artefacto

- **Proyecto**: Jorgestor
- **Fase RUP**: Elaboration (Elaboración)
- **Disciplina**: Análisis
- **Versión**: 1.0
- **Fecha**: 2026-05-24
- **Autor**: Equipo de desarrollo

## propósito

Análisis tecnológico agnóstico del caso de uso Eliminar Grado, siguiendo la metodología RUP. Permite analizar el flujo y la validación de la baja de un grado en el sistema, considerando su impacto en los alumnos.

## diagrama de colaboración

<div align=center>

|![Análisis: eliminarGrado()](https://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/diseno-secuencia-CU-27-eliminarGrado.puml&fmt=svg)|
|-|
|Código fuente: [analisis-colaboracion-CU-27-eliminarGrado.puml](analisis-colaboracion-CU-27-eliminarGrado.puml)|

</div>

## clases de análisis identificadas

### clases model (naranja #F2AC4E)
|Clase|Responsabilidad|Trazabilidad|
|-|-|-|
|**Grade**|Entidad que representa el grado a eliminar|Modelo del dominio|
|**Student**|Entidad relacionada para informar del impacto de la eliminación|Modelo del dominio|

### clases view (azul #629EF9)
|Clase|Responsabilidad|Derivación|
|-|-|-|
|**GradeDeleteView**|Interfaz que permite visualizar información, advertencias y confirmar la eliminación|Wireframe|

### clases controller (verde #b5bd68)
|Clase|Responsabilidad|Caso de uso|
|-|-|-|
|**GradeController**|Gestiona la lógica de eliminación y procesa la baja de la entidad|eliminarGrado()|

## mensajes de colaboración

|Origen|Destino|Mensaje|Intención|
|-|-|-|-|
|**Docente**|**GradeDeleteView**|`solicitarEliminar()`|Solicitar la eliminación de un grado|
|**GradeDeleteView**|**Grade**|`getDatos()`|Obtener información del grado|
|**GradeDeleteView**|**Student**|`getAlumnosAfectados()`|Obtener lista de alumnos que pertenecen al grado|
|**Docente**|**GradeDeleteView**|`confirmarEliminar()`|Confirmar la acción de borrado|
|**GradeDeleteView**|**GradeController**|`eliminarGrado()`|Delegar la eliminación al controlador|
|**GradeController**|**Grade**|`delete()`|Eliminar físicamente la entidad|

## trazabilidad con artefactos previos

### con especificación detallada
- **Estados internos** �?' `ConfirmingDeletion`, `DeletingGrade`


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
















































