# Jorgestor > CU-03-importarConfiguracionGlobal > AnÃ¡lisis

## informaciÃ³n del artefacto

- **Proyecto**: Jorgestor
- **Fase RUP**: Elaboration (ElaboraciÃ³n)
- **Disciplina**: AnÃ¡lisis
- **VersiÃ³n**: 1.0
- **Fecha**: 2026-05-24
- **Autor**: Equipo de desarrollo

## propÃ³sito

AnÃ¡lisis del caso de uso Importar ConfiguraciÃ³n Global. Describe el proceso masivo de carga y validaciÃ³n de entidades principales.

## diagrama de colaboraciÃ³n

<div align=center>

|![AnÃ¡lisis: importarConfiguracionGlobal()](https://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/casos-uso/CU-03-importarConfiguracionGlobal/analisis-colaboracion-CU-03-importarConfiguracionGlobal.puml&fmt=svg)|
|-|
|CÃ³digo fuente: [analisis-colaboracion-CU-03-importarConfiguracionGlobal.puml](analisis-colaboracion-CU-03-importarConfiguracionGlobal.puml)|

</div>

## realizaciÃ³n de diseÃ±o (secuencia)

<div align=center>

|![RealizaciÃ³n: CU-03-importarConfiguracionGlobal](https://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/casos-uso/CU-03-importarConfiguracionGlobal/analisis-secuencia-CU-03-importarConfiguracionGlobal.puml&fmt=svg)|
|-|
|CÃ³digo fuente: [analisis-secuencia-CU-03-importarConfiguracionGlobal.puml](analisis-secuencia-CU-03-importarConfiguracionGlobal.puml)|

</div>

## clases de anÃ¡lisis identificadas

### clases model (naranja #F2AC4E)
|Clase|Responsabilidad|Trazabilidad|
|-|-|-|
|**Student**|Entidad que representa a los alumnos a importar|Modelo del dominio|
|**Grade**|Entidad que representa los grados acadÃ©micos|Modelo del dominio|
|**Subject**|Entidad que representa las asignaturas|Modelo del dominio|
|**Question**|Entidad que representa las preguntas|Modelo del dominio|
|**GlobalConfig**|Contenedor temporal de todos los datos extraÃ­dos antes de persistir|AnÃ¡lisis|

### clases view (azul #629EF9)
|Clase|Responsabilidad|DerivaciÃ³n|
|-|-|-|
|**GlobalConfigImportView**|Interfaz para seleccionar archivo, opciones y confirmaciÃ³n|Wireframe|

### clases controller (verde #b5bd68)
|Clase|Responsabilidad|Caso de uso|
|-|-|-|
|**ImportController**|Orquesta el flujo de importaciÃ³n, validaciÃ³n y persistencia|importarConfiguracionGlobal()|

## mensajes de colaboraciÃ³n

|Origen|Destino|Mensaje|IntenciÃ³n|
|-|-|-|-|
|**Docente**|**GlobalConfigImportView**|`importarConfiguracion(archivo, opciones)`|Solicitar importaciÃ³n|
|**GlobalConfigImportView**|**ImportController**|`procesarImportacion(archivo, opciones)`|Validar y procesar datos|
|**ImportController**|**GlobalConfig**|`extraerDatos()`|Generar contenedor temporal|
|**ImportController**|**GlobalConfigImportView**|`mostrarValidacion()`|Solicitar confirmaciÃ³n de cambios|
|**Docente**|**GlobalConfigImportView**|`confirmarImportacion()`|Confirmar cambios|
|**GlobalConfigImportView**|**ImportController**|`persistirCambios()`|Ejecutar persistencia masiva|
|**ImportController**|**Student**|`guardar()`|Persistir entidad|
|**ImportController**|**Grade**|`guardar()`|Persistir entidad|

## trazabilidad con artefactos previos

- **Atomicidad**: OperaciÃ³n que mantiene la consistencia del sistema o falla de forma controlada.

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

title DiseÃ±o TÃ©cnico: importarConfiguracionGlobal() (Estrategia UPSERT)

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



















































