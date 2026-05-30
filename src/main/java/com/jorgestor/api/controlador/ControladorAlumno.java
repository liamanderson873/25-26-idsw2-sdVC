package com.jorgestor.api.controlador;

import com.jorgestor.api.dto.DTO_Alumno;
import com.jorgestor.api.servicio.ServicioAlumno;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * ControladorAlumno: La "ventana" al exterior.
 * Aquí definimos las URLs (endpoints) que el usuario podrá llamar desde Postman o el Frontend.
 */
@RestController // Le dice a Spring que esta clase responde a peticiones Web (JSON)
@RequestMapping("/api/alumnos") // La ruta base será http://localhost:8080/api/alumnos
public class ControladorAlumno {

    private final ServicioAlumno servicioAlumno;

    // Inyectamos el servicio por constructor (igual que hicimos en el servicio con el repo)
    public ControladorAlumno(ServicioAlumno servicioAlumno) {
        this.servicioAlumno = servicioAlumno;
    }

    /**
     * Endpoint para importar alumnos (CU-03)
     * @RequestBody: Le dice a Spring que el JSON que enviamos en el cuerpo del POST 
     * debe convertirse automáticamente en una lista de DTO_Alumno.
     */
    @PostMapping("/importar")
    public ResponseEntity<String> importar(@RequestBody List<DTO_Alumno> listaAlumnos) {
        try {
            servicioAlumno.importarAlumnos(listaAlumnos);
            return ResponseEntity.ok("Alumnos procesados correctamente en el sistema.");
        } catch (Exception e) {
            // Si algo falla, devolvemos un error 400 (Bad Request) con el motivo
            return ResponseEntity.badRequest().body("Error al importar alumnos: " + e.getMessage());
        }
    }
}
