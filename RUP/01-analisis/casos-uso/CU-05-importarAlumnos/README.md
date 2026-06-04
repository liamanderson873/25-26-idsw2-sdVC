# Jorgestor > CU-05-importarAlumnos > AnÃ¡lisis

> |[ðŸ ï¸](/Jorgestor/RUP/README.md)|[ ðŸ“Š](#)|[Detalle](/Jorgestor/RUP/00-casos-uso/02-detalle/CU-05-importarAlumnos/README.md)|**AnÃ¡lisis**|DiseÃ±o|Desarrollo|Pruebas|
> |-|-|-|-|-|-|-|

## informaciÃ³n del artefacto

- **Proyecto**: Jorgestor
- **Fase RUP**: Elaboration (ElaboraciÃ³n)
- **Disciplina**: AnÃ¡lisis
- **VersiÃ³n**: 1.0
- **Fecha**: 2026-05-24
- **Autor**: Equipo de desarrollo

## propÃ³sito

AnÃ¡lisis del caso de uso Importar Alumnos. Describe la importaciÃ³n desde archivos externos.

## diagrama de colaboraciÃ³n

<div align=center>

|![AnÃ¡lisis: importarAlumnos()](https://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/diseno-secuencia-CU-05-importarAlumnos.puml&fmt=svg)|
|-|
|CÃ³digo fuente: [analisis-colaboracion-CU-05-importarAlumnos.puml](analisis-colaboracion-CU-05-importarAlumnos.puml)|

</div>

## clases de anÃ¡lisis identificadas

### clases model (naranja #F2AC4E)
|Clase|Responsabilidad|Trazabilidad|
|-|-|-|
|**Student**|Entidad que representa al alumno en el sistema|Modelo del dominio|

### clases view (azul #629EF9)
|Clase|Responsabilidad|DerivaciÃ³n|
|-|-|-|
|**StudentImportView**|Interfaz para seleccionar archivo y confirmar importaciÃ³n de alumnos|Wireframe|

### clases controller (verde #b5bd68)
|Clase|Responsabilidad|Caso de uso|
|-|-|-|
|**StudentImportController**|Orquesta, valida formato y gestiona la persistencia|importarAlumnos()|

## mensajes de colaboraciÃ³n

|Origen|Destino|Mensaje|IntenciÃ³n|
|-|-|-|-|
|**Docente**|**StudentImportView**|`seleccionarArchivo(archivo)`|Proporcionar el archivo|
|**StudentImportView**|**StudentImportController**|`procesarArchivo(archivo)`|Delegar la validaciÃ³n y procesamiento|
|**StudentImportController**|**Student**|`validarDuplicado()`|Comprobar si el alumno ya existe|
|**StudentImportController**|**StudentImportView**|`mostrarPrevisualizacion()`|Solicitar confirmaciÃ³n de la importaciÃ³n|
|**Docente**|**StudentImportView**|`confirmarImportacion()`|Confirmar los alumnos a importar|
|**StudentImportView**|**StudentImportController**|`persistirAlumnos()`|Persistir los nuevos alumnos|
|**StudentImportController**|**Student**|`guardar()`|Guardar alumnos en el sistema|

## trazabilidad con artefactos previos

- **EspecializaciÃ³n**: Se centra exclusivamente en la entidad `Student`.

```plantuml
@startuml importarAlumnos-analisis
skinparam linetype polyline

actor Docente
package importarAlumnos as "importarAlumnos()" {
    rectangle #629EF9 StudentImportView
    rectangle #b5bd68 StudentImportController
    rectangle #F2AC4E Student
}

Docente -r-> StudentImportView: seleccionarArchivo(archivo)
StudentImportView -d-> StudentImportController: procesarArchivo(archivo)
StudentImportController --> Student: validarDuplicado()
StudentImportController --> StudentImportView: mostrarPrevisualizacion()

Docente --> StudentImportView: confirmarImportacion()
StudentImportView --> StudentImportController: persistirAlumnos()
StudentImportController --> Student: guardar()

@enduml
```















































