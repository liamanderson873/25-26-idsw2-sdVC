# Jorgestor > CU-10-crearPregunta > AnÃ¡lisis

> |[ðŸ ï¸](/Jorgestor/RUP/README.md)|[ ðŸ“Š](#)|[Detalle](/Jorgestor/RUP/00-casos-uso/02-detalle/CU-10-crearPregunta/README.md)|**AnÃ¡lisis**|DiseÃ±o|Desarrollo|Pruebas|
> |-|-|-|-|-|-|-|

## informaciÃ³n del artefacto

- **Proyecto**: Jorgestor
- **Fase RUP**: Elaboration (ElaboraciÃ³n)
- **Disciplina**: AnÃ¡lisis
- **VersiÃ³n**: 1.0
- **Fecha**: 2026-05-24
- **Autor**: Equipo de desarrollo

## propÃ³sito

AnÃ¡lisis del caso de uso Crear Pregunta. Permite la inicializaciÃ³n de una nueva pregunta.

## diagrama de colaboraciÃ³n

<div align=center>

|![AnÃ¡lisis: crearPregunta()](https://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/diseno-secuencia-CU-10-crearPregunta.puml&fmt=svg)|
|-|
|CÃ³digo fuente: [analisis-colaboracion-CU-10-crearPregunta.puml](analisis-colaboracion-CU-10-crearPregunta.puml)|

</div>

## clases de anÃ¡lisis identificadas

### clases model (naranja #F2AC4E)
|Clase|Responsabilidad|Trazabilidad|
|-|-|-|
|**Question**|Nueva entidad de pregunta que se crea|Modelo del dominio|
|**Subject**|Asignatura a la que se asociarÃ¡ la pregunta|Modelo del dominio|

### clases view (azul #629EF9)
|Clase|Responsabilidad|DerivaciÃ³n|
|-|-|-|
|**QuestionCreationView**|Interfaz para solicitar datos obligatorios iniciales|Wireframe|

### clases controller (verde #b5bd68)
|Clase|Responsabilidad|Caso de uso|
|-|-|-|
|**QuestionManagementController**|Gestiona creaciÃ³n de instancia y valida campos|crearPregunta()|

## mensajes de colaboraciÃ³n

|Origen|Destino|Mensaje|IntenciÃ³n|
|-|-|-|-|
|**Docente**|**QuestionCreationView**|`solicitarCreacion()`|Iniciar proceso|
|**Docente**|**QuestionCreationView**|`proporcionarDatos(asignatura, enunciado, tema, dificultad)`|Enviar datos mÃ­nimos|
|**QuestionCreationView**|**QuestionManagementController**|`crearPregunta(datos)`|Delegar la creaciÃ³n|
|**QuestionManagementController**|**Subject**|`validarExistencia()`|Verificar asignatura|
|**QuestionManagementController**|**Question**|`inicializar(datos)`|Crear nueva instancia|
|**QuestionManagementController**|**QuestionCreationView**|`notificarExitoYRedirigir()`|Informar y pasar a ediciÃ³n|

## trazabilidad con artefactos previos

- **Encadenamiento**: Redirige automÃ¡ticamente a `editarPregunta` para completar detalles.

```plantuml
@startuml crearPregunta-analisis
skinparam linetype polyline

actor Docente
package crearPregunta as "crearPregunta()" {
    rectangle #629EF9 QuestionCreationView
    rectangle #b5bd68 QuestionManagementController
    rectangle #F2AC4E Question
    rectangle #F2AC4E Subject
}

Docente -r-> QuestionCreationView: solicitarCreacion()
Docente --> QuestionCreationView: proporcionarDatos(asignatura, enunciado, tema, dificultad)
QuestionCreationView -d-> QuestionManagementController: crearPregunta(datos)
QuestionManagementController --> Subject: validarExistencia()
QuestionManagementController --> Question: inicializar(datos)
QuestionManagementController --> QuestionCreationView: notificarExitoYRedirigir()

@enduml
```















































