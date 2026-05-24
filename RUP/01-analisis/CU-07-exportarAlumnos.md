# Análisis Puro: CU-07 Exportar Alumnos

## Descripción
El sistema permite al docente (o a través de una exportación global) extraer la información de los alumnos hacia un formato externo. Este proceso asegura que los datos de los estudiantes puedan ser respaldados o utilizados fuera del sistema.

## Clases de Análisis (BCE)

### Boundary (Frontera)
- **StudentExportView**: Interfaz que permite al docente solicitar la exportación de alumnos y visualizar el resultado de la operación.

### Control
- **ExportController**: Gestiona la lógica de extracción de datos, coordinando la recopilación de información de las entidades y su transformación al formato de salida.

### Entity (Entidad)
- **Student**: Representa al alumno en el sistema, siendo la fuente de los datos a exportar.

## Flujo de Análisis

1. El **Docente** (o el proceso de exportación global) solicita exportar la lista de alumnos.
2. La **StudentExportView** solicita al sistema la preparación de los datos.
3. El **ExportController** accede a las entidades **Student** necesarias.
4. El **ExportController** genera la estructura de datos para la exportación.
5. El sistema permite la descarga o generación del archivo con los datos de los alumnos.

## Decisiones de Análisis
- **Abstracción**: Este caso de uso puede ser invocado de forma independiente o como parte de la `Exportación Global`, compartiendo el mismo controlador de exportación para mantener la consistencia en el formato.
- **Alcance**: Se centra exclusivamente en la entidad `Student` y sus atributos básicos.
