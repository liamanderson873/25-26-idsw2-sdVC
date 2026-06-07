package com.jorgestor.api.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
public class DTO_RevisionEjemplar {

    private String alumnoNombre;
    private String alumnoApellidos;
    private String alumnoDni;
    private String asignaturaNombre;
    private String tipoEvaluacion;
    private String fechaExamen;
    private String estado;
    private Double notaFinal;
    private List<ItemRevision> preguntas;

    @Data
    @NoArgsConstructor
    public static class ItemRevision {
        private Long preguntaId;
        private String enunciado;
        private String dificultad;
        private List<OpcionRespuesta> respuestas;
        private Integer indiceMarcado;
        private Boolean respondidoCorrectamente;
    }

    @Data
    @NoArgsConstructor
    public static class OpcionRespuesta {
        private int indice;
        private String contenido;
        private boolean esCorrecta;
    }
}
