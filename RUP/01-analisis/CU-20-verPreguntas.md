# Análisis Puro: CU-20 Ver Preguntas

Este documento describe el análisis tecnológico agnóstico del caso de uso Ver Preguntas, siguiendo la metodología RUP y el patrón Boundary-Control-Entity (BCE).

## 1. Clases de Análisis

Se identifican las siguientes clases para cumplir con el caso de uso:

### 1.1. Boundary (Frontera)
- **QuestionListView**: Interfaz que permite al Docente:
  - Visualizar la lista de preguntas (enunciado, asignatura, tema, dificultad, respuestas).
  - Solicitar el filtrado de la lista.
  - Acceder a la lista general o contextual (por asignatura).

### 1.2. Control
- **QuestionController**: Gestiona el flujo de visualización de preguntas:
  - Recupera la lista de preguntas (general o filtrada).
  - Aplica los criterios de filtrado solicitados.
  - Determina el contexto de visualización.

### 1.3. Entity (Entidad)
- **Question**: Representa cada pregunta en el sistema, con sus atributos y respuestas asociadas.
- **Subject**: Entidad necesaria para el filtrado contextual y para mostrar la asignatura asociada a cada pregunta.

## 2. Diagrama de Interacción (Conceptual)

1. El **Docente** solicita ver preguntas a través de **QuestionListView**.
2. **QuestionListView** solicita la lista al **QuestionController**.
3. **QuestionController** consulta las entidades **Question** (y opcionalmente **Subject** para el contexto).
4. **QuestionListView** presenta los datos al **Docente**.
5. El **Docente** puede solicitar un filtro, reiniciando el ciclo de consulta.

## 3. Estados de Análisis
Basado en el diagrama de estados de requisitos:
- `ShowingQuestions`: Estado inicial donde se presenta la lista cargada.
- `FilteringQuestions`: Estado en el que el sistema procesa y presenta los resultados según los filtros aplicados.
