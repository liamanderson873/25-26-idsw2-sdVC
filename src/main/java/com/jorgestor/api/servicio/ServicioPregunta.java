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

    /**
     * Lógica de Importación de Preguntas (CU-06)
     */
    @Transactional
    public void importarPreguntas(List<DTO_Pregunta> listaDto) {
        for (DTO_Pregunta dto : listaDto) {
            
            // 1. Validación estricta: El tema debe existir
            Tema tema = repoTema.findById(dto.getTemaId())
                    .orElseThrow(() -> new RuntimeException("Error al importar la pregunta '" + dto.getEnunciado() + "': El tema con ID " + dto.getTemaId() + " no existe."));

            // 2. Creación de la Pregunta
            Pregunta pregunta = new Pregunta();
            pregunta.setEnunciado(dto.getEnunciado());
            pregunta.setDificultad(dto.getDificultad());
            pregunta.setTema(tema);

            // Guardamos la pregunta primero para que se le asigne un ID
            pregunta = repoPregunta.save(pregunta);

            // 3. Procesamiento y guardado de las Respuestas
            List<Respuesta> respuestas = new ArrayList<>();
            for (DTO_Respuesta dtoResp : dto.getRespuestas()) {
                Respuesta respuesta = new Respuesta();
                respuesta.setContenido(dtoResp.getContenido());
                respuesta.setEsCorrecta(dtoResp.isEsCorrecta());
                respuesta.setPregunta(pregunta); // Relación bidireccional
                respuestas.add(respuesta);
            }
            
            // Guardado en cascada manual de las respuestas
            repoRespuesta.saveAll(respuestas);
        }
    }
}
