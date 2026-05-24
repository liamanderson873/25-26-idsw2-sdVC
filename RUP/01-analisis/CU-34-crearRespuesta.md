# Análisis Puro: CU-34 Crear Respuesta

Este documento describe el análisis tecnológico agnóstico del caso de uso Crear Respuesta, siguiendo la metodología RUP y el patrón Boundary-Control-Entity (BCE).

## 1. Clases de Análisis

Se identifican las siguientes clases para cumplir con el caso de uso:

### 1.1. Boundary (Frontera)
- **AnswerCreationView**: Interfaz que permite al Docente:
  - Solicitar la creación de una nueva respuesta.
  - Introducir los datos mínimos obligatorios (Contenido, Correcto/No correcto).
  - Confirmar la creación o cancelar la operación.

### 1.2. Control
- **AnswerCreationController**: Gestiona el flujo de creación de una respuesta:
  - Valida que se hayan proporcionado los datos mínimos requeridos.
  - Coordina la creación de la nueva entidad.
  - Gestiona la transición al caso de uso de edición tras una creación exitosa.

### 1.3. Entity (Entidad)
- **Answer**: Entidad que almacena la información de la nueva respuesta (contenido y validez).
- **Question**: Entidad a la que se asociará la nueva respuesta.

## 2. Diagrama de Interacción (Conceptual)

1. El **Docente** solicita crear una respuesta desde **AnswerCreationView**.
2. **AnswerCreationView** solicita los datos mínimos al usuario.
3. El **Docente** proporciona los datos y solicita crear.
4. **AnswerCreationView** delega la creación en **AnswerCreationController**.
5. **AnswerCreationController** crea una nueva instancia de **Answer** vinculada a la **Question** correspondiente.
6. Tras la creación, el sistema transfiere el flujo al estado de edición de la respuesta recién creada.
7. Si el usuario cancela, el sistema vuelve a la lista de respuestas.

## 3. Estados de Análisis
Basado en el diagrama de estados de requisitos:
- `SolicitandoDatosRespuesta`: Estado de espera para la introducción de datos por parte del docente.
- `ProcesandoCreacion`: Estado transitorio donde el sistema valida e instancia la nueva respuesta.
