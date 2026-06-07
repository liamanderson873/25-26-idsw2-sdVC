package com.jorgestor.api.repositorio;

import com.jorgestor.api.modelo.ExamenAlumno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

@Repository
public interface RepositorioExamenAlumno extends JpaRepository<ExamenAlumno, Long> {

    Optional<ExamenAlumno> findByClaveCorreccion(String claveCorreccion);

    /** JOIN FETCH alumno y examen en una sola query — elimina N+1 al cargar ejemplares */
    @Query("SELECT ea FROM ExamenAlumno ea JOIN FETCH ea.alumno JOIN FETCH ea.examen WHERE ea.examen.id = :examenId")
    List<ExamenAlumno> findByExamenId(@Param("examenId") Long examenId);

    List<ExamenAlumno> findByAlumnoId(Long alumnoId);

    @Query("SELECT ea FROM ExamenAlumno ea JOIN FETCH ea.alumno JOIN FETCH ea.examen WHERE ea.examen.asignatura.id = :asignaturaId")
    List<ExamenAlumno> findByAsignaturaId(@Param("asignaturaId") Long asignaturaId);
}
