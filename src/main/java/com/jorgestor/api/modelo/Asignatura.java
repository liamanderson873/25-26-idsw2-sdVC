package com.jorgestor.api.modelo;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.List;

@Entity
@Table(name = "asignaturas")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Asignatura {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombre;

    @Column(nullable = false, unique = true)
    private String codigo;

    @Column(name = "curso_academico", nullable = false)
    private String cursoAcademico;

    // Muchas asignaturas son impartidas por un profesor
    @ManyToOne
    @JoinColumn(name = "profesor_id", nullable = false)
    private Profesor profesor;

    // Una asignatura tiene muchos temas
    @OneToMany(mappedBy = "asignatura")
    private List<Tema> temas;
    
    // Una asignatura tiene muchos exámenes (lo crearemos más adelante)
}
