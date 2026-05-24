# Análisis Puro: CU-39 Importar Grados

## Descripción
El sistema permite al docente importar grados académicos desde una fuente externa de datos.

## Clases de Análisis (BCE)

### Boundary (Frontera)
- **GradeImportView**: Interfaz para la gestión de la carga del archivo de grados y confirmación de la operación.

### Control
- **GradeImportController**: Clase de control que valida los datos de los grados y gestiona su alta masiva en el sistema.

### Entity (Entidad)
- **Grade**: Entidad grado a importar.

## Flujo de Análisis

1. El **Docente** solicita importar grados.
2. La **GradeImportView** solicita el origen de datos.
3. El **Docente** proporciona la información.
4. El **GradeImportController** valida la integridad de los grados.
5. La **GradeImportView** solicita confirmación final.
6. Si se confirma, el **GradeImportController** guarda las entidades en el sistema.
7. En caso de error o cancelación, se vuelve al estado anterior.

## Decisiones de Análisis
- Mantiene la coherencia con el flujo de importación global pero centrado únicamente en la entidad `Grade`.
