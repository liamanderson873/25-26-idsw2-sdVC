package com.jorgestor.api.servicio;

import com.jorgestor.api.dto.DTO_AccionGrupo;
import com.jorgestor.api.dto.DTO_AuditoriaAlumno;
import com.jorgestor.api.dto.DTO_EjemplarResumen;
import com.jorgestor.api.dto.DTO_GrupoExamen;
import com.jorgestor.api.dto.DTO_RevisionEjemplar;
import com.jorgestor.api.dto.DTO_ExportarExamen;
import com.jorgestor.api.dto.DTO_GenerarExamen;
import com.jorgestor.api.dto.DTO_GenerarYAsignar;
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
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.HexFormat;
import java.util.LinkedHashMap;
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

    private DTO_EjemplarResumen toResumen(ExamenAlumno ea) {
        return new DTO_EjemplarResumen(
            ea.getId(),
            ea.getExamen().getId(),
            ea.getExamen().getAsignatura().getNombre(),
            ea.getExamen().getTipoEvaluacion().toString(),
            ea.getExamen().getFechaExamen().toString(),
            ea.getEstado().toString(),
            ea.getNotaFinal(),
            ea.getClaveCorreccion(),
            ea.getAlumno().getNombre(),
            ea.getAlumno().getApellidos(),
            ea.getAlumno().getDni()
        );
    }

    @Transactional(readOnly = true)
    public Map<Long, Long> contarExamenesPorAlumno() {
        Map<Long, Long> result = new HashMap<>();
        for (Object[] row : repoExamenAlumno.countByAlumno()) {
            result.put((Long) row[0], (Long) row[1]);
        }
        return result;
    }

    @Transactional(readOnly = true)
    public Map<Long, Long> contarExamenesPorAsignatura() {
        Map<Long, Long> result = new HashMap<>();
        for (Object[] row : repoExamenAlumno.countByAsignatura()) {
            result.put((Long) row[0], (Long) row[1]);
        }
        return result;
    }

    @Transactional(readOnly = true)
    public List<DTO_GrupoExamen> listarGrupos() {
        List<Object[]> rows = repoExamenAlumno.findGruposConConteos();
        Map<String, DTO_GrupoExamen> grupos = new LinkedHashMap<>();
        for (Object[] row : rows) {
            Long asignaturaId        = (Long) row[0];
            String asignaturaNombre  = (String) row[1];
            TipoEvaluacion tipo      = (TipoEvaluacion) row[2];
            LocalDate fecha          = (LocalDate) row[3];
            EstadoExamen estado      = (EstadoExamen) row[4];
            long count               = (Long) row[5];
            String key = asignaturaId + "|" + tipo + "|" + fecha;
            DTO_GrupoExamen g = grupos.computeIfAbsent(key, k -> {
                DTO_GrupoExamen dto = new DTO_GrupoExamen();
                dto.setAsignaturaId(asignaturaId);
                dto.setAsignaturaNombre(asignaturaNombre);
                dto.setTipoEvaluacion(tipo.toString());
                dto.setFechaExamen(fecha.toString());
                return dto;
            });
            g.setTotalAlumnos(g.getTotalAlumnos() + count);
            if (estado == EstadoExamen.PENDIENTE) {
                g.setPendientes(g.getPendientes() + count);
            } else if (estado == EstadoExamen.ASIGNADO) {
                g.setAsignados(g.getAsignados() + count);
            } else if (estado == EstadoExamen.ENTREGADO || estado == EstadoExamen.PENDIENTE_CALIFICACION || estado == EstadoExamen.REALIZADO) {
                g.setEntregados(g.getEntregados() + count);
            } else if (estado == EstadoExamen.CORREGIDO) {
                g.setCorregidos(g.getCorregidos() + count);
            }
        }
        return new ArrayList<>(grupos.values());
    }

    @Transactional(readOnly = true)
    public List<DTO_EjemplarResumen> listarEjemplaresDeGrupo(DTO_AccionGrupo dto) {
        TipoEvaluacion tipo = TipoEvaluacion.valueOf(dto.getTipoEvaluacion());
        LocalDate fecha = LocalDate.parse(dto.getFechaExamen());
        return repoExamenAlumno.findByGrupo(dto.getAsignaturaId(), tipo, fecha)
                .stream().map(this::toResumen).collect(Collectors.toList());
    }

    @Transactional
    public void simularEntregaGrupo(DTO_AccionGrupo dto) {
        TipoEvaluacion tipo = TipoEvaluacion.valueOf(dto.getTipoEvaluacion());
        LocalDate fecha = LocalDate.parse(dto.getFechaExamen());
        List<ExamenAlumno> ejemplares = repoExamenAlumno.findByGrupo(dto.getAsignaturaId(), tipo, fecha);
        List<ExamenAlumno> candidatos = ejemplares.stream()
                .filter(ej -> ej.getEstado() == EstadoExamen.ASIGNADO)
                .collect(Collectors.toList());
        if (candidatos.isEmpty()) return;
        List<Long> ids = candidatos.stream().map(ExamenAlumno::getId).collect(Collectors.toList());
        repoMarcas.deleteAllByExamenAlumnoIdIn(ids);
        repoMarcas.flush();
        List<ExamenAlumno> actualizados = new ArrayList<>();
        List<ExamenAlumnoMarca> todasLasMarcas = new ArrayList<>();
        for (ExamenAlumno ej : candidatos) {
            Examen examen = repoExamen.findByIdConPreguntasYRespuestas(ej.getExamen().getId())
                    .orElseThrow(() -> new RuntimeException("Examen no encontrado"));
            List<Pregunta> preguntas = new ArrayList<>(examen.getPreguntas());
            double nivel = 0.3 + (Math.random() * 0.65);
            for (Pregunta p : preguntas) {
                Respuesta correcta = p.getRespuestas().stream()
                        .filter(Respuesta::isEsCorrecta).findFirst().orElse(p.getRespuestas().get(0));
                int indiceElegido = Math.random() < nivel ? correcta.getIndice() : (int) (Math.random() * 4);
                Respuesta respElegida = p.getRespuestas().stream()
                        .filter(r -> r.getIndice().equals(indiceElegido)).findFirst().orElse(correcta);
                ExamenAlumnoMarca marca = new ExamenAlumnoMarca();
                marca.setExamenAlumno(ej);
                marca.setPregunta(p);
                marca.setRespuesta(respElegida);
                marca.setIndiceMarcado(indiceElegido);
                todasLasMarcas.add(marca);
            }
            ej.setEstado(EstadoExamen.PENDIENTE_CALIFICACION);
            actualizados.add(ej);
        }
        repoMarcas.saveAll(todasLasMarcas);
        repoExamenAlumno.saveAll(actualizados);
    }

    @Transactional
    public void corregirGrupo(DTO_AccionGrupo dto) {
        TipoEvaluacion tipo = TipoEvaluacion.valueOf(dto.getTipoEvaluacion());
        LocalDate fecha = LocalDate.parse(dto.getFechaExamen());
        List<ExamenAlumno> ejemplares = repoExamenAlumno.findByGrupo(dto.getAsignaturaId(), tipo, fecha);
        List<ExamenAlumno> candidatos = ejemplares.stream()
                .filter(ej -> ej.getEstado() == EstadoExamen.PENDIENTE_CALIFICACION
                           || ej.getEstado() == EstadoExamen.ENTREGADO
                           || ej.getEstado() == EstadoExamen.REALIZADO)
                .collect(Collectors.toList());
        if (candidatos.isEmpty()) return;
        List<Long> ids = candidatos.stream().map(ExamenAlumno::getId).collect(Collectors.toList());
        List<ExamenAlumnoMarca> todasLasMarcas = repoMarcas.findAllByExamenAlumnoIdIn(ids);
        Map<Long, List<ExamenAlumnoMarca>> marcasPorEjemplar = todasLasMarcas.stream()
                .collect(Collectors.groupingBy(m -> m.getExamenAlumno().getId()));
        List<ExamenAlumno> actualizados = new ArrayList<>();
        for (ExamenAlumno ej : candidatos) {
            List<ExamenAlumnoMarca> marcasAlumno = marcasPorEjemplar.getOrDefault(ej.getId(), Collections.emptyList());
            if (marcasAlumno.isEmpty()) continue;
            double totalPreguntas = marcasAlumno.size();
            double aciertos = 0, fallos = 0;
            for (ExamenAlumnoMarca marca : marcasAlumno) {
                if (marca.getRespuesta() != null && marca.getRespuesta().isEsCorrecta()) aciertos++;
                else if (marca.getRespuesta() != null) fallos++;
            }
            double nota = ((aciertos - (fallos / 3.0)) / totalPreguntas) * 10.0;
            ej.setNotaFinal(Math.max(0, Math.round(nota * 100.0) / 100.0));
            ej.setEstado(EstadoExamen.CORREGIDO);
            actualizados.add(ej);
        }
        repoExamenAlumno.saveAll(actualizados);
    }

    @Transactional(readOnly = true)
    public List<DTO_EjemplarResumen> listarEjemplaresPorAlumno(Long alumnoId) {
        return repoExamenAlumno.findByAlumnoId(alumnoId)
                .stream().map(this::toResumen).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<DTO_EjemplarResumen> listarEjemplaresPorAsignatura(Long asignaturaId) {
        return repoExamenAlumno.findByAsignaturaId(asignaturaId)
                .stream().map(this::toResumen).collect(Collectors.toList());
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
        // 1 query: examen + preguntas + respuestas (JOIN FETCH)
        Examen examen = repoExamen.findByIdConPreguntasYRespuestas(examenId)
                .orElseThrow(() -> new RuntimeException("Examen no encontrado"));

        // 1 query: todos los ejemplares + alumno + examen (JOIN FETCH)
        List<ExamenAlumno> ejemplares = repoExamenAlumno.findByExamenId(examenId);
        List<Pregunta> preguntas = new ArrayList<>(examen.getPreguntas());

        List<ExamenAlumno> candidatos = ejemplares.stream()
                .filter(ej -> ej.getEstado() == EstadoExamen.ASIGNADO)
                .collect(Collectors.toList());

        if (candidatos.isEmpty()) return;

        // 1 DELETE masivo en lugar de N deletes individuales
        List<Long> candidatoIds = candidatos.stream().map(ExamenAlumno::getId).collect(Collectors.toList());
        repoMarcas.deleteAllByExamenAlumnoIdIn(candidatoIds);
        repoMarcas.flush();

        List<ExamenAlumno> ejemplaresActualizados = new ArrayList<>();
        List<ExamenAlumnoMarca> todasLasMarcas    = new ArrayList<>();

        for (ExamenAlumno ej : candidatos) {
            double nivelPreparacion = 0.3 + (Math.random() * 0.65);

            for (Pregunta p : preguntas) {
                Respuesta correcta = p.getRespuestas().stream()
                        .filter(Respuesta::isEsCorrecta)
                        .findFirst()
                        .orElse(p.getRespuestas().get(0));

                int indiceElegido = (Math.random() < nivelPreparacion)
                        ? correcta.getIndice()
                        : (int) (Math.random() * 4);

                Respuesta respElegida = p.getRespuestas().stream()
                        .filter(r -> r.getIndice().equals(indiceElegido))
                        .findFirst()
                        .orElse(correcta);

                ExamenAlumnoMarca marca = new ExamenAlumnoMarca();
                marca.setExamenAlumno(ej);
                marca.setPregunta(p);
                marca.setRespuesta(respElegida);
                marca.setIndiceMarcado(indiceElegido);
                todasLasMarcas.add(marca);
            }

            ej.setEstado(EstadoExamen.PENDIENTE_CALIFICACION);
            ejemplaresActualizados.add(ej);
        }

        // 1 batch INSERT + 1 batch UPDATE
        repoMarcas.saveAll(todasLasMarcas);
        repoExamenAlumno.saveAll(ejemplaresActualizados);
    }

    /**
     * Procesa la corrección de TODOS los alumnos que han entregado el examen.
     * Representa la "gracia" del sistema: la automatización masiva.
     */
    @Transactional
    public void corregirMasivo(Long examenId) {
        // 1 query JOIN FETCH para todos los ejemplares
        List<ExamenAlumno> ejemplares = repoExamenAlumno.findByExamenId(examenId);

        List<ExamenAlumno> candidatos = ejemplares.stream()
                .filter(ej -> ej.getEstado() == EstadoExamen.PENDIENTE_CALIFICACION
                           || ej.getEstado() == EstadoExamen.REALIZADO
                           || ej.getEstado() == EstadoExamen.ENTREGADO)
                .collect(Collectors.toList());

        if (candidatos.isEmpty()) return;

        // 1 query para TODAS las marcas de todos los candidatos a la vez
        List<Long> candidatoIds = candidatos.stream().map(ExamenAlumno::getId).collect(Collectors.toList());
        List<ExamenAlumnoMarca> todasLasMarcas = repoMarcas.findAllByExamenAlumnoIdIn(candidatoIds);

        // Agrupamos las marcas por ejemplarId en memoria para evitar más queries
        Map<Long, List<ExamenAlumnoMarca>> marcasPorEjemplar = todasLasMarcas.stream()
                .collect(Collectors.groupingBy(m -> m.getExamenAlumno().getId()));

        // Carga total de preguntas del examen en 1 query (ya en caché de la sesión)
        Examen examen = repoExamen.findById(examenId).orElseThrow();
        double totalPreguntas = examen.getPreguntas().size();

        List<ExamenAlumno> actualizados = new ArrayList<>();

        for (ExamenAlumno ej : candidatos) {
            List<ExamenAlumnoMarca> marcasAlumno = marcasPorEjemplar.getOrDefault(ej.getId(), Collections.emptyList());
            if (marcasAlumno.isEmpty()) continue;

            double aciertos = 0, fallos = 0;
            for (ExamenAlumnoMarca marca : marcasAlumno) {
                if (marca.getRespuesta() != null && marca.getRespuesta().isEsCorrecta()) aciertos++;
                else if (marca.getRespuesta() != null) fallos++;
            }

            if (totalPreguntas == 0) continue;
            double notaCalculada = ((aciertos - (fallos / 3.0)) / totalPreguntas) * 10.0;
            ej.setNotaFinal(Math.max(0, Math.round(notaCalculada * 100.0) / 100.0));
            ej.setEstado(EstadoExamen.CORREGIDO);
            actualizados.add(ej);
        }

        // 1 batch UPDATE en lugar de N saves individuales
        repoExamenAlumno.saveAll(actualizados);
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
        
        // Guardamos la nota final calculada tras la validación manual
        ejemplar.setNotaFinal(Math.max(0, Math.round(notaCalculada * 100.0) / 100.0));
        
        // El estado pasa a CORREGIDO
        ejemplar.setEstado(EstadoExamen.CORREGIDO);

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
            preguntasExport.add(new DTO_ExportarExamen.PreguntaExport(p.getId(), p.getEnunciado(), p.getDificultad().toString(), opciones));
        }
        dto.setPreguntas(preguntasExport);

        // 2. Mapeamos los alumnos y sus claves SHA-256 (solo los formalmente asignados)
        List<ExamenAlumno> ejemplares = repoExamenAlumno.findAll().stream()
                .filter(e -> e.getExamen().getId().equals(examenId) && e.getClaveCorreccion() != null)
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

        // 2. Cargamos batería de preguntas habilitadas de los temas seleccionados
        List<Pregunta> poolPreguntas = repoPregunta.findByTemaIdInAndHabilitadaTrue(dto.getTemaIds());

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
        examen.setPreguntas(new java.util.HashSet<>(seleccionFinal));

        return repoExamen.save(examen);
    }

    /**
     * CU-02 + CU-09 combinados: genera un Examen personalizado por alumno.
     * Cada alumno recibe una selección aleatoria independiente del pool de preguntas,
     * garantizando exámenes únicos incluso con los mismos parámetros de configuración.
     */
    @Transactional
    public int generarYAsignar(DTO_GenerarYAsignar dto) {
        Asignatura asignatura = repoAsignatura.findById(dto.getAsignaturaId())
                .orElseThrow(() -> new RuntimeException("Asignatura no encontrada"));

        List<Pregunta> poolTotal = repoPregunta.findByTemaIdInAndHabilitadaTrue(dto.getTemaIds());

        Map<Dificultad, List<Pregunta>> sacosPorDificultad = poolTotal.stream()
                .collect(Collectors.groupingBy(Pregunta::getDificultad));

        int totalGenerados = 0;

        for (DTO_GenerarYAsignar.ConfigPorGrado config : dto.getConfiguraciones()) {
            for (Long alumnoId : config.getAlumnoIds()) {
                List<Pregunta> seleccion = new ArrayList<>();

                for (Map.Entry<Dificultad, Double> entrada : config.getProporcionesDificultad().entrySet()) {
                    Dificultad dif = entrada.getKey();
                    int cantidad = (int) Math.round(config.getNumPreguntas() * entrada.getValue());
                    if (cantidad == 0) continue;

                    List<Pregunta> saco = new ArrayList<>(sacosPorDificultad.getOrDefault(dif, new ArrayList<>()));
                    if (saco.size() < cantidad) {
                        throw new RuntimeException("Preguntas insuficientes para dificultad " + dif
                                + " (pedidas: " + cantidad + ", disponibles: " + saco.size() + ")");
                    }
                    Collections.shuffle(saco);
                    seleccion.addAll(saco.subList(0, cantidad));
                }

                Examen examen = new Examen();
                examen.setAsignatura(asignatura);
                examen.setFechaExamen(LocalDate.now());
                examen.setTipoEvaluacion(dto.getTipoEvaluacion());
                examen.setEsPersonalizado(true);
                examen.setPreguntas(new java.util.HashSet<>(seleccion));
                repoExamen.save(examen);

                Alumno alumno = repoAlumno.findById(alumnoId)
                        .orElseThrow(() -> new RuntimeException("Alumno no encontrado: " + alumnoId));

                ExamenAlumno ejemplar = new ExamenAlumno();
                ejemplar.setExamen(examen);
                ejemplar.setAlumno(alumno);
                ejemplar.setEstado(EstadoExamen.PENDIENTE);
                repoExamenAlumno.save(ejemplar);

                totalGenerados++;
            }
        }

        return totalGenerados;
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
     * Recupera las marcas registradas de un alumno para su revisión (Auditoría).
     */
    @Transactional(readOnly = true)
    public DTO_AuditoriaAlumno obtenerAuditoriaAlumno(Long ejemplarId) {
        ExamenAlumno ej = repoExamenAlumno.findById(ejemplarId)
                .orElseThrow(() -> new RuntimeException("Ejemplar no encontrado"));

        List<ExamenAlumnoMarca> marcas = repoMarcas.findByExamenAlumnoId(ejemplarId);
        
        // Uso de HashMap tradicional para evitar fallos por duplicados o valores nulos
        Map<Long, Integer> mapaMarcas = new HashMap<>();
        for (ExamenAlumnoMarca m : marcas) {
            if (m.getPregunta() != null && m.getPregunta().getId() != null) {
                mapaMarcas.put(m.getPregunta().getId(), m.getIndiceMarcado());
            }
        }

        DTO_AuditoriaAlumno dto = new DTO_AuditoriaAlumno();
        dto.setNombreAlumno(ej.getAlumno().getNombre());
        dto.setApellidosAlumno(ej.getAlumno().getApellidos());
        dto.setClaveCorreccion(ej.getClaveCorreccion());
        dto.setNotaFinal(ej.getNotaFinal());
        dto.setEstado(ej.getEstado().toString());
        dto.setMarcas(mapaMarcas);

        return dto;
    }

    /**
     * Devuelve las preguntas del ejemplar con las respuestas del alumno y si son correctas o no.
     */
    @Transactional(readOnly = true)
    public DTO_RevisionEjemplar obtenerRevisionEjemplar(Long ejemplarId) {
        ExamenAlumno ea = repoExamenAlumno.findById(ejemplarId)
                .orElseThrow(() -> new RuntimeException("Ejemplar no encontrado"));

        // Cargar preguntas + respuestas con JOIN FETCH para evitar lazy-load del Set<Pregunta>
        Examen examen = repoExamen.findByIdConPreguntasYRespuestas(ea.getExamen().getId())
                .orElseThrow(() -> new RuntimeException("Examen no encontrado"));

        List<ExamenAlumnoMarca> marcas = repoMarcas.findByExamenAlumnoId(ejemplarId);
        Map<Long, Integer> mapaMarcas = new HashMap<>();
        for (ExamenAlumnoMarca m : marcas) {
            if (m.getPregunta() != null && m.getPregunta().getId() != null) {
                mapaMarcas.put(m.getPregunta().getId(), m.getIndiceMarcado());
            }
        }

        DTO_RevisionEjemplar dto = new DTO_RevisionEjemplar();
        dto.setAlumnoNombre(ea.getAlumno().getNombre());
        dto.setAlumnoApellidos(ea.getAlumno().getApellidos());
        dto.setAlumnoDni(ea.getAlumno().getDni());
        dto.setAsignaturaNombre(examen.getAsignatura().getNombre());
        dto.setTipoEvaluacion(examen.getTipoEvaluacion().toString());
        dto.setFechaExamen(examen.getFechaExamen() != null ? examen.getFechaExamen().toString() : null);
        dto.setEstado(ea.getEstado().toString());
        dto.setNotaFinal(ea.getNotaFinal());

        // Convertir Set a List para iterar sin disparar hashCode en el PersistentSet
        List<Pregunta> preguntas = new ArrayList<>(examen.getPreguntas());
        List<DTO_RevisionEjemplar.ItemRevision> items = new ArrayList<>();
        for (Pregunta p : preguntas) {
            DTO_RevisionEjemplar.ItemRevision item = new DTO_RevisionEjemplar.ItemRevision();
            item.setPreguntaId(p.getId());
            item.setEnunciado(p.getEnunciado());
            item.setDificultad(p.getDificultad().toString());

            List<DTO_RevisionEjemplar.OpcionRespuesta> opciones = new ArrayList<>();
            for (Respuesta r : p.getRespuestas()) {
                DTO_RevisionEjemplar.OpcionRespuesta op = new DTO_RevisionEjemplar.OpcionRespuesta();
                op.setIndice(r.getIndice());
                op.setContenido(r.getContenido());
                op.setEsCorrecta(r.isEsCorrecta());
                opciones.add(op);
            }
            opciones.sort(java.util.Comparator.comparingInt(DTO_RevisionEjemplar.OpcionRespuesta::getIndice));
            item.setRespuestas(opciones);

            Integer marcado = mapaMarcas.get(p.getId());
            item.setIndiceMarcado(marcado);
            if (marcado != null) {
                boolean correcto = opciones.stream()
                        .filter(op -> op.getIndice() == marcado)
                        .findFirst()
                        .map(DTO_RevisionEjemplar.OpcionRespuesta::isEsCorrecta)
                        .orElse(false);
                item.setRespondidoCorrectamente(correcto);
            }
            items.add(item);
        }
        dto.setPreguntas(items);
        return dto;
    }

    /**
     * CU-09: Asignación formal de un grupo generado.
     * Genera las claves SHA-256 y pasa los ejemplares de PENDIENTE a ASIGNADO.
     */
    @Transactional
    public void asignarGrupo(DTO_AccionGrupo dto) {
        TipoEvaluacion tipo = TipoEvaluacion.valueOf(dto.getTipoEvaluacion());
        LocalDate fecha = LocalDate.parse(dto.getFechaExamen());
        List<ExamenAlumno> ejemplares = repoExamenAlumno.findByGrupo(dto.getAsignaturaId(), tipo, fecha);
        List<ExamenAlumno> candidatos = ejemplares.stream()
                .filter(ej -> ej.getEstado() == EstadoExamen.PENDIENTE)
                .collect(Collectors.toList());
        if (candidatos.isEmpty()) return;
        for (ExamenAlumno ej : candidatos) {
            ej.setClaveCorreccion(generarClaveCorreccion(ej.getAlumno(), ej.getExamen()));
            ej.setEstado(EstadoExamen.ASIGNADO);
        }
        repoExamenAlumno.saveAll(candidatos);
    }

    /**
     * CU-37: cancelarGeneracion — elimina un examen sólo si no ha sido asignado formalmente (PENDIENTE).
     */
    @Transactional
    public void cancelarGeneracion(Long examenId) {
        if (!repoExamen.existsById(examenId)) {
            throw new RuntimeException("Examen no encontrado con ID: " + examenId);
        }
        List<ExamenAlumno> ejemplares = repoExamenAlumno.findByExamenId(examenId);
        boolean tieneAsignados = ejemplares.stream()
                .anyMatch(ej -> ej.getEstado() != EstadoExamen.PENDIENTE);
        if (tieneAsignados) {
            throw new RuntimeException("No se puede cancelar: el examen ya ha sido asignado formalmente.");
        }
        if (!ejemplares.isEmpty()) {
            repoExamenAlumno.deleteAll(ejemplares);
        }
        repoExamen.deleteById(examenId);
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
