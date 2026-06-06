package com.jorgestor.api.controlador;

import com.jorgestor.api.dto.DTO_ConfiguracionGlobal;
import com.jorgestor.api.servicio.ServicioAlumno;
import com.jorgestor.api.servicio.ServicioAsignatura;
import com.jorgestor.api.servicio.ServicioGrado;
import com.jorgestor.api.servicio.ServicioPregunta;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;

@RestController
@RequestMapping("/api/config")
public class ControladorConfiguracion {

    private final ServicioGrado servicioGrado;
    private final ServicioAsignatura servicioAsignatura;
    private final ServicioAlumno servicioAlumno;
    private final ServicioPregunta servicioPregunta;

    public ControladorConfiguracion(ServicioGrado servicioGrado,
                                    ServicioAsignatura servicioAsignatura,
                                    ServicioAlumno servicioAlumno,
                                    ServicioPregunta servicioPregunta) {
        this.servicioGrado = servicioGrado;
        this.servicioAsignatura = servicioAsignatura;
        this.servicioAlumno = servicioAlumno;
        this.servicioPregunta = servicioPregunta;
    }

    /** CU-04: Exportar configuración global completa en un único JSON */
    @GetMapping("/exportar")
    public ResponseEntity<DTO_ConfiguracionGlobal> exportar() {
        DTO_ConfiguracionGlobal config = new DTO_ConfiguracionGlobal(
                Instant.now().toString(),
                servicioGrado.listarTodos(),
                servicioAsignatura.listarTodos(),
                servicioAlumno.listarTodos(),
                servicioPregunta.listarTodas()
        );
        return ResponseEntity.ok(config);
    }

    /** CU-03: Importar configuración global completa desde un único JSON */
    @PostMapping("/importar")
    @Transactional
    public ResponseEntity<String> importar(@RequestBody DTO_ConfiguracionGlobal config) {
        try {
            if (config.getGrados() != null && !config.getGrados().isEmpty()) {
                servicioGrado.importarGrados(config.getGrados());
            }
            if (config.getAsignaturas() != null && !config.getAsignaturas().isEmpty()) {
                servicioAsignatura.importarAsignaturas(config.getAsignaturas());
            }
            if (config.getAlumnos() != null && !config.getAlumnos().isEmpty()) {
                servicioAlumno.importarAlumnos(config.getAlumnos());
            }
            if (config.getPreguntas() != null && !config.getPreguntas().isEmpty()) {
                servicioPregunta.importarPreguntas(config.getPreguntas());
            }
            return ResponseEntity.ok("Configuración global importada correctamente.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al importar configuración: " + e.getMessage());
        }
    }
}
