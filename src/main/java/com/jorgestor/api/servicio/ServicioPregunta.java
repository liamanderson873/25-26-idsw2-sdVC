package com.jorgestor.api.servicio;

import com.jorgestor.api.dto.DTO_Pregunta;
import com.jorgestor.api.dto.DTO_Respuesta;
import com.jorgestor.api.modelo.Pregunta;
import com.jorgestor.api.modelo.Respuesta;
import com.jorgestor.api.modelo.Tema;
import com.jorgestor.api.repositorio.RepositorioPregunta;
import com.jorgestor.api.repositorio.RepositorioRespuesta;
import com.jorgestor.api.repositorio.RepositorioTema;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ServicioPregunta {

    private final RepositorioPregunta repoPregunta;
    private final RepositorioRespuesta repoRespuesta;
    private final RepositorioTema repoTema;

    public ServicioPregunta(RepositorioPregunta repoPregunta, RepositorioRespuesta repoRespuesta, RepositorioTema repoTema) {
        this.repoPregunta = repoPregunta;
        this.repoRespuesta = repoRespuesta;
        this.repoTema = repoTema;
    }

    @Transactional(readOnly = true)
    public List<DTO_Pregunta> listarTodas() {
        return repoPregunta.findAll().stream()
                .map(p -> {
                    List<DTO_Respuesta> respuestasDto = p.getRespuestas().stream()
                            .map(r -> new DTO_Respuesta(r.getId(), r.getContenido(), r.isEsCorrecta(), r.getIndice()))
                            .collect(Collectors.toList());
                    return new DTO_Pregunta(p.getId(), p.getEnunciado(), p.getDificultad(), p.getTema().getId(), p.isHabilitada(), respuestasDto);
                })
                .collect(Collectors.toList());
    }

    @Transactional
    public void importarPreguntas(List<DTO_Pregunta> listaDto) {
        for (DTO_Pregunta dto : listaDto) {
            guardarIndividual(dto);
        }
    }

    @Transactional
    public void guardarIndividual(DTO_Pregunta dto) {
        Tema tema = repoTema.findById(dto.getTemaId())
                .orElseThrow(() -> new RuntimeException("Tema con ID " + dto.getTemaId() + " no encontrado"));

        Pregunta pregunta;
        if (dto.getId() != null) {
            pregunta = repoPregunta.findById(dto.getId())
                    .orElseThrow(() -> new RuntimeException("Pregunta no encontrada con ID: " + dto.getId()));
            // No se borran las respuestas — se actualizan en-lugar por ID para no romper
            // la FK de ExamenAlumnoMarca → Respuesta cuando ya existen marcas de corrección.
        } else {
            pregunta = new Pregunta();
        }

        pregunta.setEnunciado(dto.getEnunciado());
        pregunta.setDificultad(dto.getDificultad());
        pregunta.setTema(tema);
        pregunta.setHabilitada(dto.isHabilitada());

        final Pregunta preguntaGuardada = repoPregunta.saveAndFlush(pregunta);

        if (dto.getRespuestas() != null) {
            int indice = 0;
            for (DTO_Respuesta dtoResp : dto.getRespuestas()) {
                Respuesta respuesta = (dtoResp.getId() != null)
                        ? repoRespuesta.findById(dtoResp.getId()).orElse(new Respuesta())
                        : new Respuesta();
                respuesta.setContenido(dtoResp.getContenido());
                respuesta.setEsCorrecta(dtoResp.isEsCorrecta());
                respuesta.setPregunta(preguntaGuardada);
                respuesta.setIndice(dtoResp.getIndice() != null ? dtoResp.getIndice() : indice);
                repoRespuesta.save(respuesta);
                indice++;
            }
        }
    }

    @Transactional
    public void actualizar(Long id, DTO_Pregunta dto) {
        Tema tema = repoTema.findById(dto.getTemaId())
                .orElseThrow(() -> new RuntimeException("Tema con ID " + dto.getTemaId() + " no encontrado"));
        Pregunta pregunta = repoPregunta.findById(id)
                .orElseThrow(() -> new RuntimeException("Pregunta no encontrada con ID: " + id));
        repoRespuesta.deleteByPreguntaId(id);
        repoRespuesta.flush();
        pregunta.setEnunciado(dto.getEnunciado());
        pregunta.setDificultad(dto.getDificultad());
        pregunta.setTema(tema);
        pregunta.setHabilitada(dto.isHabilitada());
        final Pregunta guardada = repoPregunta.saveAndFlush(pregunta);
        if (dto.getRespuestas() != null) {
            int indice = 0;
            for (DTO_Respuesta dtoResp : dto.getRespuestas()) {
                Respuesta r = new Respuesta();
                r.setContenido(dtoResp.getContenido());
                r.setEsCorrecta(dtoResp.isEsCorrecta());
                r.setPregunta(guardada);
                r.setIndice(dtoResp.getIndice() != null ? dtoResp.getIndice() : indice++);
                repoRespuesta.save(r);
            }
        }
    }

    /** CU-22/editarPregunta: alterna el estado habilitada ↔ inhabilitada */
    @Transactional
    public boolean toggleHabilitada(Long id) {
        Pregunta pregunta = repoPregunta.findById(id)
                .orElseThrow(() -> new RuntimeException("Pregunta no encontrada con ID: " + id));
        pregunta.setHabilitada(!pregunta.isHabilitada());
        repoPregunta.save(pregunta);
        return pregunta.isHabilitada();
    }

    @Transactional
    public void eliminar(Long id) {
        if (!repoPregunta.existsById(id)) {
            throw new RuntimeException("Pregunta no encontrada con ID: " + id);
        }
        repoPregunta.deleteById(id);
    }
}
