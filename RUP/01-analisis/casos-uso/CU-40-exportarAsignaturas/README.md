<div align=right>

|[![](https://img.shields.io/badge/-Inicio-FFF?style=flat&logo=Emlakjet&logoColor=black)](/README.md) [![](https://img.shields.io/badge/-Analisis-FFF?style=flat&logo=multisim&logoColor=black)](/RUP/01-analisis/README.md) [![](https://img.shields.io/badge/-Casos_de_uso-FFF?style=flat&logo=crewunited&logoColor=black)](/RUP/01-analisis/casos-uso/README.md)|
|-:|

</div>

# CU-40 -- Exportar Asignaturas

*Subartefacto invocado desde CU-04 mediante include que extrae las asignaturas para incluirlas en la exportacion global.*

> **CU abstracto** - no tiene actor iniciador propio. Es invocado mediante `<<include>>` desde otro caso de uso.

## Objetos BCE

| Estereotipo | Clase |
|---|---|
| `<<boundary>>` | VistaExportacionAsignaturas |
| `<<control>>` | ControladorExportacionAsignaturas |
| `<<entity>>` | Asignatura |

## Diagramas de analisis

<div align=center>

|Colaboracion|Secuencia|
|:-:|:-:|
|![](https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/casos-uso/CU-40-exportarAsignaturas/analisis-colaboracion-CU-40-exportarAsignaturas.puml)|![](https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/casos-uso/CU-40-exportarAsignaturas/analisis-secuencia-CU-40-exportarAsignaturas.puml)|
|[analisis-colaboracion-CU-40-exportarAsignaturas.puml](analisis-colaboracion-CU-40-exportarAsignaturas.puml)|[analisis-secuencia-CU-40-exportarAsignaturas.puml](analisis-secuencia-CU-40-exportarAsignaturas.puml)|

</div>
