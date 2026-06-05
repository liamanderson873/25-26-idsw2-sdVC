package com.jorgestor.api.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DTO_Alumno {
    private Long id;
    private String dni;
    private String nombre;
    private String apellidos;
    private Integer curso;
    private String codigoGrado;
    private Long gradoId;
    private List<Long> asignaturaIds;
}
