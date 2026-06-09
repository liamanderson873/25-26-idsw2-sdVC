<div align=right>

|[![](https://img.shields.io/badge/-Inicio-FFF?style=flat&logo=Emlakjet&logoColor=black)](/README.md) [![](https://img.shields.io/badge/-Analisis-FFF?style=flat&logo=multisim&logoColor=black)](/RUP/01-analisis/README.md) [![](https://img.shields.io/badge/-Casos_de_uso-FFF?style=flat&logo=crewunited&logoColor=black)](/RUP/01-analisis/casos-uso/README.md)|
|-:|

</div>
# CU-04 -- Exportar Configuracion Global

*El docente exporta la configuración global del sistema (alumnos, preguntas, asignaturas y grados) como ficheros JSON independientes.*

## Análisis

**VistaExportConfigGlobal** `<<boundary>>` — recopila las opciones de exportación del docente y delega la generación de cada fichero a los CUs abstractos incluidos.

**ControladorExportacion** `<<control>>` — coordina la recogida de datos globales y confirma al docente antes de iniciar el proceso de exportación.

## Diagrama de colaboración

<div align=center>

![](https://www.plantuml.com/plantuml/proxy?cache=no&v=4&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/casos-uso/CU-04-exportarConfiguracionGlobal/analisis-colaboracion-CU-04-exportarConfiguracionGlobal.puml)

[analisis-colaboracion-CU-04-exportarConfiguracionGlobal.puml](analisis-colaboracion-CU-04-exportarConfiguracionGlobal.puml)

</div>
