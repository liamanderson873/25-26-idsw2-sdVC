package com.jorgestor.api.modelo;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.List;

@Entity
@Table(name = "preguntas")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Pregunta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String enunciado;

    @Enumerated(EnumType.STRING) // Guarda el nombre del enum (FACIL, MEDIO...) en la BD
    @Column(nullable = false)
    private Dificultad dificultad;

    // Muchas preguntas pertenecen a un tema
    @ManyToOne
    @JoinColumn(name = "tema_id", nullable = false)
    private Tema tema;

    // Una pregunta tiene muchas respuestas
    // 'cascade' significa que si borramos una pregunta, se borran sus respuestas (limpieza)
    @OneToMany(mappedBy = "pregunta", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Respuesta> respuestas;
}
