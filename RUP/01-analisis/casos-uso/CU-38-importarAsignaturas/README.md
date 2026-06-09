<div align=right>

|[![](https://img.shields.io/badge/-Inicio-FFF?style=flat&logo=Emlakjet&logoColor=black)](/README.md) [![](https://img.shields.io/badge/-Analisis-FFF?style=flat&logo=multisim&logoColor=black)](/RUP/01-analisis/README.md) [![](https://img.shields.io/badge/-Casos_de_uso-FFF?style=flat&logo=crewunited&logoColor=black)](/RUP/01-analisis/casos-uso/README.md)|
|-:|

</div>

# CU-38 -- Importar Asignaturas

*Importa la lista de asignaturas del archivo de configuración global; crea cada asignatura nueva delegando en crearAsignatura.*

> *Abstracto — invocado desde CU-03: importarConfiguracionGlobal*

## Análisis

**VistaImportacionAsignaturas** `<<boundary>>` — recibe la lista de asignaturas a importar y muestra la confirmación del resultado.

**ControladorImportacionAsignaturas** `<<control>>` — verifica duplicados y delega la creación de cada asignatura nueva a la colaboración crearAsignatura.

**Asignatura** `<<entity>>` — se consulta para detectar duplicados antes de iniciar la creación de cada registro nuevo.

## Diagrama de colaboración

<div align=center>

![](https://www.plantuml.com/plantuml/proxy?cache=no&v=4&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/casos-uso/CU-38-importarAsignaturas/analisis-colaboracion-CU-38-importarAsignaturas.puml)

[analisis-colaboracion-CU-38-importarAsignaturas.puml](analisis-colaboracion-CU-38-importarAsignaturas.puml)

</div>
