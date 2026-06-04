# Jorgestor > CU-31-cerrarSesion > AnÃ¡lisis

> |[ðŸ ï¸](/Jorgestor/RUP/README.md)|[ ðŸ“Š](#)|[Detalle](/Jorgestor/RUP/00-casos-uso/02-detalle/CU-31-cerrarSesion/README.md)|**AnÃ¡lisis**|DiseÃ±o|Desarrollo|Pruebas|
> |-|-|-|-|-|-|-|

## informaciÃ³n del artefacto

- **Proyecto**: Jorgestor
- **Fase RUP**: Elaboration (ElaboraciÃ³n)
- **Disciplina**: AnÃ¡lisis
- **VersiÃ³n**: 1.0
- **Fecha**: 2026-05-24
- **Autor**: Equipo de desarrollo

## propÃ³sito

AnÃ¡lisis tecnolÃ³gico agnÃ³stico del caso de uso Cerrar SesiÃ³n, siguiendo la metodologÃ­a RUP. Permite analizar el proceso de finalizaciÃ³n de la sesiÃ³n de usuario de forma segura.

## diagrama de colaboraciÃ³n

<div align=center>

|![AnÃ¡lisis: cerrarSesion()](https://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/casos-uso/CU-31-cerrarSesion/analisis-colaboracion-CU-31-cerrarSesion.puml&fmt=svg)|
|-|
|CÃ³digo fuente: [analisis-colaboracion-CU-31-cerrarSesion.puml](analisis-colaboracion-CU-31-cerrarSesion.puml)|

</div>

## clases de anÃ¡lisis identificadas

### clases model (naranja #F2AC4E)
|Clase|Responsabilidad|Trazabilidad|
|-|-|-|
|**UserSession**|Mantiene el estado de autenticaciÃ³n del usuario|Modelo del dominio|

### clases view (azul #629EF9)
|Clase|Responsabilidad|DerivaciÃ³n|
|-|-|-|
|**SessionView**|Interfaz que permite solicitar el cierre y confirmar la acciÃ³n|Wireframe|

### clases controller (verde #b5bd68)
|Clase|Responsabilidad|Caso de uso|
|-|-|-|
|**LogoutController**|Gestiona la invalidaciÃ³n de la sesiÃ³n y la transiciÃ³n de estado|cerrarSesion()|

## mensajes de colaboraciÃ³n

|Origen|Destino|Mensaje|IntenciÃ³n|
|-|-|-|-|
|**Usuario**|**SessionView**|`solicitarCierre()`|Manifestar la intenciÃ³n de salir|
|**SessionView**|**Usuario**|`pedirConfirmacion()`|Solicitar validaciÃ³n final|
|**Usuario**|**SessionView**|`confirmarCierre()`|Aceptar el cierre de sesiÃ³n|
|**SessionView**|**LogoutController**|`cerrarSesion()`|Delegar la invalidaciÃ³n de la sesiÃ³n|
|**LogoutController**|**UserSession**|`invalidar()`|Eliminar el estado de autenticaciÃ³n|

## trazabilidad con artefactos previos

### con especificaciÃ³n detallada
- **Estados internos** â†’ `SolicitandoCierre`, `ConfirmandoCierre`


```plantuml
@startuml cerrarSesion-analisis
skinparam linetype polyline

actor Usuario
package cerrarSesion as "cerrarSesion()" {
    rectangle #629EF9 SessionView
    rectangle #b5bd68 LogoutController
    rectangle #F2AC4E UserSession
}

Usuario -r-> SessionView: solicitarCierre()
SessionView --> Usuario: pedirConfirmacion()
Usuario --> SessionView: confirmarCierre()
SessionView -d-> LogoutController: cerrarSesion()
LogoutController --> UserSession: invalidar()

@enduml
```















































