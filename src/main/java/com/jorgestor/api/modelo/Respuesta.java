package com.jorgestor.api.modelo;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "respuestas")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Respuesta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Se mapea a la columna 'texto' que ya existe y es NOT NULL en la BD
    @Column(name = "texto", columnDefinition = "TEXT", nullable = false)
    private String contenido;

    @Column(name = "es_correcta", nullable = false)
    private boolean esCorrecta;

    @ManyToOne
    @JoinColumn(name = "pregunta_id", nullable = false)
    private Pregunta pregunta;
}
