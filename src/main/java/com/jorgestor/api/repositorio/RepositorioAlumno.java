package com.jorgestor.api.repositorio;

import com.jorgestor.api.modelo.Alumno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository // Le dice a Spring que esta interfaz es un componente de acceso a datos
public interface RepositorioAlumno extends JpaRepository<Alumno, Long> {
    
    // Spring es tan listo que si escribimos esto, él crea la consulta SQL:
    // SELECT * FROM alumnos WHERE dni = ?
    Optional<Alumno> findByDni(String dni);
}
