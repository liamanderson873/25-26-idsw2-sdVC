# Detallado de Diseño: CU-04 Exportar Configuración Global

Este documento detalla la extracción de la configuración completa del sistema en un fichero JSON descargable.

## Diagrama de Secuencia

![CU-04](https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/02-diseno/casos-uso/CU-04-exportarConfiguracionGlobal/diseno-secuencia-CU-04-exportarConfiguracionGlobal.puml)

## Lógica Técnica
1. El Docente solicita la exportación desde la vista de Importar/Exportar.
2. `ControladorConfiguracion` delega en `ServicioGrado`, `ServicioAsignatura`, `ServicioAlumno` y `ServicioPregunta`.
3. Se construye el `DTO_ConfiguracionGlobal` con los cuatro conjuntos de datos.
4. Se devuelve el JSON para descarga directa por el navegador.
