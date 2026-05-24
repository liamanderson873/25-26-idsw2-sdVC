# Análisis Puro: CU-23 Ver Alumnos

Este documento describe el análisis tecnológico agnóstico del caso de uso Ver Alumnos, siguiendo la metodología RUP y el patrón Boundary-Control-Entity (BCE).

## 1. Clases de Análisis

Se identifican las siguientes clases para cumplir con el caso de uso:

### 1.1. Boundary (Frontera)
- **StudentListView**: Interfaz que permite al Docente:
  - Visualizar la lista de alumnos (DNI, nombre, apellidos).
  - Solicitar el filtrado de la lista.

### 1.2. Control
- **StudentController**: Gestiona la visualización de alumnos:
  - Obtiene la colección de alumnos del sistema.
  - Aplica filtros sobre los datos de los alumnos.

### 1.3. Entity (Entidad)
- **Student**: Representa al alumno con sus datos personales (DNI, nombre, apellidos).

## 2. Diagrama de Interacción (Conceptual)

1. El **Docente** abre **StudentListView**.
2. **StudentListView** solicita la carga de alumnos al **StudentController**.
3. **StudentController** accede a la entidad **Student**.
4. La información se renderiza en **StudentListView**.

## 3. Estados de Análisis
Basado en el diagrama de estados de requisitos:
- `ShowingStudents`: Visualización inicial de la lista de alumnos.
- `FilteringStudents`: Refresco de la lista tras aplicar criterios de búsqueda.
