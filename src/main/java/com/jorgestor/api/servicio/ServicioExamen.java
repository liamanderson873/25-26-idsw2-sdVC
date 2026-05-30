package com.jorgestor.api.servicio;

import com.jorgestor.api.modelo.*;
import com.jorgestor.api.repositorio.RepositorioAlumno;
import com.jorgestor.api.repositorio.RepositorioExamen;
import com.jorgestor.api.repositorio.RepositorioExamenAlumno;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HexFormat;
import java.util.List;

/**
 * ServicioExamen: Gestiona el ciclo de vida de los exámenes (Generación y Asignación).
 */
@Service
public class ServicioExamen {

    private final RepositorioExamen repoExamen;
    private final RepositorioExamenAlumno repoExamenAlumno;
    private final RepositorioAlumno repoAlumno;

    public ServicioExamen(RepositorioExamen repoExamen, 
                          RepositorioExamenAlumno repoExamenAlumno, 
                          RepositorioAlumno repoAlumno) {
        this.repoExamen = repoExamen;
        this.repoExamenAlumno = repoExamenAlumno;
        this.repoAlumno = repoAlumno;
    }

    /**
     * CU-09: Asignación de Examen a Alumnos.
     * Vincula un examen existente con una lista de alumnos, generando sus ejemplares únicos.
     */
    @Transactional
    public void asignarExamenAAlumnos(Long examenId, List<Long> alumnoIds) {
        Examen examen = repoExamen.findById(examenId)
                .orElseThrow(() -> new RuntimeException("Examen no encontrado con ID: " + examenId));

        for (Long alumnoId : alumnoIds) {
            Alumno alumno = repoAlumno.findById(alumnoId)
                    .orElseThrow(() -> new RuntimeException("Alumno no encontrado con ID: " + alumnoId));

            ExamenAlumno ejemplar = new ExamenAlumno();
            ejemplar.setExamen(examen);
            ejemplar.setAlumno(alumno);
            ejemplar.setEstado(EstadoExamen.PENDIENTE);
            
            // Generamos la Clave de Corrección (Punto 4 de las Reglas de Oro)
            String clave = generarClaveCorreccion(alumno, examen);
            ejemplar.setClaveCorreccion(clave);

            repoExamenAlumno.save(ejemplar);
        }
    }

    /**
     * Lógica de generación de Hash para la Clave de Corrección.
     * Usa SHA-256 para combinar DNI, ID de Examen y un Salt temporal.
     */
    private String generarClaveCorreccion(Alumno alumno, Examen examen) {
        try {
            String rawData = alumno.getDni() + "|" + examen.getId() + "|" + System.nanoTime();
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(rawData.getBytes(StandardCharsets.UTF_8));
            return HexFormat.of().formatHex(hash).substring(0, 12).toUpperCase(); // 12 caracteres para el QR/ID
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Error al generar el algoritmo de hash", e);
        }
    }
}
