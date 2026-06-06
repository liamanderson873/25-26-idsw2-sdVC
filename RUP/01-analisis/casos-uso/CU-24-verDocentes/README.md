# Jorgestor > CU-24-verDocentes > AnÃ¡lisis

## informaciÃ³n del artefacto

- **Proyecto**: Jorgestor
- **Fase RUP**: Elaboration (ElaboraciÃ³n)
- **Disciplina**: AnÃ¡lisis
- **VersiÃ³n**: 1.0
- **Fecha**: 2026-05-24
- **Autor**: Equipo de desarrollo

## propÃ³sito

AnÃ¡lisis del caso de uso Ver Docentes.

## diagrama de colaboraciÃ³n

<div align=center>

|![AnÃ¡lisis: verDocentes()](https://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/main/RUP/01-analisis/diseno-secuencia-CU-24-verDocentes.puml&fmt=svg)|
|-|
|CÃ³digo fuente: [analisis-colaboracion-CU-24-verDocentes.puml](analisis-colaboracion-CU-24-verDocentes.puml)|

</div>

## clases de anÃ¡lisis identificadas

### clases model (naranja #F2AC4E)
|Clase|Responsabilidad|Trazabilidad|
|-|-|-|
|**Teacher**|Representa al docente con sus credenciales y datos personales|Modelo del dominio|

### clases view (azul #629EF9)
|Clase|Responsabilidad|DerivaciÃ³n|
|-|-|-|
|**TeacherListView**|Interfaz para visualizar lista y solicitar filtrado de docentes|Wireframe|

### clases controller (verde #b5bd68)
|Clase|Responsabilidad|Caso de uso|
|-|-|-|
|**TeacherController**|Recupera lista de docentes autorizados y aplica filtros|verDocentes()|

## mensajes de colaboraciÃ³n

|Origen|Destino|Mensaje|IntenciÃ³n|
|-|-|-|-|
|**AdministradorInstitucional**|**TeacherListView**|`solicitarVerDocentes()`|Iniciar visualizaciÃ³n|
|**TeacherListView**|**TeacherController**|`obtenerDocentes()`|Delegar recuperaciÃ³n|
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
















































