package com.jorgestor.api.controlador;

import com.jorgestor.api.dto.DTO_Pregunta;
import com.jorgestor.api.servicio.ServicioPregunta;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/preguntas")
public class ControladorPregunta {

    private final ServicioPregunta servicioPregunta;

    public ControladorPregunta(ServicioPregunta servicioPregunta) {
        this.servicioPregunta = servicioPregunta;
    }

    @GetMapping
    public ResponseEntity<?> listar() {
        return ResponseEntity.ok(servicioPregunta.listarTodas());
    }

    @PostMapping
    public ResponseEntity<String> guardar(@RequestBody DTO_Pregunta dto) {
        try {
            servicioPregunta.guardarIndividual(dto);
            return ResponseEntity.ok("Pregunta guardada correctamente.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    /** CU-06: importar batería de preguntas */
    @PostMapping("/importar")
    public ResponseEntity<String> importarPreguntas(@RequestBody List<DTO_Pregunta> listaPreguntas) {
        try {
            servicioPregunta.importarPreguntas(listaPreguntas);
            return ResponseEntity.ok("Preguntas y respuestas procesadas correctamente en el sistema.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al importar preguntas: " + e.getMessage());
        }
    }

    /** CU-22/editarPregunta: alternar estado habilitada ↔ inhabilitada */
    @PatchMapping("/{id}/toggle-habilitada")
    public ResponseEntity<String> toggleHabilitada(@PathVariable Long id) {
        try {
            boolean nuevoEstado = servicioPregunta.toggleHabilitada(id);
            return ResponseEntity.ok(nuevoEstado ? "Pregunta habilitada." : "Pregunta inhabilitada.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminar(@PathVariable Long id) {
        try {
            servicioPregunta.eliminar(id);
            return ResponseEntity.ok("Pregunta eliminada correctamente.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
