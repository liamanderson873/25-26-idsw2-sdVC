package com.jorgestor.api.dto;

import com.jorgestor.api.modelo.Dificultad;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DTO_Pregunta {
    private String enunciado;
    private Dificultad dificultad;
    private Long temaId;
    private List<DTO_Respuesta> respuestas;
}
