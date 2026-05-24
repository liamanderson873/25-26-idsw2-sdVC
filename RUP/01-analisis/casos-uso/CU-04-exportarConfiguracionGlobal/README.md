# Jorgestor > CU-04-exportarConfiguracionGlobal > Análisis

> |[🏠️](/Jorgestor/RUP/README.md)|[ 📊](#)|[Detalle](/Jorgestor/RUP/00-casos-uso/02-detalle/CU-04-exportarConfiguracionGlobal/README.md)|**Análisis**|Diseño|Desarrollo|Pruebas|
> |-|-|-|-|-|-|-|

## información del artefacto

- **Proyecto**: Jorgestor
- **Fase RUP**: Elaboration (Elaboración)
- **Disciplina**: Análisis
- **Versión**: 1.0
- **Fecha**: 2026-05-24
- **Autor**: Equipo de desarrollo

## propósito

Análisis del caso de uso Exportar Configuración Global. Describe el proceso de extracción de datos masivos.

## diagrama de colaboración

<div align=center>

|![Análisis: exportarConfiguracionGlobal()](https://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/casos-uso/CU-04-exportarConfiguracionGlobal/colaboracion.puml&fmt=svg)|
|-|
|Código fuente: [colaboracion.puml](colaboracion.puml)|

</div>

## clases de análisis identificadas

### clases model (naranja #F2AC4E)
|Clase|Responsabilidad|Trazabilidad|
|-|-|-|
|**Student**|Fuente de datos de alumnos|Modelo del dominio|
|**Grade**|Fuente de datos de grados|Modelo del dominio|
|**Subject**|Fuente de datos de asignaturas|Modelo del dominio|
|**Question**|Fuente de datos de preguntas|Modelo del dominio|

### clases view (azul #629EF9)
|Clase|Responsabilidad|Derivación|
|-|-|-|
|**GlobalConfigExportView**|Interfaz para configurar la exportación|Wireframe|

### clases controller (verde #b5bd68)
|Clase|Responsabilidad|Caso de uso|
|-|-|-|
|**ExportController**|Recopila instancias, estructura y genera salida|exportarConfiguracionGlobal()|

## mensajes de colaboración

|Origen|Destino|Mensaje|Intención|
|-|-|-|-|
|**Docente**|**GlobalConfigExportView**|`exportarConfiguracion(opciones)`|Solicitar exportación|
|**GlobalConfigExportView**|**ExportController**|`recopilarDatos(opciones)`|Delegar la recopilación de datos|
|**ExportController**|**Student**|`obtenerTodos()`|Consultar fuente|
|**ExportController**|**Grade**|`obtenerTodos()`|Consultar fuente|
|**ExportController**|**Subject**|`obtenerTodos()`|Consultar fuente|
|**ExportController**|**Question**|`obtenerTodos()`|Consultar fuente|
|**ExportController**|**GlobalConfigExportView**|`mostrarConfirmacion()`|Confirmar archivo generado|
|**Docente**|**GlobalConfigExportView**|`confirmarExportacion()`|Confirmar descarga/generación|
|**GlobalConfigExportView**|**ExportController**|`generarArchivo()`|Generar archivo final|

## trazabilidad con artefactos previos

- **Consistencia**: La exportación debe asegurar que los datos extraídos sean coherentes entre sí.

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
