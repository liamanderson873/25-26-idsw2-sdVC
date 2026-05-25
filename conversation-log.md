<div align=right>
 
|[![](https://img.shields.io/badge/-Inicio-FFF?style=flat&logo=Emlakjet&logoColor=black)](/README.md) [![](https://img.shields.io/badge/-RUP-FFF?style=flat&logo=Elsevier&logoColor=black)](/RUP/README.md) [![](https://img.shields.io/badge/-Modelo_del_dominio-FFF?style=flat&logo=freedesktop.org&logoColor=black)](/RUP/00-casos-uso/00-modelo-del-dominio/modelo-dominio.puml) [![](https://img.shields.io/badge/-Actores_&_Casos_de_Uso-FFF?style=flat&logo=crewunited&logoColor=black)](/RUP/00-casos-uso/01-actores-casos-uso/actores-casos-uso.puml) [![](https://img.shields.io/badge/-Diagrama_de_contexto-FFF?style=flat&logo=diagramsdotnet&logoColor=black)](/RUP/00-casos-uso/01-actores-casos-uso/diagrama-contexto-docente.puml) [![](https://img.shields.io/badge/-Análisis-FFF?style=flat&logo=multisim&logoColor=black)](/RUP/01-analisis/casos-uso/README.md)|
|-:|
|[![](https://img.shields.io/badge/-Estado-FFF?style=flat&logo=greensock&logoColor=black)](/RUP/README.md) [![](https://img.shields.io/badge/-Reflexiones-FFF?style=flat&logo=hootsuite&logoColor=black)](https://github.com/liamanderson873/25-26-idsw2-sdVC/blob/main/TRAZABILIDAD_TEORICA.md) [![](https://img.shields.io/badge/-Log_de_conversación-FFF?style=flat&logo=gnometerminal&logoColor=black)](conversation-log.md)|

</div>

# Registro de Conversaciones - Proyecto Jorgestor RUP

## Resumen
Este archivo mantiene un registro cronológico y técnico de todas las interacciones, decisiones estratégicas y evolución del sistema **Jorgestor** siguiendo la metodología **RUP Pragmático**.

---

## Conversación 01: Inicio de Infraestructura y Análisis Puro (CU-01, CU-02)
**Fecha**: 2026-05-21
**Participantes**: Liam (Usuario) + Gemini CLI

### Contexto de la Sesión
Arranque del proyecto con el objetivo de transformar un modelo UML previo en una implementación funcional.

**Pregunta clave de Liam**:
> "tengo que hacer un proyecto para clase en el que tengo que codificar enteramente contido un proyecto que tenemos modelado... el modelado lo tengo todo en un github... quiero trabajar como lo he hecho en el repo de modelado... vamos a hacer primero el analysis y diseño y una vez lo tengamos hacemos la implementacion."

### Estado del Proyecto al Inicio
- 🌑 **Inicio de proyecto**: Sin infraestructura de implementación.
- 📁 **Recursos**: Repositorios de Modelado, Teoría y Referencia (pySigHor) identificados.

### Desarrollo Principal

#### 1. **Definición de Metodología y Alcance**
Se establece adoptar el **RUP Pragmático** inspirado en `pySigHor`.
- **Hito**: Edición de `QUE_HACE.md` definiendo el compromiso del sistema.
- **Simplificación**: Se elimina la mención a "Inteligencia Artificial" para priorizar un entregable profesional honesto.

#### 2. **Infraestructura Inicial**
- Creación de la estructura de carpetas `/RUP/00-casos-uso`, `/01-analisis`, `/02-diseno`.
- Configuración de ramas `develop` y `task/01-analisis-puro`.

#### 3. **Análisis Puro (CU-01 y CU-02)**
- **CU-01 (Corregir Exámenes)**: Identificación de clases BCE: `CorrectionView`, `CorrectionController`, `Exam` y `Student`.
- **CU-02 (Generar Exámenes)**: Análisis de 7 parámetros obligatorios para la generación.

### Valor de la Sesión
Se establece un flujo de trabajo disciplinado que evita el "vibe coding" directo a implementación, asegurando la trazabilidad académica.

---

## Conversación 02: Bloque de Análisis 2 y Ajuste de Workflow
**Fecha**: 2026-05-24
**Participantes**: Liam + Gemini CLI

### Contexto de la Sesión
Continuación de la fase de análisis puro con un cambio estratégico en la gestión de Git.

**Pregunta clave de Liam**:
> "quiero que sigamos con los que estabamos haciendo pero lo unico es para los pull request a develop quiero que hagamos mas trabajo para cada uno no solo un caso de uso"

### Desarrollo Principal

#### 1. **Nuevo Flujo de Trabajo (Bloques de Trabajo)**
Se acuerda agrupar aproximadamente 4 casos de uso por Pull Request para reducir la sobrecarga de gestión de ramas.
- **Variable de control**: Prioridad según `CasosDeUsoPriorizados.md`.

#### 2. **Análisis del Bloque 2 (CU-03 a CU-06)**
- **CU-03 & CU-04 (Configuración Global)**: Definición de operaciones atómicas para backup e importación total.
- **CU-05 (Importar Alumnos)**: Especialización de la entidad `Student`.
- **CU-06 (Importar Preguntas)**: Gestión de contextos (General vs Específico de Asignatura).

---

## Conversación 03: Aceleración del Análisis (Bloques 3 y 4)
**Fecha**: 2026-05-24
**Participantes**: Liam + Gemini CLI

### Contexto de la Sesión
Decisión de completar los 35 casos de uso restantes en tres grandes bloques para transicionar rápidamente a la fase de Diseño.

**Pregunta clave de Liam**:
> "vale vamos a hacer los que quedan en tres bloques"

### Desarrollo Principal

#### 1. **Bloque 3: Gestión de Entidades (CU-07 a CU-18)**
- **Exportaciones**: Alumnos y Preguntas.
- **CRUD Principal**: Creación y edición de Preguntas, Asignaturas, Docentes, Alumnos y Grados.
- **Patrón "El Delgado"**: Creación mínima con redirección inmediata a edición.

#### 2. **Sincronización y Bloque 4 (CU-19 a CU-30)**
Tras un error accidental en un PR, se decide:
- **Cambio de Rationale**: Trabajar directamente en `develop` para la fase de análisis y centralizar merges en `main`.
- **Análisis**: Vistas de listado, procesos de eliminación segura y seguridad (Iniciar Sesión).

---

## Conversación 04: Finalización del Análisis y Refactorización Estructural
**Fecha**: 2026-05-24
**Participantes**: Liam + Gemini CLI

### Contexto de la Sesión
Cierre de la fase de Análisis Puro con un enfoque de excelencia documental.

**Pregunta clave de Liam**:
> "vale pero de la parte de analisis no faltan cosas? quiero que te bases en sighor para todo lo que tenemos que hacer para nuestro proyecto"

### Desarrollo Principal

#### 1. **Análisis de Referencia (pySigHor Audit)**
Gemini clona y audita `pySigHor` identificando artefactos faltantes:
- Diagramas de Colaboración (Robustez).
- Estructura de carpetas por caso de uso.
- Sincronización de requisitos en `/00-casos-uso`.

#### 2. **Gran Refactorización Estructural**
- **Transformación**: Migración de 41 archivos `.md` a 41 carpetas estructuradas.
- **Modelado**: Generación de 41 diagramas `colaboracion.puml` (Robustez) en PlantUML.
- **Visualización**: Configuración del proxy de PlantUML para renderizado dinámico en GitHub.

#### 3. **Trazabilidad Teórica**
Creación de `TRAZABILIDAD_TEORICA.md` para justificar el uso de BCE y la independencia tecnológica.

### Estado Final de la Fase de Análisis
| Métrica | Valor |
|---------|-------|
| **Casos de Uso Analizados** | 41 / 41 (100%) |
| **Diagramas de Colaboración** | 41 / 41 |
| **Arquitectura de Referencia** | pySigHor Standard |
| **Independencia Tecnológica** | Garantizada (Análisis Agnóstico) |

---
*Este registro se actualizará al inicio de la Fase de Diseño.*
