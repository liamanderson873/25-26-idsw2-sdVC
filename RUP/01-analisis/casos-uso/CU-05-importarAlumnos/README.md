<div align=right>

|[![](https://img.shields.io/badge/-Inicio-FFF?style=flat&logo=Emlakjet&logoColor=black)](/README.md) [![](https://img.shields.io/badge/-Analisis-FFF?style=flat&logo=multisim&logoColor=black)](/RUP/01-analisis/README.md) [![](https://img.shields.io/badge/-Casos_de_uso-FFF?style=flat&logo=crewunited&logoColor=black)](/RUP/01-analisis/casos-uso/README.md)|
|-:|

</div>
# CU-05 -- Importar Alumnos

*El docente importa un listado de alumnos desde un archivo CSV o JSON; el sistema crea cada alumno nuevo delegando en crearAlumno.*

## Análisis

**VistaImportacionAlumnos** `<<boundary>>` — presenta la interfaz de selección de archivo y muestra la previsualización de alumnos antes de confirmar la importación.

**ControladorImportacionAlumnos** `<<control>>` — analiza el archivo, detecta duplicados y delega la creación de cada alumno nuevo a la colaboración crearAlumno.

**Alumno** `<<entity>>` — se consulta para validar que el alumno no esté ya registrado antes de iniciar la creación.

## Diagrama de colaboración

<div align=center>

![](https://www.plantuml.com/plantuml/proxy?cache=no&v=4&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/casos-uso/CU-05-importarAlumnos/analisis-colaboracion-CU-05-importarAlumnos.puml)

[analisis-colaboracion-CU-05-importarAlumnos.puml](analisis-colaboracion-CU-05-importarAlumnos.puml)

</div>
