# Análisis Puro: CU-11 Editar Pregunta

## Descripción
El sistema permite al docente modificar los datos de una pregunta existente en la batería de preguntas, gestionar sus respuestas asociadas o eliminarla del sistema.

## Clases de Análisis (BCE)

### Boundary (Frontera)
- **QuestionEditView**: Interfaz que presenta los datos actuales de la pregunta y permite la edición de sus campos, gestión de respuestas y acciones de guardado/eliminación.

### Control
- **QuestionController**: Coordina la actualización de la pregunta, valida los cambios y gestiona la persistencia de los datos modificados o la eliminación de la entidad.

### Entity (Entidad)
- **Question**: La entidad pregunta a editar.
- **Subject**: Asignatura asociada.
- **Topic**: Tema asociado.
- **Answer**: Respuestas vinculadas a la pregunta.

## Flujo de Análisis

1. El **Docente** solicita editar una pregunta desde una vista de listado o detalle.
2. La **QuestionEditView** muestra los datos de edición: asignatura, enunciado, tema, dificultad, respuestas y estado (habilitada/deshabilitada).
3. El **Docente** modifica los campos deseados.
4. El **Docente** puede solicitar varias acciones:
   - **Guardar**: El **QuestionController** valida y persiste los cambios.
   - **Eliminar**: El **QuestionController** gestiona la eliminación de la pregunta.
   - **Ver Respuestas**: Se transfiere el control a la vista de gestión de respuestas.
   - **Cancelar**: Se descartan los cambios y se vuelve a la vista anterior.

## Decisiones de Análisis
- Se mantiene la trazabilidad con los estados del sistema, permitiendo la edición tanto en contextos generales como específicos de asignatura.
- La eliminación de una pregunta debe considerar posibles dependencias (ej: si ya ha sido usada en un examen generado).
