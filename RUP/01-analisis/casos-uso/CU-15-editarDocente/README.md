<div align=right>

|[![](https://img.shields.io/badge/-Inicio-FFF?style=flat&logo=Emlakjet&logoColor=black)](/README.md) [![](https://img.shields.io/badge/-Analisis-FFF?style=flat&logo=multisim&logoColor=black)](/RUP/01-analisis/README.md) [![](https://img.shields.io/badge/-Casos_de_uso-FFF?style=flat&logo=crewunited&logoColor=black)](/RUP/01-analisis/casos-uso/README.md)|
|-:|

</div>
# CU-15 -- Editar Docente

*El administrador institucional modifica los datos de un docente existente o lo elimina del sistema.*

## Análisis

**VistaEdicionDocente** `<<boundary>>` — muestra el formulario con los datos actuales del docente y captura las modificaciones o la solicitud de eliminación.

**ControladorDocentes** `<<control>>` — actualiza los datos del docente en el sistema o ejecuta el borrado si se confirma la eliminación.

**Docente** `<<entity>>` — entidad objetivo; sus atributos se actualizan o el registro se elimina del sistema.

## Diagrama de colaboración

<div align=center>

![](https://www.plantuml.com/plantuml/proxy?cache=no&v=4&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/casos-uso/CU-15-editarDocente/analisis-colaboracion-CU-15-editarDocente.puml)

[analisis-colaboracion-CU-15-editarDocente.puml](analisis-colaboracion-CU-15-editarDocente.puml)

</div>
