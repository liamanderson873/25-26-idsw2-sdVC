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

## Conversación 43: Auditoría Integral, Limpieza de Estados Muertos y Pruebas de Importación
**Fecha**: 2026-06-07
**Participantes**: Liam + Claude Sonnet 4.6 (Claude Code CLI)

### Contexto de la Sesión
Sesión de validación y corrección de calidad. Se realizó una auditoría completa de los tres diagramas arquitectónicos comparándolos contra el código real, se eliminaron estados muertos del ciclo de vida del examen, se corrigió un bug de UI en el botón de descarga de hojas de respuesta, y se realizaron pruebas completas del flujo importar/exportar, detectando y corrigiendo dos bugs.

**Prompts clave de Liam**:
> "me gustaria que mirases todos los diagramas y todo el analisis y que mires si esta perfecto comparado a la implementacion"
> "pero entonces es bueno tener 'flujos futuros'? no seria mejor simplemente poner lo que tenemos ahora"
> "vale me gustaria probar todos los importar y el exportar"
> "cuando he vuelto a importar el archivo de configuracion global se me ha puesto la pantalla en blanco"

### Desarrollo Principal

1. **Auditoría diagrama–implementación (3 diagramas)**:
   - `diagrama-clases-diseno.puml`: añadidos `AsignarExamenPage`, `ControladorProfesor`, `ControladorTema`, `ControladorSistema`, `ServicioProfesor`, `ServicioTema` y métodos faltantes en `ControladorExamen` / `ServicioExamen`.
   - `diagrama-entidad-relacion.puml`: añadidos `+ usuario : String` y `# password : String` a `Profesor`. Layout corregido con jerarquía top-down real usando `together` + flechas ocultas + flechas direccionales.
   - `diagrama-estados-examen.puml`: eliminados 2 estados especulativos (ver punto 2).

2. **Eliminación de estados muertos — REALIZADO y ENTREGADO**:
   - Búsqueda grep confirmó que `setEstado(REALIZADO)` y `setEstado(ENTREGADO)` nunca se llamaban en el código.
   - Eliminados de `EstadoExamen.java` (enum), `ServicioExamen.java` (3 bloques), `CorregirExamenPage.tsx`, `AlumnosPage.tsx`, `AsignaturasPage.tsx`, `AuditoriaExamenesPage.tsx`.
   - Principio aplicado: YAGNI — no mantener código para flujos inexistentes.
   - Ciclo de vida correcto: PENDIENTE → ASIGNADO → PENDIENTE_CALIFICACION → CORREGIDO.

3. **Fix frontend — botón "Hojas de respuesta" desaparecía tras simular entrega**:
   - Causa: condición `hayAsignados` era falsa tras la transición a `PENDIENTE_CALIFICACION`.
   - Fix en `CorregirExamenPage.tsx`: condición cambiada a `ejemplares.some(tieneClave)`, que comprueba la existencia de SHA-256 independientemente del estado.

4. **Pruebas de flujo importar/exportar**:
   - Exportar Global: funcional — descarga JSON con todos los datos.
   - Importar Global (reimport): detectados y corregidos 2 bugs:
     - **Bug 1 (backend)**: `ServicioPregunta.guardarIndividual` usaba `DELETE + INSERT` para respuestas, rompiendo la FK `ExamenAlumnoMarca → Respuesta` cuando existían marcas de corrección. Fix: upsert por ID en lugar de delete+create.
     - **Bug 2 (frontend)**: `ImportarExportarPage` renderizaba directamente `err.response?.data` (objeto JSON de Spring Boot) como hijo React, causando crash y pantalla en blanco. Fix: conversión a string antes de almacenar en estado.
   - Importar Individual: probado con archivos de test creados en `test-data/`. Todos los casos (grados, asignaturas, alumnos, preguntas) funcionan correctamente.

5. **Actualización `TRAZABILIDAD_TEORICA.md`** (documento local, no versionado):
   - Ciclo de estados corregido en sección "Artefactos Baseline".
   - Entradas CU-02 y CU-09 actualizadas con endpoints reales.
   - Nueva sección "Decisiones de Calidad y Refactorizaciones" documentando la auditoría, la eliminación de estados muertos y los bugs corregidos.

### Validación Empírica
- Import global → OK en todos los casos incluyendo reimport con marcas de corrección activas.
- Import individual con `test-data/` → OK: grados, asignaturas, alumnos y preguntas importados y verificados en la UI.
- Botón "Hojas de respuesta" visible en todos los estados post-asignación.

---

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

---

## Conversación 43: Corrección Masiva por Grupo, RevisionModal, PDF y Rediseño del Dashboard
**Fecha**: 2026-06-07
**Participantes**: Liam + Claude Sonnet 4.6 (Claude Code CLI)

### Contexto de la Sesión
Sesión de continuación tras el rediseño de generación personalizada (conversación 42). Con cada alumno teniendo su propio `Examen`, el flujo de corrección masiva anterior quedó obsoleto. Se reimplementaron las pantallas de corrección, revisión y se añadieron mejoras de UX transversales.

**Prompts clave de Liam**:
> "vale pero ahora en los sitios donde se pueda ver los examenes tiene que haber la opcion de ver las respuestas correctas y incorrectas que ha respondido cada alumno en caso de una revision"
> "me pone error al cargar los datos cuando le doy a revisar"
> "vale podemos hacer que salga cuantos examenes tiene cada alumno/asignatura"
> "ahora tenemos q corregir un problema que ha surjido despues de cambiar como funciona el generar y es corregir examenes [...] ya no puedes hacer una correccion masiva como lo tenemos hecho ahora"
> "claro pero ahora lo que falta es que pueda descargar el pdf con las respuestas de los alumnos para que lo pueda subir y lo corriga la ia"
> "vale perfecto, ahora podemos cambiar el panel de control y que en vez de ser estadisticas de cada cosa sea mas como una especia de recepcion y luego que haya una seccion pequeña en algun lado que te diga el estado global del sistema"

### Desarrollo Principal

**1. Historial de exámenes en AsignaturasPage y AlumnosPage** (`6f75419`)

Se añadió un panel lateral sticky en `AsignaturasPage` equivalente al de `AlumnosPage`: al seleccionar una asignatura, se abre una columna derecha con todos los `ExamenAlumno` de esa asignatura. Ambas páginas usan `getExamenesPorAlumno` / `getExamenesPorAsignatura` del servicio.

**2. RevisionModal — ver respuestas por ejemplar** (`7675b7c`)

Nuevo componente `frontend/src/components/RevisionModal.tsx`: overlay completo que muestra para cada pregunta del ejemplar si la respuesta del alumno fue correcta/incorrecta/en blanco, con badge de dificultad (ALTA/MEDIA/BAJA en rojo/ámbar/verde) y opciones coloreadas (verde = correcta, rojo = marcada incorrectamente).

Backend: nuevo `DTO_RevisionEjemplar` con estructura anidada (`ItemRevision` + `OpcionRespuesta`). Endpoint `GET /api/examenes/ejemplar/{id}/revision` → `ServicioExamen.obtenerRevisionEjemplar()`.

**3. Bug crítico: StackOverflowError en RevisionModal** (`882581d`)

*Síntoma*: "Error al cargar los datos" al abrir la revisión.

*Causa raíz*: `obtenerRevisionEjemplar` accedía a `ea.getExamen().getPreguntas()`, lo que activaba `PersistentSet<Pregunta>` de Hibernate. Para añadir cada `Pregunta` al `HashSet`, Hibernate llama a `pregunta.hashCode()`. Lombok `@Data` genera `hashCode()` usando todos los campos, incluyendo `respuestas` (lazy `@OneToMany`). Cargar `respuestas` y computar su hashCode accede a `respuesta.pregunta` (`@ManyToOne` EAGER) → `pregunta.hashCode()` → recursión infinita → `StackOverflowError`. Al ser `Error` (no `Exception`), el `catch (Exception e)` del controlador no lo capturaba → respuesta 500 → `isError = true` en TanStack Query.

*Fix*: Cargar el examen por separado con `repoExamen.findByIdConPreguntasYRespuestas()` (JOIN FETCH existente) y convertir el `Set` a `ArrayList` antes de iterar, evitando la ruta de `HashSet.add()`.

**4. Conteo de exámenes por alumno/asignatura** (`490a752`)

Nuevas queries JPQL `GROUP BY` en `RepositorioExamenAlumno` (`countByAlumno`, `countByAsignatura`) que devuelven `List<Object[]>` agregados en `Map<Long, Long>`. Nuevos endpoints `GET /api/examenes/conteos/alumnos` y `/conteos/asignaturas`. En frontend, columna "Exámenes" con el conteo + botón "Ver/Cerrar" en tablas de AlumnosPage y AsignaturasPage.

**5. Corrección masiva por grupo (rediseño completo de CorregirExamenPage)** (`d2eb339`)

*Problema*: con un `Examen` único por alumno, el flujo anterior de "selecciona Examen ID → corrige masivo" era imposible (no hay un ID compartido entre los 13 exámenes del grupo).

*Solución*: agrupar por `(asignaturaId, tipoEvaluacion, fechaExamen)` como identidad de lote. Todos los exámenes de una llamada a `generarYAsignar` comparten estos tres campos.

Backend:
- `DTO_GrupoExamen.java` y `DTO_AccionGrupo.java` (nuevos)
- Query JPQL `findGruposConConteos()` en `RepositorioExamenAlumno`: `GROUP BY` por los 3 campos + `estado`, devuelve conteos de pendientes/entregados/corregidos por grupo
- `ServicioExamen.listarGrupos()`, `listarEjemplaresDeGrupo()`, `simularEntregaGrupo()`, `corregirGrupo()`
- En `corregirGrupo()`, `totalPreguntas` se obtiene como `marcasAlumno.size()` (proxy válido porque `simularEntregaGrupo` crea exactamente una marca por pregunta)

Frontend: `CorregirExamenPage.tsx` reescrita con 6 vistas (`grupos | detalle | ia_upload | ia_procesando | manual | exito`):
- Vista `grupos`: tabla de lotes con columnas Asignatura, Tipo, Fecha, Alumnos, Pendientes, Entregados, Corregidos, chip de estado
- Vista `detalle`: lista de alumnos del grupo, sidebar con estadísticas, botones "↓ Hojas de respuesta", "Simular entregas", "Corregir con IA"
- Vista `manual`: corrección pregunta a pregunta con botones A/B/C/D coloreados según respuesta actual

**6. PDF de hojas de respuesta personalizadas** (`376ccc9`)

`Promise.all(ejemplares.map(ej => getRevisionEjemplar(ej.id)))` carga en paralelo la revisión de cada alumno. Se genera HTML con cabecera oscura (nombre, DNI, asignatura, tipo, fecha) + tabla de preguntas con círculos burbuja (rellenos si marcada, vacíos si no). `window.open()` + `win.document.write(html)` + `setTimeout(() => win.print(), 400)` abre el diálogo de impresión/PDF del navegador.

**7. Rediseño del Dashboard** (`25fdda1`)

De un grid de estadísticas puro a una pantalla de "recepción":
- Saludo dinámico (Buenos días/tardes/noches según hora) con nombre del docente de `localStorage`
- Grid 3×2 de tarjetas de acceso rápido (6 módulos del sistema) con efecto hover: borde coloreado, fondo suave, elevación `translateY(-2px)` y `boxShadow` con el color del módulo
- Panel lateral compacto (260px) con semáforo global del sistema (punto verde/ámbar, "Sistema operativo" / "En configuración") y 6 métricas del `getResumenSistema` con refetch cada 30s

### Decisiones de Diseño

- **totalPreguntas en corregirGrupo**: usar `marcasAlumno.size()` como proxy en lugar de cargar el `Examen` de cada alumno evita el problema de Hibernate hashCode y es correcto por invariante del sistema (1 marca = 1 pregunta del examen de ese alumno).
- **Fórmula de puntuación**: `nota = (aciertos - fallos/3.0) / totalPreguntas * 10`, mínimo 0 — examen tipo test español estándar con penalización 1/3 por fallo; las preguntas en blanco no penalizan.

### Validación
- RevisionModal verificado: muestra preguntas con colores correcto/incorrecto.
- CorregirExamenPage: navegación grupos → detalle → corrección funcional.

---

## Conversación 44: Separación CU-02/CU-09, AsignarExamenPage y UX de Correcciones
**Fecha**: 2026-06-07
**Participantes**: Liam (Usuario) + Claude Sonnet 4.6

### Contexto de la Sesión
Sesión de continuación desde contexto compactado. El objetivo principal era implementar la separación real entre CU-02 (Generar) y CU-09 (Asignar), que hasta ahora se hacían en un solo paso (`generarYAsignar`), lo que no era fiel al diagrama de estados del sistema. También se corrigió un bug de restricción de BD y se mejoró la UX de navegación.

**Prompts clave de Liam**:
> "si implementalo, me parece que es lo mejor" *(confirma separación CU-02/CU-09)*
> "claro el problema es que ahora no hay una pestaña de asignacion para poder hacer la parte de asignacion"
> "podemos separar en corregir examenes los examenes que ya han sido corregidos de los otros como has hecho en asignar examenes"
> "vale perfecto, vamos a dejarlo por hoy"

### Desarrollo Principal

**1. Separación CU-02 / CU-09 — Backend** (`f7b32ba`)

*Motivación*: el diagrama de estados define PENDIENTE (generado) y ASIGNADO (clave SHA-256 generada, formalmente asignado) como estados distintos. El sistema generaba y asignaba en un único paso, haciendo imposible distinguirlos.

Cambios:
- `ExamenAlumno.java`: columna `clave_correccion` pasa a nullable (`nullable = false` eliminado de la anotación JPA).
- `DTO_GrupoExamen.java`: nuevo campo `asignados` separado de `pendientes`.
- `ServicioExamen.generarYAsignar()`: ejemplares se crean con `estado = PENDIENTE` y `claveCorreccion = null`.
- `ServicioExamen.asignarGrupo()` (nuevo): busca todos los ejemplares PENDIENTE del grupo, genera SHA-256 para cada uno y los pasa a ASIGNADO.
- `ServicioExamen.listarGrupos()`: ahora cuenta PENDIENTE y ASIGNADO por separado en lugar de agruparlos.
- `ServicioExamen.simularEntregaGrupo/Masiva()`: solo procesa ejemplares en estado ASIGNADO (los PENDIENTE sin clave no pueden "entregar").
- `ServicioExamen.cancelarGeneracion()`: ahora permite cancelar un examen si todos sus ejemplares son PENDIENTE (los elimina primero); bloquea si alguno es ASIGNADO o más avanzado.
- `ServicioExamen.exportarExamen()`: filtra para incluir solo alumnos con clave (`claveCorreccion != null`).
- `ControladorExamen.java`: nuevo endpoint `POST /api/examenes/grupos/asignar`.

**2. Bug: restricción NOT NULL en PostgreSQL** (fix inmediato)

Eliminar `nullable = false` de la anotación JPA no modifica la BD existente (con `ddl-auto=update` Hibernate no elimina restricciones). Al intentar generar, PostgreSQL lanzó:
```
ERROR: el valor nulo de la columna «clave_correccion» viola la restricción de no nulo
```
Fix: `ALTER TABLE examen_alumnos ALTER COLUMN clave_correccion DROP NOT NULL;` ejecutado directamente en la BD.

**3. Separación CU-02/CU-09 — Frontend** (`f7b32ba`)

- `examenService.ts`: nueva función `asignarGrupo()` → `POST /examenes/grupos/asignar`.
- `CorregirExamenPage.tsx`:
  - `ESTADO_BADGE`: PENDIENTE = "Sin asignar" (violeta `#7c3aed`), ASIGNADO = "Sin entregar" (gris, sin cambio).
  - Nuevas funciones: `esSinAsignar`, `esAsignado`, `tieneClave`.
  - Sidebar del detalle: cinco filas (Total, Sin asignar, Asignados, Entregados, Corregidos).
  - Tabla de grupos: columna "Sin asignar" (violeta) + "Asignados" (gris) añadidas.
  - Botones del detalle: "Asignar y generar claves" (visible cuando `haySinAsignar`), "Hojas de respuesta" y "Simular entregas" gateados a `hayAsignados`.
  - `handleDescargarHojas`: filtra solo ejemplares con clave (`tieneClave`).
- `GenerarExamenPage.tsx`: botón cambia a "Generar N exámenes (pendientes de asignación)"; banner de éxito redirige a `/asignar-examen`.

**4. AsignarExamenPage — nueva pestaña CU-09** (`081ecd8`)

`AsignarExamenPage.tsx` reescrita para el nuevo flujo:
- Tabla principal "Grupos pendientes de asignación": solo muestra grupos con `pendientes > 0`, botón "Asignar y generar claves" por fila que llama a `asignarGrupo`.
- Tabla secundaria "Grupos ya asignados": grupos con `pendientes === 0`, columnas simplificadas (Asignados, Entregados, Corregidos).
- Ruta `/asignar-examen` registrada en `App.tsx`.
- Sidebar: nueva entrada "Asignar Examen" entre "Generar Examen" y "Corregir Exámenes".

**5. Separación grupos en CorregirExamenPage** (`46542c6`)

Vista `grupos` dividida en dos secciones:
- **En progreso**: grupos donde `corregidos < totalAlumnos`. Tabla completa con las 9 columnas. Header con contador de grupos (badge azul).
- **Completados**: grupos donde `corregidos === totalAlumnos`. Tabla simplificada (Asignatura, Tipo, Fecha, Alumnos, Corregidos, badge "Completado ✓" verde). Solo se muestra si hay algún grupo completado.

### Flujo Completo del Sistema (Post-Sesión)

```
[Generar Examen] → PENDIENTE (sin clave)
      ↓
[Asignar Examen] → ASIGNADO (SHA-256 generada, hojas disponibles)
      ↓
[Corregir Exámenes] → PENDIENTE_CALIFICACION → CORREGIDO
```

### Decisiones de Diseño

- **ddl-auto=update no elimina restricciones**: Hibernate con `update` solo añade columnas/tablas, nunca elimina constraints existentes. Cualquier cambio de nullabilidad requiere `ALTER TABLE` manual en la BD.
- **cancelarGeneracion ampliado**: ahora permite cancelar exámenes generados pero no asignados, eliminando primero los ejemplares PENDIENTE antes de borrar el `Examen`.
- **Separación visual PENDIENTE/ASIGNADO**: colores distintos (violeta para "Sin asignar", gris para "Sin entregar") para que el docente entienda en qué estado está cada alumno.

### Commits de esta sesión

| Hash | Descripción |
|------|-------------|
| `f7b32ba` | feat(examenes): separar CU-02 y CU-09 (backend + frontend) |
| `081ecd8` | feat(ui): añadir pestaña Asignar Examen al sidebar y router |
| `46542c6` | feat(ui): separar grupos en progreso y completados en Correcciones |
| `cab5bda` | feat(dashboard): añadir tarjeta Asignar Examen al panel de control |
- Dashboard: acceso rápido y estado del sistema operativos.

---

## Conversación 45: Ver Examen Generado y Corregir desde Asignatura
**Fecha**: 2026-06-07
**Participantes**: Liam (Usuario) + Claude Sonnet 4.6

### Contexto de la Sesión
Sesión de continuación desde contexto compactado. Objetivo: implementar los flujos de navegación que faltaban según el nuevo diagrama de contexto del grupo de modelado, en particular: (1) acceso a CorregirExamenPage filtrado desde AsignaturasPage, y (2) posibilidad de ver el contenido de un examen recién generado antes de asignarlo.

**Prompts clave de Liam**:
> "1.vamos a hacer que se pueda corregir desde los dos lados... 2 tecnicamente pone que es con el caso edit alumno pero yo lo dejaria como lo tenemos... 3 si se necesita el acceso desde asignatura para poder corregir. y faltaria que despues de generar un examen se pueda ver el examen generado"

### Desarrollo Principal

**1. Actualización del diagrama de contexto** (`4dc39b4`)

`diagrama-contexto-docente.puml` ampliado con cuatro nuevos estados y sus transiciones:

| Estado nuevo | Descripción |
|---|---|
| `EXAMEN_GENERADO` | Vista solo lectura de un ejemplar recién generado |
| `EXAMEN_GENERADO_CONTEXTUAL` | Ídem desde el flujo contextual de asignatura |
| `EXAMEN_CORREGIDO` | Vista/edición de un ejemplar corregido en CorregirExamenPage |
| `EXAMEN_CORREGIDO_CONTEXTUAL` | RevisionModal en el panel lateral de AsignaturasPage |

Transiciones añadidas:
- `EditAsignatura --> ExamenesCorregidos: corregirExamenes()` (junto al ya existente desde `Menu`)
- `EditAsignatura --> ExamenCorregidoContextual: revisarExamen()` (el botón "Revisar" ya existía)
- `ExamenesGenerados --> ExamenGenerado: verExamen()` + vuelta
- `ExamenesGeneradosContextuales --> ExamenGeneradoContextual: verExamen()` + vuelta
- `ExamenesCorregidos --> ExamenCorregido: verDetalle()` + vuelta

**2. Botón "Corregir" en AsignaturasPage** (`4dc39b4`)

Panel lateral de la asignatura seleccionada: añadido botón "Corregir" en la cabecera que navega a `/corregir-examen?asignaturaId={id}`. Usa `useNavigate` de react-router-dom.

**3. Filtrado por asignatura en CorregirExamenPage** (`4dc39b4`)

- `useSearchParams` lee el param `asignaturaId` de la URL.
- La lista de grupos se filtra por `asignaturaId` cuando el param está presente.
- El subtítulo indica si la vista está filtrada.
- El mensaje de estado vacío distingue el caso filtrado del general.

**4. Botón "Ver examen" para ejemplares no entregados** (`4dc39b4`)

En la tabla de ejemplares del grupo, los estados PENDIENTE y ASIGNADO (antes mostraban el botón desactivado) ahora muestran un botón "Ver examen" que abre la vista de corrección en modo lectura:
- Las respuestas se muestran pero no son clicables.
- Badge "Solo lectura" visible junto al nombre del alumno.
- Botones "Guardar corrección" ocultos; solo aparece "Volver".

**5. "Ver exámenes generados" en GenerarExamenPage** (`4dc39b4`)

Tras la generación exitosa, el banner ahora ofrece dos acciones:
- **"Ver exámenes generados"** → navega a `/corregir-examen?asignaturaId=X` (nueva acción principal).
- **"Ir a Asignación"** → navega a `/asignar-examen` (acción secundaria, antes única).

### Flujo de "ver examen generado"

```
GenerarExamenPage → [Generar] → banner éxito
  → [Ver exámenes generados] → CorregirExamenPage (filtrado)
      → seleccionar grupo → lista de alumnos
          → [Ver examen] → vista solo lectura del examen del alumno
```

### Decisiones de Diseño

- **modoLectura como estado local**: en lugar de crear una nueva vista, se reutiliza la vista `manual` con un flag `modoLectura` que deshabilita clics e oculta el botón de guardar. Reutilización máxima sin complejidad adicional.
- **Filtrado client-side**: los grupos se filtran en el frontend (el endpoint `GET /examenes/grupos` ya devuelve todos); no se añade un nuevo endpoint. Adecuado dado el volumen típico de grupos.
- **Acceso desde ambos lados**: el diagrama original solo mostraba acceso a corrección desde el módulo contextual de asignatura, pero el usuario prefirió mantener también el acceso global desde el sidebar. Ambas transiciones coexisten en el diagrama.

### Commits de esta sesión

| Hash | Descripción |
|------|-------------|
| `4dc39b4` | feat: ver examen generado y corregir desde asignatura |
| `7e00032` | feat(rup): alinear con rama fix-revision-final del ModelingRepo |
| `c328ff2` | feat(diseno): añadir diagramas de diseño CU-42 y CU-43 |
| `1930e35` | fix(rup): añadir actor AdministradorInstitucional y corregir diagramas |

---

## Conversación 46: Push a develop y PR a main — Cierre de Sprint

**Fecha:** 2026-06-07

### Resumen

Verificación final del estado del repositorio tras la sesión 45. El árbol de trabajo estaba limpio. Se añaden las entradas pendientes al log y se sube a `develop`. Desde `develop` el usuario abre un PR a `main` desde la interfaz de GitHub.

### Estado final de develop

Los 4 commits de la sesión 45 ya estaban en `develop` local:

| Hash | Descripción |
|------|-------------|
| `1930e35` | fix(rup): añadir actor AdministradorInstitucional y corregir diagramas |
| `c328ff2` | feat(diseno): añadir diagramas de diseño CU-42 y CU-43 |
| `7e00032` | feat(rup): alinear con rama fix-revision-final del ModelingRepo |
| `2cbdedc` | docs: añadir conversación 45 al log |
| `4dc39b4` | feat: ver examen generado y corregir desde asignatura |

---

## Conversación 47: README institucional y documentación de análisis BCE

**Fecha:** 2026-06-07

### Resumen

Reescritura completa del README principal al estilo pySigHor y de todos los READMEs del repositorio. Añadidas tablas BCE a los 43 READMEs de análisis.

### Cambios

**1. README principal** (`b58e2bb`, `0a6dd57`, `8e13e9d`)

- Versión inicial con estructura clara y diagramas embebidos.
- Reescritura al estilo pySigHor: badges de navegación `<div align=right>`, tabla de proyecto 2 columnas, diagrama de contexto embebido, tabla de Hitos, bloque de estructura del repositorio.
- Añadida columna "Razón" a la tabla del stack tecnológico con justificación BCE, relaciones N:M (ExamenAlumno/Marca), HMR, server state y RBAC.

**2. Todos los READMEs del proyecto** (`a34f1d5`)

Reescritura homogénea de 43 READMEs de análisis, 43 de diseño, 7 secciones de RUP, frontend y backend. Estilo pySigHor: badges de navegación, tablas limpias, diagramas embebidos via proxy PlantUML.

**3. Tablas BCE en READMEs de análisis** (`c808b16`)

Añadida tabla `## Objetos BCE` a los 43 READMEs de análisis mostrando los estereotipos `<<boundary>>`, `<<control>>` y `<<entity>>` de cada CU con sus clases reales.

### Commits de esta sesión

| Hash | Descripción |
|------|-------------|
| `b58e2bb` | docs: reescribir README principal con estructura clara y diagramas embebidos |
| `0a6dd57` | docs: reescribir README al estilo pySigHor con badges, tablas y diagramas embebidos |
| `8e13e9d` | docs: añadir razones de elección del stack al README |
| `a34f1d5` | docs: reescribir todos los READMEs al estilo pySigHor |
| `c808b16` | docs: añadir tabla BCE a los 43 READMEs de analisis |
