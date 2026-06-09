<div align=right>

|[![](https://img.shields.io/badge/-Inicio-FFF?style=flat&logo=Emlakjet&logoColor=black)](/README.md) [![](https://img.shields.io/badge/-Analisis-FFF?style=flat&logo=multisim&logoColor=black)](/RUP/01-analisis/README.md) [![](https://img.shields.io/badge/-Casos_de_uso-FFF?style=flat&logo=crewunited&logoColor=black)](/RUP/01-analisis/casos-uso/README.md)|
|-:|

</div>

# CU-24 -- Ver Docentes

*El administrador institucional consulta el listado de docentes registrados en el sistema, pudiendo filtrar por criterios.*

## Análisis

**VistaListaDocentes** `<<boundary>>` — presenta el catálogo de docentes con soporte de filtrado por criterios como nombre o DNI.

**ControladorDocentes** `<<control>>` — recupera y filtra el conjunto de docentes según los criterios indicados por el administrador.

**Docente** `<<entity>>` — entidad consultada; cada instancia representa a un docente registrado con sus datos de identificación y acceso.

## Diagrama de colaboración

<div align=center>

![](https://www.plantuml.com/plantuml/proxy?cache=no&v=4&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/casos-uso/CU-24-verDocentes/analisis-colaboracion-CU-24-verDocentes.puml)

[analisis-colaboracion-CU-24-verDocentes.puml](analisis-colaboracion-CU-24-verDocentes.puml)

</div>
