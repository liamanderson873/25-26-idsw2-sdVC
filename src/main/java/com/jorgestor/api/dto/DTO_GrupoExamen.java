package com.jorgestor.api.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class DTO_GrupoExamen {
    private Long asignaturaId;
    private String asignaturaNombre;
    private String tipoEvaluacion;
    private String fechaExamen;
    private long totalAlumnos;
    private long pendientes;
    private long entregados;
    private long corregidos;
}
