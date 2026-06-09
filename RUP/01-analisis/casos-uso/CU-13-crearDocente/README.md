<div align=right>

|[![](https://img.shields.io/badge/-Inicio-FFF?style=flat&logo=Emlakjet&logoColor=black)](/README.md) [![](https://img.shields.io/badge/-Analisis-FFF?style=flat&logo=multisim&logoColor=black)](/RUP/01-analisis/README.md) [![](https://img.shields.io/badge/-Casos_de_uso-FFF?style=flat&logo=crewunited&logoColor=black)](/RUP/01-analisis/casos-uso/README.md)|
|-:|

</div>
# CU-13 -- Crear Docente

*El administrador institucional crea un nuevo docente proporcionando sus datos de identificación y acceso al sistema.*

## Análisis

**VistaCreacionDocente** `<<boundary>>` — captura los datos del nuevo docente (DNI, nombre, apellidos, usuario, email, contraseña) y lanza la creación.

**ControladorDocentes** `<<control>>` — valida que no existe un docente con el mismo DNI o usuario y persiste el nuevo registro.

**Docente** `<<entity>>` — entidad que se inicializa con los datos del nuevo docente y se persiste como nuevo usuario del sistema.

## Diagrama de colaboración

<div align=center>

![](https://www.plantuml.com/plantuml/proxy?cache=no&v=4&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/casos-uso/CU-13-crearDocente/analisis-colaboracion-CU-13-crearDocente.puml)

[analisis-colaboracion-CU-13-crearDocente.puml](analisis-colaboracion-CU-13-crearDocente.puml)

</div>
