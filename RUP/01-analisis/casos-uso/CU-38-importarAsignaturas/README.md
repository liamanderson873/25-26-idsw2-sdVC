# Jorgestor > CU-38-importarAsignaturas > AnÃ¡lisis

> |[ðŸ ï¸](/Jorgestor/RUP/README.md)|[ ðŸ“Š](#)|[Detalle](/Jorgestor/RUP/00-casos-uso/02-detalle/CU-38-importarAsignaturas/README.md)|**AnÃ¡lisis**|DiseÃ±o|Desarrollo|Pruebas|
> |-|-|-|-|-|-|-|

## informaciÃ³n del artefacto

- **Proyecto**: Jorgestor
- **Fase RUP**: Elaboration (ElaboraciÃ³n)
- **Disciplina**: AnÃ¡lisis
- **VersiÃ³n**: 1.0
- **Fecha**: 2026-05-24
- **Autor**: Equipo de desarrollo

## propÃ³sito

AnÃ¡lisis tecnolÃ³gico agnÃ³stico del caso de uso Importar Asignaturas, siguiendo la metodologÃ­a RUP. Permite analizar el flujo de integraciÃ³n masiva de asignaturas desde archivos externos.

## diagrama de colaboraciÃ³n

<div align=center>

|![AnÃ¡lisis: importarAsignaturas()](https://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/casos-uso/CU-38-importarAsignaturas/analisis-colaboracion-CU-38-importarAsignaturas.puml&fmt=svg)|
|-|
|CÃ³digo fuente: [analisis-colaboracion-CU-38-importarAsignaturas.puml](analisis-colaboracion-CU-38-importarAsignaturas.puml)|

</div>

## clases de anÃ¡lisis identificadas

### clases model (naranja #F2AC4E)
|Clase|Responsabilidad|Trazabilidad|
|-|-|-|
|**Subject**|Entidad asignatura que serÃ¡ creada o actualizada|Modelo del dominio|

### clases view (azul #629EF9)
|Clase|Responsabilidad|DerivaciÃ³n|
|-|-|-|
|**SubjectImportView**|Interfaz para selecciÃ³n de archivo, previsualizaciÃ³n y confirmaciÃ³n|Wireframe|

### clases controller (verde #b5bd68)
|Clase|Responsabilidad|Caso de uso|
|-|-|-|
|**SubjectImportController**|Gestiona la validaciÃ³n de datos, control de duplicados y persistencia|importarAsignaturas()|

## mensajes de colaboraciÃ³n

|Origen|Destino|Mensaje|IntenciÃ³n|
|-|-|-|-|
|**Docente**|**SubjectImportView**|`solicitarImportar()`|Iniciar el proceso de importaciÃ³n|
|**SubjectImportView**|**Docente**|`pedirArchivo()`|Solicitar el origen de los datos|
|**Docente**|**SubjectImportView**|`proporcionarArchivo()`|Entregar el archivo para procesar|
|**SubjectImportView**|**SubjectImportController**|`validarDatos(archivo)`|Delegar la validaciÃ³n y anÃ¡lisis|
|**SubjectImportController**|**Subject**|`verificarExistencia()`|Comprobar si ya existen las asignaturas|
|**SubjectImportView**|**Docente**|`mostrarResumen()`|Presentar resultados de la validaciÃ³n|
|**Docente**|**SubjectImportView**|`confirmarImportacion()`|Validar la carga definitiva|
|**SubjectImportView**|**SubjectImportController**|`importar()`|Coordinar la persistencia masiva|
|**SubjectImportController**|**Subject**|`save()`|Persistir las nuevas entidades|

## trazabilidad con artefactos previos

### con especificaciÃ³n detallada
- **Decisiones** â†’ Se sigue el patrÃ³n de importaciÃ³n consistente con el resto de entidades.


```plantuml
@startuml importarAsignaturas-analisis
skinparam linetype polyline

actor Docente
package importarAsignaturas as "importarAsignaturas()" {
    rectangle #629EF9 SubjectImportView
    rectangle #b5bd68 SubjectImportController
    rectangle #F2AC4E Subject
}

Docente -r-> SubjectImportView: solicitarImportar()
SubjectImportView --> Docente: pedirArchivo()
Docente --> SubjectImportView: proporcionarArchivo()
SubjectImportView --> SubjectImportController: validarDatos()
SubjectImportController --> Subject: verificarExistencia()
SubjectImportView --> Docente: mostrarResumen()
Docente --> SubjectImportView: confirmarImportacion()
SubjectImportView -d-> SubjectImportController: importar()
SubjectImportController --> Subject: save()

@enduml
```















































