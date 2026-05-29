package com.jorgestor.api.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DTO_Profesor {
    private String dni;
    private String nombre;
    private String apellidos;
    private String email;
}
