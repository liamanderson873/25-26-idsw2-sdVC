<div align=right>

|[![](https://img.shields.io/badge/-Inicio-FFF?style=flat&logo=Emlakjet&logoColor=black)](/README.md) [![](https://img.shields.io/badge/-Analisis-FFF?style=flat&logo=multisim&logoColor=black)](/RUP/01-analisis/README.md) [![](https://img.shields.io/badge/-Casos_de_uso-FFF?style=flat&logo=crewunited&logoColor=black)](/RUP/01-analisis/casos-uso/README.md)|
|-:|

</div>

# CU-17 -- Crear Grado

*El docente crea un nuevo grado (curso académico) proporcionando nombre y código, que agrupará a sus alumnos.*

## Análisis

**VistaCreacionGrado** `<<boundary>>` — captura el nombre y código del nuevo grado y lanza el proceso de creación.

**ControladorGrados** `<<control>>` — inicializa el nuevo grado con los datos recibidos y lo persiste en el sistema.

**Grado** `<<entity>>` — entidad que se crea y persiste; servirá de agrupador para los alumnos y las asignaturas asociadas.

**Alumno** `<<entity>>` — se referencia en el modelo del grado como la colección de alumnos que pertenecerán a él.

## Diagrama de colaboración

<div align=center>

![](https://www.plantuml.com/plantuml/proxy?cache=no&v=4&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/casos-uso/CU-17-crearGrado/analisis-colaboracion-CU-17-crearGrado.puml)

[analisis-colaboracion-CU-17-crearGrado.puml](analisis-colaboracion-CU-17-crearGrado.puml)

</div>
