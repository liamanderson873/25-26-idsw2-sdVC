# Análisis Puro: CU-40 Exportar Asignaturas

## Descripción
Caso de uso abstracto/especializado que permite extraer la información de las asignaturas del sistema hacia un formato externo, generalmente invocado desde la exportación global.

## Clases de Análisis (BCE)

### Boundary (Frontera)
- **SubjectExportView**: (Si se invoca independientemente) Interfaz para configurar la exportación de asignaturas.

### Control
- **SubjectExportController**: Encargado de recopilar los datos de las asignaturas y estructurarlos para la salida.

### Entity (Entidad)
- **Subject**: Entidad asignatura (fuente de datos).

## Flujo de Análisis

1. El proceso de **Exportar Configuración Global** solicita exportar las asignaturas.
2. El **SubjectExportController** recupera todas las instancias de `Subject`.
3. El sistema permite la generación de la salida con los datos de las asignaturas.

## Decisiones de Análisis
- Se identifica como una especialización del proceso de exportación global para manejar específicamente la estructura de las asignaturas.
