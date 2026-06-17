package com.jorgestor.api.repositorio;

import com.jorgestor.api.modelo.Examen;
import com.jorgestor.api.modelo.TipoEvaluacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface RepositorioExamen extends JpaRepository<Examen, Long> {
    List<Examen> findByAsignaturaId(Long asignaturaId);
    List<Examen> findByAsignaturaIdAndTipoEvaluacion(Long asignaturaId, TipoEvaluacion tipoEvaluacion);

    // Carga el examen con sus preguntas Y las respuestas de cada pregunta en una sola query
    @Query("SELECT DISTINCT e FROM Examen e JOIN FETCH e.preguntas p JOIN FETCH p.respuestas WHERE e.id = :id")
    Optional<Examen> findByIdConPreguntasYRespuestas(@Param("id") Long id);
}
