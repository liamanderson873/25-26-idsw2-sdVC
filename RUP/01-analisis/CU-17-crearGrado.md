# Análisis Puro: CU-17 Crear Grado

## Descripción
El docente puede crear un nuevo grado académico en el sistema para agrupar alumnos y asignaturas.

## Clases de Análisis (BCE)

### Boundary (Frontera)
- **GradeCreationView**: Interfaz que solicita los datos mínimos del grado (Nombre, Código) y permite enlistar alumnos.

### Control
- **GradeController**: Gestiona la creación de la entidad grado y la asociación inicial de alumnos.

### Entity (Entidad)
- **Grade**: La nueva entidad grado.
- **Student**: Alumnos que se asocian al grado.

## Flujo de Análisis

1. El **Docente** solicita crear un nuevo grado.
2. La **GradeCreationView** presenta el formulario de datos obligatorios.
3. El **Docente** proporciona el Nombre y Código del grado.
4. El **GradeController** crea la entidad `Grade`.
5. Tras la creación, el sistema transfiere el control a la vista de edición del grado recién creado.
6. El **Docente** puede cancelar antes de finalizar la creación.

## Decisiones de Análisis
- El grado sirve como estructura organizativa superior para la gestión de alumnos y su posterior asignación a asignaturas.
