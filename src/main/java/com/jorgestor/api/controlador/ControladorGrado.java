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

    @GetMapping
    public ResponseEntity<?> listar() {
        return ResponseEntity.ok(servicioGrado.listarTodos());
    }

    @PostMapping
    public ResponseEntity<String> guardar(@RequestBody DTO_Grado dto) {
        servicioGrado.crearOActualizar(dto);
        return ResponseEntity.ok("Grado guardado correctamente.");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminar(@PathVariable Long id) {
        try {
            servicioGrado.eliminar(id);
            return ResponseEntity.ok("Grado eliminado correctamente.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
