# Análisis Puro: CU-32 Completar Gestión

Este documento describe el análisis tecnológico agnóstico del caso de uso Completar Gestión, siguiendo la metodología RUP y el patrón Boundary-Control-Entity (BCE).

## 1. Clases de Análisis

Se identifican las siguientes clases para cumplir con el caso de uso:

### 1.1. Boundary (Frontera)
- **ManagementView**: Interfaz común para las diferentes áreas de gestión (Grados, Asignaturas, Alumnos, etc.) que permite al Administrador Institucional o Docente:
  - Solicitar la finalización de la gestión actual.
  - Solicitar disponibilizar el sistema.

### 1.2. Control
- **ManagementController**: Gestiona la transición entre los estados de gestión abierta y el estado de sistema disponible:
  - Asegura que los cambios pendientes sean procesados o cerrados correctamente.
  - Coordina el retorno al menú principal o estado de disponibilidad general.

### 1.3. Entity (Entidad)
- **SystemState**: Representa el estado global del sistema y la navegación entre los diferentes módulos de gestión.

## 2. Diagrama de Interacción (Conceptual)

1. El **Administrador o Docente** solicita completar la gestión desde una vista de gestión específica (**ManagementView**).
2. **ManagementView** delega la solicitud a **ManagementController**.
3. **ManagementController** actualiza el **SystemState** para marcar la gestión como completada.
4. El sistema transita al estado `SISTEMA_DISPONIBLE`.

## 3. Estados de Análisis
Basado en el diagrama de estados de requisitos:
- `PresentandoOpciones`: Estado en el que el sistema ofrece al usuario la posibilidad de finalizar la gestión actual y volver al estado general de disponibilidad.
