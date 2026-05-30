package com.jorgestor.api.servicio;

import com.jorgestor.api.dto.DTO_Asignatura;
import com.jorgestor.api.modelo.Asignatura;
import com.jorgestor.api.modelo.Profesor;
import com.jorgestor.api.repositorio.RepositorioAsignatura;
import com.jorgestor.api.repositorio.RepositorioProfesor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ServicioAsignatura {
    private final RepositorioAsignatura repoAsignatura;
    private final RepositorioProfesor repoProfesor;

    public ServicioAsignatura(RepositorioAsignatura repoAsignatura, RepositorioProfesor repoProfesor) {
        this.repoAsignatura = repoAsignatura;
        this.repoProfesor = repoProfesor;
    }

    @Transactional
    public void crearOActualizar(DTO_Asignatura dto) {
        Profesor profe = repoProfesor.findByDni(dto.getDniProfesor())
                .orElseThrow(() -> new RuntimeException("Profesor no encontrado"));

        Asignatura asig = repoAsignatura.findByCodigo(dto.getCodigo())
                .orElse(new Asignatura());
        
        asig.setCodigo(dto.getCodigo());
        asig.setNombre(dto.getNombre());
        asig.setCursoAcademico(dto.getCursoAcademico());
        asig.setProfesor(profe);
        
        repoAsignatura.save(asig);
    }
}
