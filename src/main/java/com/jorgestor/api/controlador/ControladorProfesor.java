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
        try {
            servicioProfesor.crearOActualizar(dto);
            return ResponseEntity.ok("Profesor guardado correctamente.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> actualizar(@PathVariable Long id, @RequestBody DTO_Profesor dto) {
        try {
            dto.setId(id);
            servicioProfesor.crearOActualizar(dto);
            return ResponseEntity.ok("Profesor actualizado correctamente.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
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
