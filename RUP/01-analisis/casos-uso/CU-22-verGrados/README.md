<div align=right>

|[![](https://img.shields.io/badge/-Inicio-FFF?style=flat&logo=Emlakjet&logoColor=black)](/README.md) [![](https://img.shields.io/badge/-Analisis-FFF?style=flat&logo=multisim&logoColor=black)](/RUP/01-analisis/README.md) [![](https://img.shields.io/badge/-Casos_de_uso-FFF?style=flat&logo=crewunited&logoColor=black)](/RUP/01-analisis/casos-uso/README.md)|
|-:|

</div>

# CU-22 -- Ver Grados

*El docente consulta la lista de grados del sistema, pudiendo filtrar por nombre o código.*

## Análisis

**VistaListaGrados** `<<boundary>>` — presenta el listado de grados con los controles de filtrado y navegación.

**ControladorGrados** `<<control>>` — recupera y filtra el conjunto de grados según los criterios indicados.

**Grado** `<<entity>>` — entidad consultada; agrega la lista de alumnos asociados para enriquecer la información presentada.

**Alumno** `<<entity>>` — se incluye en la representación del grado para mostrar cuántos alumnos lo componen.

## Diagrama de colaboración

<div align=center>

![](https://www.plantuml.com/plantuml/proxy?cache=no&v=4&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/casos-uso/CU-22-verGrados/analisis-colaboracion-CU-22-verGrados.puml)

[analisis-colaboracion-CU-22-verGrados.puml](analisis-colaboracion-CU-22-verGrados.puml)

</div>
