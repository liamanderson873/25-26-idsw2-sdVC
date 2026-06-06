# Jorgestor > exportarGrados > Análisis

## Propósito
Análisis del caso de uso `exportarGrados()` mediante diagrama de colaboración MVC.

## diagrama de colaboración

<div align=center>

|![Análisis: exportarGrados()](https://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/casos-uso/CU-41-exportarGrados/analisis-colaboracion-CU-41-exportarGrados.puml&fmt=svg)|
|-|
|Código fuente: [analisis-colaboracion-CU-41-exportarGrados.puml](analisis-colaboracion-CU-41-exportarGrados.puml)|

</div>

## Clases de Análisis Identificadas

### Clases Model (Entidad)
| Clase | Responsabilidad |
|-------|-----------------|
| **Grade** | Entidad que representa el grado a exportar. |

### Clases View (Frontera)
| Clase | Responsabilidad |
|-------|-----------------|
| **GradeExportView** | Interfaz para la gestión de la exportación de grados. |

### Clases Controller (Control)
| Clase | Responsabilidad |
|-------|-----------------|
| **GradeExportController** | Gestiona la recopilación de datos y preparación del archivo. |

## Mensajes de Colaboración
| Origen | Destino | Mensaje | Intención |
|--------|---------|---------|-----------|
| **Docente** | **GradeExportView** | `exportarGrados()` | Iniciar proceso de exportación. |
| **GradeExportView** | **GradeExportController** | `procesarExportacion()` | Delegar la lógica de exportación. |
| **GradeExportController** | **Grade** | `obtenerDatosGrados()` | Recopilar información de las entidades. |

```plantuml
@startuml
skinparam linetype polyline

class "GradeExportView" <<boundary>>
class "GradeExportController" <<control>>
class "Grade" <<entity>>

GradeExportView -> GradeExportController : procesarExportacion()
GradeExportController -> Grade : obtenerDatosGrados()
@enduml
```
















































