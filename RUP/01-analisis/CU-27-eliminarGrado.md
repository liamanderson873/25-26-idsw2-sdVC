# Análisis Puro: CU-27 Eliminar Grado

Este documento describe el análisis tecnológico agnóstico del caso de uso Eliminar Grado, siguiendo la metodología RUP y el patrón Boundary-Control-Entity (BCE).

## 1. Clases de Análisis

Se identifican las siguientes clases para cumplir con el caso de uso:

### 1.1. Boundary (Frontera)
- **GradeDeleteView**: Interfaz que permite al Docente:
  - Visualizar la información del grado (Nombre, código, alumnos) antes de borrar.
  - Visualizar la advertencia de eliminación.
  - Confirmar o cancelar la eliminación definitiva.

### 1.2. Control
- **GradeController**: Gestiona la lógica de eliminación:
  - Procesa la solicitud de confirmación.
  - Realiza la baja de la entidad en el sistema.

### 1.3. Entity (Entidad)
- **Grade**: Entidad que representa el grado a eliminar.
- **Student**: Entidad relacionada que se visualiza para informar del impacto de la eliminación.

## 2. Diagrama de Interacción (Conceptual)

1. El **Docente** solicita eliminar un grado.
2. **GradeDeleteView** muestra los datos de **Grade** y pide confirmación.
3. El **Docente** confirma la acción.
4. **GradeController** elimina la instancia de **Grade**.

## 3. Estados de Análisis
Basado en el diagrama de estados de requisitos:
- `ConfirmingDeletion`: Espera de confirmación por parte del usuario.
- `DeletingGrade`: Procesamiento de la eliminación del grado.
