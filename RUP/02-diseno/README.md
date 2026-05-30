<div align=right>

|[![](https://img.shields.io/badge/-Inicio-FFF?style=flat&logo=Emlakjet&logoColor=black)](/README.md) [![](https://img.shields.io/badge/-RUP-FFF?style=flat&logo=Elsevier&logoColor=black)](/RUP/README.md) [![](https://img.shields.io/badge/-Modelo_del_dominio-FFF?style=flat&logo=freedesktop.org&logoColor=black)](/RUP/00-casos-uso/00-modelo-del-dominio/modelo-dominio.puml?v=20260526) [![](https://img.shields.io/badge/-Actores_&_Casos_de_Uso-FFF?style=flat&logo=crewunited&logoColor=black)](/RUP/00-casos-uso/01-actores-casos-uso/actores-casos-uso.puml?v=20260526) [![](https://img.shields.io/badge/-Análisis-FFF?style=flat&logo=multisim&logoColor=black)](/RUP/01-analisis/casos-uso/README.md) [![](https://img.shields.io/badge/-Diseño-FFF?style=flat&logo=artstation&logoColor=black)](README.md)|
|-:|
|[![](https://img.shields.io/badge/-Estado-FFF?style=flat&logo=greensock&logoColor=black)](/RUP/README.md) [![](https://img.shields.io/badge/-Reflexiones-FFF?style=flat&logo=hootsuite&logoColor=black)](https://github.com/liamanderson873/25-26-idsw2-sdVC/blob/main/TRAZABILIDAD_TEORICA.md) [![](https://img.shields.io/badge/-Log_de_conversación-FFF?style=flat&logo=gnometerminal&logoColor=black)](../../conversation-log.md)|

</div>

# Diseño - Disciplina de Análisis y Diseño

Esta sección define la arquitectura técnica y las decisiones de diseño para la implementación de **Jorgestor**, transformando los objetos de análisis en componentes de software reales.

## 1. Información del Artefacto
- **Proyecto**: Jorgestor
- **Fase RUP**: Elaboración / Construcción
- **Disciplina**: Diseño
- **Tecnología Principal**: Java 21 + Spring Boot 3

## 2. Selección del Stack Tecnológico

| Componente | Tecnología | Justificación |
| :--- | :--- | :--- |
| **Lenguaje** | Java 21 | Tipado fuerte, madurez industrial y alineación con IDSW2. |
| **Framework** | Spring Boot 3 | Inversión de Control (IoC) y gestión eficiente de dependencias. |
| **Persistencia** | Spring Data JPA | Implementación del patrón Repository y ORM (Hibernate). |
| **Base de Datos**| PostgreSQL | Integridad referencial y robustez para datos críticos. |
| **API** | Spring Web REST | Desacoplamiento total entre Backend y Frontend. |

## 3. Arquitectura de Software: 3 Capas
Se aplica una arquitectura de capas clásica para asegurar la **Separación de Asuntos** y reducir el acoplamiento.

### A. Capa de Presentación (`controller`)
- **Componentes**: `@RestController`.
- **Responsabilidad**: Exponer los endpoints del sistema, gestionar peticiones HTTP y transformar datos (DTOs).
- **Relación**: Evolución de las clases **Boundary** del análisis.

### B. Capa de Negocio (`service`)
- **Componentes**: `@Service` e Interfaces.
- **Responsabilidad**: Contener la lógica de negocio (algoritmos de generación, reglas de validación).
- **Relación**: Evolución de las clases **Control** del análisis.

### C. Capa de Datos (`repository` & `model`)
- **Componentes**: `@Entity` y `@Repository`.
- **Responsabilidad**: Gestión de la persistencia y mapeo de objetos a la base de datos relacional.
- **Relación**: Evolución de las clases **Entity** del análisis.

## 4. Mapeo del Análisis al Diseño

| Estereotipo BCE | Capa de Diseño | Elemento Spring |
| :--- | :--- | :--- |
| **Boundary** | Presentación | `RestController` |
| **Control** | Negocio | `Service` |
| **Entity** | Datos | `Entity` / `Repository` |

## 5. Diseño del Modelo Físico (DER)

A continuación se presenta el diseño de la base de datos en PostgreSQL. Se ha optado por un diseño normalizado (3FN) para garantizar la integridad de los datos de evaluación.

![Diagrama Entidad Relación](https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/develop/RUP/02-diseno/diagrama-entidad-relacion.puml?v=20260526)

### Consideraciones del DER:
- **`examen_alumnos`**: Es la tabla crítica que representa el "Ejemplar" del examen. Contiene la `clave_correccion` generada dinámicamente.
- **`examen_preguntas`**: Permite la reutilización de preguntas entre exámenes y mantiene el orden específico (importante para exámenes no personalizados).
- **Integridad**: Se utilizarán claves foráneas y restricciones `UNIQUE` en DNI y códigos de asignatura/grado.

## 6. Diagrama de Clases de Diseño (DCD)

Este diagrama representa la estructura de clases técnica siguiendo el patrón de **3 Capas de Spring Boot**, ahora completamente en español para mantener la consistencia del dominio.

![Diagrama de Clases de Diseño](https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/develop/RUP/02-diseno/diagrama-clases-diseno.puml?v=20260526)

### Elementos Clave:
- **`IMotorCorreccion`**: Interfaz que desacopla el sistema del motor de IA externo (CU-01).
- **`ServicioExamen`**: Contiene la lógica core de generación de claves de corrección y asignación.
- **DTOs (Data Transfer Objects)**: Se utilizarán para el intercambio de datos entre la capa de presentación y la de negocio (ej. `DTO_Alumno`).

## 7. Próximos Pasos
1.  **Configuración del Proyecto**: Estructura de paquetes y dependencias (Maven/Gradle) en Spring Boot 3.
2.  **Implementación de Entidades**: Creación de las clases Java con anotaciones JPA basadas en el DCD.
3.  **Desarrollo de Repositorios**: Configuración de interfaces Spring Data JPA.
