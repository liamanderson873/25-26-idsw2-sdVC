# Análisis Puro: CU-31 Cerrar Sesión

Este documento describe el análisis tecnológico agnóstico del caso de uso Cerrar Sesión, siguiendo la metodología RUP y el patrón Boundary-Control-Entity (BCE).

## 1. Clases de Análisis

Se identifican las siguientes clases para cumplir con el caso de uso:

### 1.1. Boundary (Frontera)
- **SessionView**: Interfaz que permite al Administrador Institucional o Docente:
  - Solicitar el cierre de sesión.
  - Confirmar o cancelar la acción de cierre.
  - Visualizar el estado de la sesión.

### 1.2. Control
- **LogoutController**: Gestiona el flujo de finalización de la sesión:
  - Coordina la invalidación de la sesión actual.
  - Gestiona la transición al estado "Sesión Cerrada".

### 1.3. Entity (Entidad)
- **UserSession**: Representa la sesión activa del usuario, encargada de mantener el estado de autenticación durante la interacción con el sistema.

## 2. Diagrama de Interacción (Conceptual)

1. El **Administrador o Docente** solicita cerrar sesión a través de **SessionView**.
2. **SessionView** solicita confirmación al usuario.
3. Si el usuario confirma, **SessionView** delega en **LogoutController**.
4. **LogoutController** invalida la **UserSession**.
5. El sistema transita al estado de sesión cerrada y redirige a la vista de login.
6. Si el usuario cancela, el sistema permanece en el estado actual.

## 3. Estados de Análisis
Basado en el diagrama de estados de requisitos:
- `SolicitandoCierre`: Estado en el que el usuario manifiesta su intención de salir.
- `ConfirmandoCierre`: Estado de espera de la decisión final del usuario para proceder con el cierre.
