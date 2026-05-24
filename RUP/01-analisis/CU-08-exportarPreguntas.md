# Análisis Puro: CU-08 Exportar Preguntas

## Descripción
El sistema permite al docente extraer el banco de preguntas (incluyendo enunciados, opciones y metadatos como dificultad) hacia un formato externo. Esto facilita el intercambio de preguntas entre diferentes instancias del sistema o su almacenamiento como copia de seguridad.

## Clases de Análisis (BCE)

### Boundary (Frontera)
- **QuestionExportView**: Interfaz que permite al docente gestionar la exportación de preguntas y recibir retroalimentación sobre el estado del proceso.

### Control
- **ExportController**: Orquesta la recopilación de preguntas y sus respuestas asociadas, asegurando que la estructura exportada sea íntegra.

### Entity (Entidad)
- **Question**: Representa la pregunta con su enunciado y metadatos.
- **Answer**: Entidad asociada a la pregunta que contiene las opciones de respuesta.

## Flujo de Análisis

1. El **Docente** (o el proceso de exportación global) solicita exportar las preguntas.
2. La **QuestionExportView** presenta la solicitud al controlador.
3. El **ExportController** recopila las entidades **Question** y sus **Answer** correspondientes.
4. El **ExportController** procesa la información y genera el archivo de salida.
5. El sistema permite al docente obtener el resultado de la exportación.

## Decisiones de Análisis
- **Integridad**: Es crucial que el controlador de exportación incluya todas las respuestas asociadas a cada pregunta para que el archivo exportado sea funcional al ser reimportado.
- **Reutilización**: Se utiliza el mismo `ExportController` que en otros casos de uso de exportación para centralizar la lógica de formateo.
