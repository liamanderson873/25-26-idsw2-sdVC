<div align=right>

|[![](https://img.shields.io/badge/-Inicio-FFF?style=flat&logo=Emlakjet&logoColor=black)](/README.md) [![](https://img.shields.io/badge/-Analisis-FFF?style=flat&logo=multisim&logoColor=black)](/RUP/01-analisis/README.md) [![](https://img.shields.io/badge/-Casos_de_uso-FFF?style=flat&logo=crewunited&logoColor=black)](/RUP/01-analisis/casos-uso/README.md)|
|-:|

</div>

# CU-16 -- Editar Alumno

*El docente modifica los datos de un alumno existente o lo elimina del sistema.*

## Análisis

**VistaEdicionAlumno** `<<boundary>>` — presenta el formulario con los datos actuales del alumno y permite editarlos o solicitar la eliminación.

**ControladorAlumnos** `<<control>>` — persiste los cambios en los datos del alumno o ejecuta el borrado si se confirma.

**Alumno** `<<entity>>` — entidad objetivo; sus datos se actualizan o el registro se elimina del sistema.

## Diagrama de colaboración

<div align=center>

![](https://www.plantuml.com/plantuml/proxy?cache=no&v=4&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/casos-uso/CU-16-editarAlumno/analisis-colaboracion-CU-16-editarAlumno.puml)

[analisis-colaboracion-CU-16-editarAlumno.puml](analisis-colaboracion-CU-16-editarAlumno.puml)

</div>
