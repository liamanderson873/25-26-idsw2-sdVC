<div align=right>

|[![](https://img.shields.io/badge/-Inicio-FFF?style=flat&logo=Emlakjet&logoColor=black)](/README.md) [![](https://img.shields.io/badge/-Analisis-FFF?style=flat&logo=multisim&logoColor=black)](/RUP/01-analisis/README.md) [![](https://img.shields.io/badge/-Casos_de_uso-FFF?style=flat&logo=crewunited&logoColor=black)](/RUP/01-analisis/casos-uso/README.md)|
|-:|

</div>

# CU-12 -- Editar Asignatura

*El docente modifica los datos de una asignatura o accede a su banco de preguntas, con posibilidad de eliminarla.*

## Análisis

**VistaEdicionAsignatura** `<<boundary>>` — muestra el formulario de la asignatura y permite navegar a la batería de preguntas o eliminar la asignatura.

**ControladorAsignaturas** `<<control>>` — persiste las modificaciones sobre la asignatura o ejecuta la eliminación con sus datos asociados.

**Asignatura** `<<entity>>` — entidad objetivo; sus datos se actualizan o se elimina del sistema junto con su banco de preguntas.

**Grado** `<<entity>>` — se referencia para mantener la asociación correcta de la asignatura con los grados que la cursan.

**Alumno** `<<entity>>` — se consulta para gestionar el impacto sobre los alumnos matriculados en caso de modificación relevante.

**Pregunta** `<<entity>>` — se accede al banco para que el docente pueda gestionar las preguntas de la asignatura desde este CU.

## Diagrama de colaboración

<div align=center>

![](https://www.plantuml.com/plantuml/proxy?cache=no&v=4&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/casos-uso/CU-12-editarAsignatura/analisis-colaboracion-CU-12-editarAsignatura.puml)

[analisis-colaboracion-CU-12-editarAsignatura.puml](analisis-colaboracion-CU-12-editarAsignatura.puml)

</div>
