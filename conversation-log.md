<div align=right>
 
|[![](https://img.shields.io/badge/-Inicio-FFF?style=flat&logo=Emlakjet&logoColor=black)](/README.md) [![](https://img.shields.io/badge/-RUP-FFF?style=flat&logo=Elsevier&logoColor=black)](/RUP/README.md) [![](https://img.shields.io/badge/-Modelo_del_dominio-FFF?style=flat&logo=freedesktop.org&logoColor=black)](/RUP/00-casos-uso/00-modelo-del-dominio/modelo-dominio.puml) [![](https://img.shields.io/badge/-Actores_&_Casos_de_Uso-FFF?style=flat&logo=crewunited&logoColor=black)](/RUP/00-casos-uso/01-actores-casos-uso/actores-casos-uso.puml) [![](https://img.shields.io/badge/-Diagrama_de_contexto-FFF?style=flat&logo=diagramsdotnet&logoColor=black)](/RUP/00-casos-uso/01-actores-casos-uso/diagrama-contexto-docente.puml) [![](https://img.shields.io/badge/-Análisis-FFF?style=flat&logo=multisim&logoColor=black)](/RUP/01-analisis/casos-uso/README.md)|
|-:|
|[![](https://img.shields.io/badge/-Estado-FFF?style=flat&logo=greensock&logoColor=black)](/RUP/README.md) [![](https://img.shields.io/badge/-Reflexiones-FFF?style=flat&logo=hootsuite&logoColor=black)](https://github.com/liamanderson873/25-26-idsw2-sdVC/blob/main/TRAZABILIDAD_TEORICA.md) [![](https://img.shields.io/badge/-Log_de_conversación-FFF?style=flat&logo=gnometerminal&logoColor=black)](conversation-log.md)|

</div>

# Registro de Conversaciones - Proyecto Jorgestor RUP

## Resumen
Este archivo mantiene un registro cronológico exhaustivo de todas las interacciones, decisiones estratégicas y evolución técnica del sistema **Jorgestor** (Generación y Corrección de Exámenes). Siguiendo el estándar de excelencia de **pySigHor**, este log documenta no solo los cambios en el código, sino el razonamiento de ingeniería y los acuerdos alcanzados con el usuario.

---

## Conversación 01: Infraestructura y Análisis Puro Inicial
**Fecha**: 2026-05-21
**Participantes**: Liam (Usuario) + Gemini CLI

### Contexto de la Sesión
Arranque del proyecto. El objetivo es establecer un entorno de trabajo disciplinado para implementar un modelo UML previamente diseñado por el grupo de Liam.

**Prompt clave de Liam**:
> "tengo que hacer un proyecto para clase en el que tengo que codificar enteramente contido un proyecto que tenemos modelado... el modelado lo tengo todo en un github... quiero trabajar como lo he hecho en el repo de modelado... vamos a hacer primero el analysis y diseño y una vez lo tengamos hacemos la implementacion."

### Desarrollo Principal

#### 1. **Definición de Metodología y Alcance**
- **Metodología**: Adopción del **RUP Pragmático** inspirado en `pySigHor`. Se prioriza la documentación de análisis antes que la codificación.
- **Hito de Alcance**: Edición de `QUE_HACE.md` definiendo el compromiso del sistema: "Automatización de generación y corrección de exámenes personalizados".
- **Sinceridad Técnica**: Se elimina la mención a "Inteligencia Artificial" directa para enfocar el sistema en la gestión de datos, asumiendo la IA como un servicio delegado.

#### 2. **Infraestructura Inicial**
- **Carpetas RUP**: Creación de `/RUP/00-casos-uso`, `/01-analisis` y `/02-diseno`.
- **Git**: Inicialización de la rama `develop` y primera rama de tarea `task/01-analisis-puro`.

#### 3. **Análisis de CU-01 y CU-02**
- **CU-01 (Corregir Exámenes)**: Identificación de clases BCE (`CorrectionView`, `CorrectionController`, `Exam`, `Student`).
- **CU-02 (Generar Exámenes)**: Identificación de los 7 parámetros obligatorios (asignatura, temas, nº preguntas, dificultad, etc.).

### Valor de la Sesión
Establecimiento de las "reglas del juego". Se evita el desarrollo caótico y se asegura que cada línea de código futura tenga un respaldo en el análisis.

---

## Conversación 02: Bloque de Análisis 2 y Escalabilidad del Workflow
**Fecha**: 2026-05-24 (Mañana)
**Participantes**: Liam + Gemini CLI

### Contexto de la Sesión
Continuación de la fase de análisis. El usuario detecta que el flujo de "una rama por CU" es lento y solicita agrupar el trabajo.

**Prompt clave de Liam**:
> "quiero que sigamos con los que estabamos haciendo pero lo unico es para los pull request a develop quiero que hagamos mas trabajo para cada uno no solo un caso de uso"

### Desarrollo Principal

#### 1. **Nuevo Flujo por Bloques**
- Se acuerda trabajar en bloques de aproximadamente 4 casos de uso por Pull Request para agilizar el avance sin perder el rigor del BCE.
- **Creación de Rama**: `feat/analisis-puro-bloque-2`.

#### 2. **Análisis de Configuración e Importaciones**
- **CU-03 & CU-04 (Configuración Global)**: Análisis de los procesos de exportación e importación masiva de todo el sistema.
- **CU-05 & CU-06 (Alumnos y Preguntas)**: Especialización de la carga de datos para estas entidades core.

---

## Conversación 03: Aceleración Crítica y Gestión de Entidades
**Fecha**: 2026-05-24 (Tarde I)
**Participantes**: Liam + Gemini CLI

### Contexto de la Sesión
Decisión estratégica de completar los 35 casos de uso restantes en tres bloques masivos para transicionar a la fase de Diseño.

**Prompt clave de Liam**:
> "vale vamos a hacer los que quedan en tres bloques"

### Desarrollo Principal

#### 1. **Bloque 3: CRUD y Exportaciones (CU-07 a CU-18)**
- Se analizan 12 casos de uso centrados en la creación y edición de las entidades principales: `Pregunta`, `Asignatura`, `Docente`, `Alumno` y `Grado`.
- **Patrón de Creación**: Se establece que la creación debe ser "delgada" (datos mínimos) y redirigir automáticamente a la edición ("el gordo") para mejorar la experiencia de usuario.

#### 2. **Sincronización y Bloque 4 (CU-19 a CU-30)**
- **Cambio de Rationale**: Tras un error accidental en Git, se decide trabajar directamente sobre `develop` para la fase de análisis agnóstico, dejando `main` como rama de hitos cerrados.
- **Análisis Realizado**: Vistas de listado, procesos de borrado seguro (validando dependencias) y el CU de **Iniciar Sesión**.

---

## Conversación 04: Excelencia Documental y Auditoría pySigHor
**Fecha**: 2026-05-24 (Tarde II)
**Participantes**: Liam + Gemini CLI

### Contexto de la Sesión
El usuario solicita que el proyecto no solo funcione, sino que su documentación de análisis sea idéntica en calidad a la de `pySigHor`.

**Prompt clave de Liam**:
> "vale pero de la parte de analisis no faltan cosas? quiero que te bases en sighor para todo lo que tenemos que hacer para nuestro proyecto"

### Desarrollo Principal

#### 1. **Auditoría Estructural**
- Gemini clona `pySigHor` y detecta que faltan: **Diagramas de Colaboración (Robustez)** y una estructura de carpetas por caso de uso que incluya su propio README.

#### 2. **Refactorización Masiva (41 CUs)**
- **Reestructuración**: Se crean 41 carpetas en `RUP/01-analisis/casos-uso/`.
- **Diagramas PlantUML**: Se generan 41 diagramas `colaboracion.puml` definiendo la interacción entre Boundary, Control y Entity.
- **READMEs Enriquecidos**: Cada carpeta incluye un README con tablas de responsabilidades de clases y trazabilidad de mensajes.
- **Visualización en GitHub**: Se configura el servidor proxy de PlantUML para que los diagramas sean visibles directamente en el navegador.

#### 3. **Trazabilidad de Requisitos**
- Sincronización de `ModelingRepo` hacia `Jorgestor/RUP/00-casos-uso`, incluyendo el Modelo del Dominio y los Diagramas de Contexto.

---

## Conversación 05: Transición a Diseño y Selección de Stack
**Fecha**: 2026-05-24 (Cierre)
**Participantes**: Liam + Gemini CLI

### Contexto de la Sesión
Cierre oficial del Análisis Puro y apertura de la Fase de Diseño. Debate sobre el compromiso tecnológico.

**Prompt clave de Liam**:
> "creo que prefiero java porque es lo que mas entiendo y asi podemos debatir mejor las cosas que te parece?"

### Desarrollo Principal

#### 1. **Selección del Stack Tecnológico**
- **Lenguaje**: Java 21 (Elegido por Liam por dominio y adecuación a OO).
- **Framework**: Spring Boot 3 (Por su soporte nativo a IoC y SOLID).
- **Persistencia**: JPA + PostgreSQL.
- **Frontend**: React + TypeScript (Desacoplado vía REST).

#### 2. **Arquitectura de Diseño**
- Se acuerda una **Arquitectura de 3 Capas Clásica** (Controller -> Service -> Repository), mapeando 1:1 los estereotipos del análisis BCE.

#### 3. **Realización de Diseño (Secuencia)**
- Se identifican los 4 casos más complejos para detallar su secuencia técnica: **CU-01, CU-02, CU-03, CU-09**.
- **Hito Técnico**: Definición del **Hash SHA/MD5** para la Clave de Corrección en la fase de asignación (CU-09) y la estrategia **UPSERT** con `@Transactional` para importaciones (CU-03).

---

## Conversación 06: Blindaje de Memoria y Reglas de Workflow
**Fecha**: 2026-05-26
**Participantes**: Liam + Gemini CLI

### Contexto de la Sesión
Finalización de los últimos detalles de análisis y establecimiento de las reglas de memoria para garantizar la continuidad entre "nacimientos" de la IA.

**Prompt clave de Liam**:
> "quiero que el documento que te dije de explicacion [...] sea mas detallado [...] quiero que se adopte a la teoria que sale en el repo de IDSW2"
> "especialmente para las fases que quedan como de codificacion y tal quiero que me preguntes en que rama pero se asume que en develop"

### Desarrollo Principal

#### 1. **Expansión de Trazabilidad Teórica**
- Creación de `TRAZABILIDAD_TEORICA.md` en memoria local, vinculando cada decisión con el temario de **IDSW2** (Antipatrones, GRASP, SOLID, SoC).

#### 2. **Blindaje de Contexto**
- Creación de `CONTEXTO_PROYECTO.md` con instrucciones obligatorias para que cualquier IA futura sepa:
  - Repositorios de referencia.
  - Reglas de Git (Develop por defecto, prohibido commit a Main sin permiso).
  - Regla del Visto Bueno (Debate previo obligatorio).
  - Actualización continua del Conversation Log.

### Estado Final del Proyecto
| Métrica | Valor |
|---------|-------|
| **Fase RUP** | Diseño de Arquitectura (Iniciando DER) |
| **Análisis BCE** | 100% (41/41 CUs con Diagramas de Robustez) |
| **Diseño de Secuencia** | Completado para CUs Core (01, 02, 03, 09) |
| **Stack** | Java 21 / Spring Boot 3 / PostgreSQL |
| **Rama de Trabajo** | `develop` |

---
*Este registro continuará con el Diseño del Modelo Físico de Datos (DER).*
