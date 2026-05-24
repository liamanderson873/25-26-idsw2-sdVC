# Análisis Puro: CU-02 Generar Exámenes

Este documento describe el análisis tecnológico agnóstico del caso de uso Generar Exámenes, siguiendo la metodología RUP del profesor.

## 1. Clases de Análisis

Siguiendo el patrón Boundary-Control-Entity (BCE):

### 1.1. Boundary (Frontera)
- **GenerationView**: Interfaz que permite al Docente:
  - Solicitar el inicio de la generación de exámenes.
  - Introducir los parámetros obligatorios:
    - Asignatura.
    - Temas.
    - Número de exámenes (por grado).
    - Número de preguntas.
    - Cantidad de tipos de examen (por grado).
    - Proporción de dificultad.
    - Tipo de Evaluación.
  - Confirmar o cancelar la generación.
  - Visualizar los exámenes generados o errores de validación.

### 1.2. Control
- **GenerationController**: Gestiona la lógica de generación:
  - Valida que los datos mínimos estén presentes.
  - Filtra la batería de preguntas según asignatura, temas y dificultad.
  - Algoritmo de generación: Crea las combinaciones de exámenes respetando los tipos y proporciones.
  - Persiste los nuevos exámenes en el sistema.

### 1.3. Entity (Entidad)
- **Subject (Asignatura)**: Contenedor de los temas y preguntas.
- **Topic (Tema)**: Para filtrar las preguntas.
- **Question (Pregunta)**: Elemento base con dificultad asociada.
- **Exam (Examen)**: La entidad resultante que agrupa las preguntas seleccionadas.

## 2. Flujo de Análisis
1. El **Docente** selecciona una **Asignatura** en **GenerationView**.
2. **GenerationView** solicita a **GenerationController** los **Topics** disponibles.
3. El **Docente** rellena los parámetros de configuración.
4. **GenerationController** valida los datos y accede a **Question** para realizar la selección aleatoria/ponderada.
5. Se crean instancias de **Exam** y se muestran en la vista.

## 3. Estados de Análisis
- `RequiringGeneration`: Estado inicial.
- `ProvidingData`: Formulario de configuración activo.
- `ProvidingConfirmation`: Pre-visualización antes de generar.
