package com.jorgestor.api.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class DTO_AccionGrupo {
    private Long asignaturaId;
    private String tipoEvaluacion;
    private String fechaExamen;
}
