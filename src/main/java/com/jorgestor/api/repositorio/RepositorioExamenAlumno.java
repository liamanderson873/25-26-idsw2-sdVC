package com.jorgestor.api.repositorio;

import com.jorgestor.api.modelo.ExamenAlumno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

@Repository
public interface RepositorioExamenAlumno extends JpaRepository<ExamenAlumno, Long> {
    
    // Método CRÍTICO: Buscar el ejemplar del alumno por su clave única
    // Será usado por la IA para identificar de quién es el examen escaneado.
    Optional<ExamenAlumno> findByClaveCorreccion(String claveCorreccion);

    List<ExamenAlumno> findByExamenId(Long examenId);
    List<ExamenAlumno> findByAlumnoId(Long alumnoId);
}
