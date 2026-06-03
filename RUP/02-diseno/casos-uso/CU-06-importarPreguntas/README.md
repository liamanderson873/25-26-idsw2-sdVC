# Detallado de Diseño: CU-06 Importar Preguntas

Este documento detalla la interacción técnica para la alimentación de la batería de preguntas del sistema.

## Diagrama de Secuencia

![Secuencia CU-06](https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/develop/RUP/02-diseno/casos-uso/CU06-importar-preguntas/secuencia.puml)

## Lógica Técnica
1. Se valida la existencia del Tema de destino.
2. Se persiste la **Pregunta** para obtener su ID generado.
3. Se persisten las **Respuestas** vinculadas a la pregunta.
4. Se utiliza **saveAndFlush** para asegurar la disponibilidad del ID en la misma transacción.
