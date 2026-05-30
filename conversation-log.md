<div align=right>
 
|[![](https://img.shields.io/badge/-Inicio-FFF?style=flat&logo=Emlakjet&logoColor=black)](/README.md) [![](https://img.shields.io/badge/-RUP-FFF?style=flat&logo=Elsevier&logoColor=black)](/RUP/README.md) [![](https://img.shields.io/badge/-Modelo_del_dominio-FFF?style=flat&logo=freedesktop.org&logoColor=black)](/RUP/00-casos-uso/00-modelo-del-dominio/modelo-dominio.puml) [![](https://img.shields.io/badge/-Actores_&_Casos_de_Uso-FFF?style=flat&logo=crewunited&logoColor=black)](/RUP/00-casos-uso/01-actores-casos-uso/actores-casos-uso.puml) [![](https://img.shields.io/badge/-Diagrama_de_contexto-FFF?style=flat&logo=diagramsdotnet&logoColor=black)](/RUP/00-casos-uso/01-actores-casos-uso/diagrama-contexto-docente.puml) [![](https://img.shields.io/badge/-Análisis-FFF?style=flat&logo=multisim&logoColor=black)](/RUP/01-analisis/casos-uso/README.md)|
|-:|
|[![](https://img.shields.io/badge/-Estado-FFF?style=flat&logo=greensock&logoColor=black)](/RUP/README.md) [![](https://img.shields.io/badge/-Reflexiones-FFF?style=flat&logo=hootsuite&logoColor=black)](https://github.com/liamanderson873/25-26-idsw2-sdVC/blob/main/TRAZABILIDAD_TEORICA.md) [![](https://img.shields.io/badge/-Log_de_conversación-FFF?style=flat&logo=gnometerminal&logoColor=black)](conversation-log.md)|

</div>

# Registro de Conversaciones - Proyecto Jorgestor RUP

## Resumen
Este archivo mantiene un registro cronológico y aditivo de todas las interacciones, decisiones estratégicas y evolución técnica del sistema **Jorgestor** (Generación y Corrección de Exámenes). Siguiendo el estándar de **pySigHor**, este log documenta el flujo de trabajo paso a paso, capturando cada prompt relevante y la respuesta técnica asociada.

---

## Conversación 01: Inicio de Infraestructura y Análisis Puro (CU-01, CU-02)
**Fecha**: 2026-05-21
**Participantes**: Liam (Usuario) + Gemini CLI

### Contexto de la Sesión
Arranque oficial del proyecto. El objetivo es establecer un entorno de trabajo disciplinado para implementar un modelo UML previamente diseñado por el grupo de Liam.

**Prompt clave de Liam**:
> "tengo que hacer un proyecto para clase en el que tengo que codificar enteramente contido un proyecto que tenemos modelado... el modelado lo tengo todo en un github... quiero trabajar como lo he hecho en el repo de modelado... vamos a hacer primero el analysis y diseño y una vez lo tengamos hacemos la implementacion."

### Desarrollo Principal
1.  **Metodología RUP Pragmático**: Se decide adoptar RUP para garantizar el rigor académico. Se crea la estructura de carpetas: Requisitos (00), Análisis (01) y Diseño (02).
2.  **Hito de Alcance**: Redacción de `QUE_HACE.md`. Se elimina la mención a "Inteligencia Artificial" para centrar el sistema en la gestión de datos, delegando el escaneo a un servicio externo conceptual.
3.  **Análisis BCE Inicial**: Identificación de clases para CU-01 (Corregir) y CU-02 (Generar).

---

## Conversación 02: Recuperación de Contexto y Gestión de Pull Requests
**Fecha**: 2026-05-24
**Participantes**: Liam + Gemini CLI

### Contexto de la Sesión
Reinicio de sesión. Se valida la memoria de la IA y se optimiza el flujo de trabajo en Git.

**Prompt clave de Liam**:
> "primero de todo recuerdas lo que hicimos la ultima vez? [...] quiero que sigamos con los que estabamos haciendo pero lo unico es para los pull request a develop quiero que hagamos mas trabajo para cada uno no solo un caso de uso"

### Desarrollo Principal
- Se acuerda agrupar los casos de uso en bloques por Pull Request para agilizar el avance.
- Se confirma la consistencia con el proyecto de referencia `pySigHor`.

---

## Conversación 03: Bloque de Análisis 2 - Configuración e Importaciones
**Fecha**: 2026-05-24
**Participantes**: Liam + Gemini CLI

### Contexto de la Sesión
Inicio de la ejecución por bloques en la rama `feat/analisis-puro-bloque-2`.

**Prompt clave de Liam**:
> "si quiero que hagamos unos 4 casos de uso por pull request"

### Desarrollo Principal
- Análisis de CU-03 (Importar Configuración Global), CU-04 (Exportar), CU-05 (Alumnos) y CU-06 (Preguntas).
- Se establece la importancia de la atomicidad en las cargas masivas.

---

## Conversación 04: Bloque de Análisis 3 - CRUD y Aceleración
**Fecha**: 2026-05-24
**Participantes**: Liam + Gemini CLI

### Contexto de la Sesión
Decisión de procesar los 35 casos de uso restantes en tres bloques masivos.

**Prompt clave de Liam**:
> "vale vamos a hacer los que quedan en tres bloques"

### Desarrollo Principal
- Análisis de CU-07 a CU-18.
- Definición de CRUDs para las entidades principales.
- Se introduce el patrón de "Creación Delgada" con redirección a edición.

---

## Conversación 05: Sincronización de Ramas y Cambio a Develop
**Fecha**: 2026-05-24
**Participantes**: Liam + Gemini CLI

### Contexto de la Sesión
Gestión de una incidencia de merge y cambio de flujo a trabajo directo en `develop`.

**Prompt clave de Liam**:
> "vale una cosa voy a mergear todo a develop y a partir de ahora mejor hacemos todo en develop y luego ya lo haremos bien merge en main y quiero preguntar si tenemos alguna forma de ponder lo que hacemos en cada commit para no perderme"

### Desarrollo Principal
- Se establece el uso de commits detallados.
- Análisis Bloque 4 (CU-19 a CU-30): Vistas de listado y procesos de eliminación.

---

## Conversación 06: Bloque de Análisis 5 y Cierre de Fase Agnóstica
**Fecha**: 2026-05-24
**Participantes**: Liam + Gemini CLI

### Contexto de la Sesión
Finalización de los casos de uso pendientes para completar el análisis.

**Prompt clave de Liam**:
> "vale entonces todo esta bien ya no? pues si es asi continuamos"

### Desarrollo Principal
- Análisis de CU-31 a CU-41 (Respuestas, Sesión, Exportaciones específicas).
- El proyecto alcanza el hito de los 41 casos de uso analizados según el patrón BCE.

---

## Conversación 07: Auditoría y Refactorización Estructural (pySigHor)
**Fecha**: 2026-05-24
**Participantes**: Liam + Gemini CLI

### Contexto de la Sesión
El usuario solicita elevar la calidad documental al nivel del proyecto de referencia.

**Prompt clave de Liam**:
> "vale pero de la parte de analisis no faltan cosas? quiero que te bases en sighor para todo lo que tenemos que hacer para nuestro proyecto"

### Desarrollo Principal
- **Auditoría**: Se identifica la falta de diagramas de robustez y jerarquía de carpetas.
- **Refactorización**: Migración de los 41 CUs a carpetas individuales con `README.md` enriquecidos y diagramas `colaboracion.puml`.
- **Sincronización**: Se puebla `/00-casos-uso` con activos del `ModelingRepo`.

---

## Conversación 08: Selección de Stack Tecnológico y Arquitectura
**Fecha**: 2026-05-24
**Participantes**: Liam + Gemini CLI

### Contexto de la Sesión
Apertura de la Fase de Diseño. Debate sobre el lenguaje de programación.

**Prompt clave de Liam**:
> "creo que prefiero java porque es lo que mas entiendo y asi podemos debatir mejor las cosas que te parece?"

### Desarrollo Principal
- **Decisión**: Se elige **Java 21 + Spring Boot 3 + PostgreSQL**.
- **Arquitectura**: Se define una estructura de **3 Capas** (Presentation, Business, Data).
- Se explica el funcionamiento de Spring Boot (IoC, DI) para alinearlo con IDSW2.

---

## Conversación 09: Diseño Técnico de Casos Core (Secuencia)
**Fecha**: 2026-05-24
**Participantes**: Liam + Gemini CLI

### Contexto de la Sesión
Necesidad de detallar los flujos técnicos antes de codificar.

**Prompt clave de Liam**:
> "vale antes de eso deberiamos de hacer los diagramas de secuencia que habiamos dejado pendientes para hacer ahora en la fase de diseño"

### Desarrollo Principal
- Creación de diagramas de secuencia para CU-01, 02, 03 y 09.
- **Debate de IA**: Se acuerda el uso de interfaces y simulación JSON para la corrección delegada.
- **Debate de Importación**: Se acuerda la estrategia **UPSERT** basada en claves naturales (DNI/Código).

---

## Conversación 10: Resolución de Conflictos sobre la Clave de Corrección
**Fecha**: 2026-05-24
**Participantes**: Liam + Gemini CLI

### Contexto de la Sesión
Debate sobre el momento exacto en que se genera la clave del examen.

**Prompt clave de Liam**:
> "como funciona la clave unica de cada examen es que esa clave ya esta digamos por defecto asiganada a un estudiante especifico [...] quiero que veas lo que tenemos nosotros detallado de ese caso de uso en el repo de modelado"
> "2.pues no sabria decirte primero de todo quiero que mires todo los archivos del modelado a ver si hemos detallado algo sobre eso"

### Desarrollo Principal
- **Investigación**: Gemini audita el Glosario y el diagrama de estados del examen en el `ModelingRepo`.
- **Hito**: Se confirma que la clave se genera en la **Asignación** mediante un **Hash (MD5/SHA)** que une datos del examen, respuestas y alumno. Se acuerda un flujo de asignación permisivo (B).

---

## Conversación 11: Refinamiento de Workflow y Memoria Persistente
**Fecha**: 2026-05-26
**Participantes**: Liam + Gemini CLI

### Contexto de la Sesión
Blindaje de la continuidad del proyecto y ajuste de las reglas de actualización del log.

**Prompt clave de Liam**:
> "puedes asegurarte de que tienes todo en memoria para no tener que explicar todo el metodo de trabajo [...] quiero que se vaya actualizando para que cada vez que 'nazcas' no tenga que volver a explicarlo"

### Desarrollo Principal
1.  **Blindaje**: Creación de `CONTEXTO_PROYECTO.md` con instrucciones imperativas.
2.  **Workflow**: Se establece el trabajo en `develop` y la actualización progresiva del log.

---

## Conversación 12: Diseño del Modelo Físico de Datos (DER)
**Fecha**: 2026-05-26
**Participantes**: Liam + Gemini CLI

### Contexto de la Sesión
Debate y definición de la estructura de base de datos para PostgreSQL.

**Prompt clave de Liam**:
> "no entiendo muy bien lo q te refieres con una tabla especifica la verdad. 2 yo diria que me parece bien pero tambien pero me vas a tener que explicar como funciona"

### Desarrollo Principal
- **Conceptualización**: Se explica la diferencia entre el **Modelo de Examen** (Template) y el **Ejemplar** (Instancia del alumno).
- **Clave de Corrección**: Se detalla el flujo de generación (Hash MD5/SHA) y su uso durante el escaneo de la IA.
- **Resultado**: Creación de un DER de 11 tablas incluyendo `student_exams` como entidad central para la evaluación.

---

## Conversación 13: Inicio de Construcción y Mapeo JPA
**Fecha**: 2026-05-26
**Participantes**: Liam + Gemini CLI

### Contexto de la Sesión
Transición a la Fase de Construcción y aprendizaje del stack Spring Boot.

**Prompt clave de Liam**:
> "vale como nunca he utilizado spring boot vas a tener que explicarme que es cada cosa"

### Desarrollo Principal
1.  **Configuración Inicial**: Creación del `pom.xml` con dependencias de Spring Data JPA, Web, PostgreSQL y Lombok.
2.  **Mapeo del Dominio**: Traducción del DER a clases Java `@Entity`. Se implementan las 11 entidades y los Enums de control.
3.  **Capa de Persistencia**: Creación de interfaces `@Repository` extendiendo de `JpaRepository`. Se introduce el concepto de **Query Methods** (ej. `findByDni`).
4.  **Sincronización Git**: Se establece la política de commits frecuentes en la rama `develop`.

---

## Conversación 14: Infraestructura Técnica y Primeros Servicios
**Fecha**: 2026-05-26
**Participantes**: Liam + Gemini CLI

### Contexto de la Sesión
Implementación de los servicios base y resolución de problemas de entorno (Java/Maven).

**Prompt clave de Liam**:
> "no me salen bien los diagramas en el readme"
> "vale como nunca he utilizado spring boot vas a tener que explicarme que es cada cosa"

### Desarrollo Principal
1.  **Resolución de Docs**: Uso de *cache-busting* (`?v=...`) para forzar la visualización de los diagramas traducidos al español.
2.  **Arquitectura de Servicios**: Implementación de `ServicioAlumno`, `ServicioProfesor`, `ServicioAsignatura` y `ServicioTema` con lógica de **UPSERT** y atomicidad (`@Transactional`).
3.  **Patrón DTO**: Introducción de los *Data Transfer Objects* para desacoplar la API de la base de datos.
4.  **Entorno**: Se identifica la necesidad de JDK 21 y Maven. El usuario procede con la instalación técnica.

---

## Conversación 15: Configuración de Maven e Implementación de CU-09
**Fecha**: 2026-05-29
**Participantes**: Liam + Gemini CLI

### Contexto de la Sesión
Verificación del entorno y continuación de la lógica de negocio (Asignación de Exámenes).

**Prompt clave de Liam**:
> "puedes comprobar si java y maven estan bien instalados con las versiones correctas y todo para poder seguir continuando con el proyecto jorgestor"
> "añadir al convesation log, commits frequentes a develop... vamos a seguir con la logica,seguro que sabes todo el contexto no?"

### Desarrollo Principal
1.  **Entorno**: Instalación de **Maven 3.9.16** y configuración de `MAVEN_HOME`. Solución de error en `pom.xml` (caracteres extraños en dependencia PostgreSQL).
2.  **Lógica CU-09**: Implementación de `ServicioExamen` para gestionar la vinculación de alumnos y exámenes.
3.  **Hito de Seguridad**: Diseño del algoritmo de generación de la **Clave de Corrección** usando SHA-256 (DNI + ID Examen + Salt), cumpliendo con la trazabilidad de diseño.

---

## Conversación 16: Implementación de CU-02 y Consolidación a Main
**Fecha**: 2026-05-29
**Participantes**: Liam + Gemini CLI

### Contexto de la Sesión
Finalización de infraestructura y desarrollo de la lógica de generación aleatoria.

**Prompt clave de Liam**:
> "1. el map asumo que es para poner ciertos parametros especificos [...] 2.no hemos incluido algun parametro para elejir los temas de las preguntas no?"
> "vale acabo de hacer el pull request puedes comprobar que esta todo en main y procedemos a continuar con nuestra nueva sesion de hoy"

### Desarrollo Principal
1.  **Consolidación**: Se realiza el merge de `develop` a `main` tras validar el arranque con PostgreSQL 17.
2.  **Lógica CU-02**: Implementación de la generación de exámenes estratificada. Se crea el `DTO_GenerarExamen` y el algoritmo de "Sacos" en `ServicioExamen`, asegurando la proporción de dificultad y el filtrado por temas.
3.  **Controlador**: Creación de `ControladorExamen` para exponer el proceso de generación vía API REST.

### 21. Validación Exitosa de CU-02 (Generación)
**Liam**: "pone que ha sido generado con exito"
**Gemini**: ¡Hito alcanzado! Verificación empírica del algoritmo de generación estratificada. Se ha validado la conexión con PostgreSQL 17, la creación de tablas mediante JPA y la lógica de "Sacos de Dificultad" a través de una prueba real en Postman. El sistema generó un examen de 5 preguntas respetando las proporciones 40/40/20.

### 22. Resolución de Conflictos IDE (Lombok) y Consolidación de CU-02
**Liam**: "podemos subir todo a github para asegurar ya lo que tenemos perfecto ademas de que todavia tienes que ir añañdiendo al convesation log"
**Gemini**: Diagnóstico profundo de un error de compilación en VS Code. Se demostró que Maven compilaba correctamente, pero el IDE no reconocía las anotaciones de Lombok. Tras intentar limpiar el *Language Server*, se restauró el código estándar temporalmente y finalmente se reconfiguró Lombok asegurando la compilación. El usuario validó la inserción exitosa en pgAdmin mediante captura de pantalla. Se preparan los cambios para consolidar el CU-02 en `main`.

### 23. Implementación y Validación de Asignación (CU-09)
**Participantes**: Liam + Gemini CLI
**Fecha**: 2026-05-30
**Contexto de la Sesión**: Tras asegurar el código de la Generación (CU-02) en `main`, el enfoque se desplazó a vincular el examen generado con los alumnos de prueba inyectados previamente, cerrando así el ciclo de evaluación.
**Prompt Clave de Liam**: *"el draft me parece perfecto adelante"* y *"se ha asignado correctamente 3 alumnos"*
**Desarrollo Principal**:
- Se recuperó el entorno de trabajo en `develop` tras un leve conflicto con el índice de Git al hacer un checkout.
- Se implementó `DTO_AsignarExamen` y se expuso el endpoint `POST /api/examenes/asignar` en el `ControladorExamen`.
- La lógica subyacente invocó al algoritmo SHA-256 (DNI + ID Examen + Salt temporal), asegurando la unicidad absoluta de cada ejemplar.
- **Validación Empírica**: Liam ejecutó el JSON de prueba en Postman, logrando la asignación del examen ID 1 a tres alumnos. El sistema respondió confirmando la generación exitosa de las firmas de seguridad, validando la integridad del proceso.

### 24. Optimización del Workflow (Batching PRs) e Inicio de Épica I/O
**Participantes**: Liam + Gemini CLI
**Fecha**: 2026-05-30
**Contexto de la Sesión**: Discusión sobre la frecuencia de los Pull Requests hacia `main`.
**Prompt Clave de Liam**: *"a ver un momento no podemos estar haciendo un pull request para cada uno es inviable vamos a hacerlo cada unos cuantos"*
**Desarrollo Principal**:
- Se actualizó la Regla de Oro #2 en `CONTEXTO_PROYECTO.md` para establecer que los PRs se agruparán en bloques lógicos (Épicas) en lugar de por cada CU individual.
- Se definió el siguiente bloque lógico: **Gestión de Entradas/Salidas (Importaciones y Exportaciones)**, compuesto por CU-03, CU-06 y CU-04.
- La IA revisó el código existente de `ServicioAlumno` y `ControladorAlumno` para preparar el borrador del CU-03 (Importar Alumnos).

### 25. Refinamiento de CU-03 (Importar Alumnos) - Fidelidad al Diagrama de Contexto
**Participantes**: Liam + Gemini CLI
**Fecha**: 2026-05-30
**Contexto de la Sesión**: Inicio del bloque lógico de "Entradas/Salidas". Se propuso un borrador para el CU-03 que sugería la auto-creación de grados si estos no existían durante la importación masiva de alumnos.
**Prompt Clave de Liam**: *"en principio suena muy bien la "autoasignacion" pero en realidad no poruque igual si el grado no esta creado es por algo y de esta forma solo porque estas importando alumnos ahora has creado un grado, tenemos que seguir fieles dentro de lo que cabe a lo que puede hacer cada caso de uso y eso lo especificamos en el diagrama de contexto"*
**Desarrollo Principal**:
- Corrección arquitectónica: Se descartó la auto-creación para respetar la separación de responsabilidades definida en el Modelo de Casos de Uso.
- Se refinó el `ServicioAlumno` reforzando la anotación `@Transactional` (Todo o Nada).
- Se mejoró el manejo de excepciones (`orElseThrow`), diseñando un mensaje de error explícito que identifica al alumno problemático y detiene la transacción por completo si su Grado no está registrado previamente en el sistema.
- **Validación Empírica**: Tras resolver un problema de sintaxis en Postman y cambiar el puerto por defecto a `9090`, Liam ejecutó dos pruebas: una exitosa y otra forzando un error. El sistema devolvió correctamente el mensaje: *"Error al importar a Luis Perez... El grado con código 'GZZ' no existe"*, demostrando la robustez transaccional del sistema.

### 26. Implementación y Validación de CU-06 (Importar Preguntas)
**Participantes**: Liam + Gemini CLI
**Fecha**: 2026-05-30
**Contexto de la Sesión**: Continuación del bloque de "Entradas/Salidas". El objetivo es permitir la carga masiva de la batería de preguntas junto con sus opciones de respuesta, asegurando la integridad referencial.
**Prompt Clave de Liam**: *"vale funciona perfecto mira mi captura"* y *"todavia tengo que probar los otros escenarios de importar preguntas"*
**Desarrollo Principal**:
- Se implementó `ServicioPregunta` con lógica de persistencia en cascada para Preguntas y Respuestas.
- Se detectó y resolvió un error de mapeo JPA (`not-null constraint`) en la tabla `respuestas`: se normalizó el esquema eliminando columnas redundantes y alineando el campo `texto`.
- **Validación Empírica**: Liam ejecutó dos escenarios. El primero insertó correctamente 2 preguntas y 8 respuestas (verificado mediante conteo SQL). El segundo escenario validó la protección del sistema al rechazar una importación con un `temaId` inexistente (999), demostrando que la arquitectura no permite datos huérfanos.

---
*Este registro continuará con la implementación de Exportar Examen (CU-04).*



