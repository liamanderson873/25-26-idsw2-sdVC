package com.jorgestor.api.repositorio;

import com.jorgestor.api.modelo.Tema;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RepositorioTema extends JpaRepository<Tema, Long> {
    List<Tema> findByAsignaturaId(Long asignaturaId);
}
