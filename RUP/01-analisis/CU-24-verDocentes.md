# Análisis Puro: CU-24 Ver Docentes

Este documento describe el análisis tecnológico agnóstico del caso de uso Ver Docentes, siguiendo la metodología RUP y el patrón Boundary-Control-Entity (BCE).

## 1. Clases de Análisis

Se identifican las siguientes clases para cumplir con el caso de uso:

### 1.1. Boundary (Frontera)
- **TeacherListView**: Interfaz que permite al Administrador Institucional:
  - Visualizar la lista de docentes (Nombre, apellidos, DNI, usuario, email).
  - Solicitar el filtrado de docentes.

### 1.2. Control
- **TeacherController**: Gestiona la lógica de obtención de docentes:
  - Recupera la lista de docentes autorizados.
  - Filtra la lista según los parámetros del administrador.

### 1.3. Entity (Entidad)
- **Teacher**: Representa al docente en el sistema con sus credenciales y datos personales.

## 2. Diagrama de Interacción (Conceptual)

1. El **Administrador** accede a **TeacherListView**.
2. **TeacherListView** solicita los docentes al **TeacherController**.
3. **TeacherController** consulta la entidad **Teacher**.
4. **TeacherListView** muestra los resultados obtenidos.

## 3. Estados de Análisis
Basado en el diagrama de estados de requisitos:
- `ShowingTeachers`: Estado donde se presenta la lista de docentes al administrador.
- `FilteringTeachers`: Estado de procesamiento y visualización de la lista filtrada.
