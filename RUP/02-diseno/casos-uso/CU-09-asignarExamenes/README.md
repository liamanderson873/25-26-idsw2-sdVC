# Detallado de Diseño: CU-09 Asignar Examen

Este documento detalla la vinculación entre un examen y una clase de alumnos.

## Diagrama de Secuencia

![CU-09](https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/develop/RUP/02-diseno/casos-uso/CU-09-asignarExamenes/secuencia.puml)

## Lógica Técnica
1. Creación de ejemplares únicos (`ExamenAlumno`).
2. **Generación de Clave**: Algoritmo SHA-256 combinando DNI, ID Examen y Salt.
3. El resultado es un identificador de 12 caracteres infalsificable para el proceso de escaneo.


