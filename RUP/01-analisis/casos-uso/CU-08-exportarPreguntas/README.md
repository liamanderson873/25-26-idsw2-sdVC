<div align=right>

|[![](https://img.shields.io/badge/-Inicio-FFF?style=flat&logo=Emlakjet&logoColor=black)](/README.md) [![](https://img.shields.io/badge/-Analisis-FFF?style=flat&logo=multisim&logoColor=black)](/RUP/01-analisis/README.md) [![](https://img.shields.io/badge/-Casos_de_uso-FFF?style=flat&logo=crewunited&logoColor=black)](/RUP/01-analisis/casos-uso/README.md)|
|-:|

</div>

# CU-08 -- Exportar Preguntas

*Exporta el banco de preguntas con sus respuestas en formato JSON; invocado como parte de exportarConfiguracionGlobal.*

> *Abstracto — invocado desde CU-04: exportarConfiguracionGlobal*

## Análisis

**VistaExportacionPreguntas** `<<boundary>>` — punto de entrada del proceso abstracto; recibe el fichero JSON construido y lo entrega al contexto invocante.

**ControladorExportacion** `<<control>>` — recupera preguntas y sus respuestas asociadas y compone la estructura JSON del fichero exportado.

**Pregunta** `<<entity>>` — proporciona los enunciados, metadatos y referencias a respuestas que formarán el banco exportado.

**Respuesta** `<<entity>>` — se consulta por cada pregunta para incluir todas las opciones de respuesta en el fichero exportado.

## Diagrama de colaboración

<div align=center>

![](https://www.plantuml.com/plantuml/proxy?cache=no&v=4&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/casos-uso/CU-08-exportarPreguntas/analisis-colaboracion-CU-08-exportarPreguntas.puml)

[analisis-colaboracion-CU-08-exportarPreguntas.puml](analisis-colaboracion-CU-08-exportarPreguntas.puml)

</div>
