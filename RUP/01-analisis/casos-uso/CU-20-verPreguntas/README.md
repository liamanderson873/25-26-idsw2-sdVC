<div align=right>

|[![](https://img.shields.io/badge/-Inicio-FFF?style=flat&logo=Emlakjet&logoColor=black)](/README.md) [![](https://img.shields.io/badge/-Analisis-FFF?style=flat&logo=multisim&logoColor=black)](/RUP/01-analisis/README.md) [![](https://img.shields.io/badge/-Casos_de_uso-FFF?style=flat&logo=crewunited&logoColor=black)](/RUP/01-analisis/casos-uso/README.md)|
|-:|

</div>

# CU-20 -- Ver Preguntas

*El docente consulta el banco de preguntas de una asignatura, pudiendo aplicar filtros por tema, dificultad u otros criterios.*

## Análisis

**VistaListaPreguntas** `<<boundary>>` — presenta el listado paginado de preguntas y expone los controles de filtrado al docente.

**ControladorPreguntas** `<<control>>` — recupera la lista de preguntas aplicando el contexto y los criterios de filtrado especificados.

**Pregunta** `<<entity>>` — fuente de datos consultada; cada instancia representa un ítem del banco con sus metadatos y relaciones.

**Asignatura** `<<entity>>` — delimita el contexto de búsqueda para recuperar solo las preguntas del banco de la asignatura seleccionada.

## Diagrama de colaboración

<div align=center>

![](https://www.plantuml.com/plantuml/proxy?cache=no&v=4&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/casos-uso/CU-20-verPreguntas/analisis-colaboracion-CU-20-verPreguntas.puml)

[analisis-colaboracion-CU-20-verPreguntas.puml](analisis-colaboracion-CU-20-verPreguntas.puml)

</div>
