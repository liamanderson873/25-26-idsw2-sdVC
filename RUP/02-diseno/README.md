<div align=right>

|[![](https://img.shields.io/badge/-Inicio-FFF?style=flat&logo=Emlakjet&logoColor=black)](/README.md) [![](https://img.shields.io/badge/-RUP-FFF?style=flat&logo=Elsevier&logoColor=black)](/RUP/README.md) [![](https://img.shields.io/badge/-Modelo_del_dominio-FFF?style=flat&logo=freedesktop.org&logoColor=black)](/RUP/00-casos-uso/00-modelo-del-dominio/modelo-dominio.puml?v=20260603) [![](https://img.shields.io/badge/-Actores_&_Casos_de_Uso-FFF?style=flat&logo=crewunited&logoColor=black)](/RUP/00-casos-uso/01-actores-casos-uso/actores-casos-uso.puml?v=20260603) [![](https://img.shields.io/badge/-AnÃ¡lisis-FFF?style=flat&logo=multisim&logoColor=black)](/RUP/01-analisis/casos-uso/README.md) [![](https://img.shields.io/badge/-DiseÃ±o-FFF?style=flat&logo=artstation&logoColor=black)](README.md)|
|-:|
|[![](https://img.shields.io/badge/-Estado-FFF?style=flat&logo=greensock&logoColor=black)](/RUP/README.md) [![](https://img.shields.io/badge/-Reflexiones-FFF?style=flat&logo=hootsuite&logoColor=black)](https://github.com/liamanderson873/25-26-idsw2-sdVC/blob/main/TRAZABILIDAD_TEORICA.md) [![](https://img.shields.io/badge/-Log_de_conversaciÃ³n-FFF?style=flat&logo=gnometerminal&logoColor=black)](../../conversation-log.md)|

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
| **CU-01 Corregir Examen** | ![CU-01](https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/develop/RUP/02-diseno/casos-uso/CU-01-corregirExamenes/diseno-secuencia-CU-01-corregirExamenes.puml) |
| **CU-02 Generar Examen** | ![CU-02](https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/develop/RUP/02-diseno/casos-uso/CU-02-generarExamenes/diseno-secuencia-CU-02-generarExamenes.puml) |
| **CU-09 Asignar Examen** | ![CU-09](https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/develop/RUP/02-diseno/casos-uso/CU-09-asignarExamenes/diseno-secuencia-CU-09-asignarExamenes.puml) |
| **CU-04 Exportar Examen** | ![CU-04](https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/develop/RUP/02-diseno/casos-uso/CU-04-exportarExamen/diseno-secuencia-CU-04-exportarExamen.puml) |

### Épica de Maestros (CRUDs e Importación)
| Entidad | Importar / Crear | Editar | Ver / Listar | Eliminar |
| :--- | :---: | :---: | :---: | :---: |
| **Alumno** | ![CU-05](https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/develop/RUP/02-diseno/casos-uso/CU-05-importarAlumnos/diseno-secuencia-CU-05-importarAlumnos.puml) / ![CU-14](https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/develop/RUP/02-diseno/casos-uso/CU-14-crearAlumno/diseno-secuencia-CU-14-crearAlumno.puml) | ![CU-16](https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/develop/RUP/02-diseno/casos-uso/CU-16-editarAlumno/diseno-secuencia-CU-16-editarAlumno.puml) | ![CU-23](https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/develop/RUP/02-diseno/casos-uso/CU-23-verAlumnos/diseno-secuencia-CU-23-verAlumnos.puml) | ![CU-28](https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/develop/RUP/02-diseno/casos-uso/CU-28-eliminarAlumno/diseno-secuencia-CU-28-eliminarAlumno.puml) |
| **Docente** | ![CU-13](https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/develop/RUP/02-diseno/casos-uso/CU-13-crearDocente/diseno-secuencia-CU-13-crearDocente.puml) | ![CU-15](https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/develop/RUP/02-diseno/casos-uso/CU-15-editarDocente/diseno-secuencia-CU-15-editarDocente.puml) | ![CU-24](https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/develop/RUP/02-diseno/casos-uso/CU-24-verDocentes/diseno-secuencia-CU-24-verDocentes.puml) | ![CU-29](https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/develop/RUP/02-diseno/casos-uso/CU-29-eliminarDocente/diseno-secuencia-CU-29-eliminarDocente.puml) |
| **Grado** | ![CU-17](https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/develop/RUP/02-diseno/casos-uso/CU-17-crearGrado/diseno-secuencia-CU-17-crearGrado.puml) | ![CU-19](https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/develop/RUP/02-diseno/casos-uso/CU-19-editarGrado/diseno-secuencia-CU-19-editarGrado.puml) | ![CU-22](https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/develop/RUP/02-diseno/casos-uso/CU-22-verGrados/diseno-secuencia-CU-22-verGrados.puml) | ![CU-27](https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/develop/RUP/02-diseno/casos-uso/CU-27-eliminarGrado/diseno-secuencia-CU-27-eliminarGrado.puml) |
| **Asignatura** | ![CU-18](https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/develop/RUP/02-diseno/casos-uso/CU-18-crearAsignatura/diseno-secuencia-CU-18-crearAsignatura.puml) | ![CU-12](https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/develop/RUP/02-diseno/casos-uso/CU-12-editarAsignatura/diseno-secuencia-CU-12-editarAsignatura.puml) | ![CU-21](https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/develop/RUP/02-diseno/casos-uso/CU-21-verAsignaturas/diseno-secuencia-CU-21-verAsignaturas.puml) | ![CU-26](https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/develop/RUP/02-diseno/casos-uso/CU-26-eliminarAsignatura/diseno-secuencia-CU-26-eliminarAsignatura.puml) |
| **Pregunta** | ![CU-06](https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/develop/RUP/02-diseno/casos-uso/CU-06-importarPreguntas/diseno-secuencia-CU-06-importarPreguntas.puml) / ![CU-10](https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/develop/RUP/02-diseno/casos-uso/CU-10-crearPregunta/diseno-secuencia-CU-10-crearPregunta.puml) | ![CU-11](https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/develop/RUP/02-diseno/casos-uso/CU-11-editarPregunta/diseno-secuencia-CU-11-editarPregunta.puml) | ![CU-20](https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/develop/RUP/02-diseno/casos-uso/CU-20-verPreguntas/diseno-secuencia-CU-20-verPreguntas.puml) | ![CU-25](https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/develop/RUP/02-diseno/casos-uso/CU-25-eliminarPregunta/diseno-secuencia-CU-25-eliminarPregunta.puml) |

---
*Este documento se actualiza conforme avanza la fase de construcción.*






































































