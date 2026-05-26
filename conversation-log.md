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

**Prompt clave de Liam**:
> "tengo que hacer un proyecto para clase en el que tengo que codificar enteramente contido un proyecto que tenemos modelado... el modelado lo tengo todo en un github... quiero trabajar como lo he hecho en el repo de modelado... vamos a hacer primero el analysis y diseño y una vez lo tengamos hacemos la implementacion."

### Desarrollo Principal
Se establece adoptar el **RUP Pragmático** inspirado en `pySigHor`. Se crea la infraestructura inicial de carpetas y se analizan los dos primeros casos de uso (Corrección y Generación), sentando las bases del patrón **BCE**.

---

## Conversación 02: Recuperación de Contexto y Nueva Estrategia de Workflow
**Fecha**: 2026-05-24
**Participantes**: Liam + Gemini CLI

### Contexto de la Sesión
Reinicio de sesión tras unos días de inactividad. El usuario solicita validar la memoria de la IA y plantea un cambio en la granularidad de los Pull Requests.

**Prompt clave de Liam**:
> "primero de todo recuerdas lo que hicimos la ultima vez? [...] quiero que sigamos con los que estabamos haciendo pero lo unico es para los pull request a develop quiero que hagamos mas trabajo para cada uno no solo un caso de uso"

### Desarrollo Principal
1.  **Validación de Memoria**: Gemini recupera el estado de la sesión anterior (CU-01 y CU-02 terminados).
2.  **Ajuste de Workflow**: Se acuerda agrupar los casos de uso en bloques para reducir la sobrecarga de gestión de Git.

---

## Conversación 03: Bloque de Análisis 2 - Configuración e Importaciones
**Fecha**: 2026-05-24
**Participantes**: Liam + Gemini CLI

### Contexto de la Sesión
Ejecución de la primera tanda de análisis por bloques.

**Prompt clave de Liam**:
> "si quiero que hagamos unos 4 casos de uso por pull request"

### Desarrollo Principal
Se completa el análisis de 4 casos de uso (CU-03 a CU-06) centrados en la **Importación/Exportación de Configuración Global**, Alumnos y Preguntas. Se define la naturaleza atómica de estas operaciones.

---

## Conversación 04: Bloque de Análisis 3 - CRUD y Gestión de Entidades
**Fecha**: 2026-05-24
**Participantes**: Liam + Gemini CLI

### Contexto de la Sesión
Aceleración del ritmo de trabajo para cubrir el grueso de las entidades del sistema.

**Prompt clave de Liam**:
> "vale vamos a hacer los que quedan en tres bloques"

### Desarrollo Principal
Análisis masivo de 12 casos de uso (CU-07 a CU-18). Se definen los CRUDs de Alumno, Docente, Asignatura, Grado y Pregunta. Se establece el patrón de "Creación Delgada" con redirección a edición.

---

## Conversación 05: Sincronización Global y Bloque de Análisis 4
**Fecha**: 2026-05-24
**Participantes**: Liam + Gemini CLI

### Contexto de la Sesión
Gestión de una incidencia en Git y cambio a un flujo de trabajo más centralizado en `develop`.

**Prompt clave de Liam**:
> "vale una cosa voy a mergear todo a develop y a partir de ahora mejor hacemos todo en develop y luego ya lo haremos bien merge en main y quiero preguntar si tenemos alguna forma de ponder lo que hacemos en cada commit para no perderme"

### Desarrollo Principal
1.  **Cambio de Estrategia**: Se abandona el flujo de ramas de feature cortas para trabajar directamente en `develop` para la fase de análisis.
2.  **Análisis Bloque 4**: Completados CU-19 a CU-30 (Vistas de listado, procesos de eliminación y seguridad/sesión).

---

## Conversación 06: Bloque de Análisis 5 y Cierre de Fase
**Fecha**: 2026-05-24
**Participantes**: Liam + Gemini CLI

### Contexto de la Sesión
Finalización de los últimos casos de uso pendientes para cerrar el análisis técnico agnóstico.

**Prompt clave de Liam**:
> "vale entonces todo esta bien ya no? pues si es asi continuamos"

### Desarrollo Principal
Análisis de los casos CU-31 a CU-41 (Respuestas, Gestión de procesos y exportaciones específicas). Se alcanza el hito de los 41 casos de uso analizados según el patrón BCE.

---

## Conversación 07: Trazabilidad Teórica IDSW2
**Fecha**: 2026-05-24
**Participantes**: Liam + Gemini CLI

### Contexto de la Sesión
El usuario solicita un puente entre el código y la teoría de la asignatura.

**Prompt clave de Liam**:
> "antes de hacer el pull request quiero que me hagas a mi un documento no para subir a github [...] en el que me vas a ir explicando utilizando la teoria lo que estas haciendo para poder ir viendo y entendiendo lo que estas haciendo [...] quiero que se adopte a la teoria que sale en el repo de IDSW2"

### Desarrollo Principal
Creación y expansión de `TRAZABILIDAD_TEORICA.md`. Se justifican las decisiones (BCE, Cohesión, Acoplamiento, Abstracción) basándose en el temario oficial.

---

## Conversación 08: Auditoría y Refactorización Estructural (Estándar pySigHor)
**Fecha**: 2026-05-24
**Participantes**: Liam + Gemini CLI

### Contexto de la Sesión
Búsqueda de la excelencia documental basada en la referencia del profesor.

**Prompt clave de Liam**:
> "vale pero de la parte de analisis no faltan cosas? quiero que te bases en sighor para todo lo que tenemos que hacer para nuestro proyecto"

### Desarrollo Principal
1.  **Auditoría**: Se detecta que el análisis requiere diagramas de robustez y jerarquía de carpetas.
2.  **Refactorización**: Se migra todo el análisis a carpetas por CU. Se generan **41 diagramas de colaboración PlantUML**.
3.  **Habilitación Visual**: Se configura el renderizado de diagramas en GitHub.

---

## Conversación 09: Salto al Diseño y Selección de Stack (Java)
**Fecha**: 2026-05-24
**Participantes**: Liam + Gemini CLI

### Contexto de la Sesión
Toma de decisiones sobre el compromiso tecnológico.

**Prompt clave de Liam**:
> "creo que prefiero java porque es lo que mas entiendo y asi podemos debatir mejor las cosas que te parece?"

### Desarrollo Principal
- **Stack**: Java 21 + Spring Boot 3 + PostgreSQL.
- **Arquitectura**: 3 Capas (Presentación, Negocio, Datos).
- **Decisión**: Mantenimiento del desacoplamiento entre el "qué" (análisis) y el "cómo" (diseño).

---

## Conversación 10: Realización de Diseño (Secuencia Técnica)
**Fecha**: 2026-05-24
**Participantes**: Liam + Gemini CLI

### Contexto de la Sesión
Detalle técnico de los flujos más complejos del sistema.

**Prompt clave de Liam**:
> "vale antes de eso deberiamos de hacer los diagramas de secuencia que habiamos dejado pendientes para hacer ahora en la fase de diseño"

### Desarrollo Principal
Elaboración de los diagramas de secuencia de diseño para CU-01, 02, 03 y 09.
- **Hito**: Se resuelve el debate del **Hash de Clave de Corrección** consultando el glosario de modelado. Se define la estrategia **UPSERT** y la delegación de IA vía interfaz.

---

## Conversación 11: Blindaje de Memoria y Contexto Persistente
**Fecha**: 2026-05-26
**Participantes**: Liam + Gemini CLI

### Contexto de la Sesión
Garantizar la continuidad total del proyecto ante reinicios de la IA.

**Prompt clave de Liam**:
> "puedes asegurarte de que tienes todo en memoria para no tener que explicar todo el metodo de trabajo [...] y por si acaso me puedes generar un archivo donde esta el de trazabilidad [...] quiero que se vaya actualizando para que cada vez que 'nazcas' no tenga que volver a explicarlo"

### Desarrollo Principal
Creación de `CONTEXTO_PROYECTO.md` y `MEMORY.md`. Se establecen instrucciones obligatorias para que la IA lea y actualice el contexto en cada sesión, blindando las reglas de Git y los logs continuos.

---
*Este registro continuará con el Diseño del Modelo Físico de Datos (DER).*
