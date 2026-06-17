<div align=right>

|[![](https://img.shields.io/badge/-Inicio-FFF?style=flat&logo=Emlakjet&logoColor=black)](/README.md) [![](https://img.shields.io/badge/-Analisis-FFF?style=flat&logo=multisim&logoColor=black)](/RUP/01-analisis/README.md) [![](https://img.shields.io/badge/-Casos_de_uso-FFF?style=flat&logo=crewunited&logoColor=black)](/RUP/01-analisis/casos-uso/README.md)|
|-:|

</div>

# CU-11 -- Editar Pregunta

*El docente modifica los campos de una pregunta existente, actualizando enunciado, tema, dificultad o sus respuestas.*

## Análisis

**VistaEdicionPregunta** `<<boundary>>` — muestra el formulario de edición con los datos actuales y captura los cambios del docente.

**ControladorPreguntas** `<<control>>` — aplica las modificaciones sobre la pregunta y sus respuestas, o ejecuta la eliminación si se solicita.

**Pregunta** `<<entity>>` — entidad objetivo de la edición; recibe la actualización de datos o la operación de borrado.

**Asignatura** `<<entity>>` — se referencia para mantener la clasificación temática correcta tras la edición.

**Tema** `<<entity>>` — se actualiza si el docente cambia la unidad temática de la pregunta editada.

**Respuesta** `<<entity>>` — sus opciones se actualizan de forma sincronizada con los cambios en la pregunta.

## Diagrama de colaboración

<div align=center>

![](https://www.plantuml.com/plantuml/proxy?cache=no&v=4&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/casos-uso/CU-11-editarPregunta/analisis-colaboracion-CU-11-editarPregunta.puml)

[analisis-colaboracion-CU-11-editarPregunta.puml](analisis-colaboracion-CU-11-editarPregunta.puml)

</div>
