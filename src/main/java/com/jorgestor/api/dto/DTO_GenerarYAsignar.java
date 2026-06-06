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
public class DTO_GenerarYAsignar {

    private Long asignaturaId;
    private List<Long> temaIds;
    private TipoEvaluacion tipoEvaluacion;
    private List<ConfigPorGrado> configuraciones;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ConfigPorGrado {
        private Long gradoId;
        private int numPreguntas;
        private Map<Dificultad, Double> proporcionesDificultad;
        private List<Long> alumnoIds;
    }
}
