# Análisis Puro: CU-25 Eliminar Pregunta

Este documento describe el análisis tecnológico agnóstico del caso de uso Eliminar Pregunta, siguiendo la metodología RUP y el patrón Boundary-Control-Entity (BCE).

## 1. Clases de Análisis

Se identifican las siguientes clases para cumplir con el caso de uso:

### 1.1. Boundary (Frontera)
- **QuestionDeleteView**: Interfaz que permite al Docente:
  - Visualizar los detalles de la pregunta a eliminar para confirmación.
  - Recibir la advertencia de eliminación.
  - Confirmar o cancelar la acción de eliminar.

### 1.2. Control
- **QuestionController**: Gestiona el proceso de eliminación:
  - Proporciona los datos de la pregunta para la confirmación.
  - Ejecuta la eliminación lógica o física en el sistema.
  - Notifica el resultado y actualiza la vista de origen.

### 1.3. Entity (Entidad)
- **Question**: La entidad que será eliminada del sistema.

## 2. Diagrama de Interacción (Conceptual)

1. El **Docente** solicita eliminar una pregunta desde una lista.
2. **QuestionDeleteView** presenta los datos de la entidad **Question** y pide confirmación.
3. El **Docente** confirma la eliminación.
4. **QuestionController** procesa la baja de la entidad **Question**.
5. El sistema retorna a la lista de preguntas actualizada.

## 3. Estados de Análisis
Basado en el diagrama de estados de requisitos:
- `ConfirmingDeletion`: El sistema espera la decisión final del docente mostrando la advertencia.
- `DeletingQuestion`: Estado transitorio durante la ejecución de la baja en el sistema.
