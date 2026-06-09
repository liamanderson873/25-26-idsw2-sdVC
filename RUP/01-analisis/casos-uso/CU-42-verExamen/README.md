<div align=right>

|[![](https://img.shields.io/badge/-Inicio-FFF?style=flat&logo=Emlakjet&logoColor=black)](/README.md) [![](https://img.shields.io/badge/-Analisis-FFF?style=flat&logo=multisim&logoColor=black)](/RUP/01-analisis/README.md) [![](https://img.shields.io/badge/-Casos_de_uso-FFF?style=flat&logo=crewunited&logoColor=black)](/RUP/01-analisis/casos-uso/README.md)|
|-:|

</div>

# CU-42 -- Ver Examen

*El docente abre el detalle de un examen asignado a un alumno para revisar sus preguntas y respuestas en una nueva pestaña.*

## Análisis

**VistaDetalleAlumno** `<<boundary>>` — punto de inicio; permite al docente seleccionar un examen concreto del historial del alumno.

**ExamenRevisionPage** `<<boundary>>` — se abre en nueva pestaña y presenta el contenido completo del examen seleccionado para revisión.

**ControladorExamen** `<<control>>` — recupera el ejemplar del examen con sus preguntas y respuestas para alimentar la vista de revisión.

**ExamenAlumno** `<<entity>>` — ejemplar del examen asignado al alumno; contiene las preguntas y el estado actual del examen.

**Pregunta** `<<entity>>` — se consulta para obtener las respuestas asociadas a cada pregunta del ejemplar en revisión.

## Diagrama de colaboración

<div align=center>

![](https://www.plantuml.com/plantuml/proxy?cache=no&v=4&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/casos-uso/CU-42-verExamen/analisis-colaboracion-CU-42-verExamen.puml)

[analisis-colaboracion-CU-42-verExamen.puml](analisis-colaboracion-CU-42-verExamen.puml)

</div>
