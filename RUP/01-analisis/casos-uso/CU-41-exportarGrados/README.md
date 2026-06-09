<div align=right>

|[![](https://img.shields.io/badge/-Inicio-FFF?style=flat&logo=Emlakjet&logoColor=black)](/README.md) [![](https://img.shields.io/badge/-Analisis-FFF?style=flat&logo=multisim&logoColor=black)](/RUP/01-analisis/README.md) [![](https://img.shields.io/badge/-Casos_de_uso-FFF?style=flat&logo=crewunited&logoColor=black)](/RUP/01-analisis/casos-uso/README.md)|
|-:|

</div>
# CU-41 -- Exportar Grados

*Exporta el catálogo de grados en formato JSON; invocado como parte de exportarConfiguracionGlobal.*

> *Abstracto — invocado desde CU-04: exportarConfiguracionGlobal*

## Análisis

**VistaExportacionGrados** `<<boundary>>` — punto de entrada del proceso abstracto; entrega el fichero JSON generado al contexto invocante.

**ControladorExportacionGrados** `<<control>>` — recupera todos los datos de grados y construye el fichero JSON para exportación.

**Grado** `<<entity>>` — fuente de datos; se consulta para obtener todos los registros que se incluirán en el fichero exportado.

## Diagrama de colaboración

<div align=center>

![](https://www.plantuml.com/plantuml/proxy?cache=no&v=4&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/casos-uso/CU-41-exportarGrados/analisis-colaboracion-CU-41-exportarGrados.puml)

[analisis-colaboracion-CU-41-exportarGrados.puml](analisis-colaboracion-CU-41-exportarGrados.puml)

</div>
