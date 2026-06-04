# Jorgestor > exportarAsignaturas > AnÃ¡lisis

## PropÃ³sito
AnÃ¡lisis del caso de uso `exportarAsignaturas()` mediante diagrama de colaboraciÃ³n MVC, identificando clases de anÃ¡lisis y sus interacciones.

## diagrama de colaboraciÃ³n

<div align=center>

|![AnÃ¡lisis: exportarAsignaturas()](https://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/casos-uso/CU-40-exportarAsignaturas/analisis-colaboracion-CU-40-exportarAsignaturas.puml&fmt=svg)|
|-|
|CÃ³digo fuente: [analisis-colaboracion-CU-40-exportarAsignaturas.puml](analisis-colaboracion-CU-40-exportarAsignaturas.puml)|

</div>

## Clases de AnÃ¡lisis Identificadas

### Clases Model (Entidad)
| Clase | Responsabilidad |
|-------|-----------------|
| **Subject** | Entidad que representa la asignatura a exportar. |

### Clases View (Frontera)
| Clase | Responsabilidad |
|-------|-----------------|
| **SubjectExportView** | Interfaz para configurar la exportaciÃ³n de asignaturas. |

### Clases Controller (Control)
| Clase | Responsabilidad |
|-------|-----------------|
| **SubjectExportController** | Orquesta la recopilaciÃ³n de datos y generaciÃ³n del archivo. |

## Mensajes de ColaboraciÃ³n
| Origen | Destino | Mensaje | IntenciÃ³n |
|--------|---------|---------|-----------|
| **Docente** | **SubjectExportView** | `exportarAsignaturas()` | Iniciar proceso de exportaciÃ³n. |
| **SubjectExportView** | **SubjectExportController** | `procesarExportacion()` | Delegar la lÃ³gica de exportaciÃ³n. |
| **SubjectExportController** | **Subject** | `obtenerDatosAsignaturas()` | Recopilar informaciÃ³n de las entidades. |

```plantuml
@startuml
skinparam linetype polyline

class "SubjectExportView" <<boundary>>
class "SubjectExportController" <<control>>
class "Subject" <<entity>>

SubjectExportView -> SubjectExportController : procesarExportacion()
SubjectExportController -> Subject : obtenerDatosAsignaturas()
@enduml
```















































