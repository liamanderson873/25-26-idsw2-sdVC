<div align=right>
 
|[![](https://img.shields.io/badge/-Inicio-FFF?style=flat&logo=Emlakjet&logoColor=black)](/README.md) [![](https://img.shields.io/badge/-RUP-FFF?style=flat&logo=Elsevier&logoColor=black)](/RUP/README.md) [![](https://img.shields.io/badge/-Modelo_del_dominio-FFF?style=flat&logo=freedesktop.org&logoColor=black)](/RUP/00-casos-uso/00-modelo-del-dominio/modelo-dominio.puml) [![](https://img.shields.io/badge/-Actores_&_Casos_de_Uso-FFF?style=flat&logo=crewunited&logoColor=black)](/RUP/00-casos-uso/01-actores-casos-uso/actores-casos-uso.puml) [![](https://img.shields.io/badge/-Diagrama_de_contexto-FFF?style=flat&logo=diagramsdotnet&logoColor=black)](/RUP/00-casos-uso/01-actores-casos-uso/diagrama-contexto-docente.puml) [![](https://img.shields.io/badge/-Análisis-FFF?style=flat&logo=multisim&logoColor=black)](/RUP/01-analisis/casos-uso/README.md)|
|-:|
|[![](https://img.shields.io/badge/-Estado-FFF?style=flat&logo=greensock&logoColor=black)](/RUP/README.md) [![](https://img.shields.io/badge/-Reflexiones-FFF?style=flat&logo=hootsuite&logoColor=black)](https://github.com/liamanderson873/25-26-idsw2-sdVC/blob/main/TRAZABILIDAD_TEORICA.md) [![](https://img.shields.io/badge/-Log_de_conversación-FFF?style=flat&logo=gnometerminal&logoColor=black)](conversation-log.md)|

</div>

# Registro de Conversaciones - Proyecto Jorgestor RUP

## Resumen
Este archivo mantiene un registro cronológico exhaustivo de todas las interacciones, decisiones estratégicas y evolución técnica del sistema **Jorgestor** (Generación y Corrección de Exámenes). 

---

## Conversación 01: Inicio de Infraestructura y Análisis Puro (CU-01, CU-02)
**Fecha**: 2026-05-21
**Participantes**: Liam (Usuario) + Gemini CLI

### Contexto de la Sesión
Arranque del proyecto con el objetivo de transformar un modelo UML previo en una implementación funcional.

**Pregunta clave de Liam**:
> "tengo que hacer un proyecto para clase en el que tengo que codificar enteramente contido un proyecto que tenemos modelado... el modelado lo tengo todo en un github... quiero trabajar como lo he hecho en el repo de modelado... vamos a hacer primero el analysis y diseño y una vez lo tengamos hacemos la implementacion."

### Desarrollo Principal
Se establece adoptar el **RUP Pragmático** inspirado en `pySigHor`. Se crea la infraestructura inicial de carpetas y se analizan los dos primeros casos de uso (Corrección y Generación), sentando las bases del patrón **BCE**.

---

## Conversación 02: Maratón de Análisis, Refactorización pySigHor y Salto a Diseño
**Fecha**: 2026-05-24
**Participantes**: Liam + Gemini CLI

### Contexto de la Sesión
Sesión masiva de alta intensidad. El objetivo inicial era avanzar en el análisis por bloques, pero evoluciona hacia una reestructuración total del proyecto para alcanzar la excelencia documental y realizar la transición técnica a la fase de Diseño.

**Prompts clave de Liam**:
> "vale parece que tecuerdas todo [...] quiero que hagamos mas trabajo para cada uno no solo un caso de uso"
> "vale vamos a hacer los que quedan en tres bloques"
> "vale pero de la parte de analisis no faltan cosas? quiero que te bases en sighor para todo lo que tenemos que hacer para nuestro proyecto"
> "creo que prefiero java porque es lo que mas entiendo y asi podemos debatir mejor las cosas que te parece?"
> "quiero que antes de hacer cualquier cambio o de plantear cualquier cosa me preguntes y lo debatamos o te de el visto bueno"

### Estado del Proyecto al Inicio de la Sesión
- ✅ Análisis Puro: 2/41 CUs completados.
- 📁 Estructura: Archivos Markdown sueltos en `/01-analisis`.
- ⚙️ Git: Flujo de una rama por cada CU.

### Desarrollo Principal

#### 1. **Aceleración del Análisis (Bloques 2 al 5)**
Se procesan los 39 casos de uso restantes en tiempo récord, agrupándolos por áreas funcionales:
- **Bloque 2**: Configuración global e importaciones masivas.
- **Bloque 3**: CRUD completo de entidades (Alumno, Docente, Asignatura, Grado, Pregunta).
- **Bloque 4**: Vistas de listado y procesos de eliminación segura.
- **Bloque 5**: Gestión de respuestas, cierre de sesión y exportaciones.

#### 2. **Auditoría de Referencia y Gran Refactorización Structural**
Tras el prompt de Liam sobre "basarse en SigHor", Gemini realiza:
- **Auditoría**: Se detecta que faltan diagramas de robustez y una estructura jerárquica.
- **Refactorización**: Migración de 41 archivos `.md` a 41 carpetas independientes.
- **Modelado de Robustez**: Generación de **41 diagramas de colaboración PlantUML** (Boundary-Control-Entity).
- **Trazabilidad**: Sincronización de `ModelingRepo` (Glosario, Estados) hacia `RUP/00-casos-uso`.

#### 3. **Transición al Diseño y Selección de Stack**
- **Decisión del Stack**: Debate sobre Java vs Python. Liam elige **Java 21 + Spring Boot 3 + PostgreSQL** por dominio personal y adecuación a los principios OO de IDSW2.
- **Arquitectura**: Definición de una **Arquitectura de 3 Capas** (Controller, Service, Repository).

#### 4. **Realización de Diseño (Secuencia Técnica)**
Se elaboran los diagramas de secuencia para los casos más complejos, integrando decisiones técnicas críticas:
- **CU-01 (Corrección)**: Delegación a interfaz `ICorrectionEngine` para simular la IA.
- **CU-03 (Importar)**: Implementación de estrategia **UPSERT** con claves naturales y `@Transactional`.
- **CU-09 (Asignación)**: Resolución del debate sobre el Hash. Se confirma con el Glosario de modelado que la **Clave de Corrección** (Hash MD5/SHA) nace en este momento.

#### 5. **Infraestructura de Memoria (Blindaje de Contexto)**
- Creación de `TRAZABILIDAD_TEORICA.md` (memoria local) para justificar decisiones ante los profesores.
- Creación de `CONTEXTO_PROYECTO.md` con las reglas de workflow inamovibles.

### Decisiones Técnicas Clave
- **Independencia Tecnológica**: El análisis permanece agnóstico; el compromiso se asume en la fase de Diseño.
- **Estrategia Upsert**: Evitar duplicados en importaciones mediante búsqueda previa por DNI/Código.
- **Delegación de IA**: Uso de interfaces para que el sistema no dependa de la implementación de la detección de imágenes.

### Valor de la Sesión
El proyecto ha pasado de ser un conjunto de documentos a un sistema con una **arquitectura de software profesional**. Se ha validado el análisis contra el modelo de requisitos y se ha dejado el camino pavimentado para la codificación Java.

### Estado Final de la Sesión
| Métrica | Valor |
|---------|-------|
| **Casos de Uso Analizados** | 41 / 41 (100%) |
| **Diagramas de Robustez** | 41 / 41 |
| **Diagramas de Secuencia (Diseño)** | 4 / 4 (CUs Core) |
| **Arquitectura Definida** | 3-Tier Java/Spring Boot |
| **Repositorio** | `main` y `develop` sincronizados y refactorizados |

---
*Este registro continuará con el Diseño del Modelo Físico de Datos (DER).*
