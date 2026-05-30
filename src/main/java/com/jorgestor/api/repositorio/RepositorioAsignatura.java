package com.jorgestor.api.repositorio;

import com.jorgestor.api.modelo.Asignatura;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface RepositorioAsignatura extends JpaRepository<Asignatura, Long> {
    
    Optional<Asignatura> findByCodigo(String codigo);
}
