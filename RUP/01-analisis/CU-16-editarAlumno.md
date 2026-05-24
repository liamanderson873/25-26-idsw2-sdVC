# Análisis Puro: CU-16 Editar Alumno

## Descripción
El docente puede modificar la información personal de un alumno o eliminar su registro del sistema.

## Clases de Análisis (BCE)

### Boundary (Frontera)
- **StudentEditView**: Interfaz para la visualización y edición de los datos del alumno (DNI, Nombre, Apellidos).

### Control
- **StudentController**: Coordina la actualización de los datos del alumno y gestiona su eliminación.

### Entity (Entidad)
- **Student**: La entidad alumno que se está editando.

## Flujo de Análisis

1. El **Docente** solicita editar un alumno.
2. La **StudentEditView** muestra la información actual.
3. El **Docente** realiza modificaciones en los campos.
4. El **Docente** solicita:
   - **Guardar**: Actualización de la entidad `Student`.
   - **Eliminar**: Borrado del alumno del sistema.
   - **Cancelar**: Retorno sin cambios.
5. El **StudentController** ejecuta la acción y el sistema actualiza la vista.

## Decisiones de Análisis
- La edición permite mantener actualizados los datos identificativos de los estudiantes matriculados.
