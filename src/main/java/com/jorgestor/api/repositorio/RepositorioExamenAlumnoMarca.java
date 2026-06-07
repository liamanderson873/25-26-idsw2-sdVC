package com.jorgestor.api.repositorio;

import com.jorgestor.api.modelo.ExamenAlumnoMarca;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Repository
public interface RepositorioExamenAlumnoMarca extends JpaRepository<ExamenAlumnoMarca, Long> {

    void deleteByExamenAlumnoId(Long examenAlumnoId);

    /** Elimina todas las marcas de una lista de ejemplares en un solo DELETE nativo */
    @Modifying(clearAutomatically = true)
    @Query(value = "DELETE FROM marcas_examen_alumno WHERE examen_alumno_id IN :ids", nativeQuery = true)
    void deleteAllByExamenAlumnoIdIn(@Param("ids") List<Long> ids);

    List<ExamenAlumnoMarca> findByExamenAlumnoId(Long examenAlumnoId);

    /** Carga todas las marcas de un examen completo en una sola query (LEFT JOIN para respuestas nulas) */
    @Query("SELECT m FROM ExamenAlumnoMarca m JOIN FETCH m.pregunta LEFT JOIN FETCH m.respuesta WHERE m.examenAlumno.id IN :ids")
    List<ExamenAlumnoMarca> findAllByExamenAlumnoIdIn(@Param("ids") List<Long> ids);
}
