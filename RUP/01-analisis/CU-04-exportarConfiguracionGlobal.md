# Análisis Puro: CU-04 Exportar Configuración Global

## Descripción
El sistema permite al docente extraer toda la información relevante del sistema (Alumnos, Grados, Asignaturas y Preguntas) hacia un formato externo para su almacenamiento, respaldo o transferencia.

## Clases de Análisis (BCE)

### Boundary (Frontera)
- **GlobalConfigExportView**: Interfaz que permite al docente configurar la exportación, seleccionar los elementos a incluir y elegir el destino/formato de los datos. Muestra mensajes de éxito o error tras la operación.

### Control
- **ExportController**: Clase encargada de recolectar la información de las diferentes entidades del sistema, estructurarla según el formato requerido y gestionar la generación del archivo de salida.

### Entity (Entidad)
- **Student**: Entidad alumno (fuente de datos).
- **Grade**: Entidad grado (fuente de datos).
- **Subject**: Entidad asignatura (fuente de datos).
- **Question**: Entidad pregunta (fuente de datos).

## Flujo de Análisis

1. El **Docente** solicita exportar la configuración global.
2. La **GlobalConfigExportView** muestra las opciones disponibles para la exportación (qué datos incluir).
3. El **Docente** confirma los parámetros y solicita la exportación.
4. El **ExportController** recopila las instancias de las entidades necesarias (`Student`, `Grade`, `Subject`, `Question`).
5. El **ExportController** genera la estructura de datos para la exportación.
6. La **GlobalConfigExportView** solicita confirmación final de la operación.
7. Si el **Docente** confirma:
   - El **ExportController** genera el archivo/salida externa.
   - El sistema informa del éxito de la operación.
8. Si el **Docente** cancela, el sistema vuelve al estado anterior.

## Decisiones de Análisis
- **Consistencia**: Al igual que en la importación, la exportación debe asegurar que los datos extraídos sean coherentes entre sí.
- **Separación de responsabilidades**: La lógica de cómo se transforma la entidad a un formato específico (JSON, XML, etc.) se delega a la fase de diseño, manteniendo el análisis centrado en la coordinación y flujo de datos.
