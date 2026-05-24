# Análisis Puro: CU-28 Eliminar Alumno

Este documento describe el análisis tecnológico agnóstico del caso de uso Eliminar Alumno, siguiendo la metodología RUP y el patrón Boundary-Control-Entity (BCE).

## 1. Clases de Análisis

Se identifican las siguientes clases para cumplir con el caso de uso:

### 1.1. Boundary (Frontera)
- **StudentDeleteView**: Interfaz que permite al Docente:
  - Ver los datos del alumno (Nombre, DNI) antes de eliminar.
  - Confirmar la eliminación tras leer la advertencia.
  - Cancelar la operación.

### 1.2. Control
- **StudentController**: Gestiona la baja del alumno:
  - Ejecuta la orden de eliminación sobre la entidad.
  - Gestiona la actualización de las listas tras la baja.

### 1.3. Entity (Entidad)
- **Student**: La entidad alumno que será eliminada.

## 2. Diagrama de Interacción (Conceptual)

1. El **Docente** selecciona eliminar en un alumno específico.
2. **StudentDeleteView** presenta la información de **Student** y la advertencia.
3. El **Docente** confirma.
4. **StudentController** elimina a **Student** del sistema.

## 3. Estados de Análisis
Basado en el diagrama de estados de requisitos:
- `ConfirmingDeletion`: Presentación de datos del alumno y solicitud de confirmación.
- `DeletingStudent`: Ejecución técnica de la eliminación.
