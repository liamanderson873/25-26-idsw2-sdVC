# Jorgestor > CU-25-eliminarPregunta > AnÃ¡lisis

## informaciÃ³n del artefacto

- **Proyecto**: Jorgestor
- **Fase RUP**: Elaboration (ElaboraciÃ³n)
- **Disciplina**: AnÃ¡lisis
- **VersiÃ³n**: 1.0
- **Fecha**: 2026-05-24
- **Autor**: Equipo de desarrollo

## propÃ³sito

AnÃ¡lisis del caso de uso Eliminar Pregunta. Sigue el patrÃ³n de eliminaciÃ³n segura con confirmaciÃ³n explÃ­cita.

## diagrama de colaboraciÃ³n

<div align=center>

|![AnÃ¡lisis: eliminarPregunta()](https://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/diseno-secuencia-CU-25-eliminarPregunta.puml&fmt=svg)|
|-|
|CÃ³digo fuente: [analisis-colaboracion-CU-25-eliminarPregunta.puml](analisis-colaboracion-CU-25-eliminarPregunta.puml)|

</div>

## clases de anÃ¡lisis identificadas

### clases model (naranja #F2AC4E)
|Clase|Responsabilidad|Trazabilidad|
|-|-|-|
|**Question**|La entidad que serÃ¡ eliminada del sistema|Modelo del dominio|

### clases view (azul #629EF9)
|Clase|Responsabilidad|DerivaciÃ³n|
|-|-|-|
|**QuestionDeleteView**|Interfaz para visualizar detalles, advertencias y confirmaciÃ³n|Wireframe|

### clases controller (verde #b5bd68)
|Clase|Responsabilidad|Caso de uso|
|-|-|-|
|**QuestionController**|Gestiona el proceso de eliminaciÃ³n lÃ³gica o fÃ­sica|eliminarPregunta()|

## mensajes de colaboraciÃ³n

|Origen|Destino|Mensaje|IntenciÃ³n|
|-|-|-|-|
|**Docente**|**QuestionDeleteView**|`solicitarEliminacion(id)`|Iniciar proceso de baja|
|**QuestionDeleteView**|**QuestionController**|`obtenerDatosPregunta(id)`|Delegar recuperaciÃ³n para confirmaciÃ³n|
|**QuestionController**|**Question**|`getDetalles()`|Consultar entidad|
|**QuestionDeleteView**|**QuestionDeleteView**|`mostrarAdvertencia()`|Alertar sobre irreversibilidad|
|**Docente**|**QuestionDeleteView**|`confirmarEliminacion()`|Confirmar acciÃ³n|
|**QuestionDeleteView**|**QuestionController**|`eliminarDefinitivamente(id)`|Ejecutar la baja|
|**QuestionController**|**Question**|`delete()`|Eliminar del sistema|

## trazabilidad con artefactos previos

- **Seguridad**: Implementa eliminaciÃ³n con confirmaciÃ³n obligatoria.
- **Estados**: `ConfirmingDeletion`, `DeletingQuestion`.

```plantuml
@startuml eliminarPregunta-analisis
skinparam linetype polyline

actor Docente
package eliminarPregunta as "eliminarPregunta()" {
    rectangle #629EF9 QuestionDeleteView
    rectangle #b5bd68 QuestionController
    rectangle #F2AC4E Question
}

Docente -r-> QuestionDeleteView: solicitarEliminacion(id)
QuestionDeleteView -d-> QuestionController: obtenerDatosPregunta(id)
QuestionController --> Question: getDetalles()
QuestionDeleteView --> QuestionDeleteView: mostrarAdvertencia()

Docente --> QuestionDeleteView: confirmarEliminacion()
QuestionDeleteView --> QuestionController: eliminarDefinitivamente(id)
QuestionController --> Question: delete()

@enduml
```
















































