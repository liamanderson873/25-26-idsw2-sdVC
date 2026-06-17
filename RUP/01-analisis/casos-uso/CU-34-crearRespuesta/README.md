<div align=right>

|[![](https://img.shields.io/badge/-Inicio-FFF?style=flat&logo=Emlakjet&logoColor=black)](/README.md) [![](https://img.shields.io/badge/-Analisis-FFF?style=flat&logo=multisim&logoColor=black)](/RUP/01-analisis/README.md) [![](https://img.shields.io/badge/-Casos_de_uso-FFF?style=flat&logo=crewunited&logoColor=black)](/RUP/01-analisis/casos-uso/README.md)|
|-:|

</div>

# CU-34 -- Crear Respuesta

*El docente añade una nueva opción de respuesta a una pregunta existente del banco.*

## Análisis

**VistaCreacionRespuesta** `<<boundary>>` — recoge los datos de la nueva respuesta (texto e indicador de corrección) y lanza la creación.

**ControladorCreacionRespuestas** `<<control>>` — persiste la nueva respuesta y la asocia a la pregunta correspondiente.

**Respuesta** `<<entity>>` — entidad que se crea con el texto y la marca de corrección de la nueva opción de respuesta.

**Pregunta** `<<entity>>` — recibe la nueva respuesta añadiéndola a su colección de opciones disponibles.

## Diagrama de colaboración

<div align=center>

![](https://www.plantuml.com/plantuml/proxy?cache=no&v=4&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/casos-uso/CU-34-crearRespuesta/analisis-colaboracion-CU-34-crearRespuesta.puml)

[analisis-colaboracion-CU-34-crearRespuesta.puml](analisis-colaboracion-CU-34-crearRespuesta.puml)

</div>
