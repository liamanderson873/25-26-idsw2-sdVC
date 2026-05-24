# Análisis Puro: CU-09 Asignar Exámenes

## Descripción
Una vez generados los exámenes, el docente debe asignar qué alumnos realizarán qué versión del examen (o simplemente confirmar la lista de destinatarios por grado). Este caso de uso vincula los exámenes generados con los alumnos matriculados.

## Clases de Análisis (BCE)

### Boundary (Frontera)
- **ExamAssignmentView**: Interfaz que muestra los exámenes generados y permite al docente introducir o confirmar los alumnos destinatarios para cada grado.

### Control
- **AssignmentController**: Gestiona la lógica de vinculación entre los exámenes y los alumnos. Valida que los alumnos seleccionados pertenezcan a los grados correspondientes y registra la asignación.

### Entity (Entidad)
- **Exam**: El examen generado que será asignado.
- **Student**: El alumno que recibirá el examen.
- **Grade**: Utilizado para filtrar o agrupar a los alumnos destinatarios.

## Flujo de Análisis

1. El **Docente** solicita iniciar la asignación tras la generación de exámenes.
2. La **ExamAssignmentView** permite introducir los alumnos destinatarios para los exámenes de cada grado.
3. El **Docente** proporciona la lista de alumnos o confirma la asignación sugerida.
4. La **ExamAssignmentView** solicita confirmación final.
5. Si el **Docente** confirma:
   - El **AssignmentController** registra la vinculación en el sistema.
   - Si hay éxito, se transfiere al estado de exámenes asignados.
   - Si hay error, se notifica y se permite reintentar.
6. Si el **Docente** cancela, se vuelve a la edición de la asignación.

## Decisiones de Análisis
- **Contextualización**: La asignación se realiza sobre exámenes ya generados (`EXAMENES_GENERADOS`), transformándolos en exámenes listos para ser entregados (`EXAMENES_ASIGNADOS`).
- **Validación**: El controlador debe asegurar que no se asignen exámenes a alumnos que no estén en el sistema o que no correspondan al grado del examen.
