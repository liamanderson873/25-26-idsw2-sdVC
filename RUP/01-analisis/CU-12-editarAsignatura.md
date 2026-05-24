# Análisis Puro: CU-12 Editar Asignatura

## Descripción
El sistema permite al docente modificar los datos de una asignatura, gestionar sus alumnos matriculados, grados asociados y su batería de preguntas.

## Clases de Análisis (BCE)

### Boundary (Frontera)
- **SubjectEditView**: Interfaz que muestra la información de la asignatura (título, código, curso, etc.) y ofrece accesos a la gestión de alumnos, preguntas y generación de exámenes.

### Control
- **SubjectController**: Orquesta la edición de la asignatura, gestionando la actualización de sus atributos y la coordinación con otros casos de uso (ver preguntas, generar examen).

### Entity (Entidad)
- **Subject**: La entidad asignatura que se está editando.
- **Grade**: Grados asociados a la asignatura.
- **Student**: Alumnos matriculados.
- **Question**: Preguntas de la batería de la asignatura.

## Flujo de Análisis

1. El **Docente** solicita editar una asignatura.
2. La **SubjectEditView** presenta los datos: título, código, curso académico, alumnos, grados y batería de preguntas.
3. El **Docente** puede:
   - Modificar campos básicos y guardar.
   - Ver la batería de preguntas asociada.
   - Solicitar la generación de un examen para la asignatura.
   - Eliminar la asignatura.
   - Cancelar la edición.
4. El **SubjectController** procesa la acción seleccionada y actualiza el sistema o transfiere el control a otros controladores.

## Decisiones de Análisis
- La edición de asignatura actúa como un centro de operaciones (HUB) para gestionar los recursos vinculados a la misma.
- La eliminación debe realizarse con precaución, verificando si existen exámenes asociados o datos críticos.
