# Jorgestor > CU-39-importarGrados > AnÃ¡lisis

## informaciÃ³n del artefacto

- **Proyecto**: Jorgestor
- **Fase RUP**: Elaboration (ElaboraciÃ³n)
- **Disciplina**: AnÃ¡lisis
- **VersiÃ³n**: 1.0
- **Fecha**: 2026-05-24
- **Autor**: Equipo de desarrollo

## propÃ³sito

AnÃ¡lisis tecnolÃ³gico agnÃ³stico del caso de uso Importar Grados, siguiendo la metodologÃ­a RUP. Permite analizar el flujo de carga masiva de grados acadÃ©micos desde fuentes externas.

## diagrama de colaboraciÃ³n

<div align=center>

|![AnÃ¡lisis: importarGrados()](https://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/casos-uso/CU-39-importarGrados/analisis-colaboracion-CU-39-importarGrados.puml&fmt=svg)|
|-|
|CÃ³digo fuente: [analisis-colaboracion-CU-39-importarGrados.puml](analisis-colaboracion-CU-39-importarGrados.puml)|

</div>

## clases de anÃ¡lisis identificadas

### clases model (naranja #F2AC4E)
|Clase|Responsabilidad|Trazabilidad|
|-|-|-|
|**Grade**|Entidad grado que serÃ¡ creada en el sistema|Modelo del dominio|

### clases view (azul #629EF9)
|Clase|Responsabilidad|DerivaciÃ³n|
|-|-|-|
|**GradeImportView**|Interfaz para gestiÃ³n de carga de archivo y confirmaciÃ³n de la operaciÃ³n|Wireframe|

### clases controller (verde #b5bd68)
|Clase|Responsabilidad|Caso de uso|
|-|-|-|
|**GradeImportController**|Valida la integridad de los datos y gestiona el alta masiva|importarGrados()|

## mensajes de colaboraciÃ³n

|Origen|Destino|Mensaje|IntenciÃ³n|
|-|-|-|-|
|**Docente**|**GradeImportView**|`solicitarImportar()`|Iniciar el proceso de importaciÃ³n de grados|
|**GradeImportView**|**Docente**|`pedirOrigen()`|Solicitar la fuente de datos|
|**Docente**|**GradeImportView**|`proporcionarOrigen()`|Entregar la informaciÃ³n para procesar|
|**GradeImportView**|**GradeImportController**|`validarIntegridad(datos)`|Delegar la validaciÃ³n tÃ©cnica|
|**GradeImportController**|**Grade**|`verificarDuplicados()`|Asegurar la consistencia de los datos|
|**GradeImportView**|**Docente**|`pedirConfirmacion()`|Solicitar validaciÃ³n final del usuario|
|**Docente**|**GradeImportView**|`confirmar()`|Aceptar la carga masiva|
|**GradeImportView**|**GradeImportController**|`ejecutarImportacion()`|Coordinar el guardado de entidades|
|**GradeImportController**|**Grade**|`createAll()`|Persistir todos los nuevos grados|

## trazabilidad con artefactos previos

### con especificaciÃ³n detallada
- **Decisiones** â†’ Mantiene coherencia con el flujo de importaciÃ³n global centrado en `Grade`.


```plantuml
@startuml importarGrados-analisis
skinparam linetype polyline

actor Docente
package importarGrados as "importarGrados()" {
    rectangle #629EF9 GradeImportView
    rectangle #b5bd68 GradeImportController
    rectangle #F2AC4E Grade
}

Docente -r-> GradeImportView: solicitarImportar()
GradeImportView --> Docente: pedirOrigen()
Docente --> GradeImportView: proporcionarOrigen()
GradeImportView --> GradeImportController: validarIntegridad()
GradeImportController --> Grade: verificarDuplicados()
GradeImportView --> Docente: pedirConfirmacion()
Docente --> GradeImportView: confirmar()
GradeImportView -d-> GradeImportController: ejecutarImportacion()
GradeImportController --> Grade: createAll()

@enduml
```
















































