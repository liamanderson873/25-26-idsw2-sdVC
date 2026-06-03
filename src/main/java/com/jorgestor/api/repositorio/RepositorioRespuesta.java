package com.jorgestor.api.repositorio;

import com.jorgestor.api.modelo.Respuesta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositorioRespuesta extends JpaRepository<Respuesta, Long> {

    @Modifying
    @Query("DELETE FROM Respuesta r WHERE r.pregunta.id = ?1")
    void deleteByPreguntaId(Long preguntaId);
}
