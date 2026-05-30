package com.jorgestor.api.servicio;

import com.jorgestor.api.dto.DTO_GenerarExamen;
import com.jorgestor.api.modelo.*;
import com.jorgestor.api.repositorio.RepositorioAlumno;
import com.jorgestor.api.repositorio.RepositorioAsignatura;
import com.jorgestor.api.repositorio.RepositorioExamen;
import com.jorgestor.api.repositorio.RepositorioExamenAlumno;
import com.jorgestor.api.repositorio.RepositorioPregunta;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HexFormat;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * ServicioExamen: Gestiona el ciclo de vida de los exámenes (Generación y Asignación).
 */
@Service
public class ServicioExamen {

    private final RepositorioExamen repoExamen;
    private final RepositorioExamenAlumno repoExamenAlumno;
    private final RepositorioAlumno repoAlumno;
    private final RepositorioAsignatura repoAsignatura;
    private final RepositorioPregunta repoPregunta;

    public ServicioExamen(RepositorioExamen repoExamen, 
                          RepositorioExamenAlumno repoExamenAlumno, 
                          RepositorioAlumno repoAlumno,
                          RepositorioAsignatura repoAsignatura,
                          RepositorioPregunta repoPregunta) {
        this.repoExamen = repoExamen;
        this.repoExamenAlumno = repoExamenAlumno;
        this.repoAlumno = repoAlumno;
        this.repoAsignatura = repoAsignatura;
        this.repoPregunta = repoPregunta;
    }

    /**
     * CU-02: Generación de Examen.
     * Selecciona preguntas aleatorias basadas en temas y dificultad.
     */
    @Transactional
    public Examen generarExamen(DTO_GenerarExamen dto) {
        // 1. Validamos asignatura
        Asignatura asignatura = repoAsignatura.findById(dto.getAsignaturaId())
                .orElseThrow(() -> new RuntimeException("Asignatura no encontrada"));

        // 2. Cargamos batería de preguntas de los temas seleccionados
        List<Pregunta> poolPreguntas = repoPregunta.findByTemaIdIn(dto.getTemaIds());

        // 3. Agrupamos por dificultad (Los "Sacos")
        Map<Dificultad, List<Pregunta>> sacos = poolPreguntas.stream()
                .collect(Collectors.groupingBy(Pregunta::getDificultad));

        List<Pregunta> seleccionFinal = new ArrayList<>();

        // 4. Seleccionamos según proporciones
        for (Map.Entry<Dificultad, Double> entrada : dto.getProporcionesDificultad().entrySet()) {
            Dificultad dif = entrada.getKey();
            int cantidadPedida = (int) Math.round(dto.getNumPreguntas() * entrada.getValue());
            
            List<Pregunta> preguntasSaco = sacos.getOrDefault(dif, new ArrayList<>());
            
            if (preguntasSaco.size() < cantidadPedida) {
                throw new RuntimeException("Preguntas insuficientes para dificultad: " + dif 
                    + " (Pedidas: " + cantidadPedida + ", Disponibles: " + preguntasSaco.size() + ")");
            }

            // Aleatoriedad dentro del saco
            Collections.shuffle(preguntasSaco);
            seleccionFinal.addAll(preguntasSaco.subList(0, cantidadPedida));
        }

        // 5. Creamos la entidad Examen
        Examen examen = new Examen();
        examen.setAsignatura(asignatura);
        examen.setFechaExamen(LocalDate.now());
        examen.setTipoEvaluacion(dto.getTipoEvaluacion());
        examen.setEsPersonalizado(dto.isEsPersonalizado());
        examen.setPreguntas(seleccionFinal);

        return repoExamen.save(examen);
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
