# 📈 Evolución del Análisis y Diseño (RUP)

Este documento muestra la maduración del sistema **Jorgestor**, comparando el modelado inicial (teórico) con la arquitectura final implementada para satisfacer los requisitos de realismo académico.

---

## 1. Modelo del Dominio (Diagrama Entidad-Relación)

### 🔴 Diseño Original (Baseline)
El diseño inicial contemplaba relaciones simples y una estructura de datos reducida.

![Baseline ER](https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/develop/RUP/00-baseline/diagramaEntidad/original.puml)

### 🟢 Implementación Final (As-Built)
Se ha evolucionado a una arquitectura jerárquica con relaciones N:M, soporte para auditoría técnica y gestión de cursos, manteniendo la estética original aprobada.

![Final ER](https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/develop/RUP/02-diseno/diagramas-arquitectonicos/diagrama-entidad-relacion.puml)

---

## 2. Ciclo de Vida del Examen (Estados)

### 🔴 Flujo Original
Un proceso lineal sin validaciones técnicas intermedias.

![Baseline Estados](https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/develop/RUP/00-baseline/diagramaEstadosExamen/original.puml)

### 🟢 Flujo Final
Incluye fases de auditoría, simulación de entrega y validación por parte del docente.

![Final Estados](https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/develop/RUP/02-diseno/diagramas-arquitectonicos/diagrama-estados-examen.puml)

---
[⬅️ Volver al Panel Maestro](../README.md)
