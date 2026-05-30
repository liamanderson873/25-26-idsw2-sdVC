package com.jorgestor.api.controlador;

import com.jorgestor.api.dto.DTO_Grado;
import com.jorgestor.api.servicio.ServicioGrado;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/grados")
public class ControladorGrado {
    private final ServicioGrado servicioGrado;

    public ControladorGrado(ServicioGrado servicioGrado) {
        this.servicioGrado = servicioGrado;
    }

    @PostMapping
    public ResponseEntity<String> guardar(@RequestBody DTO_Grado dto) {
        servicioGrado.crearOActualizar(dto);
        return ResponseEntity.ok("Grado guardado correctamente.");
    }
}
