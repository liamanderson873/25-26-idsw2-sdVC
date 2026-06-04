# Detallado de Diseño: CU-01 Corregir Examen

Este documento detalla el flujo de corrección automatizada basado en el input de la IA.

## Diagrama de Secuencia

![CU-01](https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/develop/RUP/02-diseno/casos-uso/CU-01-corregirExamenes/diseno-secuencia-CU-01-corregirExamenes.puml)

## Lógica Técnica
1. Recepción del JSON escaneado (Clave SHA-256 + Respuestas).
2. Localización del ejemplar único en la base de datos.
3. Comparación lógica entre respuestas del alumno y respuestas correctas.
4. Persistencia de la **Nota Final** y actualización del estado a `CORREGIDO`.

















































