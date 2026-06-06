package com.jorgestor.api.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DTO_AuditoriaAlumno {
    private String nombreAlumno;
    private String apellidosAlumno;
    private String claveCorreccion;
    private Double notaFinal;
    private String estado;
    
    // Mapa de PreguntaID -> Índice Marcado (0, 1, 2, 3 o null si no marcó)
    private Map<Long, Integer> marcas;
}
