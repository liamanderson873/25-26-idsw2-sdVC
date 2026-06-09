<div align=right>

|[![](https://img.shields.io/badge/-Inicio-FFF?style=flat&logo=Emlakjet&logoColor=black)](/README.md) [![](https://img.shields.io/badge/-Analisis-FFF?style=flat&logo=multisim&logoColor=black)](/RUP/01-analisis/README.md) [![](https://img.shields.io/badge/-Casos_de_uso-FFF?style=flat&logo=crewunited&logoColor=black)](/RUP/01-analisis/casos-uso/README.md)|
|-:|

</div>
# CU-21 -- Ver Asignaturas

*El docente consulta la lista de asignaturas y puede acceder al detalle de cada una para ver sus alumnos y grado asociado.*

## Análisis

**VistaListaAsignaturas** `<<boundary>>` — presenta el listado de asignaturas con soporte de filtrado y permite navegar al detalle de cada una.

**VistaDetalleAsignatura** `<<boundary>>` — muestra los datos completos de la asignatura seleccionada, incluyendo grado y alumnos matriculados.

**ControladorAsignaturas** `<<control>>` — recupera y filtra el catálogo de asignaturas y proporciona los datos de detalle al navegar.

**Asignatura** `<<entity>>` — entidad consultada; agrega sus relaciones con alumnos y grado para la vista de detalle.

**Alumno** `<<entity>>` — se incluye en el detalle de la asignatura para mostrar los alumnos matriculados en ella.

**Grado** `<<entity>>` — se muestra en el detalle de la asignatura para identificar el grupo al que pertenece.

## Diagrama de colaboración

<div align=center>

![](https://www.plantuml.com/plantuml/proxy?cache=no&v=4&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/casos-uso/CU-21-verAsignaturas/analisis-colaboracion-CU-21-verAsignaturas.puml)

[analisis-colaboracion-CU-21-verAsignaturas.puml](analisis-colaboracion-CU-21-verAsignaturas.puml)

</div>
