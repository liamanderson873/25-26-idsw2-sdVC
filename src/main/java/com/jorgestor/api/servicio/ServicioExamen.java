package com.jorgestor.api.servicio;

import com.jorgestor.api.dto.DTO_ExportarExamen;
import com.jorgestor.api.dto.DTO_GenerarExamen;
import com.jorgestor.api.dto.DTO_ProcesarCorreccion;
import com.jorgestor.api.modelo.*;
import com.jorgestor.api.repositorio.RepositorioAlumno;
import com.jorgestor.api.repositorio.RepositorioAsignatura;
import com.jorgestor.api.repositorio.RepositorioExamen;
import com.jorgestor.api.repositorio.RepositorioExamenAlumno;
import com.jorgestor.api.repositorio.RepositorioExamenAlumnoMarca;
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
    private final RepositorioExamenAlumnoMarca repoMarcas;

    public ServicioExamen(RepositorioExamen repoExamen,
                          RepositorioExamenAlumno repoExamenAlumno, 
                          RepositorioAlumno repoAlumno,
                          RepositorioAsignatura repoAsignatura,     
                          RepositorioPregunta repoPregunta,
                          RepositorioExamenAlumnoMarca repoMarcas) {
        this.repoExamen = repoExamen;
        this.repoExamenAlumno = repoExamenAlumno;
        this.repoAlumno = repoAlumno;
        this.repoAsignatura = repoAsignatura;
        this.repoPregunta = repoPregunta;
        this.repoMarcas = repoMarcas;
    }

    @Transactional(readOnly = true)
    public List<Examen> listarTodos() {
        return repoExamen.findAll();
    }

    @Transactional(readOnly = true)
    public List<ExamenAlumno> listarEjemplaresPorExamen(Long examenId) {
        return repoExamenAlumno.findByExamenId(examenId);
    }

    @Transactional
    public void simularRealizacionExamenes(Long examenId) {
        simularEntregaMasiva(examenId);
    }

    @Transactional
    public void simularEntregaMasiva(Long examenId) {
        Examen examen = repoExamen.findById(examenId)
                .orElseThrow(() -> new RuntimeException("Examen no encontrado"));

        List<ExamenAlumno> ejemplares = repoExamenAlumno.findByExamenId(examenId);
        List<Pregunta> preguntas = examen.getPreguntas();

        for (ExamenAlumno ej : ejemplares) {
            if (ej.getEstado() == EstadoExamen.ASIGNADO || ej.getEstado() == EstadoExamen.PENDIENTE) {
                // Limpiar marcas previas
                repoMarcas.deleteByExamenAlumnoId(ej.getId());

                for (Pregunta p : preguntas) {
                    int randomIdx = (int) (Math.random() * 4);
                    List<Respuesta> resps = p.getRespuestas();
                    Respuesta respElegida = null;
                    if (resps != null && !resps.isEmpty()) {
                        respElegida = resps.stream()
                            .filter(r -> r.getIndice() != null && r.getIndice().equals(randomIdx))
                            .findFirst()
                            .orElse(resps.get(0));
                    }

                    ExamenAlumnoMarca marca = new ExamenAlumnoMarca();
                    marca.setExamenAlumno(ej);
                    marca.setPregunta(p);
                    marca.setRespuesta(respElegida);
                    marca.setIndiceMarcado(randomIdx);
                    repoMarcas.save(marca);
                }
                ej.setEstado(EstadoExamen.PENDIENTE_CALIFICACION);
                repoExamenAlumno.save(ej);
            }
        }
    }

    /**
     * Procesa la corrección de TODOS los alumnos que han entregado el examen.
     * Representa la "gracia" del sistema: la automatización masiva.
     */
    @Transactional
    public void corregirMasivo(Long examenId) {
        List<ExamenAlumno> ejemplares = repoExamenAlumno.findByExamenId(examenId);

        for (ExamenAlumno ej : ejemplares) {
            // Solo corregimos los que están entregados pero no corregidos
            if (ej.getEstado() == EstadoExamen.PENDIENTE_CALIFICACION || ej.getEstado() == EstadoExamen.REALIZADO || ej.getEstado() == EstadoExamen.ENTREGADO) {
                
                List<ExamenAlumnoMarca> marcasAlumno = repoMarcas.findAll().stream()
                        .filter(m -> m.getExamenAlumno().getId().equals(ej.getId()))
                        .collect(Collectors.toList());

                if (marcasAlumno.isEmpty()) continue;

                double aciertos = 0;
                double fallos = 0;

                for (ExamenAlumnoMarca marca : marcasAlumno) {
                    if (marca.getRespuesta() != null && marca.getRespuesta().isEsCorrecta()) {
                        aciertos++;
                    } else if (marca.getRespuesta() != null) {
                        fallos++;
                    }
                }

                double totalPreguntas = ej.getExamen().getPreguntas().size();
                if (totalPreguntas == 0) continue;
                
                double penalizacion = fallos / 3.0;
                double notaCalculada = ((aciertos - penalizacion) / totalPreguntas) * 10.0;
                
                ej.setNotaFinal(Math.max(0, Math.round(notaCalculada * 100.0) / 100.0));
                ej.setEstado(EstadoExamen.CORREGIDO);
                repoExamenAlumno.save(ej);
            }
        }
    }

    /**
     * CU-01: Corrección de Examen (Manual).
     * Procesa los datos de la IA, calcula la nota y guarda auditoría.
     */
    @Transactional
    public void corregirExamen(DTO_ProcesarCorreccion dto) {
        // 1. Buscamos el ejemplar por la clave SHA-256
        ExamenAlumno ejemplar = repoExamenAlumno.findByClaveCorreccion(dto.getClaveSHA256())
                .orElseThrow(() -> new RuntimeException("Clave de corrección inválida: " + dto.getClaveSHA256()));

        // Limpiamos marcas previas si existen (trazabilidad limpia)
        repoMarcas.deleteByExamenAlumnoId(ejemplar.getId());

        double aciertos = 0;
        double fallos = 0;

        // 2. Procesamos cada marca recibida
        for (Map.Entry<Long, Integer> entrada : dto.getMarcas().entrySet()) {
            Long preguntaId = entrada.getKey();
            Integer indiceMarcado = entrada.getValue();

            Pregunta pregunta = repoPregunta.findById(preguntaId)
                    .orElseThrow(() -> new RuntimeException("Pregunta ID " + preguntaId + " no existe"));

            // Buscamos la respuesta lógica que corresponde al índice marcado
            Respuesta respuestaElegida = pregunta.getRespuestas().stream()
                    .filter(r -> r.getIndice().equals(indiceMarcado))
                    .findFirst()
                    .orElse(null);

            // 3. Auditoría: Guardamos qué marcó el alumno
            ExamenAlumnoMarca marca = new ExamenAlumnoMarca();
            marca.setExamenAlumno(ejemplar);
            marca.setPregunta(pregunta);
            marca.setRespuesta(respuestaElegida);
            marca.setIndiceMarcado(indiceMarcado);
            repoMarcas.save(marca);

            // 4. Lógica de Calificación
            if (respuestaElegida != null && respuestaElegida.isEsCorrecta()) {
                aciertos++;
            } else {
                fallos++;
            }
        }

        // 5. Cálculo de Nota Final (Fórmula: Aciertos - (Fallos / 3)) -> asumiendo 4 opciones
        double totalPreguntas = ejemplar.getExamen().getPreguntas().size();
        double penalizacion = fallos / 3.0; // Estándar para 4 opciones
        double notaCalculada = ((aciertos - penalizacion) / totalPreguntas) * 10.0;
        
        // Ajustamos para que la nota no sea negativa y guardamos como NOTA SUGERIDA
        ejemplar.setNotaSugerida(Math.max(0, Math.round(notaCalculada * 100.0) / 100.0));
        
        // El estado pasa a PENDIENTE_CALIFICACION (el profesor debe validar según la minuta)
        ejemplar.setEstado(EstadoExamen.PENDIENTE_CALIFICACION);

        repoExamenAlumno.save(ejemplar);
    }

    /**
     * CU-04: Exportación de Examen.
     * Recupera toda la información necesaria para la impresión.
     */
    @Transactional(readOnly = true)
    public DTO_ExportarExamen exportarExamen(Long examenId) {
        Examen examen = repoExamen.findById(examenId)
                .orElseThrow(() -> new RuntimeException("Examen no encontrado"));

        DTO_ExportarExamen dto = new DTO_ExportarExamen();
        dto.setIdExamen(examen.getId());
        dto.setNombreAsignatura(examen.getAsignatura().getNombre());
        dto.setTipoEvaluacion(examen.getTipoEvaluacion().toString());
        dto.setFecha(examen.getFechaExamen());

        // 1. Mapeamos las preguntas y sus opciones (Forzando la carga de respuestas)
        List<DTO_ExportarExamen.PreguntaExport> preguntasExport = new ArrayList<>();
        for (Pregunta p : examen.getPreguntas()) {
            List<String> opciones = p.getRespuestas().stream()
                    .map(Respuesta::getContenido)
                    .collect(Collectors.toList());
            preguntasExport.add(new DTO_ExportarExamen.PreguntaExport(p.getEnunciado(), p.getDificultad().toString(), opciones));
        }
        dto.setPreguntas(preguntasExport);

        // 2. Mapeamos los alumnos y sus claves SHA-256 (Filtrado directo por examen)
        List<ExamenAlumno> ejemplares = repoExamenAlumno.findAll().stream()
                .filter(e -> e.getExamen().getId().equals(examenId))
                .collect(Collectors.toList());

        List<DTO_ExportarExamen.AlumnoClaveExport> alumnosExport = ejemplares.stream()
                .map(e -> new DTO_ExportarExamen.AlumnoClaveExport(
                        e.getAlumno().getNombre() + " " + e.getAlumno().getApellidos(),
                        e.getClaveCorreccion()))
                .collect(Collectors.toList());
        dto.setAlumnosAsignados(alumnosExport);

        return dto;
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
