# Jorgestor > CU-13-crearDocente > AnÃ¡lisis

## informaciÃ³n del artefacto

- **Proyecto**: Jorgestor
- **Fase RUP**: Elaboration (ElaboraciÃ³n)
- **Disciplina**: AnÃ¡lisis
- **VersiÃ³n**: 1.0
- **Fecha**: 2026-05-24
- **Autor**: Equipo de desarrollo

## propÃ³sito

AnÃ¡lisis del caso de uso Crear Docente. Permite dar de alta a un nuevo profesor.

## diagrama de colaboraciÃ³n

<div align=center>

|![AnÃ¡lisis: crearDocente()](https://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/diseno-secuencia-CU-13-crearDocente.puml&fmt=svg)|
|-|
|CÃ³digo fuente: [analisis-colaboracion-CU-13-crearDocente.puml](analisis-colaboracion-CU-13-crearDocente.puml)|

</div>

## clases de anÃ¡lisis identificadas

### clases model (naranja #F2AC4E)
|Clase|Responsabilidad|Trazabilidad|
|-|-|-|
|**Docent**|Entidad que representa al nuevo profesor en el sistema|Modelo del dominio|

### clases view (azul #629EF9)
|Clase|Responsabilidad|DerivaciÃ³n|
|-|-|-|
|**DocentCreationView**|Interfaz para introducir datos mÃ­nimos obligatorios|Wireframe|

### clases controller (verde #b5bd68)
|Clase|Responsabilidad|Caso de uso|
|-|-|-|
|**DocentController**|Gestiona creaciÃ³n y valida datos obligatorios/duplicados|crearDocente()|

## mensajes de colaboraciÃ³n

|Origen|Destino|Mensaje|IntenciÃ³n|
|-|-|-|-|
|**AdministradorInstitucional**|**DocentCreationView**|`solicitarCreacion()`|Iniciar proceso|
|**AdministradorInstitucional**|**DocentCreationView**|`proporcionarDatos(dni, nombre, apellidos, usuario, email, password)`|Enviar informaciÃ³n|
|**DocentCreationView**|**DocentController**|`crearDocente(datos)`|Delegar la creaciÃ³n|
|**DocentController**|**Docent**|`validarNoDuplicado(dni, usuario)`|Verificar integridad|
|**DocentController**|**Docent**|`inicializar(datos)`|Crear nueva instancia|
|**DocentController**|**DocentCreationView**|`notificarExitoYRedirigir()`|Informar y pasar a ediciÃ³n|

## trazabilidad con artefactos previos

- **Flujo**: Redirige a ediciÃ³n para completar perfiles complejos.

```plantuml
@startuml crearDocente-analisis
skinparam linetype polyline

actor AdministradorInstitucional
package crearDocente as "crearDocente()" {
    rectangle #629EF9 DocentCreationView
    rectangle #b5bd68 DocentController
    rectangle #F2AC4E Docent
}

AdministradorInstitucional -r-> DocentCreationView: solicitarCreacion()
AdministradorInstitucional --> DocentCreationView: proporcionarDatos(dni, nombre, apellidos, usuario, email, password)
DocentCreationView -d-> DocentController: crearDocente(datos)
DocentController --> Docent: validarNoDuplicado(dni, usuario)
DocentController --> Docent: inicializar(datos)
DocentController --> DocentCreationView: notificarExitoYRedirigir()

@enduml
```
















































