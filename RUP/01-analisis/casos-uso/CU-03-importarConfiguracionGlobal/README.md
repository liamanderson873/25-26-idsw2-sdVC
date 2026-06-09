<div align=right>

|[![](https://img.shields.io/badge/-Inicio-FFF?style=flat&logo=Emlakjet&logoColor=black)](/README.md) [![](https://img.shields.io/badge/-Analisis-FFF?style=flat&logo=multisim&logoColor=black)](/RUP/01-analisis/README.md) [![](https://img.shields.io/badge/-Casos_de_uso-FFF?style=flat&logo=crewunited&logoColor=black)](/RUP/01-analisis/casos-uso/README.md)|
|-:|

</div>

# CU-03 -- Importar Configuracion Global

*El docente importa un archivo de configuración global que carga masivamente alumnos, preguntas, asignaturas y grados en el sistema.*

## Análisis

**VistaImportConfigGlobal** `<<boundary>>` — recibe el archivo de configuración y coordina la secuencia de importaciones parciales delegadas mediante `<<include>>`.

**ControladorImportacion** `<<control>>` — procesa y valida el archivo importado, extrae los bloques de datos y desencadena cada operación de importación parcial.

**ConfiguracionGlobal** `<<entity>>` — representa la estructura del archivo de configuración; proporciona los métodos de extracción de datos por categoría.

## Diagrama de colaboración

<div align=center>

![](https://www.plantuml.com/plantuml/proxy?cache=no&v=4&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/casos-uso/CU-03-importarConfiguracionGlobal/analisis-colaboracion-CU-03-importarConfiguracionGlobal.puml)

[analisis-colaboracion-CU-03-importarConfiguracionGlobal.puml](analisis-colaboracion-CU-03-importarConfiguracionGlobal.puml)

</div>
