# Análisis Puro: CU-06 Importar Preguntas

## Descripción
El sistema permite al docente importar una batería de preguntas desde un archivo externo. Las preguntas pueden ser importadas de forma general al sistema o hacia un contexto específico (ej: una asignatura o tema concreto).

## Clases de Análisis (BCE)

### Boundary (Frontera)
- **QuestionImportView**: Interfaz que permite al docente cargar el archivo de preguntas, visualizar el contenido detectado y confirmar la integración en el sistema.

### Control
- **QuestionImportController**: Gestiona la lógica de importación de preguntas. Se encarga de validar que las preguntas tengan el formato correcto (enunciado, opciones, respuesta correcta, dificultad) y de asociarlas a las entidades correspondientes (Temas, Asignaturas).

### Entity (Entidad)
- **Question**: La entidad pregunta que será creada o actualizada.
- **Subject**: Entidad asignatura (para contextualizar la importación).
- **Topic**: Entidad tema (para contextualizar la importación).

## Flujo de Análisis

1. El **Docente** solicita importar preguntas (desde una vista general o contextual).
2. La **QuestionImportView** permite seleccionar el origen de las preguntas.
3. El **Docente** proporciona el archivo de preguntas.
4. El **QuestionImportController** analiza el archivo, verifica la validez de cada pregunta y su posible asociación a temas o asignaturas existentes.
5. La **QuestionImportView** muestra un resumen de las preguntas procesadas y solicita confirmación.
6. Si el **Docente** confirma:
   - El **QuestionImportController** persiste las preguntas en la base de datos del sistema.
   - Si la importación era contextual, se asegura de vincular las preguntas con la asignatura/tema activo.
7. Si el **Docente** cancela, la operación se aborta sin cambios.

## Decisiones de Análisis
- **Contextualidad**: Se identifica que la importación puede ocurrir en dos estados diferentes (`PREGUNTAS_ABIERTO` y `PREGUNTAS_CONTEXTUALES_ABIERTO`), por lo que el controlador debe ser capaz de manejar la asignación automática de contexto si se requiere.
- **Integridad**: Se debe validar que las preguntas importadas cumplan con los requisitos mínimos del sistema (ej: al menos una respuesta correcta).
