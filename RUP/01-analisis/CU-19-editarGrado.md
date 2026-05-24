# Análisis Puro: CU-19 Editar Grado

Este documento describe el análisis tecnológico agnóstico del caso de uso Editar Grado, siguiendo la metodología RUP y el patrón Boundary-Control-Entity (BCE).

## 1. Clases de Análisis

Se identifican las siguientes clases para cumplir con el caso de uso:

### 1.1. Boundary (Frontera)
- **GradeEditView**: Interfaz que permite al Docente:
  - Visualizar los datos actuales del grado (Nombre, código, alumnos).
  - Modificar los campos del grado.
  - Solicitar el guardado de los cambios.
  - Solicitar la eliminación del grado.
  - Cancelar la edición.

### 1.2. Control
- **GradeController**: Gestiona la lógica de edición del grado:
  - Recupera los datos del grado a editar.
  - Valida los cambios introducidos.
  - Coordina la actualización de la entidad en el sistema.
  - Gestiona la redirección tras guardar, cancelar o eliminar.

### 1.3. Entity (Entidad)
- **Grade**: Representa el grado académico, conteniendo su nombre, código y la relación con los alumnos.
- **Student**: Entidades asociadas al grado que se listan durante la edición.

## 2. Diagrama de Interacción (Conceptual)

1. El **Docente** interactúa con **GradeEditView**.
2. **GradeEditView** solicita los datos al **GradeController**.
3. **GradeController** obtiene la información de la entidad **Grade**.
4. El **Docente** realiza cambios y solicita guardar en **GradeEditView**.
5. **GradeEditView** delega la actualización al **GradeController**.
6. **GradeController** actualiza la entidad **Grade**.

## 3. Estados de Análisis
Basado en el diagrama de estados de requisitos:
- `EditingData`: Estado en el que el sistema presenta los datos y permite modificaciones.
- `SavingData`: Estado de transición donde el sistema procesa la solicitud de guardado o eliminación.
