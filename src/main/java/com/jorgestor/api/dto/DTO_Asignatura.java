package com.jorgestor.api.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DTO_Asignatura {
    private String codigo;
    private String nombre;
    private String cursoAcademico;
    private String dniProfesor;
}
