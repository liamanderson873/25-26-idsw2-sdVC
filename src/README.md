<div align=right>

|[![](https://img.shields.io/badge/-Inicio-FFF?style=flat&logo=Emlakjet&logoColor=black)](/README.md)|
|-:|

</div>

# Backend — Java 21 / Spring Boot 3.2.5

API REST del sistema Jorgestor. Implementa el patrón BCE en capas Spring: `@RestController` (Boundary), `@Service` (Control), `@Repository` (Entity).

## Estructura

```
src/main/java/com/jorgestor/
├── controller/    # @RestController — endpoints REST
├── service/       # @Service — lógica de negocio
├── repository/    # @Repository — acceso a datos (JPA)
├── model/         # Entidades JPA (@Entity)
└── dto/           # Data Transfer Objects
```

## Base de datos

PostgreSQL 17. El esquema se gestiona con `spring.jpa.hibernate.ddl-auto`.

## Inicio

```powershell
.\start-all.ps1
```
