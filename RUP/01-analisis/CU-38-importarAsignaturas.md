# Análisis Puro: CU-38 Importar Asignaturas

## Descripción
El sistema permite al docente importar una lista de asignaturas desde un archivo externo para integrarlas en el sistema.

## Clases de Análisis (BCE)

### Boundary (Frontera)
- **SubjectImportView**: Interfaz que permite seleccionar el archivo de origen, visualizar las asignaturas detectadas y confirmar la importación.

### Control
- **SubjectImportController**: Gestiona la validación de los datos de las asignaturas, comprueba que no existan duplicados y coordina su persistencia.

### Entity (Entidad)
- **Subject**: Entidad asignatura que será creada.

## Flujo de Análisis

1. El **Docente** solicita importar asignaturas.
2. La **SubjectImportView** solicita el archivo de datos.
3. El **Docente** proporciona la información.
4. El **SubjectImportController** procesa y valida los datos.
5. La **SubjectImportView** muestra el resumen y solicita confirmación.
6. Si el **Docente** confirma:
   - El **SubjectImportController** persiste las nuevas asignaturas.
   - El sistema notifica el éxito.
7. Si el **Docente** cancela o hay error, se permite reintentar o salir.

## Decisiones de Análisis
- Se sigue el patrón de importación consistente con el resto de entidades del sistema.
