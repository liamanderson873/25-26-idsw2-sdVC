package com.jorgestor.api.servicio;

import com.jorgestor.api.dto.DTO_Grado;
import com.jorgestor.api.modelo.Grado;
import com.jorgestor.api.repositorio.RepositorioGrado;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ServicioGrado {
    private final RepositorioGrado repoGrado;

    public ServicioGrado(RepositorioGrado repoGrado) {
        this.repoGrado = repoGrado;
    }

    @Transactional(readOnly = true)
    public List<DTO_Grado> listarTodos() {
        return repoGrado.findAll().stream()
                .map(g -> new DTO_Grado(g.getId(), g.getCodigo(), g.getNombre()))
                .collect(Collectors.toList());
    }

    @Transactional
    public void crearOActualizar(DTO_Grado dto) {
        Grado grado = repoGrado.findByCodigo(dto.getCodigo())
                .orElse(new Grado());
        grado.setCodigo(dto.getCodigo());
        grado.setNombre(dto.getNombre());
        repoGrado.save(grado);
    }

    @Transactional
    public void eliminar(Long id) {
        if (!repoGrado.existsById(id)) {
            throw new RuntimeException("Grado no encontrado con ID: " + id);
        }
        repoGrado.deleteById(id);
    }
}
