<div align=right>

|[![](https://img.shields.io/badge/-Inicio-FFF?style=flat&logo=Emlakjet&logoColor=black)](/README.md) [![](https://img.shields.io/badge/-Analisis-FFF?style=flat&logo=multisim&logoColor=black)](/RUP/01-analisis/README.md) [![](https://img.shields.io/badge/-Casos_de_uso-FFF?style=flat&logo=crewunited&logoColor=black)](/RUP/01-analisis/casos-uso/README.md)|
|-:|

</div>

# CU-30 -- Iniciar Sesion

*El usuario introduce sus credenciales para autenticarse y acceder al sistema.*

## Análisis

**VistaInicioSesion** `<<boundary>>` — presenta el formulario de login, recoge credenciales y muestra mensajes de error si la autenticación falla.

**ControladorInicioSesion** `<<control>>` — coordina el proceso de autenticación verificando las credenciales contra el registro de usuarios.

**Usuario** `<<entity>>` — se consulta para verificar que las credenciales introducidas corresponden a un usuario registrado y activo.

## Diagrama de colaboración

<div align=center>

![](https://www.plantuml.com/plantuml/proxy?cache=no&v=4&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/casos-uso/CU-30-iniciarSesion/analisis-colaboracion-CU-30-iniciarSesion.puml)

[analisis-colaboracion-CU-30-iniciarSesion.puml](analisis-colaboracion-CU-30-iniciarSesion.puml)

</div>
