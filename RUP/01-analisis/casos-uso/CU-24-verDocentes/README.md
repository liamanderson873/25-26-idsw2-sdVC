# Jorgestor > CU-24-verDocentes > Análisis

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

|![Análisis: verDocentes()](https://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/diseno-secuencia-CU-24-verDocentes.puml&fmt=svg)|
|-|
|Código fuente: [analisis-colaboracion-CU-24-verDocentes.puml](analisis-colaboracion-CU-24-verDocentes.puml)|

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

```plantuml
@startuml verDocentes-analisis
skinparam linetype polyline

actor AdministradorInstitucional
package verDocentes as "verDocentes()" {
    rectangle #629EF9 TeacherListView
    rectangle #b5bd68 TeacherController
    rectangle #F2AC4E Teacher
}

AdministradorInstitucional -r-> TeacherListView: solicitarVerDocentes()
TeacherListView -d-> TeacherController: obtenerDocentes()
TeacherController --> Teacher: consultarTodos()

AdministradorInstitucional --> TeacherListView: aplicarFiltro(criterios)
TeacherListView --> TeacherController: filtrar(criterios)
TeacherController --> Teacher: consultar(criterios)

@enduml
```
















































