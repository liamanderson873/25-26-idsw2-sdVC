<div align=right>

|[![](https://img.shields.io/badge/-Inicio-FFF?style=flat&logo=Emlakjet&logoColor=black)](/README.md) [![](https://img.shields.io/badge/-Analisis-FFF?style=flat&logo=multisim&logoColor=black)](/RUP/01-analisis/README.md) [![](https://img.shields.io/badge/-Casos_de_uso-FFF?style=flat&logo=crewunited&logoColor=black)](/RUP/01-analisis/casos-uso/README.md)|
|-:|

</div>

# CU-27 -- Eliminar Grado

*El docente elimina un grado del sistema; se muestran los alumnos afectados antes de confirmar la operación.*

## Análisis

**VistaEliminacionGrado** `<<boundary>>` — presenta los datos del grado y los alumnos que se verían afectados, recogiendo la confirmación.

**ControladorGrados** `<<control>>` — ejecuta el borrado definitivo del grado tras la confirmación del docente.

**Grado** `<<entity>>` — entidad que se elimina del sistema al confirmarse la operación.

**Alumno** `<<entity>>` — se consulta para informar al docente de los alumnos afectados por la eliminación del grado.

## Diagrama de colaboración

<div align=center>

![](https://www.plantuml.com/plantuml/proxy?cache=no&v=4&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/casos-uso/CU-27-eliminarGrado/analisis-colaboracion-CU-27-eliminarGrado.puml)

[analisis-colaboracion-CU-27-eliminarGrado.puml](analisis-colaboracion-CU-27-eliminarGrado.puml)

</div>
