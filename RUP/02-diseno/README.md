# 🏗️ Disciplina de Diseño: Realizaciones Técnicas

Esta sección presenta el catálogo visual de todas las realizaciones de diseño del sistema **Jorgestor**, detallando cómo interactúan los objetos del sistema para cumplir los requisitos.

---

## 🏛️ Estructura y Comportamiento Global

Antes de entrar en el detalle de cada caso de uso, se definen los pilares arquitectónicos del sistema:

### [Modelo del Dominio (Jerarquía Final)](diagramas-arquitectonicos/diagrama-entidad-relacion.puml)
![Modelo del Dominio Final](https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/develop/RUP/02-diseno/diagramas-arquitectonicos/diagrama-entidad-relacion.puml)

### [Ciclo de Vida del Examen](diagramas-arquitectonicos/diagrama-estados-examen.puml)
![Diagrama de Estados Final](https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/develop/RUP/02-diseno/diagramas-arquitectonicos/diagrama-estados-examen.puml)

### [Arquitectura de Clases de Diseño (Backend)](diagramas-arquitectonicos/diagrama-clases-diseno.puml)
![Diagrama de Clases](https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/develop/RUP/02-diseno/diagramas-arquitectonicos/diagrama-clases-diseno.puml)

---

## 🎯 Catálogo Visual de Casos de Uso (Secuencias)

A continuación se detallan las realizaciones de diseño para los procesos core. Cada diagrama muestra la colaboración entre la Capa de Presentación, Capa de Servicio y Capa de Datos.

### [CU-01] Corregir Exámenes
Lógica de calificación masiva e individual con validación técnica.
![Secuencia CU-01](https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/develop/RUP/02-diseno/casos-uso/CU-01-corregirExamenes/diseno-secuencia-CU-01-corregirExamenes.puml)
> [📂 Ir a Carpeta de Realización](casos-uso/CU-01-corregirExamenes/)

---

### [CU-02] Generar Examen
Proceso de selección aleatoria por sacos de dificultad.
![Secuencia CU-02](https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/develop/RUP/02-diseno/casos-uso/CU-02-generarExamenes/diseno-secuencia-CU-02-generarExamenes.puml)
> [📂 Ir a Carpeta de Realización](casos-uso/CU-02-generarExamenes/)

---

### [CU-09] Asignar Exámenes
Vinculación masiva de alumnos con generación de firmas SHA-256.
![Secuencia CU-09](https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/develop/RUP/02-diseno/casos-uso/CU-09-asignarExamenes/diseno-secuencia-CU-09-asignarExamenes.puml)
> [📂 Ir a Carpeta de Realización](casos-uso/CU-09-asignarExamenes/)

---

### [CU-04] Exportar Examen
Preparación del paquete de impresión con auditoría integrada.
![Secuencia CU-04](https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/develop/RUP/02-diseno/casos-uso/CU-04-exportarExamen/diseno-secuencia-CU-04-exportarExamen.puml)
> [📂 Ir a Carpeta de Realización](casos-uso/CU-04-exportarExamen/)

---

### Gestión de Maestros (CRUDs)
Realizaciones de diseño para la gestión administrativa.
- **[Alumnos](casos-uso/CU-14-crearAlumno/)**: Matriculación y censo.
- **[Docentes](casos-uso/CU-13-crearDocente/)**: Gestión de credenciales.
- **[Asignaturas](casos-uso/CU-18-crearAsignatura/)**: Transversalidad y grados.

---
[⬅️ Volver al Panel Maestro](../../README.md)
