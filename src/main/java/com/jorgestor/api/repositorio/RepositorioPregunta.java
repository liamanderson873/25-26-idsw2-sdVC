package com.jorgestor.api.repositorio;

import com.jorgestor.api.modelo.Pregunta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RepositorioPregunta extends JpaRepository<Pregunta, Long> {

    List<Pregunta> findByTemaIdIn(List<Long> temaIds);

    /** Solo preguntas habilitadas — usada por generarExamen para no incluir inhabilitadas */
    List<Pregunta> findByTemaIdInAndHabilitadaTrue(List<Long> temaIds);
}
