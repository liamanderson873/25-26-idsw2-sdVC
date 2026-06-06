package com.jorgestor.api.servicio;

import com.jorgestor.api.dto.DTO_Tema;
import com.jorgestor.api.modelo.Asignatura;
import com.jorgestor.api.modelo.Tema;
import com.jorgestor.api.repositorio.RepositorioAsignatura;
import com.jorgestor.api.repositorio.RepositorioTema;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ServicioTema {
    private final RepositorioTema repoTema;
    private final RepositorioAsignatura repoAsignatura;

    public ServicioTema(RepositorioTema repoTema, RepositorioAsignatura repoAsignatura) {
        this.repoTema = repoTema;
        this.repoAsignatura = repoAsignatura;
    }

    @Transactional(readOnly = true)
    public List<DTO_Tema> listarTodos() {
        return repoTema.findAll().stream()
                .map(t -> new DTO_Tema(t.getId(), t.getNombre(), t.getAsignatura().getCodigo()))
                .collect(Collectors.toList());
    }

    @Transactional
    public void crearOActualizar(DTO_Tema dto) {
        Asignatura asig = repoAsignatura.findByCodigo(dto.getCodigoAsignatura())
                .orElseThrow(() -> new RuntimeException("Asignatura no encontrada"));

        Tema tema;
        if (dto.getId() != null) {
            tema = repoTema.findById(dto.getId())
                    .orElseThrow(() -> new RuntimeException("Tema no encontrado con ID: " + dto.getId()));
        } else {
            tema = new Tema();
        }
        
        tema.setNombre(dto.getNombre());
        tema.setAsignatura(asig);
        
        repoTema.save(tema);
    }

    @Transactional
    public void actualizar(Long id, DTO_Tema dto) {
        Asignatura asig = repoAsignatura.findByCodigo(dto.getCodigoAsignatura())
                .orElseThrow(() -> new RuntimeException("Asignatura no encontrada"));
        Tema tema = repoTema.findById(id)
                .orElseThrow(() -> new RuntimeException("Tema no encontrado con ID: " + id));
        tema.setNombre(dto.getNombre());
        tema.setAsignatura(asig);
        repoTema.save(tema);
    }

    @Transactional
    public void eliminar(Long id) {
        if (!repoTema.existsById(id)) {
            throw new RuntimeException("Tema no encontrado con ID: " + id);
        }
        repoTema.deleteById(id);
    }
}
