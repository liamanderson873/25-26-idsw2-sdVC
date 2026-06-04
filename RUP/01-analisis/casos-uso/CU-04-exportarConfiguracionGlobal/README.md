# Jorgestor > CU-04-exportarConfiguracionGlobal > AnÃ¡lisis

> |[ðŸ ï¸](/Jorgestor/RUP/README.md)|[ ðŸ“Š](#)|[Detalle](/Jorgestor/RUP/00-casos-uso/02-detalle/CU-04-exportarConfiguracionGlobal/README.md)|**AnÃ¡lisis**|DiseÃ±o|Desarrollo|Pruebas|
> |-|-|-|-|-|-|-|

## informaciÃ³n del artefacto

- **Proyecto**: Jorgestor
- **Fase RUP**: Elaboration (ElaboraciÃ³n)
- **Disciplina**: AnÃ¡lisis
- **VersiÃ³n**: 1.0
- **Fecha**: 2026-05-24
- **Autor**: Equipo de desarrollo

## propÃ³sito

AnÃ¡lisis del caso de uso Exportar ConfiguraciÃ³n Global. Describe el proceso de extracciÃ³n de datos masivos.

## diagrama de colaboraciÃ³n

<div align=center>

|![AnÃ¡lisis: exportarConfiguracionGlobal()](https://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/casos-uso/CU-04-exportarConfiguracionGlobal/analisis-colaboracion-CU-04-exportarConfiguracionGlobal.puml&fmt=svg)|
|-|
|CÃ³digo fuente: [analisis-colaboracion-CU-04-exportarConfiguracionGlobal.puml](analisis-colaboracion-CU-04-exportarConfiguracionGlobal.puml)|

</div>

## clases de anÃ¡lisis identificadas

### clases model (naranja #F2AC4E)
|Clase|Responsabilidad|Trazabilidad|
|-|-|-|
|**Student**|Fuente de datos de alumnos|Modelo del dominio|
|**Grade**|Fuente de datos de grados|Modelo del dominio|
|**Subject**|Fuente de datos de asignaturas|Modelo del dominio|
|**Question**|Fuente de datos de preguntas|Modelo del dominio|

### clases view (azul #629EF9)
|Clase|Responsabilidad|DerivaciÃ³n|
|-|-|-|
|**GlobalConfigExportView**|Interfaz para configurar la exportaciÃ³n|Wireframe|

### clases controller (verde #b5bd68)
|Clase|Responsabilidad|Caso de uso|
|-|-|-|
|**ExportController**|Recopila instancias, estructura y genera salida|exportarConfiguracionGlobal()|

## mensajes de colaboraciÃ³n

|Origen|Destino|Mensaje|IntenciÃ³n|
|-|-|-|-|
|**Docente**|**GlobalConfigExportView**|`exportarConfiguracion(opciones)`|Solicitar exportaciÃ³n|
|**GlobalConfigExportView**|**ExportController**|`recopilarDatos(opciones)`|Delegar la recopilaciÃ³n de datos|
|**ExportController**|**Student**|`obtenerTodos()`|Consultar fuente|
|**ExportController**|**Grade**|`obtenerTodos()`|Consultar fuente|
|**ExportController**|**Subject**|`obtenerTodos()`|Consultar fuente|
|**ExportController**|**Question**|`obtenerTodos()`|Consultar fuente|
|**ExportController**|**GlobalConfigExportView**|`mostrarConfirmacion()`|Confirmar archivo generado|
|**Docente**|**GlobalConfigExportView**|`confirmarExportacion()`|Confirmar descarga/generaciÃ³n|
|**GlobalConfigExportView**|**ExportController**|`generarArchivo()`|Generar archivo final|

## trazabilidad con artefactos previos

- **Consistencia**: La exportaciÃ³n debe asegurar que los datos extraÃ­dos sean coherentes entre sÃ­.

```plantuml
@startuml exportarConfiguracionGlobal-analisis
skinparam linetype polyline

actor Docente
package exportarConfiguracionGlobal as "exportarConfiguracionGlobal()" {
    rectangle #629EF9 GlobalConfigExportView
    rectangle #b5bd68 ExportController
    rectangle #F2AC4E Student
    rectangle #F2AC4E Grade
    rectangle #F2AC4E Subject
    rectangle #F2AC4E Question
}

Docente -r-> GlobalConfigExportView: exportarConfiguracion(opciones)
GlobalConfigExportView -d-> ExportController: recopilarDatos(opciones)

ExportController --> Student: obtenerTodos()
ExportController --> Grade: obtenerTodos()
ExportController --> Subject: obtenerTodos()
ExportController --> Question: obtenerTodos()

ExportController --> GlobalConfigExportView: mostrarConfirmacion()
Docente --> GlobalConfigExportView: confirmarExportacion()
GlobalConfigExportView --> ExportController: generarArchivo()

@enduml
```















































