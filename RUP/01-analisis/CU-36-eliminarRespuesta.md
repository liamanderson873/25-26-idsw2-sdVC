# Análisis Puro: CU-36 Eliminar Respuesta

Este documento describe el análisis tecnológico agnóstico del caso de uso Eliminar Respuesta, siguiendo la metodología RUP y el patrón Boundary-Control-Entity (BCE).

## 1. Clases de Análisis

Se identifican las siguientes clases para cumplir con el caso de uso:

### 1.1. Boundary (Frontera)
- **AnswerDeletionView**: Interfaz que permite al Docente:
  - Visualizar la información de la respuesta que se pretende eliminar.
  - Recibir una advertencia sobre las consecuencias de la eliminación.
  - Confirmar o cancelar la eliminación definitiva.

### 1.2. Control
- **AnswerDeletionController**: Gestiona el flujo de eliminación de respuestas:
  - Valida si la respuesta puede ser eliminada (ej. si no está vinculada a exámenes ya realizados).
  - Coordina la eliminación física o lógica de la entidad.

### 1.3. Entity (Entidad)
- **Answer**: Entidad que será eliminada del sistema.

## 2. Diagrama de Interacción (Conceptual)

1. El **Docente** solicita eliminar una respuesta desde la vista de edición o lista de respuestas.
2. **AnswerDeletionView** presenta los detalles de la **Answer** y solicita confirmación mostrando una advertencia.
3. El **Docente** solicita confirmar la eliminación.
4. **AnswerDeletionView** delega la acción al **AnswerDeletionController**.
5. **AnswerDeletionController** elimina la instancia de **Answer**.
6. El sistema confirma la eliminación y actualiza la lista de respuestas.
7. Si el **Docente** cancela, se vuelve al estado anterior sin realizar cambios.

## 3. Estados de Análisis
Basado en el diagrama de estados de requisitos:
- `ConfirmandoEliminacion`: Estado de espera para que el usuario valide la acción tras ver la advertencia.
- `EliminandoRespuesta`: Estado transitorio en el que se ejecuta la baja de la entidad en el sistema.
