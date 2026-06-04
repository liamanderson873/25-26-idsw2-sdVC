# Jorgestor > CU-30-iniciarSesion > AnÃ¡lisis

> |[ðŸ ï¸](/Jorgestor/RUP/README.md)|[ ðŸ“Š](#)|[Detalle](/Jorgestor/RUP/00-casos-uso/02-detalle/CU-30-iniciarSesion/README.md)|**AnÃ¡lisis**|DiseÃ±o|Desarrollo|Pruebas|
> |-|-|-|-|-|-|-|

## informaciÃ³n del artefacto

- **Proyecto**: Jorgestor
- **Fase RUP**: Elaboration (ElaboraciÃ³n)
- **Disciplina**: AnÃ¡lisis
- **VersiÃ³n**: 1.0
- **Fecha**: 2026-05-24
- **Autor**: Equipo de desarrollo

## propÃ³sito

AnÃ¡lisis tecnolÃ³gico agnÃ³stico del caso de uso Iniciar SesiÃ³n, siguiendo la metodologÃ­a RUP. Permite analizar el proceso de autenticaciÃ³n de usuarios en el sistema.

## diagrama de colaboraciÃ³n

<div align=center>

|![AnÃ¡lisis: iniciarSesion()](https://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/casos-uso/CU-30-iniciarSesion/analisis-colaboracion-CU-30-iniciarSesion.puml&fmt=svg)|
|-|
|CÃ³digo fuente: [analisis-colaboracion-CU-30-iniciarSesion.puml](analisis-colaboracion-CU-30-iniciarSesion.puml)|

</div>

## clases de anÃ¡lisis identificadas

### clases model (naranja #F2AC4E)
|Clase|Responsabilidad|Trazabilidad|
|-|-|-|
|**User**|Representa al usuario con sus credenciales y roles|Modelo del dominio|

### clases view (azul #629EF9)
|Clase|Responsabilidad|DerivaciÃ³n|
|-|-|-|
|**LoginView**|Interfaz para introducir credenciales y mostrar mensajes de error|Wireframe|

### clases controller (verde #b5bd68)
|Clase|Responsabilidad|Caso de uso|
|-|-|-|
|**LoginController**|Gestiona el flujo de autenticaciÃ³n y valida credenciales|iniciarSesion()|

## mensajes de colaboraciÃ³n

|Origen|Destino|Mensaje|IntenciÃ³n|
|-|-|-|-|
|**UsuarioNoRegistrado**|**LoginView**|`introducirCredenciales()`|Proporcionar usuario y contraseÃ±a|
|**LoginView**|**LoginController**|`autenticar(user, pass)`|Delegar la validaciÃ³n al controlador|
|**LoginController**|**User**|`verificarCredenciales()`|Comprobar la validez de los datos|
|**LoginController**|**LoginView**|`mostrarError()`|Informar en caso de fallo|
|**LoginController**|**Sistema**|`permitirAcceso()`|Transitar al estado de sistema disponible|

## trazabilidad con artefactos previos

### con especificaciÃ³n detallada
- **Estados internos** â†’ `RequestingAccess`, `ProvidingCredentials`


```plantuml
@startuml iniciarSesion-analisis
skinparam linetype polyline

actor UsuarioNoRegistrado
package iniciarSesion as "iniciarSesion()" {
    rectangle #629EF9 LoginView
    rectangle #b5bd68 LoginController
    rectangle #F2AC4E User
}

UsuarioNoRegistrado -r-> LoginView: introducirCredenciales()
LoginView --> LoginController: autenticar()
LoginController --> User: verificarCredenciales()
LoginController --> LoginView: mostrarError()

@enduml
```















































