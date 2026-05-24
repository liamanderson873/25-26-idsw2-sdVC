# Análisis Puro: CU-05 Importar Alumnos

## Descripción
El sistema permite al docente importar una lista de alumnos desde un archivo externo. Este proceso es específico para la entidad Alumno y permite actualizar o poblar el registro de estudiantes del sistema.

## Clases de Análisis (BCE)

### Boundary (Frontera)
- **StudentImportView**: Interfaz que permite al docente seleccionar el archivo de alumnos, visualizar la lista de estudiantes detectados y gestionar la confirmación o cancelación de la importación.

### Control
- **StudentImportController**: Orquesta el proceso de importación de alumnos. Valida el formato de los datos de entrada, comprueba duplicados o errores de integridad y gestiona la persistencia de los nuevos registros.

### Entity (Entidad)
- **Student**: Representa al alumno en el sistema (Nombre, Apellidos, ID, etc.).

## Flujo de Análisis

1. El **Docente** solicita importar alumnos desde la vista de gestión de alumnos.
2. La **StudentImportView** solicita el archivo con la información de los estudiantes.
3. El **Docente** proporciona el archivo o los datos de los alumnos.
4. El **StudentImportController** procesa los datos, realiza validaciones (ej: formato de correo, IDs únicos) y prepara una previsualización.
5. La **StudentImportView** muestra el resultado del procesamiento y solicita confirmación.
6. Si el **Docente** confirma:
   - El **StudentImportController** guarda los nuevos alumnos en el sistema.
   - El sistema notifica el éxito de la operación.
7. Si el **Docente** cancela o hay un error, se permite reintentar o salir.

## Decisiones de Análisis
- **Especialización**: A diferencia de la importación global, este caso de uso se centra exclusivamente en la entidad `Student`.
- **Validación de Negocio**: El controlador debe asegurar que no se creen alumnos duplicados si ya existen en el sistema (basado en un identificador único definido en el modelo de dominio).
