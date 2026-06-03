package com.jorgestor.api.servicio;

import com.jorgestor.api.dto.DTO_Profesor;
import com.jorgestor.api.modelo.Profesor;
import com.jorgestor.api.repositorio.RepositorioProfesor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ServicioProfesor {
    private final RepositorioProfesor repoProfesor;

    public ServicioProfesor(RepositorioProfesor repoProfesor) {
        this.repoProfesor = repoProfesor;
    }

    @Transactional(readOnly = true)
    public List<DTO_Profesor> listarTodos() {
        return repoProfesor.findAll().stream()
                .map(p -> new DTO_Profesor(p.getId(), p.getDni(), p.getNombre(), p.getApellidos(), p.getEmail()))
                .collect(Collectors.toList());
    }

    @Transactional
    public void crearOActualizar(DTO_Profesor dto) {
        Profesor profe = repoProfesor.findByDni(dto.getDni())
                .orElse(new Profesor());
        profe.setDni(dto.getDni());
        profe.setNombre(dto.getNombre());
        profe.setApellidos(dto.getApellidos());
        profe.setEmail(dto.getEmail());
        repoProfesor.save(profe);
    }

    @Transactional
    public void eliminar(Long id) {
        if (!repoProfesor.existsById(id)) {
            throw new RuntimeException("Profesor no encontrado con ID: " + id);
        }
        repoProfesor.deleteById(id);
    }
}
