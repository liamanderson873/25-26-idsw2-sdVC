package com.jorgestor.api.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.List;

/**
 * DTO para la solicitud de asignación de exámenes (CU-09).
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DTO_AsignarExamen {
    private Long examenId;
    private List<Long> alumnoIds;
}
