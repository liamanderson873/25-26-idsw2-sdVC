<div align=right>

|[![](https://img.shields.io/badge/-Inicio-FFF?style=flat&logo=Emlakjet&logoColor=black)](/README.md) [![](https://img.shields.io/badge/-Analisis-FFF?style=flat&logo=multisim&logoColor=black)](/RUP/01-analisis/README.md) [![](https://img.shields.io/badge/-Casos_de_uso-FFF?style=flat&logo=crewunited&logoColor=black)](/RUP/01-analisis/casos-uso/README.md)|
|-:|

</div>

# CU-18 -- Crear Asignatura

*El docente crea una nueva asignatura vinculada a un grado, inicializando automáticamente su banco de preguntas vacío.*

## Análisis

**VistaCreacionAsignatura** `<<boundary>>` — captura nombre, código y curso de la nueva asignatura y desencadena la creación.

**ControladorAsignaturas** `<<control>>` — inicializa la asignatura y crea su banco de preguntas asociado, persistiendo ambas entidades.

**Asignatura** `<<entity>>` — entidad principal que se crea con su configuración inicial: nombre, código y grado asociado.

**BancoPreguntas** `<<entity>>` — se crea vacío de forma automática junto con la asignatura para almacenar futuras preguntas.

**Alumno** `<<entity>>` — se referencia como la colección de alumnos del grado que cursarán la nueva asignatura.

**Grado** `<<entity>>` — se asocia a la asignatura para determinar el grupo de alumnos al que pertenece.

## Diagrama de colaboración

<div align=center>

![](https://www.plantuml.com/plantuml/proxy?cache=no&v=4&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/casos-uso/CU-18-crearAsignatura/analisis-colaboracion-CU-18-crearAsignatura.puml)

[analisis-colaboracion-CU-18-crearAsignatura.puml](analisis-colaboracion-CU-18-crearAsignatura.puml)

</div>
