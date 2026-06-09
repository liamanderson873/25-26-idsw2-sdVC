<div align=right>

|[![](https://img.shields.io/badge/-Inicio-FFF?style=flat&logo=Emlakjet&logoColor=black)](/README.md) [![](https://img.shields.io/badge/-Analisis-FFF?style=flat&logo=multisim&logoColor=black)](/RUP/01-analisis/README.md) [![](https://img.shields.io/badge/-Casos_de_uso-FFF?style=flat&logo=crewunited&logoColor=black)](/RUP/01-analisis/casos-uso/README.md)|
|-:|

</div>

# CU-33 -- Ver Respuestas

*El docente consulta las respuestas asociadas a una pregunta, pudiendo filtrar y ver el detalle de cada opción.*

## Análisis

**VistaListaRespuestas** `<<boundary>>` — presenta el listado de respuestas de la pregunta seleccionada con soporte de filtrado.

**ControladorConsultaRespuestas** `<<control>>` — recupera y filtra las respuestas de la pregunta, enriqueciendo los datos con información de la pregunta padre.

**Respuesta** `<<entity>>` — entidad consultada; representa cada opción de respuesta con su contenido y marcador de corrección.

**Pregunta** `<<entity>>` — se consulta para obtener el contexto de la pregunta a la que pertenecen las respuestas mostradas.

## Diagrama de colaboración

<div align=center>

![](https://www.plantuml.com/plantuml/proxy?cache=no&v=4&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/casos-uso/CU-33-verRespuestas/analisis-colaboracion-CU-33-verRespuestas.puml)

[analisis-colaboracion-CU-33-verRespuestas.puml](analisis-colaboracion-CU-33-verRespuestas.puml)

</div>
