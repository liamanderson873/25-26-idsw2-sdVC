<div align=right>

|[![](https://img.shields.io/badge/-Inicio-FFF?style=flat&logo=Emlakjet&logoColor=black)](/README.md) [![](https://img.shields.io/badge/-Analisis-FFF?style=flat&logo=multisim&logoColor=black)](/RUP/01-analisis/README.md) [![](https://img.shields.io/badge/-Casos_de_uso-FFF?style=flat&logo=crewunited&logoColor=black)](/RUP/01-analisis/casos-uso/README.md)|
|-:|

</div>

# CU-08 -- Exportar Preguntas

*Subartefacto invocado desde CU-04 mediante include que extrae el banco de preguntas para incluirlo en la exportacion global.*

> **CU abstracto** - no tiene actor iniciador propio. Es invocado mediante `<<include>>` desde otro caso de uso.

## Objetos BCE

| Estereotipo | Clase |
|---|---|
| `<<boundary>>` | VistaExportacionPreguntas |
| `<<control>>` | ControladorExportacion |
| `<<entity>>` | Pregunta |
| `<<entity>>` | Respuesta |

## Diagramas de análisis

<div align=center>

|Colaboración|Secuencia|
|:-:|:-:|
|![](https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/casos-uso/CU-08-exportarPreguntas/analisis-colaboracion-CU-08-exportarPreguntas.puml)|![](https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/casos-uso/CU-08-exportarPreguntas/analisis-secuencia-CU-08-exportarPreguntas.puml)|
|[analisis-colaboracion-CU-08-exportarPreguntas.puml](analisis-colaboracion-CU-08-exportarPreguntas.puml)|[analisis-secuencia-CU-08-exportarPreguntas.puml](analisis-secuencia-CU-08-exportarPreguntas.puml)|

</div>
