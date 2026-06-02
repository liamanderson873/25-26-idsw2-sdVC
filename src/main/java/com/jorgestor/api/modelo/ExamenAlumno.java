package com.jorgestor.api.modelo;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "examen_alumnos")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExamenAlumno {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "alumno_id", nullable = false)
    private Alumno alumno;

    @ManyToOne
    @JoinColumn(name = "examen_id", nullable = false)
    private Examen examen;

    @Column(name = "clave_correccion", unique = true, nullable = false)
    private String claveCorreccion;

    @Column(name = "nota_sugerida")
    private Double notaSugerida;

    @Column(name = "nota_final")
    private Double notaFinal;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EstadoExamen estado;
}
