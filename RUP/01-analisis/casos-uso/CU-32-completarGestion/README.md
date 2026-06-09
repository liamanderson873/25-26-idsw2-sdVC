<div align=right>

|[![](https://img.shields.io/badge/-Inicio-FFF?style=flat&logo=Emlakjet&logoColor=black)](/README.md) [![](https://img.shields.io/badge/-Analisis-FFF?style=flat&logo=multisim&logoColor=black)](/RUP/01-analisis/README.md) [![](https://img.shields.io/badge/-Casos_de_uso-FFF?style=flat&logo=crewunited&logoColor=black)](/RUP/01-analisis/casos-uso/README.md)|
|-:|

</div>

# CU-32 -- Completar Gestion

*El usuario finaliza una tarea de gestión activa, devolviendo el sistema al estado disponible para nuevas operaciones.*

## Análisis

**VistaGestion** `<<boundary>>` — presenta el control para finalizar la gestión activa y desencadena el cambio de estado.

**ControladorGestion** `<<control>>` — coordina el cierre de la tarea de gestión y notifica al sistema para actualizar su estado.

**EstadoSistema** `<<entity>>` — registra el estado operativo del sistema y se actualiza a disponible al completarse la gestión.

## Diagrama de colaboración

<div align=center>

![](https://www.plantuml.com/plantuml/proxy?cache=no&v=4&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/casos-uso/CU-32-completarGestion/analisis-colaboracion-CU-32-completarGestion.puml)

[analisis-colaboracion-CU-32-completarGestion.puml](analisis-colaboracion-CU-32-completarGestion.puml)

</div>
