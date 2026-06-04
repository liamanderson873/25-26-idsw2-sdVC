# Jorgestor > CU-14-crearAlumno > AnÃ¡lisis

> |[ðŸ ï¸](/Jorgestor/RUP/README.md)|[ ðŸ“Š](#)|[Detalle](/Jorgestor/RUP/00-casos-uso/02-detalle/CU-14-crearAlumno/README.md)|**AnÃ¡lisis**|DiseÃ±o|Desarrollo|Pruebas|
> |-|-|-|-|-|-|-|

## informaciÃ³n del artefacto

- **Proyecto**: Jorgestor
- **Fase RUP**: Elaboration (ElaboraciÃ³n)
- **Disciplina**: AnÃ¡lisis
- **VersiÃ³n**: 1.0
- **Fecha**: 2026-05-24
- **Autor**: Equipo de desarrollo

## propÃ³sito

AnÃ¡lisis del caso de uso Crear Alumno. Permite registrar un nuevo estudiante.

## diagrama de colaboraciÃ³n

<div align=center>

|![AnÃ¡lisis: crearAlumno()](https://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/diseno-secuencia-CU-14-crearAlumno.puml&fmt=svg)|
|-|
|CÃ³digo fuente: [analisis-colaboracion-CU-14-crearAlumno.puml](analisis-colaboracion-CU-14-crearAlumno.puml)|

</div>

## clases de anÃ¡lisis identificadas

### clases model (naranja #F2AC4E)
|Clase|Responsabilidad|Trazabilidad|
|-|-|-|
|**Student**|Entidad que representa al alumno|Modelo del dominio|

### clases view (azul #629EF9)
|Clase|Responsabilidad|DerivaciÃ³n|
|-|-|-|
|**StudentCreationView**|Interfaz que solicita los datos mÃ­nimos necesarios|Wireframe|

### clases controller (verde #b5bd68)
|Clase|Responsabilidad|Caso de uso|
|-|-|-|
|**StudentController**|Gestiona creaciÃ³n de instancia y valida integridad|crearAlumno()|

## mensajes de colaboraciÃ³n

|Origen|Destino|Mensaje|IntenciÃ³n|
|-|-|-|-|
|**Docente**|**StudentCreationView**|`solicitarCreacion()`|Iniciar proceso|
|**Docente**|**StudentCreationView**|`introducirDatos(nombre, apellidos, dni)`|Enviar informaciÃ³n obligatoria|
|**StudentCreationView**|**StudentController**|`crearAlumno(datos)`|Delegar la creaciÃ³n|
|**StudentController**|**Student**|`inicializar(datos)`|Crear nueva entidad|
|**StudentController**|**StudentCreationView**|`notificarExitoYRedirigir()`|Informar y pasar a ediciÃ³n|

## trazabilidad con artefactos previos

- **Estrategia**: Garantiza existencia del objeto, delegando detalles a ediciÃ³n.

```plantuml
@startuml crearAlumno-analisis
skinparam linetype polyline

actor Docente
package crearAlumno as "crearAlumno()" {
    rectangle #629EF9 StudentCreationView
    rectangle #b5bd68 StudentController
    rectangle #F2AC4E Student
}

Docente -r-> StudentCreationView: solicitarCreacion()
Docente --> StudentCreationView: introducirDatos(nombre, apellidos, dni)
StudentCreationView -d-> StudentController: crearAlumno(datos)
StudentController --> Student: inicializar(datos)
StudentController --> StudentCreationView: notificarExitoYRedirigir()

@enduml
```















































