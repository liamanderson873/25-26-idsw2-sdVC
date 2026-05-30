package com.jorgestor.api.controlador;

import com.jorgestor.api.dto.DTO_AsignarExamen;
import com.jorgestor.api.dto.DTO_GenerarExamen;
import com.jorgestor.api.modelo.Examen;
import com.jorgestor.api.servicio.ServicioExamen;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * ControladorExamen: Expone las funcionalidades de gestión de exámenes.
 */
@RestController
@RequestMapping("/api/examenes")
public class ControladorExamen {

    private final ServicioExamen servicioExamen;

    public ControladorExamen(ServicioExamen servicioExamen) {
        this.servicioExamen = servicioExamen;
    }

    /**
     * Endpoint para generar un nuevo examen (CU-02)
     */
    @PostMapping("/generar")
    public ResponseEntity<?> generarExamen(@RequestBody DTO_GenerarExamen dto) {
        try {
            Examen examen = servicioExamen.generarExamen(dto);
            return ResponseEntity.ok("Examen generado con éxito. ID: " + examen.getId() + " - Preguntas: " + examen.getPreguntas().size());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error en la generación: " + e.getMessage());
        }
    }

    /**
     * Endpoint para exportar toda la información de un examen (CU-04)
     * Incluye preguntas y claves SHA-256 de los alumnos.
     */
    @GetMapping("/{id}/exportar")
    public ResponseEntity<?> exportarExamen(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(servicioExamen.exportarExamen(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al exportar: " + e.getMessage());
        }
    }
}
