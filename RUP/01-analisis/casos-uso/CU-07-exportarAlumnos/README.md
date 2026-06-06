# Jorgestor > CU-07-exportarAlumnos > AnÃ¡lisis

## informaciÃ³n del artefacto

- **Proyecto**: Jorgestor
- **Fase RUP**: Elaboration (ElaboraciÃ³n)
- **Disciplina**: AnÃ¡lisis
- **VersiÃ³n**: 1.0
- **Fecha**: 2026-05-24
- **Autor**: Equipo de desarrollo

## propÃ³sito

AnÃ¡lisis del caso de uso Exportar Alumnos.

## diagrama de colaboraciÃ³n

<div align=center>

|![AnÃ¡lisis: exportarAlumnos()](https://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/casos-uso/CU-07-exportarAlumnos/analisis-colaboracion-CU-07-exportarAlumnos.puml&fmt=svg)|
|-|
|CÃ³digo fuente: [analisis-colaboracion-CU-07-exportarAlumnos.puml](analisis-colaboracion-CU-07-exportarAlumnos.puml)|

</div>

## clases de anÃ¡lisis identificadas

### clases model (naranja #F2AC4E)
|Clase|Responsabilidad|Trazabilidad|
|-|-|-|
|**Student**|Fuente de los datos de alumnos|Modelo del dominio|

### clases view (azul #629EF9)
|Clase|Responsabilidad|DerivaciÃ³n|
|-|-|-|
|**StudentExportView**|Interfaz para solicitar exportaciÃ³n y ver resultado|Wireframe|

### clases controller (verde #b5bd68)
|Clase|Responsabilidad|Caso de uso|
|-|-|-|
|**ExportController**|Gestiona extracciÃ³n y transformaciÃ³n de datos|exportarAlumnos()|

## mensajes de colaboraciÃ³n

|Origen|Destino|Mensaje|IntenciÃ³n|
|-|-|-|-|
|**Docente**|**StudentExportView**|`exportarAlumnos()`|Solicitar exportaciÃ³n|
|**StudentExportView**|**ExportController**|`prepararDatos()`|Delegar preparaciÃ³n|
|**ExportController**|**Student**|`obtenerTodos()`|Consultar fuente|
|**ExportController**|**StudentExportView**|`notificarExito()`|Informar resultado|

## trazabilidad con artefactos previos

- **AbstracciÃ³n**: Puede ser invocado de forma independiente o como parte de la ExportaciÃ³n Global.

```plantuml
@startuml exportarAlumnos-analisis
skinparam linetype polyline

actor Docente
package exportarAlumnos as "exportarAlumnos()" {
    rectangle #629EF9 StudentExportView
    rectangle #b5bd68 ExportController
    rectangle #F2AC4E Student
}

Docente -r-> StudentExportView: exportarAlumnos()
StudentExportView -d-> ExportController: prepararDatos()
ExportController --> Student: obtenerTodos()
ExportController --> StudentExportView: notificarExito()

@enduml
```
















































