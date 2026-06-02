package com.jorgestor.api.repositorio;

import com.jorgestor.api.modelo.ExamenAlumnoMarca;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositorioExamenAlumnoMarca extends JpaRepository<ExamenAlumnoMarca, Long> {
    // Podremos añadir métodos para borrar marcas previas en caso de re-escaneo
    void deleteByExamenAlumnoId(Long examenAlumnoId);
}
