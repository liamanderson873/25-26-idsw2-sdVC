<div align=right>

|[![](https://img.shields.io/badge/-Inicio-FFF?style=flat&logo=Emlakjet&logoColor=black)](/README.md) [![](https://img.shields.io/badge/-Analisis-FFF?style=flat&logo=multisim&logoColor=black)](/RUP/01-analisis/README.md) [![](https://img.shields.io/badge/-Casos_de_uso-FFF?style=flat&logo=crewunited&logoColor=black)](/RUP/01-analisis/casos-uso/README.md)|
|-:|

</div>

# CU-09 -- Asignar Examenes

*El docente asigna los exámenes generados a los alumnos del grado, vinculando cada ejemplar al alumno que debe realizarlo.*

## Análisis

**VistaAsignacionExamen** `<<boundary>>` — presenta la lista de exámenes en estado GENERADO y permite al docente seleccionar los alumnos destino.

**ControladorAsignacion** `<<control>>` — valida que los alumnos pertenecen al grado y registra el vínculo entre cada examen y su alumno asignado.

**Examen** `<<entity>>` — expone los ejemplares en estado GENERADO y recibe la vinculación con el alumno asignado.

**Alumno** `<<entity>>` — se valida su pertenencia al grado antes de ser vinculado a un examen.

**Grado** `<<entity>>` — actúa como criterio de validación para confirmar que los alumnos asignados pertenecen al grupo correcto.

## Diagrama de colaboración

<div align=center>

![](https://www.plantuml.com/plantuml/proxy?cache=no&v=4&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/casos-uso/CU-09-asignarExamenes/analisis-colaboracion-CU-09-asignarExamenes.puml)

[analisis-colaboracion-CU-09-asignarExamenes.puml](analisis-colaboracion-CU-09-asignarExamenes.puml)

</div>
