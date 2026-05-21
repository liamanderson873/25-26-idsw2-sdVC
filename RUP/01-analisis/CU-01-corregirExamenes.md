# Análisis Puro: CU-01 Corregir Exámenes

Este documento describe el análisis tecnológico agnóstico del caso de uso Corregir Exámenes, siguiendo la metodología RUP del profesor.

## 1. Clases de Análisis

Para cumplir con este caso de uso, se identifican las siguientes clases siguiendo el patrón Boundary-Control-Entity (BCE):

### 1.1. Boundary (Frontera)
- **CorrectionView**: Interfaz que permite al Docente:
  - Solicitar el inicio de la corrección.
  - Introducir los exámenes realizados (vía imagen/archivo).
  - Confirmar o cancelar la operación.
  - Visualizar el estado de la corrección (éxito/error).

### 1.2. Control
- **CorrectionController**: Gestiona el flujo de la corrección:
  - Valida la entrada de datos.
  - Coordina la identificación del examen y sus soluciones (vía Clave de Corrección).
  - Actualiza el estado de los exámenes en el sistema.

### 1.3. Entity (Entidad)
- **Exam**: Representa el examen en el sistema, conteniendo la Clave de Corrección y el estado (Corregido/Pendiente).
- **Student**: Necesario para asociar la corrección al alumno correspondiente mediante la clave.

## 2. Diagrama de Interacción (Conceptual)

1. El **Docente** interactúa con **CorrectionView**.
2. **CorrectionView** delega la lógica a **CorrectionController**.
3. **CorrectionController** consulta y actualiza las entidades **Exam** y **Student**.

## 3. Estados de Análisis
Basado en el diagrama de estados de requisitos:
- `RequiringCorrection`: Estado inicial de la interfaz.
- `ProvidingDoneExams`: Espera de carga de exámenes.
- `ProvidingConfirmation`: Confirmación del docente antes de procesar.
