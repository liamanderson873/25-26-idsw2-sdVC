<div align=right>

|[![](https://img.shields.io/badge/-Inicio-FFF?style=flat&logo=Emlakjet&logoColor=black)](/README.md) [![](https://img.shields.io/badge/-Analisis-FFF?style=flat&logo=multisim&logoColor=black)](/RUP/01-analisis/README.md) [![](https://img.shields.io/badge/-Casos_de_uso-FFF?style=flat&logo=crewunited&logoColor=black)](/RUP/01-analisis/casos-uso/README.md)|
|-:|

</div>
# CU-37 -- Cancelar Generacion

*El docente cancela un examen generado individualmente o descarta toda la generación batch, eliminando los exámenes en estado pendiente.*

## Análisis

**VistaCancelacionGeneracion** `<<boundary>>` — presenta la advertencia y recoge la confirmación para cancelar un examen individual desde la tabla.

**VistaGenerarExamen** `<<boundary>>` — permite cancelar toda la generación batch desde el banner de éxito, eliminando todos los exámenes pendientes.

**ControladorGeneracionExamen** `<<control>>` — localiza y elimina el examen o el grupo de exámenes pendientes según el flujo de cancelación activado.

**Examen** `<<entity>>` — entidad que se elimina al confirmar la cancelación, ya sea un ejemplar individual o el grupo completo.

**ExamenAlumno** `<<entity>>` — se verifica su estado pendiente antes de proceder con la eliminación en el flujo batch.

## Diagrama de colaboración

<div align=center>

![](https://www.plantuml.com/plantuml/proxy?cache=no&v=4&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/casos-uso/CU-37-cancelarGeneracion/analisis-colaboracion-CU-37-cancelarGeneracion.puml)

[analisis-colaboracion-CU-37-cancelarGeneracion.puml](analisis-colaboracion-CU-37-cancelarGeneracion.puml)

</div>
