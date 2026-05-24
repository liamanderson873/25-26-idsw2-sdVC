# Análisis Puro: CU-29 Eliminar Docente

Este documento describe el análisis tecnológico agnóstico del caso de uso Eliminar Docente, siguiendo la metodología RUP y el patrón Boundary-Control-Entity (BCE).

## 1. Clases de Análisis

Se identifican las siguientes clases para cumplir con el caso de uso:

### 1.1. Boundary (Frontera)
- **TeacherDeleteView**: Interfaz que permite al Administrador Institucional:
  - Revisar los datos del docente a eliminar.
  - Confirmar o cancelar la eliminación del docente.
  - Visualizar advertencias de seguridad/impacto.

### 1.2. Control
- **TeacherController**: Gestiona la lógica de baja del docente:
  - Verifica permisos para la eliminación.
  - Procesa la baja de la entidad **Teacher**.

### 1.3. Entity (Entidad)
- **Teacher**: Entidad docente que se desea eliminar.

## 2. Diagrama de Interacción (Conceptual)

1. El **Administrador** solicita la eliminación de un docente.
2. **TeacherDeleteView** muestra los datos de **Teacher** y solicita confirmación.
3. El **Administrador** confirma la acción.
4. **TeacherController** procede a la eliminación de **Teacher**.

## 3. Estados de Análisis
Basado en el diagrama de estados de requisitos:
- `ConfirmingDeletion`: Estado de espera de confirmación del administrador.
- `DeletingTeacher`: Estado de procesamiento de la baja del docente.
