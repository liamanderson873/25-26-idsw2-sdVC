<div align=right>

|[![](https://img.shields.io/badge/-Inicio-FFF?style=flat&logo=Emlakjet&logoColor=black)](/README.md) [![](https://img.shields.io/badge/-Analisis-FFF?style=flat&logo=multisim&logoColor=black)](/RUP/01-analisis/README.md) [![](https://img.shields.io/badge/-Casos_de_uso-FFF?style=flat&logo=crewunited&logoColor=black)](/RUP/01-analisis/casos-uso/README.md)|
|-:|

</div>

# CU-01 -- Corregir Examenes

*El docente corrige masivamente las respuestas de un grupo de alumnos y el sistema persiste la nota actualizando el estado a CORREGIDO.*

## Análisis

**VistaCorreccion** `<<boundary>>` — recibe la solicitud de corrección del docente, presenta la interfaz de gestión de exámenes y desencadena el proceso masivo.

**ControladorCorreccion** `<<control>>` — orquesta la lógica de corrección: valida la clave de respuestas, calcula las notas y actualiza los estados de cada examen.

**Examen** `<<entity>>` — encapsula la plantilla y el estado del examen; expone la operación para marcar el estado a CORREGIDO.

**Alumno** `<<entity>>` — se consulta para asociar cada examen corregido al alumno que lo realizó.

## Diagrama de colaboración

<div align=center>

![](https://www.plantuml.com/plantuml/proxy?cache=no&v=4&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/casos-uso/CU-01-corregirExamenes/analisis-colaboracion-CU-01-corregirExamenes.puml)

[analisis-colaboracion-CU-01-corregirExamenes.puml](analisis-colaboracion-CU-01-corregirExamenes.puml)

</div>
