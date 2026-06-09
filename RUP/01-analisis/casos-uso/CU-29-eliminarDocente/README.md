<div align=right>

|[![](https://img.shields.io/badge/-Inicio-FFF?style=flat&logo=Emlakjet&logoColor=black)](/README.md) [![](https://img.shields.io/badge/-Analisis-FFF?style=flat&logo=multisim&logoColor=black)](/RUP/01-analisis/README.md) [![](https://img.shields.io/badge/-Casos_de_uso-FFF?style=flat&logo=crewunited&logoColor=black)](/RUP/01-analisis/casos-uso/README.md)|
|-:|

</div>
# CU-29 -- Eliminar Docente

*El administrador institucional elimina un docente del sistema tras confirmar la operación.*

## Análisis

**VistaEliminacionDocente** `<<boundary>>` — muestra los datos del docente a eliminar y recoge la confirmación del administrador.

**ControladorDocentes** `<<control>>` — ejecuta el borrado definitivo del docente del sistema.

**Docente** `<<entity>>` — entidad que se elimina del sistema al confirmarse la operación.

## Diagrama de colaboración

<div align=center>

![](https://www.plantuml.com/plantuml/proxy?cache=no&v=4&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/casos-uso/CU-29-eliminarDocente/analisis-colaboracion-CU-29-eliminarDocente.puml)

[analisis-colaboracion-CU-29-eliminarDocente.puml](analisis-colaboracion-CU-29-eliminarDocente.puml)

</div>
