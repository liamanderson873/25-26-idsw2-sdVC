# Jorgestor > exportarAsignaturas > Análisis

## Propósito
Análisis del caso de uso `exportarAsignaturas()` mediante diagrama de colaboración MVC, identificando clases de análisis y sus interacciones.

## diagrama de colaboración

<div align=center>

|![Análisis: exportarAsignaturas()](https://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/casos-uso/CU-40-exportarAsignaturas/analisis-colaboracion-CU-40-exportarAsignaturas.puml&fmt=svg)|
|-|
|Código fuente: [analisis-colaboracion-CU-40-exportarAsignaturas.puml](analisis-colaboracion-CU-40-exportarAsignaturas.puml)|

</div>

## Clases de Análisis Identificadas

### Clases Model (Entidad)
| Clase | Responsabilidad |
|-------|-----------------|
| **Subject** | Entidad que representa la asignatura a exportar. |

### Clases View (Frontera)
| Clase | Responsabilidad |
|-------|-----------------|
| **SubjectExportView** | Interfaz para configurar la exportación de asignaturas. |

### Clases Controller (Control)
| Clase | Responsabilidad |
|-------|-----------------|
| **SubjectExportController** | Orquesta la recopilación de datos y generación del archivo. |

## Mensajes de Colaboración
| Origen | Destino | Mensaje | Intención |
|--------|---------|---------|-----------|
| **Docente** | **SubjectExportView** | `exportarAsignaturas()` | Iniciar proceso de exportación. |
| **SubjectExportView** | **SubjectExportController** | `procesarExportacion()` | Delegar la lógica de exportación. |
| **SubjectExportController** | **Subject** | `obtenerDatosAsignaturas()` | Recopilar información de las entidades. |

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
















































