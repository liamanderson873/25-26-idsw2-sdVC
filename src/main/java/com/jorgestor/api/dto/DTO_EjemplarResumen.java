package com.jorgestor.api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DTO_EjemplarResumen {
    private Long id;
    private Long examenId;
    private String asignaturaNombre;
    private String tipoEvaluacion;
    private String fechaExamen;
    private String estado;
    private Double notaFinal;
    private String claveCorreccion;
    private String alumnoNombre;
    private String alumnoApellidos;
    private String alumnoDni;
}
