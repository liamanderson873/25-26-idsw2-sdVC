<div align=right>

|[![](https://img.shields.io/badge/-Inicio-FFF?style=flat&logo=Emlakjet&logoColor=black)](/README.md) [![](https://img.shields.io/badge/-Analisis-FFF?style=flat&logo=multisim&logoColor=black)](/RUP/01-analisis/README.md) [![](https://img.shields.io/badge/-Casos_de_uso-FFF?style=flat&logo=crewunited&logoColor=black)](/RUP/01-analisis/casos-uso/README.md)|
|-:|

</div>

# CU-19 -- Editar Grado

*El docente consulta y modifica los datos de un grado existente, pudiendo actualizar su nombre o eliminarlo.*

## Análisis

**VistaEdicionGrado** `<<boundary>>` — muestra los datos actuales del grado y permite editarlos o solicitar su eliminación.

**ControladorGrados** `<<control>>` — recupera y persiste los datos del grado, o ejecuta el borrado si se confirma la eliminación.

**Grado** `<<entity>>` — entidad objetivo; sus datos se actualizan o el registro se elimina del sistema.

**Alumno** `<<entity>>` — se consulta para mostrar los alumnos afectados en caso de eliminación del grado.

## Diagrama de colaboración

<div align=center>

![](https://www.plantuml.com/plantuml/proxy?cache=no&v=4&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/casos-uso/CU-19-editarGrado/analisis-colaboracion-CU-19-editarGrado.puml)

[analisis-colaboracion-CU-19-editarGrado.puml](analisis-colaboracion-CU-19-editarGrado.puml)

</div>
