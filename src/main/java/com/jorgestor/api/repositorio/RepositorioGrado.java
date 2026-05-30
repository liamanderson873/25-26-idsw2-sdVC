package com.jorgestor.api.repositorio;

import com.jorgestor.api.modelo.Grado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface RepositorioGrado extends JpaRepository<Grado, Long> {
    
    // Consulta automática: SELECT * FROM grados WHERE codigo = ?
    Optional<Grado> findByCodigo(String codigo);
}
