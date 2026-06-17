<div align=right>

|[![](https://img.shields.io/badge/-Inicio-FFF?style=flat&logo=Emlakjet&logoColor=black)](/README.md) [![](https://img.shields.io/badge/-Analisis-FFF?style=flat&logo=multisim&logoColor=black)](/RUP/01-analisis/README.md) [![](https://img.shields.io/badge/-Casos_de_uso-FFF?style=flat&logo=crewunited&logoColor=black)](/RUP/01-analisis/casos-uso/README.md)|
|-:|

</div>

# CU-25 -- Eliminar Pregunta

*El docente solicita la eliminación de una pregunta del banco; el sistema muestra advertencia y elimina tras confirmar.*

## Análisis

**VistaEliminacionPregunta** `<<boundary>>` — presenta los datos de la pregunta a eliminar, muestra la advertencia y recoge la confirmación del docente.

**ControladorPreguntas** `<<control>>` — recupera los detalles de la pregunta para la confirmación y ejecuta el borrado definitivo.

**Pregunta** `<<entity>>` — entidad que se elimina definitivamente del banco de preguntas tras la confirmación del docente.

## Diagrama de colaboración

<div align=center>

![](https://www.plantuml.com/plantuml/proxy?cache=no&v=4&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/casos-uso/CU-25-eliminarPregunta/analisis-colaboracion-CU-25-eliminarPregunta.puml)

[analisis-colaboracion-CU-25-eliminarPregunta.puml](analisis-colaboracion-CU-25-eliminarPregunta.puml)

</div>
