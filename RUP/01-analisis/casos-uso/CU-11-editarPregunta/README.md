# Jorgestor > CU-11-editarPregunta > AnÃ¡lisis

## informaciÃ³n del artefacto

- **Proyecto**: Jorgestor
- **Fase RUP**: Elaboration (ElaboraciÃ³n)
- **Disciplina**: AnÃ¡lisis
- **VersiÃ³n**: 1.0
- **Fecha**: 2026-05-24
- **Autor**: Equipo de desarrollo

## propÃ³sito

AnÃ¡lisis del caso de uso Editar Pregunta. Permite la modificaciÃ³n de una pregunta y sus respuestas.

## diagrama de colaboraciÃ³n

<div align=center>

|![AnÃ¡lisis: editarPregunta()](https://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/diseno-secuencia-CU-11-editarPregunta.puml&fmt=svg)|
|-|
|CÃ³digo fuente: [analisis-colaboracion-CU-11-editarPregunta.puml](analisis-colaboracion-CU-11-editarPregunta.puml)|

</div>

## clases de anÃ¡lisis identificadas

### clases model (naranja #F2AC4E)
|Clase|Responsabilidad|Trazabilidad|
|-|-|-|
|**Question**|La entidad pregunta a editar|Modelo del dominio|
|**Subject**|Asignatura asociada|Modelo del dominio|
|**Topic**|Tema asociado|Modelo del dominio|
|**Answer**|Respuestas vinculadas a la pregunta|Modelo del dominio|

### clases view (azul #629EF9)
|Clase|Responsabilidad|DerivaciÃ³n|
|-|-|-|
|**QuestionEditView**|Interfaz que presenta datos actuales y permite ediciÃ³n|Wireframe|

### clases controller (verde #b5bd68)
|Clase|Responsabilidad|Caso de uso|
|-|-|-|
|**QuestionController**|Coordina actualizaciÃ³n, valida cambios y gestiona persistencia|editarPregunta()|

## mensajes de colaboraciÃ³n

|Origen|Destino|Mensaje|IntenciÃ³n|
|-|-|-|-|
|**Docente**|**QuestionEditView**|`modificarCampos(datos)`|Introducir cambios|
|**QuestionEditView**|**QuestionController**|`guardarCambios(datos)`|Solicitar persistencia|
|**QuestionController**|**Question**|`actualizar(datos)`|Modificar entidad|
|**QuestionController**|**Answer**|`actualizarRespuestas(respuestas)`|Modificar respuestas vinculadas|
|**Docente**|**QuestionEditView**|`eliminarPregunta()`|Solicitar eliminaciÃ³n|
|**QuestionEditView**|**QuestionController**|`eliminar()`|Gestionar eliminaciÃ³n de la entidad|

## trazabilidad con artefactos previos

- **Contextualidad**: Permite ediciÃ³n tanto en contextos generales como especÃ­ficos de asignatura.
- **EliminaciÃ³n**: Considera dependencias (ej: uso en exÃ¡menes generados).

```plantuml
@startuml editarPregunta-analisis
skinparam linetype polyline

actor Docente
package editarPregunta as "editarPregunta()" {
    rectangle #629EF9 QuestionEditView
    rectangle #b5bd68 QuestionController
    rectangle #F2AC4E Question
    rectangle #F2AC4E Subject
    rectangle #F2AC4E Topic
    rectangle #F2AC4E Answer
}

Docente -r-> QuestionEditView: modificarCampos(datos)
QuestionEditView -d-> QuestionController: guardarCambios(datos)
QuestionController --> Question: actualizar(datos)
QuestionController --> Answer: actualizarRespuestas(respuestas)

Docente --> QuestionEditView: eliminarPregunta()
QuestionEditView --> QuestionController: eliminar()
QuestionController --> Question: delete()

@enduml
```
















































