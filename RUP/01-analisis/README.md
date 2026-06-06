# 🔍 Disciplina de Análisis: Requisitos y Robustez

Esta sección documenta la fase de análisis de **Jorgestor**, donde se definen los requisitos funcionales y la lógica de robustez de los procesos core.

---

## 🎯 Casos de Uso (Análisis Arquitectónico)

A continuación se listan las especificaciones detalladas para cada proceso del sistema.

### ⚡ Procesos Críticos (Core)
- **[CU-01] Corregir Examen**: [![Análisis](https://img.shields.io/badge/-Detalle-blue?style=flat-square)](casos-uso/CU-01-corregirExamenes/)
- **[CU-02] Generar Examen**: [![Análisis](https://img.shields.io/badge/-Detalle-blue?style=flat-square)](casos-uso/CU-02-generarExamenes/)
- **[CU-09] Asignar Exámenes**: [![Análisis](https://img.shields.io/badge/-Detalle-blue?style=flat-square)](casos-uso/CU-09-asignarExamenes/)

### 📥 Importación y Configuración
- **[CU-03/04] Configuración Global**: [Importar](casos-uso/CU-03-importarConfiguracionGlobal/) / [Exportar](casos-uso/CU-04-exportarConfiguracionGlobal/)
- **[CU-05] Importar Alumnos**: [![Análisis](https://img.shields.io/badge/-Detalle-green?style=flat-square)](casos-uso/CU-05-importarAlumnos/)
- **[CU-06] Importar Preguntas**: [![Análisis](https://img.shields.io/badge/-Detalle-green?style=flat-square)](casos-uso/CU-06-importarPreguntas/)

### 🛠️ Gestión de Maestros (CRUDs)
- **Alumnos**: [Crear](casos-uso/CU-14-crearAlumno/) / [Editar](casos-uso/CU-16-editarAlumno/) / [Ver](casos-uso/CU-23-verAlumnos/) / [Eliminar](casos-uso/CU-28-eliminarAlumno/)
- **Asignaturas**: [Crear](casos-uso/CU-18-crearAsignatura/) / [Editar](casos-uso/CU-12-editarAsignatura/) / [Ver](casos-uso/CU-21-verAsignaturas/) / [Eliminar](casos-uso/CU-26-eliminarAsignatura/)
- **Docentes**: [Crear](casos-uso/CU-13-crearDocente/) / [Editar](casos-uso/CU-15-editarDocente/) / [Ver](casos-uso/CU-24-verDocentes/) / [Eliminar](casos-uso/CU-29-eliminarDocente/)
- **Grados**: [Crear](casos-uso/CU-17-crearGrado/) / [Editar](casos-uso/CU-19-editarGrado/) / [Ver](casos-uso/CU-22-verGrados/) / [Eliminar](casos-uso/CU-27-eliminarGrado/)

---

## 📊 Diagramas de Robustez
Cada caso de uso contiene su diagrama de robustez correspondiente, mapeando los objetos de **Frontera**, **Control** y **Entidad** siguiendo el patrón MVC de análisis.

---
[⬅️ Volver al Panel Maestro](../../README.md)
