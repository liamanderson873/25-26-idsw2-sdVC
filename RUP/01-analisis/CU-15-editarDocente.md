# Análisis Puro: CU-15 Editar Docente

## Descripción
El administrador institucional puede modificar la información de un docente registrado en el sistema o eliminar su cuenta de usuario.

## Clases de Análisis (BCE)

### Boundary (Frontera)
- **DocentEditView**: Interfaz que muestra los datos actuales del docente (DNI, nombre, email, etc.) y permite su modificación o eliminación.

### Control
- **DocentController**: Gestiona la actualización de los datos del docente y la lógica de eliminación, asegurando la integridad del sistema.

### Entity (Entidad)
- **Docent**: La entidad docente que se está editando.

## Flujo de Análisis

1. El **Administrador Institucional** solicita editar un docente.
2. La **DocentEditView** presenta los datos del docente.
3. El **Administrador Institucional** puede modificar campos (Nombre, Apellidos, Email, Password, etc.).
4. El **Administrador Institucional** solicita una acción:
   - **Guardar**: El **DocentController** actualiza los datos.
   - **Eliminar**: El **DocentController** elimina al docente del sistema.
   - **Cancelar**: Se descartan los cambios.
5. El sistema confirma la operación y vuelve al listado de docentes o a la vista de detalle.

## Decisiones de Análisis
- El DNI y el nombre de usuario actúan como identificadores clave que pueden tener restricciones de edición dependiendo del diseño final.
