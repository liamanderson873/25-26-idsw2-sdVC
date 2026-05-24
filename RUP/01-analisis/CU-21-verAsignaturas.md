# Análisis Puro: CU-21 Ver Asignaturas

Este documento describe el análisis tecnológico agnóstico del caso de uso Ver Asignaturas, siguiendo la metodología RUP y el patrón Boundary-Control-Entity (BCE).

## 1. Clases de Análisis

Se identifican las siguientes clases para cumplir con el caso de uso:

### 1.1. Boundary (Frontera)
- **SubjectListView**: Interfaz que permite al Docente:
  - Visualizar la lista de asignaturas (nombre, código, curso, alumnos, grados).
  - Solicitar el filtrado de la lista de asignaturas.

### 1.2. Control
- **SubjectController**: Gestiona la lógica de visualización de asignaturas:
  - Recupera la lista completa de asignaturas.
  - Procesa las solicitudes de filtrado.

### 1.3. Entity (Entidad)
- **Subject**: Representa la asignatura con su información básica y relaciones.
- **Student**: Necesario para contabilizar o listar los alumnos matriculados.
- **Grade**: Necesario para mostrar los grados asociados a la asignatura.

## 2. Diagrama de Interacción (Conceptual)

1. El **Docente** accede a **SubjectListView**.
2. **SubjectListView** solicita los datos al **SubjectController**.
3. **SubjectController** obtiene la información de las entidades **Subject**, **Student** y **Grade**.
4. **SubjectListView** muestra la información al usuario.

## 3. Estados de Análisis
Basado en el diagrama de estados de requisitos:
- `ShowingSubjects`: Estado de presentación de la lista de asignaturas.
- `FilteringSubjects`: Estado en el que se aplican y muestran los filtros de búsqueda.
