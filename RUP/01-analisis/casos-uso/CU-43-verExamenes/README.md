<div align=right>

|[![](https://img.shields.io/badge/-Inicio-FFF?style=flat&logo=Emlakjet&logoColor=black)](/README.md) [![](https://img.shields.io/badge/-Analisis-FFF?style=flat&logo=multisim&logoColor=black)](/RUP/01-analisis/README.md) [![](https://img.shields.io/badge/-Casos_de_uso-FFF?style=flat&logo=crewunited&logoColor=black)](/RUP/01-analisis/casos-uso/README.md)|
|-:|

</div>

# CU-43 -- Ver Examenes

*El docente consulta la lista agrupada de exámenes generados para una asignatura y grado.*

## Análisis

**VistaListaExamenes** `<<boundary>>` — presenta los grupos de exámenes organizados por asignatura y permite acceder al detalle de cada grupo.

**ControladorExamen** `<<control>>` — recupera y agrupa los exámenes existentes para presentarlos de forma estructurada al docente.

**ExamenAlumno** `<<entity>>` — entidad consultada; representa cada ejemplar de examen asignado, agrupado por asignatura y grado.

## Diagrama de colaboración

<div align=center>

![](https://www.plantuml.com/plantuml/proxy?cache=no&v=4&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/casos-uso/CU-43-verExamenes/analisis-colaboracion-CU-43-verExamenes.puml)

[analisis-colaboracion-CU-43-verExamenes.puml](analisis-colaboracion-CU-43-verExamenes.puml)

</div>
