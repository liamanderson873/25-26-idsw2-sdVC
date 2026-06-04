# Análisis - Disciplina de Análisis y Diseño

Esta sección contiene el Análisis arquitectónico de los casos de uso especificados para el sistema **Jorgestor**, aplicando el patrón MVC y identificando las clases de Análisis necesarias.

## Contenido de la disciplina

### [Casos de uso - Análisis MVC](casos-uso/README.md)
Análisis completo de cada caso de uso mediante:
- **Clases de Análisis**: Boundary, Control, Entity según patrón MVC.
- **Diagramas de colaboración**: Interacciones entre clases de Análisis.
- **Responsabilidades definidas**: Separación clara por estereotipo.

## Metodología de Análisis aplicada

### Patrón MVC sistemático
- **Model (Entity)**: Entidades del dominio (`Student`, `Exam`, `Question`, etc.).
- **View (Boundary)**: Clases de interfaz para la interacción con Docentes y Administradores.
- **Controller (Control)**: Coordinación de la lógica de negocio y flujo de casos de uso.

### Estereotipos de Análisis
- **Boundary (Vista)**: Clases de interfaz usuario-sistema.
- **Control (Controlador)**: Clases de coordinación y lógica.
- **Entity (Entidad)**: Clases de dominio y persistencia.

## Cobertura de Análisis

Se ha completado el Análisis de los 41 casos de uso priorizados, organizados en bloques de trabajo para asegurar la consistencia arquitectónica.

## Trazabilidad

### De especificación a Análisis
- Cada caso de uso del `ModelingRepo` tiene su correspondiente Análisis MVC.
- Los estados de los diagramas de contexto se mapean a responsabilidades en las clases de Análisis.

## Referencias

- [Casos de uso especificados](../00-casos-uso/02-detalle/README.md)
- [Log de conversaciones](../../conversation-log.md)
