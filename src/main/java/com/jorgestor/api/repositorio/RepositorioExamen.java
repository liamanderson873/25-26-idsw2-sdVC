package com.jorgestor.api.repositorio;

import com.jorgestor.api.modelo.Examen;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RepositorioExamen extends JpaRepository<Examen, Long> {
    List<Examen> findByAsignaturaId(Long asignaturaId);
}
