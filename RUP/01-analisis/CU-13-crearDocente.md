# Análisis Puro: CU-13 Crear Docente

## Descripción
El administrador institucional puede dar de alta a un nuevo docente en el sistema proporcionando sus datos básicos obligatorios.

## Clases de Análisis (BCE)

### Boundary (Frontera)
- **DocentCreationView**: Interfaz que solicita los datos mínimos para crear un docente (nombre, apellidos, DNI, usuario, email, password).

### Control
- **DocentController**: Gestiona la creación de la nueva entidad docente, validando que los datos obligatorios estén presentes y no duplicados (ej: DNI o usuario).

### Entity (Entidad)
- **Docent**: Entidad que representa al nuevo profesor en el sistema.

## Flujo de Análisis

1. El **Administrador Institucional** solicita crear un nuevo docente.
2. La **DocentCreationView** solicita los datos obligatorios.
3. El **Administrador Institucional** proporciona la información.
4. El **DocentController** crea la entidad `Docent` y la inicializa.
5. Tras la creación exitosa, el sistema transfiere automáticamente al usuario a la vista de edición del docente recién creado.
6. El **Administrador Institucional** puede cancelar el proceso antes de confirmar.

## Decisiones de Análisis
- Se define un conjunto de datos mínimos obligatorios para garantizar la identidad del docente desde su creación.
- El flujo de creación redirige a edición para permitir completar perfiles complejos de forma fluida.
