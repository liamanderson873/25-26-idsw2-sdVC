package com.jorgestor.api.controlador;

import com.jorgestor.api.dto.DTO_AsignarExamen;
import com.jorgestor.api.dto.DTO_GenerarExamen;
import com.jorgestor.api.dto.DTO_ProcesarCorreccion;
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

    @GetMapping
    public ResponseEntity<?> listar() {
        return ResponseEntity.ok(servicioExamen.listarTodos());
    }

    @GetMapping("/{id}/ejemplares")
    public ResponseEntity<?> listarEjemplares(@PathVariable Long id) {
        return ResponseEntity.ok(servicioExamen.listarEjemplaresPorExamen(id));
    }

    @PostMapping("/{id}/entregar")
    public ResponseEntity<?> entregarExamen(@PathVariable Long id) {
        try {
            servicioExamen.simularEntregaMasiva(id);
            return ResponseEntity.ok("Todos los alumnos han 'realizado' el examen. Listos para corrección.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/{id}/corregir-masivo")
    public ResponseEntity<?> corregirMasivo(@PathVariable Long id) {
        try {
            servicioExamen.corregirMasivo(id);
            return ResponseEntity.ok("Corrección masiva completada por la IA para todos los alumnos entregados.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
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

    /**
     * Endpoint para procesar la corrección de un examen (CU-01)
     * Recibe los datos leídos por la IA y calcula la calificación final.
     */
    @PostMapping("/corregir")
    public ResponseEntity<?> corregirExamen(@RequestBody DTO_ProcesarCorreccion dto) {
        try {
            servicioExamen.corregirExamen(dto);
            return ResponseEntity.ok("Corrección procesada con éxito. Nota registrada y marcas guardadas para auditoría.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al procesar la corrección: " + e.getMessage());
        }
    }

    /**
     * Endpoint para asignar un examen a una lista de alumnos (CU-09)
     * Genera automáticamente las claves de corrección SHA-256.
     */
    @PostMapping("/asignar")
    public ResponseEntity<?> asignarExamen(@RequestBody DTO_AsignarExamen dto) {
        try {
            servicioExamen.asignarExamenAAlumnos(dto.getExamenId(), dto.getAlumnoIds());
            return ResponseEntity.ok("Examen ID: " + dto.getExamenId() + " asignado correctamente a " + dto.getAlumnoIds().size() + " alumnos. Claves SHA-256 generadas.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error en la asignación: " + e.getMessage());
        }
    }
}
