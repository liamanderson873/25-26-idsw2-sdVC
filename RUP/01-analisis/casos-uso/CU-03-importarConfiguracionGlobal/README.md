# Jorgestor > CU-03-importarConfiguracionGlobal > Análisis

> |[🏠️](/Jorgestor/RUP/README.md)|[ 📊](#)|[Detalle](/Jorgestor/RUP/00-casos-uso/02-detalle/CU-03-importarConfiguracionGlobal/README.md)|**Análisis**|Diseño|Desarrollo|Pruebas|
> |-|-|-|-|-|-|-|

## información del artefacto

- **Proyecto**: Jorgestor
- **Fase RUP**: Elaboration (Elaboración)
- **Disciplina**: Análisis
- **Versión**: 1.0
- **Fecha**: 2026-05-24
- **Autor**: Equipo de desarrollo

## propósito

Análisis del caso de uso Importar Configuración Global. Describe el proceso masivo de carga y validación de entidades principales.

## diagrama de colaboración

<div align=center>

|![Análisis: importarConfiguracionGlobal()](https://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/casos-uso/CU-03-importarConfiguracionGlobal/colaboracion.puml&fmt=svg)|
|-|
|Código fuente: [colaboracion.puml](colaboracion.puml)|

</div>

## realización de diseño (secuencia)

<div align=center>

|![Realización: CU-03-importarConfiguracionGlobal](https://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/casos-uso/CU-03-importarConfiguracionGlobal/secuencia.puml&fmt=svg)|
|-|
|Código fuente: [secuencia.puml](secuencia.puml)|

</div>

## clases de análisis identificadas

### clases model (naranja #F2AC4E)
|Clase|Responsabilidad|Trazabilidad|
|-|-|-|
|**Student**|Entidad que representa a los alumnos a importar|Modelo del dominio|
|**Grade**|Entidad que representa los grados académicos|Modelo del dominio|
|**Subject**|Entidad que representa las asignaturas|Modelo del dominio|
|**Question**|Entidad que representa las preguntas|Modelo del dominio|
|**GlobalConfig**|Contenedor temporal de todos los datos extraídos antes de persistir|Análisis|

### clases view (azul #629EF9)
|Clase|Responsabilidad|Derivación|
|-|-|-|
|**GlobalConfigImportView**|Interfaz para seleccionar archivo, opciones y confirmación|Wireframe|

### clases controller (verde #b5bd68)
|Clase|Responsabilidad|Caso de uso|
|-|-|-|
|**ImportController**|Orquesta el flujo de importación, validación y persistencia|importarConfiguracionGlobal()|

## mensajes de colaboración

|Origen|Destino|Mensaje|Intención|
|-|-|-|-|
|**Docente**|**GlobalConfigImportView**|`importarConfiguracion(archivo, opciones)`|Solicitar importación|
|**GlobalConfigImportView**|**ImportController**|`procesarImportacion(archivo, opciones)`|Validar y procesar datos|
|**ImportController**|**GlobalConfig**|`extraerDatos()`|Generar contenedor temporal|
|**ImportController**|**GlobalConfigImportView**|`mostrarValidacion()`|Solicitar confirmación de cambios|
|**Docente**|**GlobalConfigImportView**|`confirmarImportacion()`|Confirmar cambios|
|**GlobalConfigImportView**|**ImportController**|`persistirCambios()`|Ejecutar persistencia masiva|
|**ImportController**|**Student**|`guardar()`|Persistir entidad|
|**ImportController**|**Grade**|`guardar()`|Persistir entidad|

## trazabilidad con artefactos previos

- **Atomicidad**: Operación que mantiene la consistencia del sistema o falla de forma controlada.

```plantuml
@startuml importarConfiguracionGlobal-analisis
skinparam linetype polyline

actor Docente
package importarConfiguracionGlobal as "importarConfiguracionGlobal()" {
    rectangle #629EF9 GlobalConfigImportView
    rectangle #b5bd68 ImportController
    rectangle #F2AC4E GlobalConfig
    rectangle #F2AC4E Student
    rectangle #F2AC4E Grade
    rectangle #F2AC4E Subject
    rectangle #F2AC4E Question
}

Docente -r-> GlobalConfigImportView: importarConfiguracion(archivo, opciones)
GlobalConfigImportView -d-> ImportController: procesarImportacion(archivo, opciones)
ImportController --> GlobalConfig: extraerDatos()
ImportController --> GlobalConfigImportView: mostrarValidacion()

Docente --> GlobalConfigImportView: confirmarImportacion()
GlobalConfigImportView --> ImportController: persistirCambios()

ImportController --> Student: guardar()
ImportController --> Grade: guardar()
ImportController --> Subject: guardar()
ImportController --> Question: guardar()

@enduml
```

```plantuml
@startuml CU-03-importarConfiguracionGlobal-diseno

skinparam linetype polyline

actor "Administrador" as Actor
participant ":ConfigController" as Controller <<boundary>>
participant ":ImportService" as Service <<control>>
participant "repo:AnyRepository" as Repo <<entity>>

title Diseño Técnico: importarConfiguracionGlobal() (Estrategia UPSERT)

Actor -> Controller : POST /api/config/import (File/JSON)
activate Controller

Controller -> Service : importGlobalConfig(data)
activate Service

note right of Service
**@Transactional**
Asegura atomicidad (Rollback en caso de fallo)
end note

loop por cada Grado, Asignatura, Alumno, Pregunta
    Service -> Repo : findByNaturalKey(identifier)
    activate Repo
    Repo --> Service : existingEntity?
    deactivate Repo
    
    alt existe
        Service -> Service : updateExistingData(existing, newData)
    else no existe
        Service -> Service : createNewInstance(newData)
    end
    
    Service -> Repo : save(entity)
end

Service --> Controller : ImportSummary
deactivate Service

Controller --> Actor : 201 Created (Summary)
deactivate Controller

@enduml
```
