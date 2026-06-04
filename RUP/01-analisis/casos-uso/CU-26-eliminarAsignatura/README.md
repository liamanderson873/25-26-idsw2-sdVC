# Jorgestor > CU-26-eliminarAsignatura > AnÃ¡lisis

> |[ðŸ ï¸](/Jorgestor/RUP/README.md)|[ ðŸ“Š](#)|[Detalle](/Jorgestor/RUP/00-casos-uso/02-detalle/CU-26-eliminarAsignatura/README.md)|**AnÃ¡lisis**|DiseÃ±o|Desarrollo|Pruebas|
> |-|-|-|-|-|-|-|

## informaciÃ³n del artefacto

- **Proyecto**: Jorgestor
- **Fase RUP**: Elaboration (ElaboraciÃ³n)
- **Disciplina**: AnÃ¡lisis
- **VersiÃ³n**: 1.0
- **Fecha**: 2026-05-24
- **Autor**: Equipo de desarrollo

## propÃ³sito

AnÃ¡lisis tecnolÃ³gico agnÃ³stico del caso de uso Eliminar Asignatura, siguiendo la metodologÃ­a RUP. Permite analizar el flujo y la validaciÃ³n de la baja de una asignatura en el sistema.

## diagrama de colaboraciÃ³n

<div align=center>

|![AnÃ¡lisis: eliminarAsignatura()](https://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/diseno-secuencia-CU-26-eliminarAsignatura.puml&fmt=svg)|
|-|
|CÃ³digo fuente: [analisis-colaboracion-CU-26-eliminarAsignatura.puml](analisis-colaboracion-CU-26-eliminarAsignatura.puml)|

</div>

## clases de anÃ¡lisis identificadas

### clases model (naranja #F2AC4E)
|Clase|Responsabilidad|Trazabilidad|
|-|-|-|
|**Subject**|Entidad que representa la asignatura a eliminar|Modelo del dominio|

### clases view (azul #629EF9)
|Clase|Responsabilidad|DerivaciÃ³n|
|-|-|-|
|**SubjectDeleteView**|Interfaz que permite revisar datos, mostrar advertencias y confirmar la eliminaciÃ³n|Wireframe|

### clases controller (verde #b5bd68)
|Clase|Responsabilidad|Caso de uso|
|-|-|-|
|**SubjectController**|Gestiona la lÃ³gica de eliminaciÃ³n, valida restricciones y coordina la baja|eliminarAsignatura()|

## mensajes de colaboraciÃ³n

|Origen|Destino|Mensaje|IntenciÃ³n|
|-|-|-|-|
|**Docente**|**SubjectDeleteView**|`solicitarEliminar()`|Solicitar la eliminaciÃ³n de una asignatura|
|**SubjectDeleteView**|**Subject**|`getDatos()`|Obtener informaciÃ³n de la asignatura para mostrar|
|**Docente**|**SubjectDeleteView**|`confirmarEliminar()`|Confirmar la acciÃ³n de borrado|
|**SubjectDeleteView**|**SubjectController**|`eliminarAsignatura()`|Delegar la eliminaciÃ³n al controlador|
|**SubjectController**|**Subject**|`delete()`|Eliminar fÃ­sicamente la entidad|

## trazabilidad con artefactos previos

### con especificaciÃ³n detallada
- **Estados internos** â†’ `ConfirmingDeletion`, `DeletingSubject`


```plantuml
@startuml eliminarAsignatura-analisis
skinparam linetype polyline

actor Docente
package eliminarAsignatura as "eliminarAsignatura()" {
    rectangle #629EF9 SubjectDeleteView
    rectangle #b5bd68 SubjectController
    rectangle #F2AC4E Subject
}

Docente -r-> SubjectDeleteView: solicitarEliminar()
SubjectDeleteView --> Subject: getDatos()
Docente --> SubjectDeleteView: confirmarEliminar()
SubjectDeleteView -d-> SubjectController: eliminarAsignatura()
SubjectController --> Subject: delete()

@enduml
```















































