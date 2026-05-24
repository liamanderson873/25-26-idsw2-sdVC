# Análisis Puro: CU-14 Crear Alumno

## Descripción
El docente puede registrar un nuevo alumno en el sistema introduciendo sus datos básicos de identificación.

## Clases de Análisis (BCE)

### Boundary (Frontera)
- **StudentCreationView**: Interfaz que solicita los datos mínimos necesarios para dar de alta a un alumno (Nombre, Apellidos, DNI).

### Control
- **StudentController**: Gestiona la creación de la instancia del alumno y valida la integridad de los datos proporcionados.

### Entity (Entidad)
- **Student**: Entidad que representa al alumno.

## Flujo de Análisis

1. El **Docente** solicita crear un alumno nuevo desde la vista de gestión de alumnos.
2. La **StudentCreationView** presenta el formulario de datos mínimos.
3. El **Docente** introduce los datos obligatorios.
4. El **StudentController** valida y crea el nuevo `Student`.
5. Una vez creado, el sistema redirige automáticamente a la vista de edición del alumno para completar su perfil o asignaciones.
6. Se permite cancelar el proceso volviendo al listado de alumnos.

## Decisiones de Análisis
- La creación es el paso inicial que garantiza la existencia del objeto en el sistema, delegando detalles adicionales a la fase de edición posterior.
