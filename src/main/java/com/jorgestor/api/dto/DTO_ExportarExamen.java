package com.jorgestor.api.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDate;
import java.util.List;

/**
 * DTO principal para la exportación completa de un examen (CU-04).
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DTO_ExportarExamen {
    private Long idExamen;
    private String nombreAsignatura;
    private String tipoEvaluacion;
    private LocalDate fecha;
    private List<PreguntaExport> preguntas;
    private List<AlumnoClaveExport> alumnosAsignados;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PreguntaExport {
        private Long id;
        private String enunciado;
        private String dificultad;
        private List<String> opciones;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AlumnoClaveExport {
        private String nombreAlumno;
        private String claveSHA256;
    }
}
