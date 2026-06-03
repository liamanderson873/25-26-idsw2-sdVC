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

    @GetMapping
    public ResponseEntity<?> listar() {
        return ResponseEntity.ok(servicioAsignatura.listarTodos());
    }

    @PostMapping
    public ResponseEntity<String> guardar(@RequestBody DTO_Asignatura dto) {
        try {
            servicioAsignatura.crearOActualizar(dto);
            return ResponseEntity.ok("Asignatura guardada correctamente.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminar(@PathVariable Long id) {
        try {
            servicioAsignatura.eliminar(id);
            return ResponseEntity.ok("Asignatura eliminada correctamente.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
