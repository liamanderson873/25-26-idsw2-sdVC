# Jorgestor > CU-17-crearGrado > AnÃ¡lisis

## informaciÃ³n del artefacto

- **Proyecto**: Jorgestor
- **Fase RUP**: Elaboration (ElaboraciÃ³n)
- **Disciplina**: AnÃ¡lisis
- **VersiÃ³n**: 1.0
- **Fecha**: 2026-05-24
- **Autor**: Equipo de desarrollo

## propÃ³sito

AnÃ¡lisis del caso de uso Crear Grado. Permite la agrupaciÃ³n de alumnos y asignaturas.

## diagrama de colaboraciÃ³n

<div align=center>

|![AnÃ¡lisis: crearGrado()](https://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/diseno-secuencia-CU-17-crearGrado.puml&fmt=svg)|
|-|
|CÃ³digo fuente: [analisis-colaboracion-CU-17-crearGrado.puml](analisis-colaboracion-CU-17-crearGrado.puml)|

</div>

## clases de anÃ¡lisis identificadas

### clases model (naranja #F2AC4E)
|Clase|Responsabilidad|Trazabilidad|
|-|-|-|
|**Grade**|La nueva entidad grado|Modelo del dominio|
|**Student**|Alumnos que se asocian al grado|Modelo del dominio|

### clases view (azul #629EF9)
|Clase|Responsabilidad|DerivaciÃ³n|
|-|-|-|
|**GradeCreationView**|Interfaz para introducir datos mÃ­nimos y enlistar alumnos|Wireframe|

### clases controller (verde #b5bd68)
|Clase|Responsabilidad|Caso de uso|
|-|-|-|
|**GradeController**|Gestiona creaciÃ³n y asociaciÃ³n inicial de alumnos|crearGrado()|

## mensajes de colaboraciÃ³n

|Origen|Destino|Mensaje|IntenciÃ³n|
|-|-|-|-|
|**Docente**|**GradeCreationView**|`solicitarCreacion()`|Iniciar proceso|
|**Docente**|**GradeCreationView**|`proporcionarDatos(nombre, codigo)`|Enviar datos obligatorios|
|**GradeCreationView**|**GradeController**|`crearGrado(datos)`|Delegar creaciÃ³n|
|**GradeController**|**Grade**|`inicializar(datos)`|Crear entidad|
|**GradeController**|**GradeCreationView**|`notificarExitoYRedirigir()`|Informar y pasar a ediciÃ³n|

## trazabilidad con artefactos previos

- **Estructura**: El grado sirve como estructura organizativa superior.

```plantuml
@startuml crearGrado-analisis
skinparam linetype polyline

actor Docente
package crearGrado as "crearGrado()" {
    rectangle #629EF9 GradeCreationView
    rectangle #b5bd68 GradeController
    rectangle #F2AC4E Grade
    rectangle #F2AC4E Student
}

Docente -r-> GradeCreationView: solicitarCreacion()
Docente --> GradeCreationView: proporcionarDatos(nombre, codigo)
GradeCreationView -d-> GradeController: crearGrado(datos)
GradeController --> Grade: inicializar(datos)
GradeController --> GradeCreationView: notificarExitoYRedirigir()

@enduml
```
















































