# Jorgestor > CU-05-importarAlumnos > Análisis

## información del artefacto

- **Proyecto**: Jorgestor
- **Fase RUP**: Elaboration (Elaboración)
- **Disciplina**: Análisis
- **Versión**: 1.0
- **Fecha**: 2026-05-24
- **Autor**: Equipo de desarrollo

## propósito

Análisis del caso de uso Importar Alumnos. Describe la importación desde archivos externos.

## diagrama de colaboración

<div align=center>

|![Análisis: importarAlumnos()](https://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/diseno-secuencia-CU-05-importarAlumnos.puml&fmt=svg)|
|-|
|Código fuente: [analisis-colaboracion-CU-05-importarAlumnos.puml](analisis-colaboracion-CU-05-importarAlumnos.puml)|

</div>

## clases de análisis identificadas

### clases model (naranja #F2AC4E)
|Clase|Responsabilidad|Trazabilidad|
|-|-|-|
|**Student**|Entidad que representa al alumno en el sistema|Modelo del dominio|

### clases view (azul #629EF9)
|Clase|Responsabilidad|Derivación|
|-|-|-|
|**StudentImportView**|Interfaz para seleccionar archivo y confirmar importación de alumnos|Wireframe|

### clases controller (verde #b5bd68)
|Clase|Responsabilidad|Caso de uso|
|-|-|-|
|**StudentImportController**|Orquesta, valida formato y gestiona la persistencia|importarAlumnos()|

## mensajes de colaboración

|Origen|Destino|Mensaje|Intención|
|-|-|-|-|
|**Docente**|**StudentImportView**|`seleccionarArchivo(archivo)`|Proporcionar el archivo|
|**StudentImportView**|**StudentImportController**|`procesarArchivo(archivo)`|Delegar la validación y procesamiento|
|**StudentImportController**|**Student**|`validarDuplicado()`|Comprobar si el alumno ya existe|
|**StudentImportController**|**StudentImportView**|`mostrarPrevisualizacion()`|Solicitar confirmación de la importación|
|**Docente**|**StudentImportView**|`confirmarImportacion()`|Confirmar los alumnos a importar|
|**StudentImportView**|**StudentImportController**|`persistirAlumnos()`|Persistir los nuevos alumnos|
|**StudentImportController**|**Student**|`guardar()`|Guardar alumnos en el sistema|

## trazabilidad con artefactos previos

- **Especialización**: Se centra exclusivamente en la entidad `Student`.

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
















































