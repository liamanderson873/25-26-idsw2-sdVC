package com.jorgestor.api.controlador;

import com.jorgestor.api.dto.DTO_Profesor;
import com.jorgestor.api.servicio.ServicioProfesor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profesores")
public class ControladorProfesor {
    private final ServicioProfesor servicioProfesor;

    public ControladorProfesor(ServicioProfesor servicioProfesor) {
        this.servicioProfesor = servicioProfesor;
    }

    @PostMapping
    public ResponseEntity<String> guardar(@RequestBody DTO_Profesor dto) {
        servicioProfesor.crearOActualizar(dto);
        return ResponseEntity.ok("Profesor guardado correctamente.");
    }
}
