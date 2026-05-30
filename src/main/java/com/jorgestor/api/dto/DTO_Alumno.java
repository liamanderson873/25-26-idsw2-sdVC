package com.jorgestor.api.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

/**
 * DTO (Data Transfer Object): Es una clase mensajera.
 * Se usa para recibir datos de la web sin usar las entidades de la base de datos directamente.
 * Esto es una buena práctica de seguridad y arquitectura.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DTO_Alumno {
    private String dni;
    private String nombre;
    private String apellidos;
    private String codigoGrado;
}
