package com.jorgestor.api.servicio;

import com.jorgestor.api.dto.DTO_Profesor;
import com.jorgestor.api.modelo.Profesor;
import com.jorgestor.api.repositorio.RepositorioProfesor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ServicioProfesor {
    private final RepositorioProfesor repoProfesor;

    public ServicioProfesor(RepositorioProfesor repoProfesor) {
        this.repoProfesor = repoProfesor;
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
}
