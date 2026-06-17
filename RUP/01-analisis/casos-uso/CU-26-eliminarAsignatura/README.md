<div align=right>

|[![](https://img.shields.io/badge/-Inicio-FFF?style=flat&logo=Emlakjet&logoColor=black)](/README.md) [![](https://img.shields.io/badge/-Analisis-FFF?style=flat&logo=multisim&logoColor=black)](/RUP/01-analisis/README.md) [![](https://img.shields.io/badge/-Casos_de_uso-FFF?style=flat&logo=crewunited&logoColor=black)](/RUP/01-analisis/casos-uso/README.md)|
|-:|

</div>

# CU-26 -- Eliminar Asignatura

*El docente elimina una asignatura del sistema tras confirmar la operación.*

## Análisis

**VistaEliminacionAsignatura** `<<boundary>>` — muestra los datos de la asignatura a eliminar y recoge la confirmación del docente.

**ControladorAsignaturas** `<<control>>` — ejecuta el borrado definitivo de la asignatura y sus datos asociados.

**Asignatura** `<<entity>>` — entidad que se elimina del sistema junto con su banco de preguntas al confirmarse la operación.

## Diagrama de colaboración

<div align=center>

![](https://www.plantuml.com/plantuml/proxy?cache=no&v=4&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/casos-uso/CU-26-eliminarAsignatura/analisis-colaboracion-CU-26-eliminarAsignatura.puml)

[analisis-colaboracion-CU-26-eliminarAsignatura.puml](analisis-colaboracion-CU-26-eliminarAsignatura.puml)

</div>
