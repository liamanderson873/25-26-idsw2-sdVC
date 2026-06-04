# Jorgestor > CU-06-importarPreguntas > AnÃ¡lisis

> |[ðŸ ï¸](/Jorgestor/RUP/README.md)|[ ðŸ“Š](#)|[Detalle](/Jorgestor/RUP/00-casos-uso/02-detalle/CU-06-importarPreguntas/README.md)|**AnÃ¡lisis**|DiseÃ±o|Desarrollo|Pruebas|
> |-|-|-|-|-|-|-|

## informaciÃ³n del artefacto

- **Proyecto**: Jorgestor
- **Fase RUP**: Elaboration (ElaboraciÃ³n)
- **Disciplina**: AnÃ¡lisis
- **VersiÃ³n**: 1.0
- **Fecha**: 2026-05-24
- **Autor**: Equipo de desarrollo

## propÃ³sito

AnÃ¡lisis del caso de uso Importar Preguntas. Permite la carga masiva de preguntas al banco de datos.

## diagrama de colaboraciÃ³n

<div align=center>

|![AnÃ¡lisis: importarPreguntas()](https://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/diseno-secuencia-CU-06-importarPreguntas.puml&fmt=svg)|
|-|
|CÃ³digo fuente: [analisis-colaboracion-CU-06-importarPreguntas.puml](analisis-colaboracion-CU-06-importarPreguntas.puml)|

</div>

## clases de anÃ¡lisis identificadas

### clases model (naranja #F2AC4E)
|Clase|Responsabilidad|Trazabilidad|
|-|-|-|
|**Question**|Entidad pregunta que serÃ¡ creada o actualizada|Modelo del dominio|
|**Subject**|Asignatura para contextualizar la importaciÃ³n|Modelo del dominio|
|**Topic**|Tema para contextualizar la importaciÃ³n|Modelo del dominio|

### clases view (azul #629EF9)
|Clase|Responsabilidad|DerivaciÃ³n|
|-|-|-|
|**QuestionImportView**|Interfaz para cargar archivo y confirmar integraciÃ³n|Wireframe|

### clases controller (verde #b5bd68)
|Clase|Responsabilidad|Caso de uso|
|-|-|-|
|**QuestionImportController**|Valida formato y asocia preguntas a entidades|importarPreguntas()|

## mensajes de colaboraciÃ³n

|Origen|Destino|Mensaje|IntenciÃ³n|
|-|-|-|-|
|**Docente**|**QuestionImportView**|`seleccionarOrigen(archivo)`|Proporcionar el archivo de preguntas|
|**QuestionImportView**|**QuestionImportController**|`analizarArchivo(archivo)`|Delegar la validaciÃ³n y procesamiento|
|**QuestionImportController**|**Question**|`crearInstancia()`|Instanciar nuevas preguntas|
|**QuestionImportController**|**QuestionImportView**|`mostrarResumen()`|Solicitar confirmaciÃ³n|
|**Docente**|**QuestionImportView**|`confirmarImportacion()`|Confirmar integraciÃ³n|
|**QuestionImportView**|**QuestionImportController**|`persistirPreguntas()`|Ejecutar persistencia|
|**QuestionImportController**|**Question**|`guardar()`|Persistir entidad|

## trazabilidad con artefactos previos

- **Contextualidad**: Puede ocurrir en estados general o contextual.
- **Integridad**: ValidaciÃ³n de requisitos mÃ­nimos (ej: respuesta correcta).

```plantuml
@startuml importarPreguntas-analisis
skinparam linetype polyline

actor Docente
package importarPreguntas as "importarPreguntas()" {
    rectangle #629EF9 QuestionImportView
    rectangle #b5bd68 QuestionImportController
    rectangle #F2AC4E Question
    rectangle #F2AC4E Subject
    rectangle #F2AC4E Topic
}

Docente -r-> QuestionImportView: seleccionarOrigen(archivo)
QuestionImportView -d-> QuestionImportController: analizarArchivo(archivo)
QuestionImportController --> Question: crearInstancia()
QuestionImportController --> QuestionImportView: mostrarResumen()

Docente --> QuestionImportView: confirmarImportacion()
QuestionImportView --> QuestionImportController: persistirPreguntas()
QuestionImportController --> Question: guardar()

@enduml
```















































