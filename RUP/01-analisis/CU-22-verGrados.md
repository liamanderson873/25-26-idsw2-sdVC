# Análisis Puro: CU-22 Ver Grados

Este documento describe el análisis tecnológico agnóstico del caso de uso Ver Grados, siguiendo la metodología RUP y el patrón Boundary-Control-Entity (BCE).

## 1. Clases de Análisis

Se identifican las siguientes clases para cumplir con el caso de uso:

### 1.1. Boundary (Frontera)
- **GradeListView**: Interfaz que permite al Docente:
  - Visualizar la lista de grados (nombre, código, alumnos enlistados).
  - Solicitar el filtrado de la lista.

### 1.2. Control
- **GradeController**: Gestiona la visualización de la lista de grados:
  - Recupera los grados existentes.
  - Gestiona los criterios de filtrado.

### 1.3. Entity (Entidad)
- **Grade**: Representa el grado académico en el sistema.
- **Student**: Entidad relacionada para mostrar el número o lista de alumnos por grado.

## 2. Diagrama de Interacción (Conceptual)

1. El **Docente** solicita ver grados en **GradeListView**.
2. **GradeListView** pide los datos al **GradeController**.
3. **GradeController** consulta la entidad **Grade**.
4. Los resultados se presentan en **GradeListView**.

## 3. Estados de Análisis
Basado en el diagrama de estados de requisitos:
- `ShowingGrades`: El sistema muestra la lista de grados al docente.
- `FilteringGrades`: El sistema filtra la lista según los parámetros introducidos.
