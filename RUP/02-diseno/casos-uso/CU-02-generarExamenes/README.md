# Detallado de Diseño: CU-02 Generar Examen

Este documento detalla el algoritmo de selección aleatoria estratificada por dificultad.

## Diagrama de Secuencia

![CU-02](https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/02-diseno/casos-uso/CU-02-generarExamenes/diseno-secuencia-CU-02-generarExamenes.puml)

## Lógica Técnica
1. Recuperación del pool de preguntas según Temas.
2. Agrupación por Dificultad (Sacos).
3. Barajado aleatorio (`Collections.shuffle`) de cada saco.
4. Selección basada en porcentajes definidos por el docente.
