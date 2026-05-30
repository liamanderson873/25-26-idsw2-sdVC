package com.jorgestor.api.dto;

import com.jorgestor.api.modelo.Dificultad;
import com.jorgestor.api.modelo.TipoEvaluacion;
import lombok.Data;
import java.util.List;
import java.util.Map;

/**
 * DTO para la solicitud de generación de exámenes (CU-02).
 * Captura todos los parámetros definidos en el modelado.
 */
@Data
public class DTO_GenerarExamen {
    private Long asignaturaId;
    private List<Long> temaIds;
    private Integer numPreguntas;
    private Map<Dificultad, Double> proporcionesDificultad;
    private TipoEvaluacion tipoEvaluacion;
    private boolean esPersonalizado;
}
