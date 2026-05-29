package com.jorgestor.api.modelo;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.List;

@Entity // Le dice a Spring que esta clase es una tabla en la BD
@Table(name = "grados") // Nombre real de la tabla
@Data // Magia de Lombok: genera getters, setters, toString y equals automáticamente
@NoArgsConstructor // Genera un constructor vacío (obligatorio para JPA)
@AllArgsConstructor // Genera un constructor con todos los campos
public class Grado {

    @Id // Define la Clave Primaria (PK)
    @GeneratedValue(strategy = GenerationType.IDENTITY) // ID Autoincremental
    private Long id;

    @Column(nullable = false, unique = true) // No puede ser nulo y debe ser único
    private String codigo;

    @Column(nullable = false)
    private String nombre;

    // Un grado tiene muchos alumnos (One-to-Many)
    // 'mappedBy' indica que la relación la gestiona el campo 'grado' en la clase Alumno
    @OneToMany(mappedBy = "grado")
    private List<Alumno> alumnos;
}
