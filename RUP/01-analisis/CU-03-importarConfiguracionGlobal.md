# Análisis Puro: CU-03 Importar Configuración Global

## Descripción
El sistema permite al docente importar de forma masiva la configuración del sistema (Alumnos, Grados, Asignaturas y Preguntas) mediante un archivo externo. El proceso incluye una fase de validación previa y una confirmación por parte del docente antes de aplicar los cambios de forma persistente.

## Clases de Análisis (BCE)

### Boundary (Frontera)
- **GlobalConfigImportView**: Interfaz que gestiona la interacción con el docente. Permite seleccionar el archivo, muestra las opciones de importación (alumnos, grados, etc.) y presenta el resultado de la validación para su confirmación.

### Control
- **ImportController**: Clase encargada de orquestar el flujo de importación. Se comunica con los servicios de lectura de archivos, valida la integridad y coherencia de los datos cargados y coordina la persistencia masiva.

### Entity (Entidad)
- **Student**: Entidad que representa a los alumnos a importar.
- **Grade**: Entidad que representa los grados académicos.
- **Subject**: Entidad que representa las asignaturas.
- **Question**: Entidad que representa las preguntas de la batería.
- **GlobalConfig**: (Estructura de datos de análisis) Representa el contenedor temporal de todos los datos extraídos del archivo antes de ser persistidos.

## Flujo de Análisis

1. El **Docente** solicita iniciar la importación global.
2. La **GlobalConfigImportView** presenta las opciones de importación disponibles.
3. El **Docente** selecciona el origen de los datos y proporciona la configuración global.
4. El **ImportController** recibe los datos, realiza la validación (formato, integridad referencial básica) y genera un estado de preparación.
5. La **GlobalConfigImportView** solicita confirmación al docente, mostrando posibles errores o un resumen de lo que se va a importar.
6. Si el **Docente** confirma:
   - El **ImportController** persiste las entidades en el sistema.
   - El caso de uso finaliza con éxito.
7. Si el **Docente** cancela o hay un error insalvable:
   - Se vuelve al estado de selección de datos o se aborta la operación según la decisión del docente.

## Decisiones de Análisis
- **Atomicidad**: La importación global se considera una operación que debe mantener la consistencia del sistema (si una parte falla, se debe informar y permitir la corrección antes de persistir).
- **Inspiración pySigHor**: Se sigue el patrón de separación de responsabilidades para facilitar el cambio de formatos de archivo (JSON, CSV, etc.) en la fase de diseño sin afectar la lógica de control.
