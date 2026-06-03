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
                    return new DTO_Pregunta(p.getId(), p.getEnunciado(), p.getDificultad(), p.getTema().getId(), respuestasDto);
                })
                .collect(Collectors.toList());
    }

    /**
     * Lógica de Importación de Preguntas (CU-06)
     */
    @Transactional
    public void importarPreguntas(List<DTO_Pregunta> listaDto) {
        for (DTO_Pregunta dto : listaDto) {
            guardarIndividual(dto);
        }
    }

    @Transactional
    public void guardarIndividual(DTO_Pregunta dto) {
        // 1. Validación: El tema debe existir
        Tema tema = repoTema.findById(dto.getTemaId())
                .orElseThrow(() -> new RuntimeException("Tema con ID " + dto.getTemaId() + " no encontrado"));

        // 2. Creación o Actualización de la Pregunta
        Pregunta pregunta;
        if (dto.getId() != null) {
            pregunta = repoPregunta.findById(dto.getId())
                    .orElseThrow(() -> new RuntimeException("Pregunta no encontrada con ID: " + dto.getId()));
            
            // IMPORTANTE: Primero borramos las respuestas antiguas
            repoRespuesta.deleteByPreguntaId(pregunta.getId());
            // Forzamos que el borrado se ejecute en la BD antes de seguir
            repoRespuesta.flush(); 
        } else {
            pregunta = new Pregunta();
        }

        pregunta.setEnunciado(dto.getEnunciado());
        pregunta.setDificultad(dto.getDificultad());
        pregunta.setTema(tema);
        
        // Guardamos y forzamos el ID
        final Pregunta preguntaGuardada = repoPregunta.saveAndFlush(pregunta);

        // 3. Creación y guardado de Respuestas
        if (dto.getRespuestas() != null) {
            int indice = 0;
            for (DTO_Respuesta dtoResp : dto.getRespuestas()) {
                Respuesta respuesta = new Respuesta();
                respuesta.setContenido(dtoResp.getContenido());
                respuesta.setEsCorrecta(dtoResp.isEsCorrecta());
                respuesta.setPregunta(preguntaGuardada);
                respuesta.setIndice(dtoResp.getIndice() != null ? dtoResp.getIndice() : indice++);
                repoRespuesta.save(respuesta);
            }
        }
    }

    @Transactional
    public void eliminar(Long id) {
        if (!repoPregunta.existsById(id)) {
            throw new RuntimeException("Pregunta no encontrada con ID: " + id);
        }
        repoPregunta.deleteById(id);
    }
}
