<div align=right>

|[![](https://img.shields.io/badge/-Inicio-FFF?style=flat&logo=Emlakjet&logoColor=black)](/README.md) [![](https://img.shields.io/badge/-Analisis-FFF?style=flat&logo=multisim&logoColor=black)](/RUP/01-analisis/README.md) [![](https://img.shields.io/badge/-Casos_de_uso-FFF?style=flat&logo=crewunited&logoColor=black)](/RUP/01-analisis/casos-uso/README.md)|
|-:|

</div>

# CU-23 -- Ver Alumnos

*El docente consulta el listado de alumnos y puede acceder al detalle de cada alumno para ver sus exámenes asignados.*

## Análisis

**VistaListaAlumnos** `<<boundary>>` — presenta el catálogo de alumnos con soporte de filtrado y permite navegar al detalle individual.

**VistaDetalleAlumno** `<<boundary>>` — muestra los datos del alumno seleccionado y la lista de sus exámenes vinculados.

**ControladorAlumnos** `<<control>>` — carga y filtra el listado de alumnos del sistema.

**ControladorExamen** `<<control>>` — recupera los exámenes asociados al alumno seleccionado para mostrarlos en la vista de detalle.

**Alumno** `<<entity>>` — entidad consultada; su perfil completo se presenta en la vista de detalle.

**ExamenAlumno** `<<entity>>` — se consulta para listar todos los exámenes vinculados al alumno en la vista de detalle.

## Diagrama de colaboración

<div align=center>

![](https://www.plantuml.com/plantuml/proxy?cache=no&v=4&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/casos-uso/CU-23-verAlumnos/analisis-colaboracion-CU-23-verAlumnos.puml)

[analisis-colaboracion-CU-23-verAlumnos.puml](analisis-colaboracion-CU-23-verAlumnos.puml)

</div>
