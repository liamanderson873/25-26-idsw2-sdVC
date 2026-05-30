package com.jorgestor.api.dto;

import com.jorgestor.api.modelo.Dificultad;
import com.jorgestor.api.modelo.TipoEvaluacion;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DTO_GenerarExamen {
    private Long asignaturaId;
    private List<Long> temaIds;
    private Integer numPreguntas;
    private Map<Dificultad, Double> proporcionesDificultad;
    private TipoEvaluacion tipoEvaluacion;
    private boolean esPersonalizado;
}
