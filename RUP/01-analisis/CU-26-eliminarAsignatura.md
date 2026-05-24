# Análisis Puro: CU-26 Eliminar Asignatura

Este documento describe el análisis tecnológico agnóstico del caso de uso Eliminar Asignatura, siguiendo la metodología RUP y el patrón Boundary-Control-Entity (BCE).

## 1. Clases de Análisis

Se identifican las siguientes clases para cumplir con el caso de uso:

### 1.1. Boundary (Frontera)
- **SubjectDeleteView**: Interfaz que permite al Docente:
  - Revisar los datos de la asignatura antes de eliminar (Nombre, código, preguntas).
  - Ver la advertencia de consecuencias de la eliminación.
  - Confirmar o cancelar la operación.

### 1.2. Control
- **SubjectController**: Gestiona la baja de la asignatura:
  - Valida si la asignatura puede ser eliminada.
  - Coordina la eliminación de la entidad y sus dependencias si corresponde.

### 1.3. Entity (Entidad)
- **Subject**: Entidad a eliminar del sistema.

## 2. Diagrama de Interacción (Conceptual)

1. El **Docente** solicita eliminar en **SubjectDeleteView**.
2. **SubjectDeleteView** muestra información de **Subject** y solicita confirmación.
3. Tras la confirmación, **SubjectController** procede a la eliminación de **Subject**.
4. Se informa del éxito y se vuelve a la lista de asignaturas.

## 3. Estados de Análisis
Basado en el diagrama de estados de requisitos:
- `ConfirmingDeletion`: El sistema presenta la advertencia y espera confirmación.
- `DeletingSubject`: El sistema ejecuta la acción de borrado de la asignatura.
