package com.jorgestor.api.servicio;

import com.jorgestor.api.dto.DTO_Profesor;
import com.jorgestor.api.modelo.Profesor;
import com.jorgestor.api.modelo.Rol;
import com.jorgestor.api.modelo.Usuario;
import com.jorgestor.api.repositorio.RepositorioProfesor;
import com.jorgestor.api.repositorio.RepositorioUsuario;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ServicioProfesor {
    private final RepositorioProfesor repoProfesor;
    private final RepositorioUsuario repoUsuario;

    public ServicioProfesor(RepositorioProfesor repoProfesor, RepositorioUsuario repoUsuario) {
        this.repoProfesor = repoProfesor;
        this.repoUsuario = repoUsuario;
    }

    @Transactional(readOnly = true)
    public List<DTO_Profesor> listarTodos() {
        return repoProfesor.findAll().stream()
                .map(p -> new DTO_Profesor(p.getId(), p.getDni(), p.getNombre(), p.getApellidos(), p.getEmail(), p.getUsuario(), p.getPassword()))
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
        profe.setUsuario(dto.getUsuario());
        profe.setPassword(dto.getPassword());
        repoProfesor.save(profe);

        if (dto.getUsuario() != null && !dto.getUsuario().isBlank()) {
            Usuario usuario = repoUsuario.findByUsername(dto.getUsuario()).orElse(new Usuario());
            usuario.setUsername(dto.getUsuario());
            usuario.setPassword(dto.getPassword());
            usuario.setRol(Rol.DOCENTE);
            usuario.setNombre(dto.getNombre() + " " + dto.getApellidos());
            repoUsuario.save(usuario);
        }
    }

    @Transactional
    public void eliminar(Long id) {
        Profesor profe = repoProfesor.findById(id)
                .orElseThrow(() -> new RuntimeException("Profesor no encontrado con ID: " + id));
        if (profe.getUsuario() != null) {
            repoUsuario.findByUsername(profe.getUsuario()).ifPresent(repoUsuario::delete);
        }
        repoProfesor.deleteById(id);
    }
}
