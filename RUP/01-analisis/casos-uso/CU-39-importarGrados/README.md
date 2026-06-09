<div align=right>

|[![](https://img.shields.io/badge/-Inicio-FFF?style=flat&logo=Emlakjet&logoColor=black)](/README.md) [![](https://img.shields.io/badge/-Analisis-FFF?style=flat&logo=multisim&logoColor=black)](/RUP/01-analisis/README.md) [![](https://img.shields.io/badge/-Casos_de_uso-FFF?style=flat&logo=crewunited&logoColor=black)](/RUP/01-analisis/casos-uso/README.md)|
|-:|

</div>
# CU-39 -- Importar Grados

*Importa la lista de grados del archivo de configuración global; crea cada grado nuevo delegando en crearGrado.*

> *Abstracto — invocado desde CU-03: importarConfiguracionGlobal*

## Análisis

**VistaImportacionGrados** `<<boundary>>` — recibe la lista de grados a importar y muestra la confirmación del resultado.

**ControladorImportacionGrados** `<<control>>` — verifica duplicados y delega la creación de cada grado nuevo a la colaboración crearGrado.

**Grado** `<<entity>>` — se consulta para detectar duplicados antes de iniciar la creación de cada registro nuevo.

## Diagrama de colaboración

<div align=center>

![](https://www.plantuml.com/plantuml/proxy?cache=no&v=4&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/casos-uso/CU-39-importarGrados/analisis-colaboracion-CU-39-importarGrados.puml)

[analisis-colaboracion-CU-39-importarGrados.puml](analisis-colaboracion-CU-39-importarGrados.puml)

</div>
