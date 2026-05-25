<div align=right>
 
|[![](https://img.shields.io/badge/-Inicio-FFF?style=flat&logo=Emlakjet&logoColor=black)](/README.md) [![](https://img.shields.io/badge/-RUP-FFF?style=flat&logo=Elsevier&logoColor=black)](/RUP/README.md) [![](https://img.shields.io/badge/-Modelo_del_dominio-FFF?style=flat&logo=freedesktop.org&logoColor=black)](/RUP/00-casos-uso/00-modelo-del-dominio/modelo-dominio.puml) [![](https://img.shields.io/badge/-Actores_&_Casos_de_Uso-FFF?style=flat&logo=crewunited&logoColor=black)](/RUP/00-casos-uso/01-actores-casos-uso/actores-casos-uso.puml) [![](https://img.shields.io/badge/-Diagrama_de_contexto-FFF?style=flat&logo=diagramsdotnet&logoColor=black)](/RUP/00-casos-uso/01-actores-casos-uso/diagrama-contexto-docente.puml) [![](https://img.shields.io/badge/-Análisis-FFF?style=flat&logo=multisim&logoColor=black)](/RUP/01-analisis/casos-uso/README.md)|
|-:|
|[![](https://img.shields.io/badge/-Estado-FFF?style=flat&logo=greensock&logoColor=black)](/RUP/README.md) [![](https://img.shields.io/badge/-Reflexiones-FFF?style=flat&logo=hootsuite&logoColor=black)](https://github.com/liamanderson873/25-26-idsw2-sdVC/blob/main/TRAZABILIDAD_TEORICA.md) [![](https://img.shields.io/badge/-Log_de_conversación-FFF?style=flat&logo=gnometerminal&logoColor=black)](conversation-log.md)|

</div>

# Registro de Conversaciones - Proyecto Jorgestor RUP

## Resumen
Este archivo mantiene un registro cronológico y técnico de todas las interacciones, decisiones estratégicas y evolución del sistema **Jorgestor** (Generación y Corrección de Exámenes) siguiendo la metodología **RUP Pragmático**.

---

## Conversación 01: Inicio de Infraestructura y Análisis Puro (CU-01, CU-02)
**Fecha**: 2026-05-21
**Participantes**: Liam (Docente/Usuario) + Gemini CLI

### Contexto de la Sesión
Arranque del proyecto con el objetivo de transformar un modelo UML previo en una implementación funcional. Se establece la necesidad de trabajar con rigor metodológico.

### Decisiones Estratégicas
- **Metodología**: RUP Pragmático (Inspiración en proyecto `pySigHor`).
- **Arquitectura**: Patrón **Boundary-Control-Entity (BCE)** de forma tecnológicamente agnóstica.
- **Git Workflow**: Trabajo por ramas de tarea (`feat/analisis-puro-cuXX`) con Pull Request hacia `develop`.

### Desarrollo Principal
1.  **Sincronización de Recursos**: Análisis de repositorios de Modelado, Teoría y Referencia.
2.  **Infraestructura RUP**: Creación de la estructura de carpetas `/RUP/00`, `/01`, `/02`.
3.  **Análisis CU-01 (Corregir Exámenes)** e identificación de clases BCE.
4.  **Análisis CU-02 (Generar Exámenes)** y definición de parámetros obligatorios.

### Estado Final de la Sesión
- ✅ `QUE_HACE.md` cerrado y definido.
- ✅ Análisis Puro de CU-01 y CU-02 completado.
- ✅ Rama `develop` inicializada.

---

## Conversación 02: Bloque de Análisis 2 - Configuración e Importaciones
**Fecha**: 2026-05-24 (Sesión Mañana)
**Participantes**: Liam + Gemini CLI

### Contexto de la Sesión
Continuación de la fase de análisis puro. El usuario solicita un cambio en el flujo de trabajo para agrupar múltiples casos de uso por Pull Request (bloques de 4).

### Desarrollo Principal
1.  **Ajuste de Workflow**: Creación de rama de bloque `feat/analisis-puro-bloque-2`.
2.  **Análisis CU-03 (Importar Configuración Global)**.
3.  **Análisis CU-04 (Exportar Configuración Global)**.
4.  **Análisis CU-05 (Importar Alumnos)**.
5.  **Análisis CU-06 (Importar Preguntas)**.

### Valor de la Sesión
Se consolida la gestión masiva de datos y se establece el patrón para las importaciones específicas, manteniendo la consistencia con el proyecto de referencia.

---

## Conversación 03: Bloque de Análisis 3 - Exportaciones y Gestión de Entidades
**Fecha**: 2026-05-24 (Sesión Tarde I)
**Participantes**: Liam + Gemini CLI

### Contexto de la Sesión
Aceleración de la fase de análisis. Se acuerda completar los casos de uso restantes en tres grandes bloques para agilizar la transición a diseño.

### Desarrollo Principal
1.  **Bloque 3 (CU-07 a CU-18)**:
    - Exportaciones específicas (Alumnos, Preguntas).
    - Asignación de exámenes (CU-09).
    - CRUD completo de entidades principales (Preguntas, Asignaturas, Docentes, Alumnos, Grados).
2.  **Análisis BCE**: Definición de flujos de creación con redirección automática a edición.

### Estado Final
- ✅ 12 nuevos casos de uso analizados.
- ✅ Rama `feat/analisis-puro-bloque-3` creada y mergeada.

---

## Conversación 04: Sincronización Global y Bloque de Análisis 4
**Fecha**: 2026-05-24 (Sesión Tarde II)
**Participantes**: Liam + Gemini CLI

### Contexto de la Sesión
Incidencia en el flujo de Git tras un Pull Request accidental a `main`. Se decide cambiar el flujo de trabajo para actuar directamente sobre `develop` para la fase de análisis y centralizar la integración.

### Desarrollo Principal
1.  **Resolución de Conflictos**: Sincronización manual de `conversation-log.md`.
2.  **Integración de Ramas**: `main` mergeada en `develop` para unificar el historial.
3.  **Bloque 4 (CU-19 a CU-30)**:
    - Vistas de listado (Read) de todas las entidades.
    - Procesos de eliminación segura (Delete) con validación de integridad.
    - Flujo de Inicio de Sesión (Seguridad).

---

## Conversación 05: Finalización y Refactorización Estructural (pySigHor Style)
**Fecha**: 2026-05-24 (Cierre Sesión)
**Participantes**: Liam + Gemini CLI

### Contexto de la Sesión
Cierre de la fase de Análisis Puro. El usuario solicita que el rigor estructural y documental sea idéntico al proyecto `pySigHor` del profesor.

### Desarrollo Principal
1.  **Bloque 5 (CU-31 a CU-41)**: Finalización de todos los casos de uso pendientes (Respuestas, Sesión, Importaciones/Exportaciones específicas).
2.  **Gran Refactorización Estructural**:
    - Migración de archivos sueltos a **carpetas por Caso de Uso**.
    - Generación de **Diagramas de Colaboración (Robustez)** en PlantUML para los 41 casos de uso.
    - Creación de READMEs enriquecidos con tablas MVC y trazabilidad de mensajes.
3.  **Sincronización de Requisitos**: Población de `RUP/00-casos-uso` con activos reales de modelado (Modelo del Dominio, Contexto).
4.  **Habilitación de Visualización**: Uso del servidor PlantUML para renderizar diagramas directamente en GitHub.

### Decisiones Técnicas Clave
- **Independencia Tecnológica**: El análisis queda 100% libre de detalles de implementación (agnóstico).
- **Trazabilidad Teórica**: Creación del documento `TRAZABILIDAD_TEORICA.md` en memoria local para justificar las decisiones basadas en Ingeniería del Software.

### Estado Final de la Fase de Análisis
| Métrica | Valor |
|---------|-------|
| **Casos de Uso Analizados** | 41 / 41 (100%) |
| **Diagramas de Colaboración** | 41 / 41 |
| **Arquitectura de Referencia** | pySigHor Standard |
| **Rama Actual** | `main` y `develop` (Sincronizadas) |

---
*Este registro se actualizará al inicio de la Fase de Diseño.*
