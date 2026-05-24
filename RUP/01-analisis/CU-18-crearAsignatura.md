# Análisis Puro: CU-18 Crear Asignatura

## Descripción
El docente puede dar de alta una nueva asignatura en el sistema, lo que implica la creación automática de su batería de preguntas asociada.

## Clases de Análisis (BCE)

### Boundary (Frontera)
- **SubjectCreationView**: Interfaz que solicita los datos mínimos de la asignatura (Nombre, Código, Curso académico) y permite matricular alumnos y asociar grados.

### Control
- **SubjectController**: Gestiona la creación de la asignatura y la inicialización de sus recursos vinculados (batería de preguntas).

### Entity (Entidad)
- **Subject**: La nueva entidad asignatura.
- **QuestionBank**: (Conceptual en análisis) La batería de preguntas asociada que se crea por defecto.
- **Student**: Alumnos matriculados.
- **Grade**: Grados asociados.

## Flujo de Análisis

1. El **Docente** solicita crear una nueva asignatura.
2. La **SubjectCreationView** muestra los campos obligatorios.
3. El **Docente** introduce la información.
4. El **SubjectController** crea la entidad `Subject`, inicializa su batería de preguntas y establece las relaciones con alumnos y grados.
5. El sistema redirige a la vista de edición de la asignatura.
6. Se permite cancelar la operación en cualquier momento previo a la creación.

## Decisiones de Análisis
- La creación de una asignatura es un evento clave que desencadena la creación de un espacio de trabajo (batería de preguntas) para el docente.
