# Análisis Puro: CU-10 Crear Pregunta

## Descripción
El sistema permite al docente añadir una nueva pregunta al banco de preguntas de una asignatura. Este proceso requiere datos mínimos para inicializar la entidad y luego transfiere el flujo a la edición detallada.

## Clases de Análisis (BCE)

### Boundary (Frontera)
- **QuestionCreationView**: Interfaz que solicita al docente los datos obligatorios (Asignatura, Enunciado, Tema, Dificultad) para crear la pregunta.

### Control
- **QuestionManagementController**: Gestiona la creación de la instancia de la pregunta y valida que los campos obligatorios estén presentes y sean correctos.

### Entity (Entidad)
- **Question**: La nueva entidad de pregunta que se crea en el sistema.
- **Subject**: La asignatura a la que se asociará la pregunta.

## Flujo de Análisis

1. El **Docente** solicita crear una nueva pregunta desde la vista de gestión de preguntas o de asignatura.
2. La **QuestionCreationView** solicita los datos mínimos: Asignatura, Enunciado, Tema y Dificultad.
3. El **Docente** proporciona los datos requeridos.
4. El **QuestionManagementController** valida la información y crea la nueva instancia de **Question**.
5. El sistema confirma la creación y redirige automáticamente al caso de uso `editarPregunta` para completar los detalles (como las respuestas).

## Decisiones de Análisis
- **Encadenamiento**: Se decide separar la creación de la edición detallada para permitir una entrada rápida de datos, pero se fuerza la transición a edición para asegurar que la pregunta sea funcional (tenga respuestas).
- **Validación**: El controlador debe verificar que la asignatura seleccionada exista y sea accesible por el docente.
