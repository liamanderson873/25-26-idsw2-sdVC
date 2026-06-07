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

    @Query("SELECT ea.alumno.id, COUNT(ea) FROM ExamenAlumno ea GROUP BY ea.alumno.id")
    List<Object[]> countByAlumno();

    @Query("SELECT ea.examen.asignatura.id, COUNT(ea) FROM ExamenAlumno ea GROUP BY ea.examen.asignatura.id")
    List<Object[]> countByAsignatura();

    @Query("SELECT ea.examen.asignatura.id, ea.examen.asignatura.nombre, ea.examen.tipoEvaluacion, " +
           "ea.examen.fechaExamen, ea.estado, COUNT(ea) " +
           "FROM ExamenAlumno ea " +
           "GROUP BY ea.examen.asignatura.id, ea.examen.asignatura.nombre, " +
           "ea.examen.tipoEvaluacion, ea.examen.fechaExamen, ea.estado " +
           "ORDER BY ea.examen.fechaExamen DESC, ea.examen.asignatura.nombre ASC")
    List<Object[]> findGruposConConteos();

    @Query("SELECT ea FROM ExamenAlumno ea JOIN FETCH ea.alumno JOIN FETCH ea.examen e " +
           "WHERE e.asignatura.id = :asignaturaId AND e.tipoEvaluacion = :tipoEvaluacion AND e.fechaExamen = :fechaExamen")
    List<ExamenAlumno> findByGrupo(
        @Param("asignaturaId") Long asignaturaId,
        @Param("tipoEvaluacion") com.jorgestor.api.modelo.TipoEvaluacion tipoEvaluacion,
        @Param("fechaExamen") java.time.LocalDate fechaExamen
    );
}
