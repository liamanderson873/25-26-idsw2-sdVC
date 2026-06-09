<div align=right>

|[![](https://img.shields.io/badge/-Inicio-FFF?style=flat&logo=Emlakjet&logoColor=black)](/README.md) [![](https://img.shields.io/badge/-Analisis-FFF?style=flat&logo=multisim&logoColor=black)](/RUP/01-analisis/README.md) [![](https://img.shields.io/badge/-Casos_de_uso-FFF?style=flat&logo=crewunited&logoColor=black)](/RUP/01-analisis/casos-uso/README.md)|
|-:|

</div>

# CU-10 -- Crear Pregunta

*El docente crea una nueva pregunta en el banco de una asignatura, indicando enunciado, tema, dificultad y opciones de respuesta.*

## Análisis

**VistaCreacionPregunta** `<<boundary>>` — captura los datos de la nueva pregunta introducidos por el docente y lanza la operación de creación.

**ControladorGestionPreguntas** `<<control>>` — valida que la asignatura existe e inicializa la nueva pregunta con los datos proporcionados.

**Pregunta** `<<entity>>` — entidad que se crea y persiste con todos sus atributos: enunciado, tema, dificultad y referencia a la asignatura.

**Asignatura** `<<entity>>` — se verifica su existencia antes de asociar la nueva pregunta al banco de preguntas correspondiente.

## Diagrama de colaboración

<div align=center>

![](https://www.plantuml.com/plantuml/proxy?cache=no&v=4&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/casos-uso/CU-10-crearPregunta/analisis-colaboracion-CU-10-crearPregunta.puml)

[analisis-colaboracion-CU-10-crearPregunta.puml](analisis-colaboracion-CU-10-crearPregunta.puml)

</div>
