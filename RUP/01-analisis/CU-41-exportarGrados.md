# Análisis Puro: CU-41 Exportar Grados

## Descripción
Caso de uso que gestiona la extracción de los datos de los grados del sistema para su exportación externa.

## Clases de Análisis (BCE)

### Boundary (Frontera)
- **GradeExportView**: Interfaz para la gestión de la exportación de grados.

### Control
- **GradeExportController**: Gestiona la recopilación de datos de la entidad `Grade` y su preparación para el formato de salida.

### Entity (Entidad)
- **Grade**: Entidad grado (fuente de datos).

## Flujo de Análisis

1. El proceso principal de exportación solicita los datos de los grados.
2. El **GradeExportController** obtiene la información de las entidades `Grade`.
3. El sistema procesa la exportación de dichos datos.

## Decisiones de Análisis
- Funciona como un componente modular dentro del sistema de exportación global.
