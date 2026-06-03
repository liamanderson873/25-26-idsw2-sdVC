<div align=right>

|[![](https://img.shields.io/badge/-Inicio-FFF?style=flat&logo=Emlakjet&logoColor=black)](/README.md) [![](https://img.shields.io/badge/-RUP-FFF?style=flat&logo=Elsevier&logoColor=black)](/RUP/README.md) [![](https://img.shields.io/badge/-Modelo_del_dominio-FFF?style=flat&logo=freedesktop.org&logoColor=black)](/RUP/00-casos-uso/00-modelo-del-dominio/modelo-dominio.puml?v=20260603) [![](https://img.shields.io/badge/-Actores_&_Casos_de_Uso-FFF?style=flat&logo=crewunited&logoColor=black)](/RUP/00-casos-uso/01-actores-casos-uso/actores-casos-uso.puml?v=20260603) [![](https://img.shields.io/badge/-Análisis-FFF?style=flat&logo=multisim&logoColor=black)](/RUP/01-analisis/casos-uso/README.md) [![](https://img.shields.io/badge/-Diseño-FFF?style=flat&logo=artstation&logoColor=black)](README.md)|
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

## 2. Arquitectura de Software: 3 Capas
Se aplica una arquitectura de capas clásica para asegurar la **Separación de Asuntos** y reducir el acoplamiento.

| Estereotipo BCE | Capa de Diseño | Elemento Spring |
| :--- | :--- | :--- |
| **Boundary** | Presentación | `@RestController` (Controlador) |
| **Control** | Negocio | `@Service` (Servicio) |
| **Entity** | Datos | `@Entity` / `JpaRepository` (Modelo/Repositorio) |

## 3. Diseño de Detalle: Casos de Uso

A continuación se presentan los **Diagramas de Secuencia** que detallan el flujo de datos entre las 3 capas.

### Épica de Exámenes (Core)
| Caso de Uso | Diagrama de Secuencia |
| :--- | :--- |
| **CU-01 Corregir Examen** | [Diagrama](casos-uso/CU-01-corregirExamenes/secuencia.puml) |
| **CU-02 Generar Examen** | [Diagrama](casos-uso/CU-02-generarExamenes/secuencia.puml) |
| **CU-09 Asignar Examen** | [Diagrama](casos-uso/CU-09-asignarExamenes/secuencia.puml) |
| **CU-04 Exportar Examen** | [Diagrama](casos-uso/CU-04-exportarExamen/secuencia.puml) |

### Épica de Maestros (CRUDs e Importación)
| Entidad | Importar / Crear | Editar | Ver / Listar | Eliminar |
| :--- | :---: | :---: | :---: | :---: |
| **Alumno** | [CU-05](casos-uso/CU-05-importarAlumnos/secuencia.puml) / [CU-14](casos-uso/CU-14-crearAlumno/secuencia.puml) | [CU-16](casos-uso/CU-16-editarAlumno/secuencia.puml) | [CU-23](casos-uso/CU-23-verAlumnos/secuencia.puml) | [CU-28](casos-uso/CU-28-eliminarAlumno/secuencia.puml) |
| **Docente** | [CU-13](casos-uso/CU-13-crearDocente/secuencia.puml) | [CU-15](casos-uso/CU-15-editarDocente/secuencia.puml) | [CU-24](casos-uso/CU-24-verDocentes/secuencia.puml) | [CU-29](casos-uso/CU-29-eliminarDocente/secuencia.puml) |
| **Grado** | [CU-17](casos-uso/CU-17-crearGrado/secuencia.puml) | [CU-19](casos-uso/CU-19-editarGrado/secuencia.puml) | [CU-22](casos-uso/CU-22-verGrados/secuencia.puml) | [CU-27](casos-uso/CU-27-eliminarGrado/secuencia.puml) |
| **Asignatura** | [CU-18](casos-uso/CU-18-crearAsignatura/secuencia.puml) | [CU-12](casos-uso/CU-12-editarAsignatura/secuencia.puml) | [CU-21](casos-uso/CU-21-verAsignaturas/secuencia.puml) | [CU-26](casos-uso/CU-26-eliminarAsignatura/secuencia.puml) |
| **Pregunta** | [CU-06](casos-uso/CU-06-importarPreguntas/secuencia.puml) / [CU-10](casos-uso/CU-10-crearPregunta/secuencia.puml) | [CU-11](casos-uso/CU-11-editarPregunta/secuencia.puml) | [CU-20](casos-uso/CU-20-verPreguntas/secuencia.puml) | [CU-25](casos-uso/CU-25-eliminarPregunta/secuencia.puml) |

---
*Este documento se actualiza conforme avanza la fase de construcción.*
