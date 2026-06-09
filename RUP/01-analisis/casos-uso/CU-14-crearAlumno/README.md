<div align=right>

|[![](https://img.shields.io/badge/-Inicio-FFF?style=flat&logo=Emlakjet&logoColor=black)](/README.md) [![](https://img.shields.io/badge/-Analisis-FFF?style=flat&logo=multisim&logoColor=black)](/RUP/01-analisis/README.md) [![](https://img.shields.io/badge/-Casos_de_uso-FFF?style=flat&logo=crewunited&logoColor=black)](/RUP/01-analisis/casos-uso/README.md)|
|-:|

</div>

# CU-14 -- Crear Alumno

*El docente crea un nuevo alumno en el sistema proporcionando nombre, apellidos y DNI.*

## Análisis

**VistaCreacionAlumno** `<<boundary>>` — captura los datos identificativos del alumno y desencadena el proceso de creación.

**ControladorAlumnos** `<<control>>` — inicializa el nuevo alumno con los datos recibidos y lo persiste en el sistema.

**Alumno** `<<entity>>` — entidad que se crea y persiste con los datos básicos del alumno recién registrado.

## Diagrama de colaboración

<div align=center>

![](https://www.plantuml.com/plantuml/proxy?cache=no&v=4&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/casos-uso/CU-14-crearAlumno/analisis-colaboracion-CU-14-crearAlumno.puml)

[analisis-colaboracion-CU-14-crearAlumno.puml](analisis-colaboracion-CU-14-crearAlumno.puml)

</div>
