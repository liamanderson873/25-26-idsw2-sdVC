<div align=right>

|[![](https://img.shields.io/badge/-Inicio-FFF?style=flat&logo=Emlakjet&logoColor=black)](/README.md) [![](https://img.shields.io/badge/-Analisis-FFF?style=flat&logo=multisim&logoColor=black)](/RUP/01-analisis/README.md) [![](https://img.shields.io/badge/-Casos_de_uso-FFF?style=flat&logo=crewunited&logoColor=black)](/RUP/01-analisis/casos-uso/README.md)|
|-:|

</div>
# CU-31 -- Cerrar Sesion

*El usuario cierra su sesión activa en el sistema previa confirmación.*

## Análisis

**VistaSesion** `<<boundary>>` — presenta la opción de cerrar sesión, pide confirmación al usuario y desencadena el cierre.

**ControladorCierreSesion** `<<control>>` — coordina la invalidación de la sesión activa del usuario en el sistema.

**SesionUsuario** `<<entity>>` — representa la sesión activa; se invalida para revocar el acceso del usuario al sistema.

## Diagrama de colaboración

<div align=center>

![](https://www.plantuml.com/plantuml/proxy?cache=no&v=4&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/casos-uso/CU-31-cerrarSesion/analisis-colaboracion-CU-31-cerrarSesion.puml)

[analisis-colaboracion-CU-31-cerrarSesion.puml](analisis-colaboracion-CU-31-cerrarSesion.puml)

</div>
