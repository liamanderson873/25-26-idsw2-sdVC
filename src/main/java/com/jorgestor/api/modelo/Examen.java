package com.jorgestor.api.modelo;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "examenes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Examen {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_evaluacion", nullable = false)
    private TipoEvaluacion tipoEvaluacion;

    @Column(name = "es_personalizado", nullable = false)
    private boolean esPersonalizado;

    @Column(name = "fecha_examen")
    private LocalDate fechaExamen;

    @ManyToOne
    @JoinColumn(name = "asignatura_id", nullable = false)
    private Asignatura asignatura;

    // Relación con las preguntas que componen este examen
    @ManyToMany
    @JoinTable(
        name = "examen_preguntas",
        joinColumns = @JoinColumn(name = "examen_id"),
        inverseJoinColumns = @JoinColumn(name = "pregunta_id")
    )
    private List<Pregunta> preguntas;
}
