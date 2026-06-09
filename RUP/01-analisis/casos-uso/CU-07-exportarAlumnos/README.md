<div align=right>

|[![](https://img.shields.io/badge/-Inicio-FFF?style=flat&logo=Emlakjet&logoColor=black)](/README.md) [![](https://img.shields.io/badge/-Analisis-FFF?style=flat&logo=multisim&logoColor=black)](/RUP/01-analisis/README.md) [![](https://img.shields.io/badge/-Casos_de_uso-FFF?style=flat&logo=crewunited&logoColor=black)](/RUP/01-analisis/casos-uso/README.md)|
|-:|

</div>

# CU-07 -- Exportar Alumnos

*Exporta el listado completo de alumnos en formato JSON; invocado como parte de exportarConfiguracionGlobal.*

> *Abstracto — invocado desde CU-04: exportarConfiguracionGlobal*

## Análisis

**VistaExportacionAlumnos** `<<boundary>>` — punto de entrada del proceso abstracto; desencadena la recuperación de datos y entrega el fichero generado al contexto invocante.

**ControladorExportacion** `<<control>>` — recupera todos los alumnos del sistema y construye el fichero JSON listo para descarga.

**Alumno** `<<entity>>` — fuente de datos; se consulta para obtener todos los registros que se incluirán en el fichero exportado.

## Diagrama de colaboración

<div align=center>

![](https://www.plantuml.com/plantuml/proxy?cache=no&v=4&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/casos-uso/CU-07-exportarAlumnos/analisis-colaboracion-CU-07-exportarAlumnos.puml)

[analisis-colaboracion-CU-07-exportarAlumnos.puml](analisis-colaboracion-CU-07-exportarAlumnos.puml)

</div>
