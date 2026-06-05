# 📈 Evolución del Análisis y Diseño (RUP)

Este documento muestra la maduración del sistema **Jorgestor**, comparando el modelado inicial (teórico) con la arquitectura final implementada para satisfacer los requisitos de realismo académico.

---

## 1. Modelo de Datos (Diagrama Entidad-Relación)

### 🔴 Estado Inicial (Modelado)
El diseño original contemplaba relaciones simples 1:N y campos básicos de identificación.

```puml
@startuml
class Examen{
 - evaluación
 - clave corrección
}
class Asignatura{
 - título
 - código
 - curso académico
}
class Pregunta{
 - asignatura
 - enunciado
 - tema
 - dificultad
}
class BateriaDePreguntas{
}
class Grado{
 - título
 - código
}
class Profesor{
 - nombre
 - apellidos
 - DNI
}
class Alumno{
 - nombre
 - apellidos
 - DNI
}
enum EvaluaciónExamen{
 - Parcial 1
 - Parcial 2
 - Parcial 3
 - Examen final
 - Examen extraordinario
}
enum DificultadPregunta{
 - facil
 - medio
 - dificil
}

class Respuesta{
 - opción
 - esCorrecta
}

enum Tema{
}

Respuesta -u-* Pregunta
Pregunta ..> DificultadPregunta
Pregunta -u-o Examen : contiene
Pregunta -u-* BateriaDePreguntas : contiene
Examen ..> EvaluaciónExamen
BateriaDePreguntas -u-* Asignatura : tiene
Examen -u-* Asignatura : tiene
Profesor o-r- Asignatura : tiene
Asignatura --> Grado : pertenece
Alumno -u-o Examen : realiza
Alumno -u-* Asignatura : se imparte
Alumno -u-* Grado : se cursa
Pregunta ..> Tema
@enduml
```

### 🟢 Estado Final (Implementado)
Se ha evolucionado a una arquitectura **N:M** para soportar asignaturas transversales y matriculaciones complejas, añadiendo además la trazabilidad de auditoría.

```puml
@startuml
title Diagrama de Entidad-Relación - Jorgestor (Evolucionado)

class Examen {
  - id: Long
  - fecha: LocalDate
  - tipoEvaluacion: EvaluaciónExamen
  - esPersonalizado: Boolean
}

class Asignatura {
  - id: Long
  - título: String
  - código: String
  - cursoAcademico: String
  - cursoSugerido: Integer
}

class Pregunta {
  - id: Long
  - enunciado: String
  - dificultad: DificultadPregunta
}

class Alumno {
  - id: Long
  - nombre: String
  - apellidos: String
  - DNI: String
  - curso: Integer
}

class ExamenAlumno {
  - id: Long
  - claveCorreccion: String (SHA-256)
  - notaFinal: Double
  - estado: EstadoExamen
}

class ExamenAlumnoMarca {
  - id: Long
  - indiceMarcado: Integer
}

class Respuesta {
  - id: Long
  - contenido: String
  - esCorrecta: Boolean
  - indice: Integer
}

' Relaciones Clave Evolucionadas
Respuesta "*" -u-o "1" Pregunta : contiene
Examen "1" -o "*" Pregunta : se compone de

' Transversalidad N:M (Asignatura en varios Grados)
Asignatura "*" -- "*" Grado : se imparte en

' Matriculación N:M (Alumno en varias Asignaturas)
Alumno "*" -- "*" Asignatura : matriculado en (Matrículas)

' Patrón Modelo vs Ejemplar
Examen "1" -- "*" ExamenAlumno : genera ejemplares
Alumno "1" -- "*" ExamenAlumno : realiza

' Auditoría
ExamenAlumno "1" *-- "*" ExamenAlumnoMarca : registra
ExamenAlumnoMarca "*" -- "1" Pregunta 
ExamenAlumnoMarca "*" -- "1" Respuesta
@enduml
```

---

## 2. Ciclo de Vida del Examen (Diagrama de Estados)

### 🔴 Estado Inicial (Modelado)
Flujo lineal simplificado sin fases de auditoría técnica.

```puml
@startuml
title Diagrama de Estados - Entidad Examen

 [*] --> Generado : generar
 Generado --> Asignado : asignar
 Asignado --> Resuelto : alumnos realizan el examen
 Resuelto --> Corregido : corregir
@enduml
```

### 🟢 Estado Final (Implementado)
Flujo detallado que soporta la simulación de entrega y la validación previa a la calificación final.

```puml
@startuml
title Diagrama de Estados - Ciclo de Vida del Examen (Implementado)

[*] --> PENDIENTE : generar examen

PENDIENTE --> ASIGNADO : asignar alumnos

ASIGNADO --> ENTREGADO : simular entrega / escanear
note on link: Se generan las marcas de auditoría

ENTREGADO --> PENDIENTE_CALIFICACION : validación técnica

PENDIENTE_CALIFICACION --> CORREGIDO : corrección IA o Manual
note on link: Cálculo de nota (Aciertos - Fallos/3)

CORREGIDO --> [*] : acta cerrada
@enduml
```

---
*Este documento demuestra la capacidad del equipo para aplicar un Diseño Evolutivo (JEDUF) manteniendo la trazabilidad con los requisitos originales.*
