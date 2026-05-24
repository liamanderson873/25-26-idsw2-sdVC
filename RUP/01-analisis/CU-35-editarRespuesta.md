# Análisis Puro: CU-35 Editar Respuesta

Este documento describe el análisis tecnológico agnóstico del caso de uso Editar Respuesta, siguiendo la metodología RUP y el patrón Boundary-Control-Entity (BCE).

## 1. Clases de Análisis

Se identifican las siguientes clases para cumplir con el caso de uso:

### 1.1. Boundary (Frontera)
- **AnswerEditionView**: Interfaz que permite al Docente:
  - Visualizar los datos actuales de una respuesta.
  - Modificar el contenido y la condición de veracidad.
  - Solicitar guardar los cambios, cancelar la edición o eliminar la respuesta.

### 1.2. Control
- **AnswerEditionController**: Gestiona la lógica de modificación de respuestas:
  - Carga los datos de la respuesta a editar.
  - Valida y aplica los cambios realizados por el usuario.
  - Coordina la persistencia de los datos actualizados.

### 1.3. Entity (Entidad)
- **Answer**: Entidad que contiene la información de la respuesta que está siendo editada.

## 2. Diagrama de Interacción (Conceptual)

1. El **Docente** solicita editar una respuesta.
2. **AnswerEditionView** muestra los datos actuales de la **Answer** obtenidos a través del **AnswerEditionController**.
3. El **Docente** modifica los campos deseados en la interfaz.
4. Si el **Docente** solicita guardar, **AnswerEditionController** actualiza la entidad **Answer** con los nuevos valores.
5. Si el **Docente** solicita cancelar, se descartan los cambios y se vuelve al estado anterior.
6. Si el **Docente** solicita eliminar, se invoca el flujo de eliminación correspondiente.

## 3. Estados de Análisis
Basado en el diagrama de estados de requisitos:
- `EditandoDatos`: Estado en el que el docente interactúa con los campos de la respuesta.
- `GuardandoDatos`: Estado transitorio en el que se validan y persisten las modificaciones.
