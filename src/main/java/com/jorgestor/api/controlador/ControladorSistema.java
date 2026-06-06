package com.jorgestor.api.controlador;

import com.jorgestor.api.modelo.EstadoExamen;
import com.jorgestor.api.repositorio.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedHashMap;
import java.util.Map;

/**
 * CU-41 completarGestion: expone el estado global del sistema.
 */
@RestController
@RequestMapping("/api/sistema")
public class ControladorSistema {

    private final RepositorioGrado repoGrado;
    private final RepositorioAsignatura repoAsignatura;
    private final RepositorioAlumno repoAlumno;
    private final RepositorioPregunta repoPregunta;
    private final RepositorioProfesor repoProfesor;
    private final RepositorioExamen repoExamen;
    private final RepositorioExamenAlumno repoExamenAlumno;

    public ControladorSistema(RepositorioGrado repoGrado, RepositorioAsignatura repoAsignatura,
                               RepositorioAlumno repoAlumno, RepositorioPregunta repoPregunta,
                               RepositorioProfesor repoProfesor, RepositorioExamen repoExamen,
                               RepositorioExamenAlumno repoExamenAlumno) {
        this.repoGrado = repoGrado;
        this.repoAsignatura = repoAsignatura;
        this.repoAlumno = repoAlumno;
        this.repoPregunta = repoPregunta;
        this.repoProfesor = repoProfesor;
        this.repoExamen = repoExamen;
        this.repoExamenAlumno = repoExamenAlumno;
    }

    @GetMapping("/resumen")
    public ResponseEntity<Map<String, Object>> getResumen() {
        Map<String, Object> resumen = new LinkedHashMap<>();

        long totalGrados      = repoGrado.count();
        long totalAsignaturas = repoAsignatura.count();
        long totalAlumnos     = repoAlumno.count();
        long totalPreguntas   = repoPregunta.count();
        long totalDocentes    = repoProfesor.count();
        long totalExamenes    = repoExamen.count();

        long asignados  = repoExamenAlumno.findAll().stream()
                            .filter(e -> e.getEstado() != EstadoExamen.PENDIENTE)
                            .count();
        long corregidos = repoExamenAlumno.findAll().stream()
                            .filter(e -> e.getEstado() == EstadoExamen.CORREGIDO)
                            .count();

        resumen.put("grados",      totalGrados);
        resumen.put("asignaturas", totalAsignaturas);
        resumen.put("alumnos",     totalAlumnos);
        resumen.put("preguntas",   totalPreguntas);
        resumen.put("docentes",    totalDocentes);
        resumen.put("examenes",    totalExamenes);
        resumen.put("asignados",   asignados);
        resumen.put("corregidos",  corregidos);

        // SISTEMA_DISPONIBLE cuando todos los indicadores clave son > 0
        boolean sistemaDisponible = totalGrados > 0 && totalAsignaturas > 0 && totalAlumnos > 0
                && totalPreguntas > 0 && totalDocentes > 0 && totalExamenes > 0
                && asignados > 0 && corregidos > 0;

        resumen.put("sistemaDisponible", sistemaDisponible);

        return ResponseEntity.ok(resumen);
    }
}
