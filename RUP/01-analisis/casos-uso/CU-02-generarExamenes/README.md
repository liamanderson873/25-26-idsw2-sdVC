<div align=right>

|[![](https://img.shields.io/badge/-Inicio-FFF?style=flat&logo=Emlakjet&logoColor=black)](/README.md) [![](https://img.shields.io/badge/-Analisis-FFF?style=flat&logo=multisim&logoColor=black)](/RUP/01-analisis/README.md) [![](https://img.shields.io/badge/-Casos_de_uso-FFF?style=flat&logo=crewunited&logoColor=black)](/RUP/01-analisis/casos-uso/README.md)|
|-:|

</div>

# CU-02 -- Generar Examenes

*El docente genera examenes individualizados por alumno seleccionando asignatura, grado y numero de preguntas del banco.*

## Análisis

**VistaGeneracion** `<<boundary>>` — recibe la selección de parámetros (asignatura, grado, número de preguntas) y presenta la interfaz de configuración de la generación.

**ControladorGeneracion** `<<control>>` — orquesta la selección aleatoria de preguntas según los filtros y construye los exámenes individualizados para cada alumno del grado.

**Asignatura** `<<entity>>` — aporta el banco de preguntas y los temas configurados que actúan de fuente para el proceso de generación.

**Tema** `<<entity>>` — permite agrupar preguntas por unidad temática para garantizar la distribución temática configurada en el examen.

**Pregunta** `<<entity>>` — representa el ítem de examen; se selecciona y aleatoriza de forma independiente para cada alumno.

**Examen** `<<entity>>` — resultado del proceso; encapsula las preguntas asignadas a un alumno concreto y el estado inicial GENERADO.

## Diagrama de colaboración

<div align=center>

![](https://www.plantuml.com/plantuml/proxy?cache=no&v=4&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/casos-uso/CU-02-generarExamenes/analisis-colaboracion-CU-02-generarExamenes.puml)

[analisis-colaboracion-CU-02-generarExamenes.puml](analisis-colaboracion-CU-02-generarExamenes.puml)

</div>
