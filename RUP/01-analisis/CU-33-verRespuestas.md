# Análisis Puro: CU-33 Ver Respuestas

Este documento describe el análisis tecnológico agnóstico del caso de uso Ver Respuestas, siguiendo la metodología RUP y el patrón Boundary-Control-Entity (BCE).

## 1. Clases de Análisis

Se identifican las siguientes clases para cumplir con el caso de uso:

### 1.1. Boundary (Frontera)
- **AnswerListView**: Interfaz que permite al Docente:
  - Visualizar la lista de respuestas asociadas a una pregunta.
  - Ver el contenido de cada respuesta y si es correcta o incorrecta.
  - Solicitar el filtrado de la lista de respuestas.

### 1.2. Control
- **AnswerConsultationController**: Gestiona la lógica de visualización y filtrado:
  - Recupera las respuestas asociadas a una pregunta.
  - Aplica los criterios de filtrado solicitados por el Docente.

### 1.3. Entity (Entidad)
- **Answer**: Representa una respuesta a una pregunta, conteniendo su texto explicativo y su condición de veracidad (correcta/incorrecta).
- **Question**: Representa la pregunta a la que pertenecen las respuestas.

## 2. Diagrama de Interacción (Conceptual)

1. El **Docente** solicita ver las respuestas de una pregunta desde la vista de la pregunta.
2. **AnswerListView** solicita al **AnswerConsultationController** las respuestas correspondientes.
3. **AnswerConsultationController** consulta las entidades **Answer** vinculadas a la **Question**.
4. **AnswerListView** muestra la lista al Docente.
5. El **Docente** puede solicitar un filtro a través de **AnswerListView**.
6. **AnswerConsultationController** procesa el filtro y actualiza la vista.

## 3. Estados de Análisis
Basado en el diagrama de estados de requisitos:
- `MostrandoRespuestas`: Estado inicial de carga y presentación de la lista de respuestas.
- `FiltrandoRespuestas`: Estado en el que el sistema procesa y muestra un subconjunto de respuestas basado en criterios específicos.
