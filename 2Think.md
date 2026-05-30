# #2Think

La calidad de lo que el AI construye depende de la calidad de lo que se le describe.

Los mejores ingredientes para esa descripción son los artefactos del requisitado:

- El modelo del dominio describe qué entidades existen y cómo se relacionan.
- Los casos de uso describen qué hace el sistema, no qué gestiona.
- El diagrama de contexto describe el sistema como un conjunto de estados que solo se transitan mediante casos de uso.
- El detalle y el prototipo describen cómo es la interacción actor-sistema paso a paso.

Para evaluar lo que el AI produce: IDSW2.

## Baremos

<div align=center>

|Académicamente|Profesionalmente|
|-|-|
|*"llegué hasta aquí" tiene valor si el análisis es bueno*|*Sistema que no funciona no existe*|
|El análisis identifica qué principios están presentes, cuáles ausentes y por qué.|El sistema arranca. No *"compilaría si instalas X"*: arranca.|
|La reflexión sobre la distancia entre lo descrito y lo entregado es honesta y argumentada.|Lo que dice `QUE_HACE.md` es lo que el sistema hace. Si no coinciden, el entregable es falso.|
||El `conversation-log.md` fue escrito durante la sesión, no reconstruido después.|
||El README lo puede leer alguien que no estuvo en la sesión.|
|Los commits cuentan una historia coherente del proceso.|Los commits cuentan una historia coherente del proceso.|

</div>

La diferencia entre los dos grupos es que la dimensión profesional es binaria: cumple o no cumple. La dimensión académica admite gradación.
  
Si alguien entrega un sistema que arranca y hace algo pero que no es el sistema que se describió en el QUE_HACE.md, estamos:

- Profesionalmente ante un incumplimiento de requisitos.
- Académicamente si se quiere es material de análisis.

## Log de Pensamientos / Roadmap Mental

- [x] Configuración inicial (Java 21 + Maven 3.9.16).
- [x] Corrección de dependencias críticas en `pom.xml`.
- [x] Mapeo de Entidades JPA.
- [x] Implementación de lógica de Importación (CU-03).
- [x] Implementación de lógica de Asignación y Clave de Corrección (CU-09).
- [x] Implementación de lógica de Generación Aleatoria de Preguntas (CU-02).
- [x] Levantamiento de la aplicación (PostgreSQL local).
- [x] Pruebas de integración de la API con Postman.
- [ ] Implementación de endpoint de Asignación (CU-09).
- [ ] Pruebas de generación de Claves de Corrección (SHA-256).

### Notas del momento
Hemos resuelto los problemas de entorno instalando Maven manualmente. La lógica de la Clave de Corrección ya usa SHA-256 para garantizar unicidad y seguridad, algo vital para el proceso de escaneo posterior. El siguiente gran reto técnico es la aleatoriedad controlada del CU-02.
