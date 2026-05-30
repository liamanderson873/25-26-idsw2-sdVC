package com.jorgestor.api.controlador;

import com.jorgestor.api.dto.DTO_Asignatura;
import com.jorgestor.api.servicio.ServicioAsignatura;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/asignaturas")
public class ControladorAsignatura {
    private final ServicioAsignatura servicioAsignatura;

    public ControladorAsignatura(ServicioAsignatura servicioAsignatura) {
        this.servicioAsignatura = servicioAsignatura;
    }

    @PostMapping
    public ResponseEntity<String> guardar(@RequestBody DTO_Asignatura dto) {
        servicioAsignatura.crearOActualizar(dto);
        return ResponseEntity.ok("Asignatura guardada correctamente.");
    }
}
