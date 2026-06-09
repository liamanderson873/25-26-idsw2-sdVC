<div align=right>

|[![](https://img.shields.io/badge/-Inicio-FFF?style=flat&logo=Emlakjet&logoColor=black)](/README.md) [![](https://img.shields.io/badge/-Analisis-FFF?style=flat&logo=multisim&logoColor=black)](/RUP/01-analisis/README.md) [![](https://img.shields.io/badge/-Casos_de_uso-FFF?style=flat&logo=crewunited&logoColor=black)](/RUP/01-analisis/casos-uso/README.md)|
|-:|

</div>
# CU-06 -- Importar Preguntas

*El docente importa un banco de preguntas desde un archivo; el sistema crea cada pregunta nueva delegando en crearPregunta.*

## Análisis

**VistaImportacionPreguntas** `<<boundary>>` — gestiona la selección del archivo y muestra un resumen de las preguntas detectadas antes de la confirmación.

**ControladorImportacionPreguntas** `<<control>>` — analiza el archivo, instancia previamente cada pregunta para validación y delega la persistencia a la colaboración crearPregunta.

**Pregunta** `<<entity>>` — se instancia temporalmente durante el análisis para verificar la integridad de los datos antes de la importación definitiva.

**Asignatura** `<<entity>>` — se referencia para asociar cada pregunta importada al banco de preguntas de la asignatura correspondiente.

**Tema** `<<entity>>` — se consulta para clasificar cada pregunta importada dentro de la unidad temática indicada en el archivo.

## Diagrama de colaboración

<div align=center>

![](https://www.plantuml.com/plantuml/proxy?cache=no&v=4&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/casos-uso/CU-06-importarPreguntas/analisis-colaboracion-CU-06-importarPreguntas.puml)

[analisis-colaboracion-CU-06-importarPreguntas.puml](analisis-colaboracion-CU-06-importarPreguntas.puml)

</div>
