package com.jorgestor.api.controlador;

import com.jorgestor.api.dto.DTO_Tema;
import com.jorgestor.api.servicio.ServicioTema;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/temas")
public class ControladorTema {
    private final ServicioTema servicioTema;

    public ControladorTema(ServicioTema servicioTema) {
        this.servicioTema = servicioTema;
    }

    @GetMapping
    public ResponseEntity<?> listar() {
        return ResponseEntity.ok(servicioTema.listarTodos());
    }

    @PostMapping
    public ResponseEntity<String> guardar(@RequestBody DTO_Tema dto) {
        try {
            servicioTema.crearOActualizar(dto);
            return ResponseEntity.ok("Tema guardado correctamente.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminar(@PathVariable Long id) {
        try {
            servicioTema.eliminar(id);
            return ResponseEntity.ok("Tema eliminado correctamente.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
