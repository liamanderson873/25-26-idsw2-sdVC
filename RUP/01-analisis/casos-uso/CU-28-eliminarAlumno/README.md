<div align=right>

|[![](https://img.shields.io/badge/-Inicio-FFF?style=flat&logo=Emlakjet&logoColor=black)](/README.md) [![](https://img.shields.io/badge/-Analisis-FFF?style=flat&logo=multisim&logoColor=black)](/RUP/01-analisis/README.md) [![](https://img.shields.io/badge/-Casos_de_uso-FFF?style=flat&logo=crewunited&logoColor=black)](/RUP/01-analisis/casos-uso/README.md)|
|-:|

</div>

# CU-28 -- Eliminar Alumno

*El docente elimina un alumno del sistema tras confirmar la operación.*

## Análisis

**VistaEliminacionAlumno** `<<boundary>>` — muestra los datos del alumno a eliminar y recoge la confirmación del docente.

**ControladorAlumnos** `<<control>>` — ejecuta el borrado definitivo del alumno del sistema.

**Alumno** `<<entity>>` — entidad que se elimina del sistema al confirmarse la operación.

## Diagrama de colaboración

<div align=center>

![](https://www.plantuml.com/plantuml/proxy?cache=no&v=4&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/casos-uso/CU-28-eliminarAlumno/analisis-colaboracion-CU-28-eliminarAlumno.puml)

[analisis-colaboracion-CU-28-eliminarAlumno.puml](analisis-colaboracion-CU-28-eliminarAlumno.puml)

</div>
