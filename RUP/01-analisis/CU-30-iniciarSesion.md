# Análisis Puro: CU-30 Iniciar Sesión

Este documento describe el análisis tecnológico agnóstico del caso de uso Iniciar Sesión, siguiendo la metodología RUP y el patrón Boundary-Control-Entity (BCE).

## 1. Clases de Análisis

Se identifican las siguientes clases para cumplir con el caso de uso:

### 1.1. Boundary (Frontera)
- **LoginView**: Interfaz que permite al Usuario No Registrado:
  - Introducir sus credenciales (usuario y contraseña).
  - Solicitar el acceso al sistema.
  - Visualizar mensajes de error en caso de credenciales inválidas.

### 1.2. Control
- **LoginController**: Gestiona el flujo de autenticación:
  - Valida el formato de las credenciales.
  - Coordina la verificación de identidad con la entidad correspondiente.
  - Gestiona la transición al estado "Sistema Disponible" tras el éxito.

### 1.3. Entity (Entidad)
- **User**: Representa de forma genérica al usuario del sistema (puede ser Docente o Administrador), almacenando sus credenciales y roles para la validación.

## 2. Diagrama de Interacción (Conceptual)

1. El **UsuarioNoRegistrado** accede a **LoginView**.
2. Introduce credenciales y solicita acceso.
3. **LoginView** delega la validación a **LoginController**.
4. **LoginController** verifica las credenciales consultando la entidad **User**.
5. Si son válidas, el sistema cambia de estado y permite el acceso. Si no, se informa a través de **LoginView**.

## 3. Estados de Análisis
Basado en el diagrama de estados de requisitos:
- `RequestingAccess`: Estado inicial de carga de la interfaz de login.
- `ProvidingCredentials`: Estado en el que el usuario interactúa introduciendo sus datos.
