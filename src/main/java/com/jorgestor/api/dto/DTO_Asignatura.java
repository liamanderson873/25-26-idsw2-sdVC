package com.jorgestor.api.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DTO_Asignatura {
    private Long id;
    private String nombre;
    private String codigo;
    private String cursoAcademico;
    private Integer cursoSugerido;
    private String dniProfesor;
    private Long gradoId; // Para compatibilidad
    private List<Long> gradoIds; // Relación N:M con Grados
}
