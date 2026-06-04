# Detallado de Diseño: CU-03 Importar Alumnos

Este documento detalla la interacción técnica entre los componentes de la arquitectura de 3 capas para la importación masiva de alumnos.

## Diagrama de Secuencia

![CU-05](https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/develop/RUP/02-diseno/casos-uso/CU-05-importarAlumnos/diseno-secuencia-CU-05-importarAlumnos.puml)

## Lógica Técnica
1. El **Controlador** recibe la lista de alumnos mediante un DTO.
2. El **Servicio** valida la existencia del Grado.
3. Se realiza una operación **UPSERT** (Update or Insert) basada en el DNI del alumno.
4. Toda la operación es **Atómica** (@Transactional).

















































