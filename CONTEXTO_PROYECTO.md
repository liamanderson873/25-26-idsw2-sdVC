# 🎯 Contexto Maestro e Instrucciones del Proyecto: Jorgestor

> [!IMPORTANT]
> **INSTRUCCIONES DE MEMORIA OBLIGATORIAS PARA LA IA:**
> 1. **LECTURA INTEGRAL AL "NACER":** En el primer turno de cada sesión, DEBES leer exhaustivamente:
>    - Este archivo (`CONTEXTO_PROYECTO.md`) y `TRAZABILIDAD_TEORICA.md`.
>    - El `README.md` y `pom.xml` del proyecto **Jorgestor**.
>    - El `README.md`, Glosario y detallados de Casos de Uso en **ModelingRepo**.
>    - Las bases de la asignatura en **TheoryRepo**.
>    - El `conversation-log.md` para situarte cronológicamente en el último punto exacto de trabajo.
> 2. **ACTUALIZACIÓN CONTINUA Y SINCRÓNICA:** Es tu responsabilidad mantener la "consciencia" del proyecto viva. Cada decisión técnica, cambio en el flujo de trabajo o instrucción de Liam DEBE reflejarse inmediatamente en este archivo y en el `conversation-log.md`.
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
2.  **GESTIÓN ESTRICTA DE RAMAS (GIT) Y PULL REQUESTS**: Trabajo por defecto en **`develop`**. Commits granulares y frecuentes siguiendo convenciones (*feat*, *fix*, *docs*). Los **Pull Requests a `main`** se harán agrupando bloques lógicos de trabajo (múltiples Casos de Uso o Hitos completos) para evitar la sobrecarga administrativa, tal como instruyó Liam.
3.  **CONVERSATION LOG (Nuevo Estándar pySigHor)**: El `conversation-log.md` es sagrado. A partir de ahora, cada entrada debe seguir este formato narrativo y estructurado:
    - **Título**: Número de Conversación y Tema principal.
    - **Participantes y Fecha**.
    - **Contexto de la Sesión**: Breve resumen de la situación inicial.
    - **Prompt Clave de Liam**: Cita textual de la instrucción detonante.
    - **Desarrollo Principal**: Lista de hitos técnicos, resoluciones de bugs (como el de Lombok) y validaciones empíricas. Debe reflejar *cómo* se solucionaron los problemas, no solo *qué* se hizo.
4.  **TRAZABILIDAD TEÓRICA**: Cada decisión técnica relevante debe justificarse en `TRAZABILIDAD_TEORICA.md` vinculándola con los contenidos de IDSW2.
5.  **VERIFICACIÓN TÉCNICA**: Antes de dar una tarea por terminada, se debe intentar compilar (`mvn compile`) y, si es posible, ejecutar para validar el comportamiento.

---

## 3. Estado del Proyecto y Stack Tecnológico (Actualizado)
- **Fase**: Construcción - Implementación de Capa de Servicios y Controladores.
- **Stack**: Java 21, Maven 3.9.16, Spring Boot 3.2.5, JPA, PostgreSQL 17 (Estable).
- **Hitos Recientes**:
    - [x] Configuración de entorno (Maven instalado en PATH).
    - [x] Solución de errores en `pom.xml`.
    - [x] Implementación de `ServicioExamen` (CU-09) con lógica de Hash SHA-256 para la Clave de Corrección.
    - [x] Actualización de Logs y Mapas Mentales (`2Think.md`).
- **Pendiente Inmediato**: Diseño e implementación de la lógica de generación aleatoria (CU-02).

---
*Este documento es la memoria viva del proyecto. Si no está aquí, no sucedió.*
