package com.jorgestor.api.modelo;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

/**
 * Entidad de Auditoría: Registra la marca exacta que el alumno puso en el papel (o que la IA leyó).
 */
@Entity
@Table(name = "examen_alumno_marcas")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExamenAlumnoMarca {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "examen_alumno_id", nullable = false)
    private ExamenAlumno examenAlumno;

    @ManyToOne
    @JoinColumn(name = "pregunta_id", nullable = false)
    private Pregunta pregunta;

    @ManyToOne
    @JoinColumn(name = "respuesta_id") // ID de la respuesta lógica en BD
    private Respuesta respuesta;

    @Column(name = "indice_marcado") // El índice bruto que leyó la IA (0, 1, 2...)
    private Integer indiceMarcado;
}
