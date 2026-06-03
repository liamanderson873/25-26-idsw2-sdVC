# 🎯 Contexto Maestro e Instrucciones del Proyecto: Jorgestor

> [!IMPORTANT]
> **INSTRUCCIONES DE MEMORIA OBLIGATORIAS PARA LA IA:**
> 1. **LECTURA INTEGRAL AL "NACER":** En el primer turno de cada sesión, DEBES leer exhaustivamente:
>    - Este archivo (`CONTEXTO_PROYECTO.md`) y `TRAZABILIDAD_TEORICA.md`.
>    - El `README.md` y `pom.xml` del proyecto **Jorgestor**.
>    - El `README.md`, Glosario y detallados de Casos de Uso en **ModelingRepo**.
>    - Las bases de la asignatura en **TheoryRepo**.
>    - El `conversation-log.md` para situarte cronológicamente en el último punto exacto de trabajo.
> 2. **ACTUALIZACIÓN CONTINUA Y SINCRÓNICA (REGLA DE ORO):** Es tu responsabilidad mantener la "consciencia" del proyecto viva. **DEBES añadir cada nueva decisión técnica, descubrimiento, cambio en el flujo de trabajo o instrucción de Liam inmediatamente a este archivo.** No esperes al final de la sesión; hazlo en cuanto la información sea relevante para asegurar que el contexto nunca se degrade.
> 3. **OBJETIVO DE CONTINUIDAD:** Liam NUNCA debe repetir explicaciones. Tu misión es retomar el trabajo exactamente donde se dejó, conociendo no solo el código, sino la intención, el diseño y las reglas de oro.

---

## 1. Ecosistema de Trabajo (La Verdad Distribuida)
- **`Jorgestor/`**: Repositorio de código y documentación RUP activa. **Es el taller.**
- **`ModelingRepo/`**: **La Fuente de la Verdad Funcional.** Contiene requisitos, Casos de Uso detallados, Glosario y Diagramas de Estado. Es innegociable consultarlo ante cualquier duda de comportamiento.
- **`TheoryRepo/`**: Marco teórico de **IDSW2**. Define los estándares de calidad (SOLID, GRASP, Patrones) que deben aplicarse y justificarse.
- **`pySigHor` (Referencia)**: El estándar de excelencia. Todo el proyecto debe aspirar a su nivel documental y técnico.

---

## 2. Reglas de Oro Obligatorias (Workflow de Liam)
1.  **REGLA DEL VISTO BUENO (DRAFT PREVIO)**: NUNCA crees código, cambies la arquitectura o generes diagramas finales sin presentar un **Borrador (Draft)** previo para debate y recibir el "OK" de Liam.
2.  **GESTIÓN ESTRICTA DE RAMAS (GIT) Y PULL REQUESTS**: Trabajo por defecto en **`develop`**. Commits granulares y frecuentes siguiendo convenciones (*feat*, *fix*, *docs*). Los **Pull Requests a `main`** se harán agrupando bloques lógicos de trabajo (múltiples Casos de Uso o Hitos completos).
3.  **CONVERSATION LOG (Sagrado)**: El `conversation-log.md` debe actualizarse con el formato narrativo de pySigHor, reflejando hitos, bugs y validaciones empíricas.
4.  **TRAZABILIDAD TEÓRICA**: Cada decisión técnica relevante debe justificarse en `TRAZABILIDAD_TEORICA.md` vinculándola con los contenidos de IDSW2.
5.  **VERIFICACIÓN TÉCNICA**: Antes de dar una tarea por terminada, se debe intentar compilar (`mvn compile`) y validar el comportamiento (Postman/Curl).

---

## 3. Estado del Proyecto y Stack Tecnológico (Actualizado: 2026-06-03)
- **Fase**: Construcción - Finalización de Épica de Corrección e I/O.
- **Stack**: Java 21, Maven 3.9.16, Spring Boot 3.2.5, JPA, PostgreSQL 17 (Puerto 9090).
- **Hitos Recientes**:
    - [x] **Épica de Maestros**: Implementación de CRUDs completos para Profesores, Alumnos, Grados, Asignaturas, Temas y Preguntas.
    - [x] **Sincronización RUP**: Generación masiva de 26 diagramas de secuencia de diseño alineados con la implementación.
    - [x] **Ingeniería Documental**: Implementación de Proxy PlantUML en todos los READMEs para visualización directa en GitHub.
    - [x] **Entorno**: Creado `run-jorgestor.ps1` y estandarizada la estructura de carpetas `RUP/02-diseno`.
- **Pendiente Inmediato**: 
    - Inicio de Frontend React (Dashboard de Gestión).

---
*Este documento es la memoria viva del proyecto. Si no está aquí, no sucedió.*
