package com.jorgestor.api.repositorio;

import com.jorgestor.api.modelo.Respuesta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositorioRespuesta extends JpaRepository<Respuesta, Long> {
}
