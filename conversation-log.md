<div align=right>
 
|[![](https://img.shields.io/badge/-Inicio-FFF?style=flat&logo=Emlakjet&logoColor=black)](/README.md) [![](https://img.shields.io/badge/-RUP-FFF?style=flat&logo=Elsevier&logoColor=black)](/RUP/README.md) [![](https://img.shields.io/badge/-Modelo_del_dominio-FFF?style=flat&logo=freedesktop.org&logoColor=black)](/RUP/02-diseno/diagramas-arquitectonicos/diagrama-entidad-relacion.puml) [![](https://img.shields.io/badge/-Actores_&_Casos_de_Uso-FFF?style=flat&logo=crewunited&logoColor=black)](/RUP/00-casos-uso/01-actores-casos-uso/actores-casos-uso.puml) [![](https://img.shields.io/badge/-Análisis-FFF?style=flat&logo=multisim&logoColor=black)](/RUP/01-analisis/README.md)|
|-:|
|[![](https://img.shields.io/badge/-Estado-FFF?style=flat&logo=greensock&logoColor=black)](/RUP/README.md) [![](https://img.shields.io/badge/-Reflexiones-FFF?style=flat&logo=hootsuite&logoColor=black)](TRAZABILIDAD_TEORICA.md) [![](https://img.shields.io/badge/-Log_de_conversación-FFF?style=flat&logo=gnometerminal&logoColor=black)](conversation-log.md)|

</div>

# Registro de Conversaciones - Proyecto Jorgestor RUP

## Resumen
Este archivo mantiene un registro cronológico y aditivo de todas las decisiones estratégicas y evolución técnica del sistema **Jorgestor**.

---

## Conversación 38: Reparación del Núcleo de Calificación y Auditoría Detallada
**Fecha**: 2026-06-05
**Participantes**: Liam + Gemini CLI

### Contexto de la Sesión
El usuario reporta fallos en la acción de corregir y solicita visibilidad de las marcas reales.

**Prompt clave de Liam**:
> "si ahora lo que queria hacer es arreglar el corregir porque cuando pulso el boton no hace nada. una cosa que si me gustaria que se pudiese ver la correcion hecha 'manualmente' que pudieses meterte a ver cuales ha dado por correcta cuales no en caso de que alguien quiera revisar el examen"

### Desarrollo Principal
1.  **Optimización O(1)**: Sustitución de `findAll()` por `findByExamenAlumnoId` en el repositorio de marcas.
2.  **Sincronización de Estados**: Adición del estado `ENTREGADO` al Enum.
3.  **Módulo de Revisión**: Creación de un panel de solo lectura en Auditoría para visualizar las marcas reales sin riesgo de edición accidental.

---

## Conversación 39: Implementación de Autenticación y RBAC
**Fecha**: 2026-06-05
**Participantes**: Liam + Gemini CLI

### Contexto de la Sesión
Activación de la seguridad siguiendo el modelado RUP.

**Prompt clave de Liam**:
> "vale vamos a ahcer el iniciar sesion y cerrar sesion. tiene que haber dos tipos de formas de entrar, 1 para el docente que puede hacer todo menos acceder al crud de docentes. y 2 el administrados institucional que puede acceder a todo"

### Desarrollo Principal
1.  **Modelo RBAC**: Implementación de roles `DOCENTE` y `ADMINISTRADOR_INSTITUCIONAL`.
2.  **Sidebar Dinámico**: Lógica de visibilidad en React para ocultar el acceso a "Docentes" según el perfil.
3.  **Seguridad**: Rutas protegidas y gestión de sesión mediante `localStorage`.

---

## Conversación 40: Refinamiento de UX y Realismo Académico
**Fecha**: 2026-06-06
**Participantes**: Liam + Gemini CLI

### Contexto de la Sesión
Refinamiento final para alcanzar la calidad de producto definitivo.

**Prompts clave de Liam**:
> "podemos hacer que todo se vea 1000 veces mejor, mas moderno, sin emojis y tal, que se vea chulo."
> "quiero que haya datos muy variados para poder testear el maximo todo, como alumnos que esten en distintos grados, algumnos de el mismo grado que no siempre esten todos en la mismas asignatura porque hay gente que ha reprobaron... tambien deberiamos añadir a que curso pertenece cada alumno."
> "desde donde deberia poder editar que asignaturas tiene un alumno porque no se puede editar desde ningun lado, mira el modelado deberia de ponerlo en algun sitio."
> "vale varias cosas. primero para generar examenes se tendria que poder filtrar por grado... segundo en asignar alumnos se deberia poder filtrar por grado luego asignatura... quinto en corregir examenes deberian salir las respuestas que 'han respondido los alumnos' para que pueda marcarlas como correctas o incorrectas no que yo rellene el examen. sexto las notas son muy bajas... la media deberia de ser de 5."

### Desarrollo Principal
1.  **Rediseño Premium**: Estética "Apple Style" compacta, sin emojis y con ticks de selección animados.
2.  **Complejidad de Matriculación**: Implementación de relación N:M entre Alumnos y Asignaturas (Matrículas) y transversalidad de materias entre Grados.
3.  **UX Jerárquica**: Filtrado en cascada (Grado -> Asignatura -> Temas/Modelos) en todas las pantallas.
4.  **Simulación Humana**: Algoritmo de notas con distribución normal (media 5.0-7.0) basado en perfiles de estudio aleatorios.
5.  **Corrección Visual**: Interfaz de validación manual con semáforo Verde/Rojo precargado con los datos reales del alumno.
6.  **Trazabilidad**: Documentación de la Jerarquía Arquitectónica de 5 niveles en `TRAZABILIDAD_TEORICA.md`.

---
*Misión cumplida. Jorgestor está listo para la entrega oficial.*
