package com.jorgestor.api.servicio;

import com.jorgestor.api.dto.DTO_Asignatura;
import com.jorgestor.api.modelo.Asignatura;
import com.jorgestor.api.modelo.Profesor;
import com.jorgestor.api.modelo.Grado;
import com.jorgestor.api.repositorio.RepositorioAsignatura;
import com.jorgestor.api.repositorio.RepositorioProfesor;
import com.jorgestor.api.repositorio.RepositorioGrado;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.ArrayList;
import java.util.stream.Collectors;

@Service
public class ServicioAsignatura {
    private final RepositorioAsignatura repoAsignatura;
    private final RepositorioProfesor repoProfesor;
    private final RepositorioGrado repoGrado;

    public ServicioAsignatura(RepositorioAsignatura repoAsignatura, RepositorioProfesor repoProfesor, RepositorioGrado repoGrado) {
        this.repoAsignatura = repoAsignatura;
        this.repoProfesor = repoProfesor;
        this.repoGrado = repoGrado;
    }

    @Transactional(readOnly = true)
    public List<DTO_Asignatura> listarTodos() {
        return repoAsignatura.findAll().stream()
                .map(a -> {
                    List<Long> gIds = a.getGrados() != null ? a.getGrados().stream().map(Grado::getId).collect(Collectors.toList()) : new ArrayList<>();
                    Long firstGId = gIds.isEmpty() ? null : gIds.get(0);
                    return new DTO_Asignatura(
                        a.getId(),
                        a.getNombre(),
                        a.getCodigo(),
                        a.getCursoAcademico(),
                        a.getCursoSugerido(),
                        a.getProfesor() != null ? a.getProfesor().getDni() : null,
                        firstGId,
                        gIds
                    );
                })
                .collect(Collectors.toList());
    }

    @Transactional
    public void crearOActualizar(DTO_Asignatura dto) {
        Profesor profe = repoProfesor.findByDni(dto.getDniProfesor())
                .orElseThrow(() -> new RuntimeException("Profesor no encontrado"));

        Asignatura asig;
        if (dto.getId() != null) {
            asig = repoAsignatura.findById(dto.getId())
                    .orElseThrow(() -> new RuntimeException("Asignatura no encontrada con ID: " + dto.getId()));
        } else {
            asig = repoAsignatura.findByCodigo(dto.getCodigo()).orElse(new Asignatura());
        }
        
        asig.setCodigo(dto.getCodigo());
        asig.setNombre(dto.getNombre());
        asig.setCursoAcademico(dto.getCursoAcademico());
        asig.setCursoSugerido(dto.getCursoSugerido() != null ? dto.getCursoSugerido() : 1);
        asig.setProfesor(profe);
        
        // Manejo N:M con Grados
        if (dto.getGradoIds() != null && !dto.getGradoIds().isEmpty()) {
            List<Grado> grados = repoGrado.findAllById(dto.getGradoIds());
            asig.setGrados(grados);
        } else if (dto.getGradoId() != null) {
            List<Grado> grados = new ArrayList<>();
            repoGrado.findById(dto.getGradoId()).ifPresent(grados::add);
            asig.setGrados(grados);
        }
        
        repoAsignatura.save(asig);
    }

    @Transactional
    public void importarAsignaturas(List<DTO_Asignatura> lista) {
        for (DTO_Asignatura dto : lista) {
            crearOActualizar(dto);
        }
    }

    @Transactional
    public void actualizar(Long id, DTO_Asignatura dto) {
        Profesor profe = repoProfesor.findByDni(dto.getDniProfesor())
                .orElseThrow(() -> new RuntimeException("Profesor no encontrado"));
        Asignatura asig = repoAsignatura.findById(id)
                .orElseThrow(() -> new RuntimeException("Asignatura no encontrada con ID: " + id));
        asig.setCodigo(dto.getCodigo());
        asig.setNombre(dto.getNombre());
        asig.setCursoAcademico(dto.getCursoAcademico());
        asig.setCursoSugerido(dto.getCursoSugerido() != null ? dto.getCursoSugerido() : 1);
        asig.setProfesor(profe);
        if (dto.getGradoIds() != null && !dto.getGradoIds().isEmpty()) {
            asig.setGrados(repoGrado.findAllById(dto.getGradoIds()));
        } else if (dto.getGradoId() != null) {
            java.util.List<Grado> grados = new ArrayList<>();
            repoGrado.findById(dto.getGradoId()).ifPresent(grados::add);
            asig.setGrados(grados);
        }
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
