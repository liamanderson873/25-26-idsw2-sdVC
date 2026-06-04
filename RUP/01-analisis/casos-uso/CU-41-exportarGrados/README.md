# Jorgestor > exportarGrados > AnÃ¡lisis

## PropÃ³sito
AnÃ¡lisis del caso de uso `exportarGrados()` mediante diagrama de colaboraciÃ³n MVC.

## diagrama de colaboraciÃ³n

<div align=center>

|![AnÃ¡lisis: exportarGrados()](https://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/casos-uso/CU-41-exportarGrados/analisis-colaboracion-CU-41-exportarGrados.puml&fmt=svg)|
|-|
|CÃ³digo fuente: [analisis-colaboracion-CU-41-exportarGrados.puml](analisis-colaboracion-CU-41-exportarGrados.puml)|

</div>

## Clases de AnÃ¡lisis Identificadas

### Clases Model (Entidad)
| Clase | Responsabilidad |
|-------|-----------------|
| **Grade** | Entidad que representa el grado a exportar. |

### Clases View (Frontera)
| Clase | Responsabilidad |
|-------|-----------------|
| **GradeExportView** | Interfaz para la gestiÃ³n de la exportaciÃ³n de grados. |

### Clases Controller (Control)
| Clase | Responsabilidad |
|-------|-----------------|
| **GradeExportController** | Gestiona la recopilaciÃ³n de datos y preparaciÃ³n del archivo. |

## Mensajes de ColaboraciÃ³n
| Origen | Destino | Mensaje | IntenciÃ³n |
|--------|---------|---------|-----------|
| **Docente** | **GradeExportView** | `exportarGrados()` | Iniciar proceso de exportaciÃ³n. |
| **GradeExportView** | **GradeExportController** | `procesarExportacion()` | Delegar la lÃ³gica de exportaciÃ³n. |
| **GradeExportController** | **Grade** | `obtenerDatosGrados()` | Recopilar informaciÃ³n de las entidades. |

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















































