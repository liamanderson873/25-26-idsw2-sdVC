# Jorgestor > CU-24-verDocentes > Análisis

> |[🏠️](/Jorgestor/RUP/README.md)|[ 📊](#)|[Detalle](/Jorgestor/RUP/00-casos-uso/02-detalle/CU-24-verDocentes/README.md)|**Análisis**|Diseño|Desarrollo|Pruebas|
> |-|-|-|-|-|-|-|

## información del artefacto

- **Proyecto**: Jorgestor
- **Fase RUP**: Elaboration (Elaboración)
- **Disciplina**: Análisis
- **Versión**: 1.0
- **Fecha**: 2026-05-24
- **Autor**: Equipo de desarrollo

## propósito

Análisis del caso de uso Ver Docentes.

## diagrama de colaboración

<div align=center>

|![Análisis: verDocentes()](colaboracion.puml)|
|-|
|Código fuente: [colaboracion.puml](colaboracion.puml)|

</div>

## clases de análisis identificadas

### clases model (naranja #F2AC4E)
|Clase|Responsabilidad|Trazabilidad|
|-|-|-|
|**Teacher**|Representa al docente con sus credenciales y datos personales|Modelo del dominio|

### clases view (azul #629EF9)
|Clase|Responsabilidad|Derivación|
|-|-|-|
|**TeacherListView**|Interfaz para visualizar lista y solicitar filtrado de docentes|Wireframe|

### clases controller (verde #b5bd68)
|Clase|Responsabilidad|Caso de uso|
|-|-|-|
|**TeacherController**|Recupera lista de docentes autorizados y aplica filtros|verDocentes()|

## mensajes de colaboración

|Origen|Destino|Mensaje|Intención|
|-|-|-|-|
|**AdministradorInstitucional**|**TeacherListView**|`solicitarVerDocentes()`|Iniciar visualización|
|**TeacherListView**|**TeacherController**|`obtenerDocentes()`|Delegar recuperación|
|**TeacherController**|**Teacher**|`consultarTodos()`|Consultar entidades|
|**AdministradorInstitucional**|**TeacherListView**|`aplicarFiltro(criterios)`|Solicitar filtrado|
|**TeacherListView**|**TeacherController**|`filtrar(criterios)`|Procesar criterios|

## trazabilidad con artefactos previos

- **Estados**: `ShowingTeachers`, `FilteringTeachers`.