<div align=right>
 
|[![](https://img.shields.io/badge/-Inicio-FFF?style=flat&logo=Emlakjet&logoColor=black)](/README.md) [![](https://img.shields.io/badge/-RUP-FFF?style=flat&logo=Elsevier&logoColor=black)](/RUP/README.md) [![](https://img.shields.io/badge/-Modelo_del_dominio-FFF?style=flat&logo=freedesktop.org&logoColor=black)](/RUP/00-casos-uso/00-modelo-del-dominio/modelo-dominio.puml) [![](https://img.shields.io/badge/-Actores_&_Casos_de_Uso-FFF?style=flat&logo=crewunited&logoColor=black)](/RUP/00-casos-uso/01-actores-casos-uso/actores-casos-uso.puml) [![](https://img.shields.io/badge/-Diagrama_de_contexto-FFF?style=flat&logo=diagramsdotnet&logoColor=black)](/RUP/00-casos-uso/01-actores-casos-uso/diagrama-contexto-docente.puml) [![](https://img.shields.io/badge/-Análisis-FFF?style=flat&logo=multisim&logoColor=black)](/RUP/01-analisis/casos-uso/README.md)|
|-:|
|[![](https://img.shields.io/badge/-Estado-FFF?style=flat&logo=greensock&logoColor=black)](/RUP/README.md) [![](https://img.shields.io/badge/-Reflexiones-FFF?style=flat&logo=hootsuite&logoColor=black)](https://github.com/liamanderson873/25-26-idsw2-sdVC/blob/main/TRAZABILIDAD_TEORICA.md) [![](https://img.shields.io/badge/-Log_de_conversación-FFF?style=flat&logo=gnometerminal&logoColor=black)](conversation-log.md)|

</div>

# Registro de Conversaciones - Proyecto Jorgestor RUP

## Resumen
Este archivo mantiene un registro cronológico exhaustivo de todas las interacciones, decisiones estratégicas y evolución técnica del sistema **Jorgestor** (Generación y Corrección de Exámenes). Siguiendo el estándar de **pySigHor**, este log documenta el diálogo íntegro, los desafíos técnicos y la justificación de cada paso dado en el proyecto.

---

## Conversación 01: Inicio de Infraestructura y Análisis Puro (CU-01, CU-02)
**Fecha**: 2026-05-21
**Participantes**: Liam (Usuario) + Gemini CLI

### Contexto de la Sesión
Arranque oficial del proyecto. Liam plantea la necesidad de implementar un sistema que ya ha sido modelado previamente por su grupo. Gemini propone una metodología disciplinada para evitar errores de implementación.

**Prompt clave de Liam**:
> "tengo que hacer un proyecto para clase en el que tengo que codificar enteramente contido un proyecto que tenemos modelado... el modelado lo tengo todo en un github... quiero trabajar como lo he hecho en el repo de modelado... vamos a hacer primero el analysis y diseño y una vez lo tengamos hacemos la implementacion."

### Desarrollo Principal
1.  **Metodología RUP Pragmático**: Se decide ignorar la tentación de programar directamente ("vibe coding") y se adopta RUP. Se crea la estructura de carpetas basada en disciplinas: Requisitos (00), Análisis (01) y Diseño (02).
2.  **Hito de Alcance**: Se redacta `QUE_HACE.md` definiendo a Jorgestor como un sistema para docentes que automatiza generación y corrección. Se acuerda eliminar la mención a "Inteligencia Artificial" para ser honestos con el entregable profesional: la IA será una pieza externa delegada.
3.  **Análisis BCE**: Se analizan CU-01 y CU-02. Se identifican las primeras entidades: `Exam`, `Student`, `Subject`.

---

## Conversación 02: Recuperación de Contexto y Nueva Estrategia de Git
**Fecha**: 2026-05-24
**Participantes**: Liam + Gemini CLI

### Contexto de la Sesión
Tras una pausa, Liam valida si Gemini mantiene la memoria del proyecto y propone optimizar el flujo de trabajo en Git, ya que trabajar caso por caso es ineficiente.

**Prompt clave de Liam**:
> "primero de todo recuerdas lo que hicimos la ultima vez? [...] quiero que sigamos con los que estabamos haciendo pero lo unico es para los pull request a develop quiero que hagamos mas trabajo para cada uno no solo un caso de uso"

### Desarrollo Principal
1.  **Sincronización**: Gemini confirma el estado de `QUE_HACE.md` y los análisis previos.
2.  **Agrupación de Tareas**: Se acuerda que cada Pull Request a `develop` contendrá bloques de aproximadamente 4 casos de uso para agilizar la fase de análisis.

---

## Conversación 03: Bloque de Análisis 2 - Configuración e Importaciones
**Fecha**: 2026-05-24
**Participantes**: Liam + Gemini CLI

### Contexto de la Sesión
Ejecución del análisis centrado en la infraestructura de datos del sistema.

**Prompt clave de Liam**:
> "si quiero que hagamos unos 4 casos de uso por pull request"

### Desarrollo Principal
Se analizan CU-03 (Importar Configuración Global), CU-04 (Exportar Configuración Global), CU-05 (Importar Alumnos) y CU-06 (Importar Preguntas).
- Se determina que la importación global debe ser **atómica**: si falla la carga de un alumno, no se debe corromper la carga de las asignaturas.

---

## Conversación 04: Aceleración Máxima y Gestión de Entidades (CRUD)
**Fecha**: 2026-05-24
**Participantes**: Liam + Gemini CLI

### Contexto de la Sesión
Con 35 casos de uso pendientes, Liam decide acelerar el ritmo para terminar el análisis hoy mismo.

**Prompt clave de Liam**:
> "vale vamos a hacer los que quedan en tres bloques"

### Desarrollo Principal
1.  **Bloque 3 (CU-07 a CU-18)**: Análisis exhaustivo de la gestión de entidades. Se definen las interfaces y controladores para Alumnos, Docentes (Admin), Asignaturas, Grados y Preguntas.
2.  **Patrón "El Delgado"**: Se debate y decide que la creación de entidades pida solo datos mínimos para redirigir inmediatamente a la pantalla de edición completa, optimizando el flujo de trabajo del docente.

---

## Conversación 05: Sincronización Global y Bloque de Análisis 4
**Fecha**: 2026-05-24
**Participantes**: Liam + Gemini CLI

### Contexto de la Sesión
Un error en la rama de Git obliga a reorganizar el trabajo. Se decide centralizar el análisis en `develop`.

**Prompt clave de Liam**:
> "vale una cosa voy a mergear todo a develop y a partir de ahora mejor hacemos todo en develop y luego ya lo haremos bien merge en main y quiero preguntar si tenemos alguna forma de ponder lo que hacemos en cada commit para no perderme"

### Desarrollo Principal
1.  **Gestión de Commits**: Gemini propone usar *Conventional Commits* detallados con listas de CUs incluidos.
2.  **Análisis Bloque 4 (CU-19 a CU-30)**: Se completan las vistas de listado y los procesos de eliminación. Se pone especial énfasis en la **Eliminación Segura**: no se puede borrar un alumno si tiene exámenes asociados.

---

## Conversación 06: Cierre del Análisis y Auditoría pySigHor
**Fecha**: 2026-05-24
**Participantes**: Liam + Gemini CLI

### Contexto de la Sesión
El análisis técnico está "terminado", pero Liam exige un nivel de excelencia documental idéntico al proyecto de referencia.

**Prompt clave de Liam**:
> "vale pero de la parte de analisis no faltan cosas? quiero que te bases en sighor para todo lo que tenemos que hacer para nuestro proyecto"

### Desarrollo Principal
1.  **Auditoría de Referencia**: Gemini inspecciona `pySigHor` y detecta que faltan los **Diagramas de Colaboración (Robustez)**.
2.  **Gran Refactorización Estructural**: Se abandonan los archivos sueltos. Se crean 41 carpetas. Para cada una se genera un `README.md` con tablas MVC y mensajes, y un archivo `colaboracion.puml`.
3.  **Visualización**: Se implementa el renderizado dinámico de PlantUML en GitHub para que Liam pueda ver los diagramas sin descargar nada.

---

## Conversación 07: Trazabilidad Teórica y Guía de Defensa (IDSW2)
**Fecha**: 2026-05-24
**Participantes**: Liam + Gemini CLI

### Contexto de la Sesión
Liam solicita un documento privado que conecte la práctica con la teoría de la asignatura para poder explicarlo en clase.

**Prompt clave de Liam**:
> "antes de hacer el pull request quiero que me hagas a mi un documento no para subir a github [...] en el que me vas a ir explicando utilizando la teoria lo que estas haciendo para poder ir viendo y entendiendo lo que estas haciendo [...] quiero que se adopte a la teoria que sale en el repo de IDSW2"

### Desarrollo Principal
Se crea `TRAZABILIDAD_TEORICA.md` en la memoria local. Gemini explica:
- Por qué usamos **BCE** para combatir el acoplamiento.
- Cómo justificamos cada entidad (ciclo de vida, identidad).
- La importancia de la **Independencia Tecnológica** en el Análisis OO vs el Diseño de BBDD.

---

## Conversación 08: Salto al Diseño y Selección del Stack (Java)
**Fecha**: 2026-05-24
**Participantes**: Liam + Gemini CLI

### Contexto de la Sesión
Apertura de la Fase de Diseño. Gemini recomienda Python, pero Liam plantea una alternativa basada en su conocimiento personal.

**Prompt clave de Liam**:
> "creo que prefiero java porque es lo que mas entiendo y asi podemos debatir mejor las cosas que te parece?"

### Desarrollo Principal
1.  **Debate del Stack**: Gemini acepta Java 21 + Spring Boot 3. Se justifica como una elección excelente para aplicar **SOLID** e **Inyección de Dependencias**.
2.  **Arquitectura de Diseño**: Se acuerda una **Arquitectura de 3 Capas** (Controller, Service, Repository). Se explica qué es Spring Boot (IoC, DI) para que Liam entienda la "magia" del framework.

---

## Conversación 09: Realización de Diseño (Debate de Claves y Lógica)
**Fecha**: 2026-05-24
**Participantes**: Liam + Gemini CLI

### Contexto de la Sesión
Detalle técnico de los flujos core. Surge un debate profundo sobre cuándo nace la Clave de Corrección y cómo se delega la IA.

**Prompt clave de Liam**:
> "vale vamos a empezar primero por corregir examenes que te quiero preguntar alguna cosa: hacemos un POST por el hecho que te dije de que no ibamos a literalmente implementar una ia para hacerlo no? [...] el sistema nuestro sigue teniendo que hacer su funcion"
> "2.pues no sabria decirte primero de todo quiero que mires todo los archivos del modelado a ver si hemos detallado algo sobre eso o si realmente se asigna el codigo aqui y no en la generacion del examen"

### Desarrollo Principal
1.  **Delegación de IA**: Se diseña la interfaz `ICorrectionEngine`. El sistema está "listo para IA" pero usa simulaciones JSON para la demo.
2.  **Resolución del Conflicto de la Clave**: 
    - Liam sospechaba que la clave nacía en la asignación. 
    - Gemini audita el `Glosario` y el `diagramaEstadosExamenConsideraciones.md` del grupo de Liam.
    - **Resultado**: Se confirma que la **Clave de Corrección (Hash MD5/SHA)** se genera en la **Asignación**, uniendo datos del examen y del alumno para evitar fraudes.
3.  **Estrategia UPSERT**: Para las importaciones, Liam plantea el problema de los duplicados. Se decide usar claves naturales (DNI/Código) para actualizar registros existentes en lugar de duplicarlos o borrar toda la BD.

---

## Conversación 10: Blindaje de Memoria y Futuro del Proyecto
**Fecha**: 2026-05-26
**Participantes**: Liam + Gemini CLI

### Contexto de la Sesión
Cierre de la jornada maratónica. Liam exige que la IA no pierda ni un gramo de contexto en sesiones futuras.

**Prompt clave de Liam**:
> "puedes asegurarte de que tienes todo en memoria para no tener que explicar todo el metodo de trabajo [...] y por si acaso me puedes generar un archivo donde esta el de trazabilidad [...] quiero que se vaya actualizando para que cada vez que 'nazcas' no tenga que volver a explicarlo"
> "especialmente para las fases que quedan como de codificacion y tal quiero que me preguntes en que rama pero se asume que en develop"

### Desarrollo Principal
1.  **Infraestructura de Memoria**: Creación de `CONTEXTO_PROYECTO.md` con instrucciones obligatorias.
2.  **Nuevas Reglas de Oro**: 
    - Prohibido commit a `main` sin permiso.
    - Actualización continua del log (progresiva).
    - Debate previo obligatorio (Regla del Visto Bueno).
3.  **Siguiente Paso**: Diseño del DER (Modelo Físico) en PostgreSQL.

### Estado Final del Proyecto (Fase Análisis Completada)
| Métrica | Valor |
|---------|-------|
| **CUs Analizados (BCE)** | 41 / 41 (100%) |
| **Diagramas de Robustez** | 41 / 41 |
| **Diagramas de Secuencia (Diseño)** | 4 / 4 (CUs Críticos) |
| **Stack Tecnológico** | Java 21 / Spring Boot 3 / PostgreSQL |
| **Arquitectura** | 3-Tier Layered Architecture |
| **Trazabilidad** | Sincronizada con ModelingRepo |

---
*Este registro continuará con el Diseño del Modelo Físico de Datos (DER).*
