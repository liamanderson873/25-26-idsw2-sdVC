package com.jorgestor.api.servicio;

import com.jorgestor.api.dto.DTO_Asignatura;
import com.jorgestor.api.modelo.Asignatura;
import com.jorgestor.api.modelo.Profesor;
import com.jorgestor.api.repositorio.RepositorioAsignatura;
import com.jorgestor.api.repositorio.RepositorioProfesor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ServicioAsignatura {
    private final RepositorioAsignatura repoAsignatura;
    private final RepositorioProfesor repoProfesor;

    public ServicioAsignatura(RepositorioAsignatura repoAsignatura, RepositorioProfesor repoProfesor) {
        this.repoAsignatura = repoAsignatura;
        this.repoProfesor = repoProfesor;
    }

    @Transactional(readOnly = true)
    public List<DTO_Asignatura> listarTodos() {
        return repoAsignatura.findAll().stream()
                .map(a -> new DTO_Asignatura(
                        a.getId(),
                        a.getNombre(),
                        a.getCodigo(),
                        a.getCursoAcademico(),
                        a.getProfesor() != null ? a.getProfesor().getDni() : null))
                .collect(Collectors.toList());
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

    @Transactional
    public void eliminar(Long id) {
        if (!repoAsignatura.existsById(id)) {
            throw new RuntimeException("Asignatura no encontrada con ID: " + id);
        }
        repoAsignatura.deleteById(id);
    }
}
