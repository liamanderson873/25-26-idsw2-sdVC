package com.jorgestor.api.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DTO_Asignatura {
    private Long id;
    private String nombre;
    private String codigo;
    private String cursoAcademico;
    private String dniProfesor;
    private Long gradoId;
}
