# Análisis Puro: CU-37 Cancelar Generación

## Descripción
El sistema permite al docente abortar el proceso de generación de exámenes una vez que estos han sido generados pero antes de ser finalizados o asignados definitivamente.

## Clases de Análisis (BCE)

### Boundary (Frontera)
- **CancelGenerationView**: Interfaz que solicita confirmación al docente para cancelar el proceso de generación actual.

### Control
- **ExamGenerationController**: Gestiona la lógica de cancelación, asegurando que los exámenes generados temporalmente sean descartados y el sistema vuelva a un estado estable.

### Entity (Entidad)
- **Exam**: Los exámenes generados que se pretenden descartar.

## Flujo de Análisis

1. El **Docente** solicita cancelar la generación de exámenes desde la vista de exámenes generados.
2. La **CancelGenerationView** solicita confirmación al **Docente**.
3. El **Docente** puede:
   - **Confirmar**: El **ExamGenerationController** descarta los exámenes generados y redirige al docente a la vista de asignatura o al estado inicial.
   - **Denegar**: El sistema vuelve a la vista de exámenes generados, manteniendo el proceso actual.

## Decisiones de Análisis
- La cancelación implica la eliminación de las instancias temporales de `Exam` creadas durante el proceso de generación.
- Se asegura que el sistema vuelva a un estado consistente tras la cancelación.
