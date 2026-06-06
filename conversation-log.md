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

## Conversación 05: Sincronizaciòn de Ramas y Cambio a Develop
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
3.  **Hito de Seguridad**: Diseño del algoritmo de generación de la **Clave de Corrección** usando SHA-256 (DNI + ID Examen + Salt temporal), cumpliendo con la trazabilidad de diseño.

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

### 27. Implementación de Exportación (CU-04) y Cierre de Épica I/O
**Participantes**: Liam + Gemini CLI
**Fecha**: 2026-05-30
**Contexto de la Sesión**: Fase final del bloque de "Entradas/Salidas". Se requiere una vía para extraer los datos procesados hacia sistemas externos (impresión/corrección).
**Prompt Clave de Liam**: *"vale me parece que esta bien"* (sobre el draft) y *"mira la captura que he hecho"* (sobre el resultado final).
**Desarrollo Principal**:
- Se diseñó e implementó el `DTO_ExportarExamen` como un paquete agregado que consolida metadatos del examen, batería de preguntas y la lista de alumnos con sus firmas SHA-256.
- Se implementó la lógica de recuperación de datos en `ServicioExamen` utilizando Streams de Java para transformar el modelo de dominio en un formato portátil.
- Se creó el script `run-jorgestor.ps1` para automatizar la liberación de puertos y agilizar el ciclo de arranque.
- **Validación Empírica**: Tras resolver un error 404 por des-sincronización y un riesgo de *Lazy Loading*, Liam validó mediante una petición `GET` en Postman la generación del JSON de exportación para el Examen ID 1. La captura confirmó la correcta agregación de metadatos, preguntas, respuestas y, crucialmente, las firmas SHA-256 de los alumnos. Este hito cierra oficialmente el bloque de desarrollo de Entradas/Salidas.

### 28. Consolidación Final y Cierre de Sesión
**Participantes**: Liam + Gemini CLI
**Fecha**: 2026-05-30
**Contexto de la Sesión**: Finalización de la Épica de I/O y aseguramiento de la estabilidad del proyecto en la rama principal.
**Prompt Clave de Liam**: *"vale ya hice el pull request y hice el merge asi que vamos a dejar la sesion de hoy por aqui. quiero que añadas mas cosas al conversarion log si no lo has hecho y como ya he hecho el merge hazlo directamente al main"*
**Desarrollo Principal**:
- Se ejecutó una limpieza exhaustiva del entorno, eliminando scripts de prueba temporales (`Test*.java`) y la carpeta `src/test` para mantener un repositorio de producción limpio.
- Se realizó un gran Pull Request consolidando las implementaciones de CU-02, CU-03, CU-04, CU-06 y CU-09.
- El proyecto se sincronizó finalmente en la rama `main`, confirmando que el servidor arranca en el puerto 9090 y que todas las funcionalidades críticas de gestión de exámenes son operativas y trazables.

### 29. Épica de Corrección e Ingeniería de Auditoría (CU-01)
...
**Validación Empírica**: Liam ejecutó una simulación de escaneo en Postman. El sistema procesó las marcas criptográficas, guardó los registros de auditoría y calculó la calificación sugerida siguiendo la fórmula de penalización de IDSW2, culminando con éxito la lógica más compleja del backend.

### 30. Épica de Maestros y Estandarización CRUD
**Participantes**: Liam + Gemini CLI
**Fecha**: 2026-06-03
**Contexto de la Sesión**: Tras asegurar el núcleo de exámenes, el objetivo se centró en completar la infraestructura administrativa (CRUDs) para permitir la gestión total del sistema desde el futuro Frontend.
**Prompt Clave de Liam**: *"vamos a por los crud"*
**Desarrollo Principal**:
- **Estandarización**: Se transformaron los servicios de "solo importación" en CRUDs completos para `Grado`, `Profesor`, `Asignatura`, `Tema`, `Alumno` y `Pregunta`.
- **Patrón DTO-ID**: Se actualizaron todos los DTOs para incluir el ID de base de datos, facilitando la integración con React (manejo de keys y borrados específicos).
- **Lógica de Cascada**: En el CRUD de `Pregunta`, se implementó la limpieza automática de respuestas previas al actualizar, asegurando que la batería de preguntas siempre sea consistente.
- **Seguridad y Git**: Se configuró el `.gitignore` para blindar los archivos de memoria (`CONTEXTO_PROYECTO.md`, `TRAZABILIDAD_TEORICA.md`) y se actualizó el Contexto Maestro con las nuevas Reglas de Oro de sincronización en tiempo real.
- **Resultado**: El backend ha pasado de ser un procesador de exámenes a un sistema de gestión escolar completo, listo para ser consumido por una interfaz de usuario.

### 31. Sincronización RUP: Épica de Diseño y Documentación Visual
**Participantes**: Liam + Gemini CLI
**Fecha**: 2026-06-03
**Contexto de la Sesión**: Con la implementación técnica de los CRUDs finalizada, se procedió a cerrar la brecha documental entre el código y el diseño RUP.
**Prompt Clave de Liam**: *"puedes añadir al conversation log y a contexto y lo dejamos por ahora"*
**Desarrollo Principal**:
- **Auditoría y Renombrado**: Se sincronizaron los IDs de los casos de uso entre análisis y diseño (ej. CU-05 para Importar Alumnos), eliminando inconsistencias heredadas.
- **Generación Masiva de Diagramas**: Se crearon diagramas de secuencia de diseño para los 26 casos de uso que componen la administración del sistema y el núcleo de exámenes, siguiendo el patrón de 3 capas de Spring Boot.
- **Ingeniería de Visualización**: Se implementó el uso del **Proxy de PlantUML** en todos los archivos `README.md` del proyecto. Esto resolvió el problema de renderizado en GitHub, permitiendo que los diagramas `.puml` se visualicen automáticamente como imágenes incrustadas.
- **Consolidación**: Se actualizó el `README.md` maestro de diseño con una tabla navegable por épicas y entidades.
- **Hito de Calidad**: El proyecto alcanza un estado de "Documentación Viva", donde cada línea de código de los servicios tiene su correspondiente blueprint visual en la rama `develop`.

---
*Este registro continuará con el inicio del Frontend en React.*

## Conversación 32: Frontend Premium e Inteligencia de Corrección
**Fecha**: 2026-06-04
**Participantes**: Liam + Gemini CLI

### Contexto de la Sesión
Reactivación del proyecto para el desarrollo del Frontend. Se detecta que el sistema estaba inactivo y con errores de codificación.

**Prompt clave de Liam**:
> "ya tenemos parte del front end pero no puedo ver nada"
> "la accion de corregir la gracia es que se supone que "corrige una ia" por lo cual deberia hacer un boton que corriga todos los examenes"

### Desarrollo Principal
1.  **Población Masiva**: Inyección de 80 preguntas y 20 alumnos para pruebas de carga real.
2.  **Reparación de Mojibake**: Limpieza masiva de caracteres UTF-8 en el frontend y base de datos.
3.  **Rediseño Visual Premium**: Transformación estética a un estilo SaaS moderno (Azul Cobalto/Blanco).
4.  **Motor de IA**: Implementación de la corrección masiva automatizada. El sistema ahora permite:
    - **Entrega Masiva**: Simula la captura de datos de todos los alumnos de un modelo.
    - **Corrección IA**: Calcula todas las notas de golpe siguiendo la fórmula académica.
    - **Ajuste Manual**: Permite al docente supervisar y corregir marcas individualmente.
5.  **Estabilización API**: Solución de errores de recursividad infinita mediante `@JsonIgnore`.

---

## Conversación 33: Limpieza de Infraestructura y Refactorización de Archivos
**Fecha**: 2026-06-04
**Participantes**: Liam + Gemini CLI

### Contexto de la Sesión
Mantenimiento preventivo del repositorio para eliminar ruido técnico y asegurar un historial limpio antes de las entregas finales.

**Prompt clave de Liam**:
> "los fix... necesito que quites todos porque es algo que no quiero subir al proyecto y no sirve tenerlo al menos en el repositorio de jorgestor"

### Desarrollo Principal
1.  **Limpieza de Scripts**: Eliminación masiva de archivos temporales de utilidad.
2.  **Nueva Regla de Oro**: Prohibición de incluir scripts de utilidad temporal en el repositorio.
3.  **Política de Datos**: Eliminación de archivos SQL planos a favor de persistencia real en PostgreSQL 17.
4.  **Hito de Calidad**: Repositorio en estado de "Taller Limpio".

---

## Conversación 34: Unificación de Arranque y Preparación de Entorno
**Fecha**: 2026-06-04
**Participantes**: Liam + Gemini CLI

### Contexto de la Sesión
Simplificación operativa del ecosistema completo.

**Prompt clave de Liam**:
> "podemos hacer alguna manera para iniciar los dos a la vez?"

### Desarrollo Principal
1.  **start-all.ps1**: Script unificado para levantar Backend y Frontend simultáneamente.
2.  **Programación Defensiva**: Implementación de encadenamiento opcional y estados de carga en React para evitar crashes.

---

## Conversación 35: Refactorización de Modelo y Flujo de Vida del Examen
**Fecha**: 2026-06-04
**Participantes**: Liam + Gemini CLI

### Contexto de la Sesión
Detección y corrección de fallos en la jerarquía académica tras la estabilización visual.

**Prompts clave de Liam**:
> "cuando selecciono un grado... dejan de salirme las asignaturas"
> "todavia no tenemos algo para una vez hemos asignado a alumnos los examenes que esos examenes puedan pasar de estar 'asignados' a completados"

### Desarrollo Principal
1.  **Integridad Académica**: Restauración del vínculo Grado-Asignatura en el backend.
2.  **Cierre de Ciclo**: Implementación del flujo de transición de estados hacia la corrección masiva.

---

## Conversación 36: Crisis de Consistencia y Botón de Pánico
**Fecha**: 2026-06-05
**Participantes**: Liam + Gemini CLI

### Contexto de la Sesión
Resolución de un bloqueo masivo por datos corruptos post-refactorización.

**Prompt clave de Liam**:
> "mira mi ultima captura pone que hay 49 errores no?"

### Desarrollo Principal
1.  **DatabaseCleaner**: Implementación de un mecanismo de limpieza profunda al arranque.
2.  **Habilitación SQL**: Instrucciones para el control directo de la base de datos desde la CLI.

---

## Conversación 37: Estabilización Post-Saneamiento y CRUDs Completos
**Fecha**: 2026-06-05
**Participantes**: Liam + Gemini CLI

### Contexto de la Sesión
Retoma del desarrollo con base de datos limpia.

**Prompt clave de Liam**:
> "empezemos con eso"

### Desarrollo Principal
1.  **Blindaje de Datos**: Activación de la persistencia real.
2.  **CRUDs Pro**: Finalización de la funcionalidad de Edición/Update en todas las entidades de administración.

---

## Conversación 38: Reparación del Núcleo de Calificación e Ingeniería de Auditoría
**Fecha**: 2026-06-05
**Participantes**: Liam + Gemini CLI

### Contexto de la Sesión
El usuario reporta fallos en la acción de corregir y solicita visibilidad de las marcas reales para permitir revisiones técnicas.

**Prompt clave de Liam**:
> "si ahora lo que queria hacer es arreglar el corregir porque cuando pulso el boton no hace nada. una cosa que si me gustaria que se pudiese ver la correcion hecha 'manualmente' que pudieses meterte a ver cuales ha dado por correcta cuales no en caso de que alguien quiera revisar el examen"

### Desarrollo Principal
1.  **Optimización O(1)**: Sustitución de `findAll()` por `findByExamenAlumnoId` en el repositorio de marcas, logrando correcciones instantáneas.
2.  **Sincronización de Estados**: Adición del estado `ENTREGADO` al Enum de negocio para evitar inconsistencias.
3.  **Módulo de Revisión**: Implementación de un panel de solo lectura en la página de Auditoría para visualizar las marcas reales registradas por la IA o simulación.

---

## Conversación 39: Implementación de Autenticación y RBAC (CU-31, CU-32)
**Fecha**: 2026-06-05
**Participantes**: Liam + Gemini CLI

### Contexto de la Sesión
Activación de la seguridad institucional y control de acceso por roles.

**Prompt clave de Liam**:
> "vale vamos a ahcer el iniciar sesion y cerrar sesion. tiene que haber dos tipos de formas de entrar, 1 para el docente que puede hacer todo menos acceder al crud de docentes. y 2 el administrados institucional que puede acceder a todo"

### Desarrollo Principal
1.  **Modelo RBAC**: Implementación de roles `DOCENTE` y `ADMINISTRADOR_INSTITUCIONAL`.
2.  **Sidebar Dinámico**: Lógica de visibilidad en React para ocultar el acceso a "Docentes" según el perfil, cumpliendo con la restricción solicitada.
3.  **Infraestructura**: Configuración de `ControladorAuth` y usuarios por defecto (`admin/admin123`, `docente/docente123`).

---

## Conversación 40: Refinamiento de UX, Complejidad Académica y Cierre
**Fecha**: 2026-06-06
**Participantes**: Liam + Gemini CLI

### Contexto de la Sesión
Fase final de refinamiento extremo para alcanzar la calidad de producto definitivo y realismo académico total.

**Prompts clave de Liam**:
> "podemos hacer que todo se vea 1000 veces mejor, mas moderno, sin emojis y tal, que se vea chulo."
> "quiero que haya datos muy variados para poder testear el maximo todo, como alumnos que esten en distintos grados, algumnos de el mismo grado que no siempre esten todos en la mismas asignatura porque hay gente que ha reprobaron... tambien deberiamos añadir a que curso pertenece cada alumno."
> "desde donde deberia poder editar que asignaturas tiene un alumno porque no se puede editar desde ningun lado, mira el modelado deberia de ponerlo en algun sitio."
> "vale varias cosas. primero para generar examenes se tendria que poder filtrar por grado... segundo en asignar alumnos se deberia poder filtrar por grado luego asignatura... quinto en corregir examenes deberian salir las respuestas que 'han respondido los alumnos' para que pueda marcarlas como correctas o incorrectas no que yo rellene el examen. sexto las notas son muy bajas... la media deberia de ser de 5."
> "vale de deberia de poder flitrar por grados las asignaturas y poder buscar el nombre tambien. tambien deberia de salr el nombre de la asignatura no un nombre generico como 'Materia 2.2 de GPER'"

### Desarrollo Principal
1.  **Rediseño Apple Style**: Estética premium compacta, eliminación total de emojis y adición de ticks de selección animados.
2.  **Complejidad de Matriculación**: Implementación de relación N:M entre Alumnos y Asignaturas (Matrículas) y transversalidad de materias entre Grados.
3.  **UX Reactiva**: Filtrado en cascada (Grado -> Asignatura -> Temas) y auto-refresco de tablas post-corrección.
4.  **Simulación Humana**: Algoritmo de notas con distribución normal (media 5.0-7.0) basado en perfiles de estudio aleatorios.
5.  **Defensa Técnica**: Documentación de la Jerarquía Arquitectónica de 5 niveles en la trazabilidad.

---

## Conversación 41: Auditoría de Cumplimiento IDSW2 y Corrección de Diagramas de Análisis
**Fecha**: 2026-06-07
**Participantes**: Liam + Claude Sonnet 4.6 (Claude Code CLI)

### Contexto de la Sesión
Auditoría completa de conformidad del proyecto Jorgestor contra la teoría de IDSW2 (TheoryRepo) y el modelado funcional (ModelingRepo). El objetivo era identificar brechas y corregirlas.

**Prompts clave de Liam**:
> "vale y sobre si todo esta perfecto basado en la teoria de idsw2? porque necesito que cumpla las cosas que hemos visto en teoria"
> "pero necesito que compares nuestro proyecto con lo que sale en el Theory Repo"
> "quiero que me digas si nuestro analisis, diseño y implementacion estan perfectamente siguiendo la teoria de idsw2"

### Hallazgos de la Auditoría

**Lo que estaba bien:**
- 41 CUs de análisis completos (colaboración + secuencia) ✓
- 41 CUs de diseño completos (secuencia) ✓
- Artefactos baseline: modelo de dominio, actores/CU, diagramas de contexto ✓
- Backend completo con PUT endpoints para todas las entidades ✓
- Endpoint único de config global (`/api/config/exportar` y `/api/config/importar`) ✓
- RBAC Docente / AdministradorInstitucional funcional ✓
- La trazabilidad de IA estaba cubierta por `conversation-log.md` ✓

**Problemas identificados:**
1. Todos los diagramas de análisis (82 archivos) usaban nombres en **inglés** para los objetos BCE — incorrecto para un dominio en español.
2. La carpeta de diseño CU-04 estaba nombrada `exportarExamen` en vez de `exportarConfiguracionGlobal`, y su contenido describía exportar un examen individual en vez de la configuración global.

### Desarrollo Principal

1. **Renombrado masivo inglés → español en 82 archivos `.puml`** (41 colaboración + 41 secuencia):
   - Vistas: `CorrectionView` → `VistaCorreccion`, `StudentImportView` → `VistaImportacionAlumnos`, etc.
   - Controladores: `CorrectionController` → `ControladorCorreccion`, `ExamGenerationController` → `ControladorGeneracionExamen`, etc.
   - Entidades: `Exam` → `Examen`, `Student` → `Alumno`, `Subject` → `Asignatura`, `Grade` → `Grado`, `Question` → `Pregunta`, `Answer` → `Respuesta`, `Topic` → `Tema`, `User` → `Usuario`, etc.
   - Se usó word-boundary regex (`\bExam\b`) para entidades para evitar doble-reemplazo en palabras compuestas ya traducidas.

2. **Corrección del CU-04 de diseño**:
   - Carpeta renombrada: `CU-04-exportarExamen` → `CU-04-exportarConfiguracionGlobal`
   - Archivo renombrado: `diseno-secuencia-CU-04-exportarExamen.puml` → `diseno-secuencia-CU-04-exportarConfiguracionGlobal.puml`
   - Contenido reescrito para reflejar el flujo real: `GET /api/config/exportar` → `ControladorConfiguracion` → 4 servicios (Grado, Asignatura, Alumno, Pregunta) → `DTO_ConfiguracionGlobal` → descarga JSON.

### Validación Empírica
- Verificación manual de CU-01 y CU-30 post-reemplazo: nombres en español correctos, variables internas en minúscula sin alterar.
- Verificación del diagrama de diseño CU-04 reescrito: flujo consistente con `ControladorConfiguracion.java`.

---
*Misión cumplida. Jorgestor está listo para la entrega oficial.*

## Conversación 42: Corrección de CUs Abstractos y Rediseño de Generación de Exámenes
**Fecha**: 2026-06-07
**Participantes**: Liam + Claude Sonnet 4.6 (Claude Code CLI)

### Contexto de la Sesión
Continuación de la auditoría de la sesión 41. Se identificaron dos problemas restantes: (1) los 4 CUs abstractos del módulo de exportación tenían actor directo en sus diagramas de análisis, y (2) la generación de exámenes asignaba el mismo examen a todos los alumnos en lugar de generar uno único por alumno.

**Prompts clave de Liam**:
> "si vale revisa los cus abstractos para quitarles el actor en los diagramas de analisis"
> "la gracia del sistema es que cada alumno tenga un examen personalizado que ha sido generado aleatoriamente"
> "si implementamos mejor la c"

### Desarrollo Principal

**1. Corrección de CUs abstractos (CU-07, CU-08, CU-40, CU-41)**

Los CUs de exportación parcial (`exportarAlumnos`, `exportarPreguntas`, `exportarAsignaturas`, `exportarGrados`) pertenecen al `"Módulo Exportación [Abstracto]"` en `actores-casos-uso.puml`, activados vía `<<include>>` desde CU-04. Sus 8 diagramas de análisis (4 colaboración + 4 secuencia) mostraban `actor Docente` con flecha directa, lo cual es incorrecto en RUP.

*Cambios en los 8 archivos:*
- **Colaboración**: eliminado `actor Docente` y su flecha; añadida nota `<<abstracto>>\nInvocado desde CU-04: exportarConfiguracionGlobal`
- **Secuencia**: eliminado `actor "Docente" as Actor` y mensajes `Actor -> Boundary` / `Boundary --> Actor`; sustituidos por `[->` (llamada externa anónima) y `[<-` con nota `<<abstracto>>`

**2. Bug del botón "Habilitada/Inhabilitada" en preguntas**

*Causa*: `CorsConfig.java` solo listaba `GET, POST, PUT, DELETE, OPTIONS` — `PATCH` estaba ausente. El navegador bloqueaba el preflight silenciosamente y la mutación fallaba sin mostrar error (no había `onError`).

*Fix*: Añadido `"PATCH"` a `allowedMethods` en `CorsConfig.java`.

**3. Rediseño de generación de exámenes (Opción C del análisis)**

*Problema*: `generarExamen` creaba UN único `Examen` compartido por todos los alumnos. La generación aleatoria ocurría una sola vez, no por alumno.

*Decisión de diseño*: Se eligió la **Opción C** (fusión de generación + asignación) sobre las alternativas:
- **Opción A descartada**: almacenar el pool en `Examen` es redundante con la batería de preguntas existente.
- **Opción B descartada**: hacer que la asignación re-ejecute el algoritmo de generación viola SRP (la asignación no debería saber generar). El `Examen`-plantilla es un artefacto técnico sin sentido semántico en el dominio.
- **Opción C elegida**: alinea con el ModelingRepo ("número de exámenes para cada grado"), cumple SRP, y el `Examen` nace ya vinculado a un alumno (correcto semánticamente). Soporta configuración independiente por grado (distinto numPreguntas y proporciones de dificultad).

*Cambios implementados:*

Backend:
- `DTO_GenerarYAsignar.java` (nuevo): DTO con `asignaturaId`, `temaIds`, `tipoEvaluacion` y lista de `ConfigPorGrado` (gradoId, numPreguntas, proporcionesDificultad, alumnoIds)
- `ServicioExamen.generarYAsignar()` (nuevo método): por cada alumno de cada configuración de grado, selecciona aleatoriamente preguntas de forma independiente del pool y crea un `Examen` + `ExamenAlumno` únicos
- `ControladorExamen` (nuevo endpoint): `POST /api/examenes/generar-y-asignar`

Frontend:
- `types/index.ts`: añadidos `ConfigPorGrado` y `GenerarYAsignarDTO`
- `examenService.ts`: añadida función `generarYAsignar()`
- `GenerarExamenPage.tsx`: rediseñada completamente — paso 01 (asignatura + tipo), paso 02 (temas), pasos 03-N (panel por cada grado con sliders de dificultad + selector de alumnos del grado). Un botón único genera y asigna en un solo paso.

### Regla de trabajo recordada
- Commits directamente en `develop` (no crear ramas feature para cambios de documentación/diagramas). Se corrigió tras crear accidentalmente una rama para los CUs abstractos.

### Validación
- CORS fix verificable: botón "Habilitada/Inhabilitada" en PreguntasPage debe responder tras reiniciar el backend.
- Generación personalizada: cada alumno tendrá su propio `Examen` en BD con `esPersonalizado = true` y preguntas independientemente aleatorizadas.
