# Trazabilidad Teórica de Decisiones de Diseño (IDSW2)

Este documento justifica las decisiones técnicas tomadas en el proyecto **Jorgestor** basándose en los principios de la asignatura Ingeniería del Software II (IDSW2).

## 1. Diseño de la Base de Datos (DER)

### A. Uso de la Tercera Forma Normal (3FN)
**Decisión**: Se ha diseñado el modelo físico siguiendo estrictamente la 3FN.
**Justificación**: 
- **Eliminación de Redundancia**: Al separar `students`, `grades` y `subjects`, evitamos que un cambio en el nombre de un grado requiera actualizar miles de registros de alumnos.
- **Integridad Referencial**: Garantizamos que no existan exámenes de asignaturas que no han sido creadas previamente.
- **Coherencia con IDSW2**: Se aplica el principio de diseño de bases de datos relacionales para evitar anomalías de inserción, borrado y actualización.

### B. Separación Modelo vs. Ejemplar (`exams` vs `student_exams`)
**Decisión**: Creación de una tabla específica para la relación entre el alumno y su examen.
**Justificación**: 
- **Patrón de Instanciación**: El `exam` actúa como una "clase" (definición) y el `student_exam` como un "objeto" (instancia real con estado propio: nota, clave de corrección).
- **Escalabilidad**: Permite que un mismo examen sea realizado por múltiples alumnos manteniendo la independencia de sus resultados y sus claves únicas de seguridad.

### C. Elección de PostgreSQL
**Decisión**: Uso de un sistema de gestión de bases de datos relacionales (RDBMS) en su versión **17**.
**Justificación**: 
- **Cumplimiento ACID**: Para un sistema de exámenes, la atomicidad y consistencia son críticas (ej. no se puede perder una nota a mitad de una transacción).
- **Tipado Fuerte**: PostgreSQL ofrece soporte nativo para `ENUM` y tipos `DECIMAL` precisos para las notas, alineándose con el tipado fuerte de Java.
- **Criterio de Versión (IDSW2)**: Se selecciona la **v17** por ser la versión estable más reciente que garantiza total compatibilidad con el driver de Spring Boot 3.2.5. Se descartan versiones superiores (v18+) por no ser estables (beta/experimental) y versiones muy antiguas para aprovechar las mejoras de rendimiento en indexación y concurrencia.

## 2. Herramientas de Implementación (Java & Spring Boot)

Para la construcción del sistema, utilizamos anotaciones que automatizan tareas complejas. A continuación se detalla su significado y uso:

### A. Anotaciones de JPA (Persistencia)
| Anotación | Significado y Uso |
| :--- | :--- |
| **`@Entity`** | Marca la clase como una "Entidad de Persistencia". Le dice a Spring que esta clase debe mapearse a una tabla en la base de datos. |
| **`@Table`** | Permite definir el nombre real de la tabla en la base de datos (ej. `nombre = "alumnos"`). |
| **`@Id`** | Define qué campo de la clase será la Clave Primaria (PK). |
| **`@GeneratedValue`** | Indica que la base de datos generará el ID automáticamente (autoincremental). |
| **`@Column`** | Define restricciones para una columna: `nullable=false` (obligatorio), `unique=true` (no duplicados), `length` (longitud máxima). |
| **`@ManyToOne`** | Define una relación "Muchos a Uno" (ej. Muchos Alumnos pertenecen a un Grado). |
| **`@OneToMany`** | Define una relación "Uno a Muchos" (ej. Un Grado tiene muchos Alumnos). |
| **`@JoinColumn`** | Define el nombre de la columna física que servirá como Clave Foránea (FK). |

### B. Anotaciones de Lombok (Productividad)
| Anotación | Significado y Uso |
| :--- | :--- |
| **`@Data`** | Genera automáticamente: Getters, Setters, `toString()`, `equals()` y `hashCode()`. Evita el código repetitivo (*boilerplate*). |
| **`@NoArgsConstructor`** | Genera un constructor sin argumentos, requisito obligatorio para que JPA pueda instanciar los objetos. |
| **`@AllArgsConstructor`** | Genera un constructor que recibe todos los campos de la clase como parámetros. |

---
*Documento en constante actualización según el avance del diseño e implementación.*

