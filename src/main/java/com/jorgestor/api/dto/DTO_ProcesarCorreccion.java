package com.jorgestor.api.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.Map;

/**
 * DTO para recibir los datos del escaneo de la IA (CU-01).
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DTO_ProcesarCorreccion {
    private String claveSHA256;
    
    // Mapa de preguntaID -> indiceMarcado (0=A, 1=B, etc.)
    private Map<Long, Integer> marcas;
}
