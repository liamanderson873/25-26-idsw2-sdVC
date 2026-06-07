<div align=right>

|[![](https://img.shields.io/badge/-Inicio-FFF?style=flat&logo=Emlakjet&logoColor=black)](/README.md) [![](https://img.shields.io/badge/-Analisis-FFF?style=flat&logo=multisim&logoColor=black)](/RUP/01-analisis/README.md) [![](https://img.shields.io/badge/-Casos_de_uso-FFF?style=flat&logo=crewunited&logoColor=black)](/RUP/01-analisis/casos-uso/README.md)|
|-:|

</div>

# CU-39 -- Importar Grados

*Subartefacto invocado desde CU-03 mediante include que importa los grados del fichero JSON global.*

> **CU abstracto** - no tiene actor iniciador propio. Es invocado mediante `<<include>>` desde otro caso de uso.

## Objetos BCE

| Estereotipo | Clase |
|---|---|
| `<<boundary>>` | VistaImportacionGrados |
| `<<control>>` | ControladorImportacionGrados |
| `<<entity>>` | Grado |

## Diagramas de analisis

<div align=center>

|Colaboracion|Secuencia|
|:-:|:-:|
|![](https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/develop/RUP/01-analisis/casos-uso/CU-39-importarGrados/analisis-colaboracion-CU-39-importarGrados.puml)|![](https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/develop/RUP/01-analisis/casos-uso/CU-39-importarGrados/analisis-secuencia-CU-39-importarGrados.puml)|
|[analisis-colaboracion-CU-39-importarGrados.puml](analisis-colaboracion-CU-39-importarGrados.puml)|[analisis-secuencia-CU-39-importarGrados.puml](analisis-secuencia-CU-39-importarGrados.puml)|

</div>
