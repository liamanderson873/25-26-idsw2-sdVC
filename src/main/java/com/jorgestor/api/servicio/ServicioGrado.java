package com.jorgestor.api.servicio;

import com.jorgestor.api.dto.DTO_Grado;
import com.jorgestor.api.modelo.Grado;
import com.jorgestor.api.repositorio.RepositorioGrado;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ServicioGrado {
    private final RepositorioGrado repoGrado;

    public ServicioGrado(RepositorioGrado repoGrado) {
        this.repoGrado = repoGrado;
    }

    @Transactional
    public void crearOActualizar(DTO_Grado dto) {
        Grado grado = repoGrado.findByCodigo(dto.getCodigo())
                .orElse(new Grado());
        grado.setCodigo(dto.getCodigo());
        grado.setNombre(dto.getNombre());
        repoGrado.save(grado);
    }
}
