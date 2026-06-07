<div align=right>

|[![](https://img.shields.io/badge/-Inicio-FFF?style=flat&logo=Emlakjet&logoColor=black)](/README.md) [![](https://img.shields.io/badge/-RUP-FFF?style=flat&logo=Elsevier&logoColor=black)](/RUP/README.md) [![](https://img.shields.io/badge/-Casos_de_uso-FFF?style=flat&logo=crewunited&logoColor=black)](/RUP/00-casos-uso/01-actores-casos-uso/) [![](https://img.shields.io/badge/-Análisis-FFF?style=flat&logo=multisim&logoColor=black)](/RUP/01-analisis/README.md) [![](https://img.shields.io/badge/-Diseño-FFF?style=flat&logo=postgresql&logoColor=black)](/RUP/02-diseno/README.md) [![](https://img.shields.io/badge/-Evolución-FFF?style=flat&logo=chartdotjs&logoColor=black)](/RUP/EVOLUCION_DISENO.md) [![](https://img.shields.io/badge/-Log_de_conversación-FFF?style=flat&logo=gnometerminal&logoColor=black)](/conversation-log.md)|
|-:|

</div>

# Jorgestor — Sistema de Gestión de Exámenes

## La aplicación

Sistema desarrollado en la asignatura **Ingeniería del Software II (IDSW2)** aplicando metodología **RUP** con patrón **BCE** (Boundary-Control-Entity). Permite a docentes generar exámenes personalizados por alumno a partir de un banco de preguntas, asignarlos, simularlos y corregirlos.

### ¿Qué?

*Un docente configura grados, asignaturas, alumnos y preguntas para que el sistema genere exámenes individualizados, los asigne, produzca hojas de respuesta en PDF y facilite su corrección masiva o por ejemplar.*

<div align=center>

|![Actores y casos de uso — Docente](https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/develop/RUP/00-casos-uso/01-actores-casos-uso/actores-casos-uso.puml)|![Actores y casos de uso — Administrador](https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/develop/RUP/00-casos-uso/01-actores-casos-uso/actores-casos-uso-admin.puml)|
|:-:|:-:|
|Docente (43 CU)|Administrador Institucional (7 CU)|

</div>

## El proyecto

|||
|-|-|
[RUP](/RUP/README.md)|Aplicación completa de la metodología RUP: requisitos, análisis BCE y diseño de implementación para 43 casos de uso.
[Análisis](/RUP/01-analisis/README.md)|43 CU × 2 diagramas (colaboración + secuencia de análisis). Patrón BCE aplicado sistemáticamente con nomenclatura en español.
[Diseño](/RUP/02-diseno/README.md)|43 CU × diagrama de secuencia de implementación (Spring Boot / React) + 4 diagramas arquitectónicos.
[Evolución](/RUP/EVOLUCION_DISENO.md)|Comparativa Baseline vs. As-Built: modelo del dominio y ciclo de vida del examen.
[Log de conversación](/conversation-log.md)|46 conversaciones documentadas que registran el proceso completo de análisis, diseño e implementación.

### Stack tecnológico y arquitectura

> **Stack:** Java 21 · Spring Boot 3.2.5 · PostgreSQL 17 · React · Vite · TanStack Query
>
> **Seguridad:** RBAC con dos roles (Docente / Administrador Institucional) · Firmas SHA-256 · Auditoría técnica completa
>
> **Inicio:**
> ```powershell
> .\start-all.ps1
> ```
>
> |Rol|Usuario|Contraseña|
> |-|-|-|
> |Docente|`docente`|`docente123`|
> |Administrador|`admin`|`admin123`|

### Diagrama de contexto — Docente

<div align=center>

<img width="700" src="https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/develop/RUP/00-casos-uso/01-actores-casos-uso/diagrama-contexto-docente.puml"/>

</div>

### Evolución del modelo del dominio

<div align=center>

|Baseline|As-Built|
|:-:|:-:|
|<img width="380" src="https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/develop/RUP/00-baseline/diagramaEntidad/original.puml"/>|<img width="380" src="https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/develop/RUP/02-diseno/diagramas-arquitectonicos/diagrama-entidad-relacion.puml"/>|

|Baseline|As-Built|
|:-:|:-:|
|<img width="280" src="https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/develop/RUP/00-baseline/diagramaEstadosExamen/original.puml"/>|<img width="440" src="https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/develop/RUP/02-diseno/diagramas-arquitectonicos/diagrama-estados-examen.puml"/>|

</div>

## Hitos

|Análisis y diseño|Implementación|Documentación|
|-|-|-|
|**43 casos de uso** con análisis BCE completo (colaboración + secuencia)|**Generación personalizada por alumno** con selección de preguntas aleatorias por asignatura y grado|**46 conversaciones** documentadas con prompts y decisiones de diseño|
|**Patrón BCE** aplicado sistemáticamente con nomenclatura en español|**Corrección masiva por grupo** con marcas de corrección persistidas|**Trazabilidad RUP completa**: requisitos → análisis → diseño → implementación|
|**4 CU abstractos** modelados correctamente con notación `[->` sin actor directo|**Hojas de respuesta en PDF** personalizadas por alumno|**Evolución documentada** (Baseline vs. As-Built) mediante proceso JEDUF|
|**2 actores** con diagramas de contexto independientes (Docente y Administrador)|**Auditoría técnica SHA-256** y simulación de entrega|**Alineación con ModelingRepo** (rama `fix-revision-final`)|

## Estructura del repositorio

```text
Jorgestor/
├── RUP/
│   ├── 00-baseline/                 # Diseño original (antes de la implementación)
│   ├── 00-casos-uso/                # Actores, casos de uso y diagramas de contexto
│   ├── 01-analisis/                 # 43 CU × colaboración + secuencia de análisis
│   ├── 02-diseno/                   # 43 CU × secuencia de diseño + 4 diagramas arquitectónicos
│   └── EVOLUCION_DISENO.md          # Comparativa Baseline vs. As-Built
├── src/                             # Backend (Spring Boot / Java 21)
├── frontend/                        # Frontend (React + Vite)
├── start-all.ps1                    # Script de inicio completo
├── conversation-log.md              # Registro de 46 conversaciones
└── README.md
```
