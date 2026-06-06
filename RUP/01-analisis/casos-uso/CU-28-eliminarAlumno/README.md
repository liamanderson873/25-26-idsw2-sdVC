# Jorgestor > CU-28-eliminarAlumno > AnÃ¡lisis

## informaciÃ³n del artefacto

- **Proyecto**: Jorgestor
- **Fase RUP**: Elaboration (ElaboraciÃ³n)
- **Disciplina**: AnÃ¡lisis
- **VersiÃ³n**: 1.0
- **Fecha**: 2026-05-24
- **Autor**: Equipo de desarrollo

## propÃ³sito

AnÃ¡lisis tecnolÃ³gico agnÃ³stico del caso de uso Eliminar Alumno, siguiendo la metodologÃ­a RUP. Permite analizar el flujo y la validaciÃ³n de la baja de un alumno en el sistema.

## diagrama de colaboraciÃ³n

<div align=center>

|![AnÃ¡lisis: eliminarAlumno()](https://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/diseno-secuencia-CU-28-eliminarAlumno.puml&fmt=svg)|
|-|
|CÃ³digo fuente: [analisis-colaboracion-CU-28-eliminarAlumno.puml](analisis-colaboracion-CU-28-eliminarAlumno.puml)|

</div>

## clases de anÃ¡lisis identificadas

### clases model (naranja #F2AC4E)
|Clase|Responsabilidad|Trazabilidad|
|-|-|-|
|**Student**|Entidad que representa al alumno a eliminar|Modelo del dominio|

### clases view (azul #629EF9)
|Clase|Responsabilidad|DerivaciÃ³n|
|-|-|-|
|**StudentDeleteView**|Interfaz que permite revisar datos, mostrar advertencias y confirmar la eliminaciÃ³n|Wireframe|

### clases controller (verde #b5bd68)
|Clase|Responsabilidad|Caso de uso|
|-|-|-|
|**StudentController**|Gestiona la lÃ³gica de eliminaciÃ³n y coordina la baja del alumno|eliminarAlumno()|

## mensajes de colaboraciÃ³n

|Origen|Destino|Mensaje|IntenciÃ³n|
|-|-|-|-|
|**Docente**|**StudentDeleteView**|`solicitarEliminar()`|Solicitar la eliminaciÃ³n de un alumno|
|**StudentDeleteView**|**Student**|`getDatos()`|Obtener informaciÃ³n del alumno|
|**Docente**|**StudentDeleteView**|`confirmarEliminar()`|Confirmar la acciÃ³n de borrado|
|**StudentDeleteView**|**StudentController**|`eliminarAlumno()`|Delegar la eliminaciÃ³n al controlador|
|**StudentController**|**Student**|`delete()`|Eliminar fÃ­sicamente la entidad|

## trazabilidad con artefactos previos

### con especificaciÃ³n detallada
- **Estados internos** â†’ `ConfirmingDeletion`, `DeletingStudent`


```plantuml
@startuml eliminarAlumno-analisis
skinparam linetype polyline

actor Docente
package eliminarAlumno as "eliminarAlumno()" {
    rectangle #629EF9 StudentDeleteView
    rectangle #b5bd68 StudentController
    rectangle #F2AC4E Student
}

Docente -r-> StudentDeleteView: solicitarEliminar()
StudentDeleteView --> Student: getDatos()
Docente --> StudentDeleteView: confirmarEliminar()
StudentDeleteView -d-> StudentController: eliminarAlumno()
StudentController --> Student: delete()

@enduml
```
















































