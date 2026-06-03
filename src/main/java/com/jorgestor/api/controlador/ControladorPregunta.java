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

    /**
     * Endpoint para importar una batería de preguntas con sus respuestas (CU-06)
     */
    @PostMapping("/importar")
    public ResponseEntity<String> importarPreguntas(@RequestBody List<DTO_Pregunta> listaPreguntas) {
        try {
            System.out.println("Recibidas " + listaPreguntas.size() + " preguntas para importar...");
            servicioPregunta.importarPreguntas(listaPreguntas);
            return ResponseEntity.ok("Preguntas y respuestas procesadas correctamente en el sistema.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al importar preguntas: " + e.getMessage());
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
