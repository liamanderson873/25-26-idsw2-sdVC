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

    @GetMapping
    public ResponseEntity<?> listar() {
        return ResponseEntity.ok(servicioProfesor.listarTodos());
    }

    @PostMapping
    public ResponseEntity<String> guardar(@RequestBody DTO_Profesor dto) {
        servicioProfesor.crearOActualizar(dto);
        return ResponseEntity.ok("Profesor guardado correctamente.");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminar(@PathVariable Long id) {
        try {
            servicioProfesor.eliminar(id);
            return ResponseEntity.ok("Profesor eliminado correctamente.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
