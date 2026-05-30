package com.jorgestor.api.repositorio;

import com.jorgestor.api.modelo.Profesor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface RepositorioProfesor extends JpaRepository<Profesor, Long> {
    Optional<Profesor> findByDni(String dni);
    Optional<Profesor> findByEmail(String email);
}
