# Jorgestor > CU-31-cerrarSesion > Análisis

## información del artefacto

- **Proyecto**: Jorgestor
- **Fase RUP**: Elaboration (Elaboración)
- **Disciplina**: Análisis
- **Versión**: 1.0
- **Fecha**: 2026-05-24
- **Autor**: Equipo de desarrollo

## propósito

Análisis tecnológico agnóstico del caso de uso Cerrar Sesión, siguiendo la metodología RUP. Permite analizar el proceso de finalización de la sesión de usuario de forma segura.

## diagrama de colaboración

<div align=center>

|![Análisis: cerrarSesion()](https://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/casos-uso/CU-31-cerrarSesion/analisis-colaboracion-CU-31-cerrarSesion.puml&fmt=svg)|
|-|
|Código fuente: [analisis-colaboracion-CU-31-cerrarSesion.puml](analisis-colaboracion-CU-31-cerrarSesion.puml)|

</div>

## clases de análisis identificadas

### clases model (naranja #F2AC4E)
|Clase|Responsabilidad|Trazabilidad|
|-|-|-|
|**UserSession**|Mantiene el estado de autenticación del usuario|Modelo del dominio|

### clases view (azul #629EF9)
|Clase|Responsabilidad|Derivación|
|-|-|-|
|**SessionView**|Interfaz que permite solicitar el cierre y confirmar la acción|Wireframe|

### clases controller (verde #b5bd68)
|Clase|Responsabilidad|Caso de uso|
|-|-|-|
|**LogoutController**|Gestiona la invalidación de la sesión y la transición de estado|cerrarSesion()|

## mensajes de colaboración

|Origen|Destino|Mensaje|Intención|
|-|-|-|-|
|**Usuario**|**SessionView**|`solicitarCierre()`|Manifestar la intención de salir|
|**SessionView**|**Usuario**|`pedirConfirmacion()`|Solicitar validación final|
|**Usuario**|**SessionView**|`confirmarCierre()`|Aceptar el cierre de sesión|
|**SessionView**|**LogoutController**|`cerrarSesion()`|Delegar la invalidación de la sesión|
|**LogoutController**|**UserSession**|`invalidar()`|Eliminar el estado de autenticación|

## trazabilidad con artefactos previos

### con especificación detallada
- **Estados internos** �?' `SolicitandoCierre`, `ConfirmandoCierre`


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
















































