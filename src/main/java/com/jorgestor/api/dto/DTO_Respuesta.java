package com.jorgestor.api.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DTO_Respuesta {
    private Long id;
    private String contenido;
    private boolean esCorrecta;
    private Integer indice;
}
