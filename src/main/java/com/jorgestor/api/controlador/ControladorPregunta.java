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

    /**
     * Endpoint para importar una batería de preguntas con sus respuestas (CU-06)
     */
    @PostMapping("/importar")
    public ResponseEntity<String> importarPreguntas(@RequestBody List<DTO_Pregunta> listaPreguntas) {
        try {
            servicioPregunta.importarPreguntas(listaPreguntas);
            return ResponseEntity.ok("Preguntas y respuestas procesadas correctamente en el sistema.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al importar preguntas: " + e.getMessage());
        }
    }
}
