package com.jorgestor.api.servicio;

import com.jorgestor.api.dto.DTO_Alumno;
import com.jorgestor.api.modelo.Alumno;
import com.jorgestor.api.modelo.Grado;
import com.jorgestor.api.modelo.Asignatura;
import com.jorgestor.api.repositorio.RepositorioAlumno;
import com.jorgestor.api.repositorio.RepositorioGrado;
import com.jorgestor.api.repositorio.RepositorioAsignatura;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ServicioAlumno {

    private final RepositorioAlumno repoAlumno;
    private final RepositorioGrado repoGrado;
    private final RepositorioAsignatura repoAsignatura;

    public ServicioAlumno(RepositorioAlumno repoAlumno, RepositorioGrado repoGrado, RepositorioAsignatura repoAsignatura) {
        this.repoAlumno = repoAlumno;
        this.repoGrado = repoGrado;
        this.repoAsignatura = repoAsignatura;
    }

    @Transactional(readOnly = true)
    public List<DTO_Alumno> listarTodos() {
        return repoAlumno.findAll().stream()
                .map(a -> {
                    DTO_Alumno dto = new DTO_Alumno();
                    dto.setId(a.getId());
                    dto.setDni(a.getDni());
                    dto.setNombre(a.getNombre());
                    dto.setApellidos(a.getApellidos());
                    dto.setCurso(a.getCurso());
                    if (a.getGrado() != null) {
                        dto.setCodigoGrado(a.getGrado().getCodigo());
                        dto.setGradoId(a.getGrado().getId());
                    }
                    if (a.getAsignaturas() != null) {
                        dto.setAsignaturaIds(a.getAsignaturas().stream()
                            .map(Asignatura::getId)
                            .collect(Collectors.toList()));
                    }
                    return dto;
                })
                .collect(Collectors.toList());
    }

    @Transactional
    public void importarAlumnos(List<DTO_Alumno> listaDto) {
        for (DTO_Alumno dto : listaDto) {
            guardarIndividual(dto);
        }
    }

    @Transactional
    public void guardarIndividual(DTO_Alumno dto) {
        Grado grado = null;
        if (dto.getCodigoGrado() != null) {
            grado = repoGrado.findByCodigo(dto.getCodigoGrado()).orElse(null);
        }
        if (grado == null && dto.getGradoId() != null) {
            grado = repoGrado.findById(dto.getGradoId()).orElse(null);
        }
        
        if (grado == null) {
            throw new RuntimeException("El grado especificado no existe.");
        }

        Alumno alumno;
        if (dto.getId() != null) {
            alumno = repoAlumno.findById(dto.getId())
                    .orElseThrow(() -> new RuntimeException("Alumno no encontrado con ID: " + dto.getId()));
        } else {
            alumno = repoAlumno.findByDni(dto.getDni()).orElse(new Alumno());
        }

        alumno.setDni(dto.getDni());
        alumno.setNombre(dto.getNombre());
        alumno.setApellidos(dto.getApellidos());
        alumno.setCurso(dto.getCurso() != null ? dto.getCurso() : 1);
        alumno.setGrado(grado);

        if (dto.getAsignaturaIds() != null) {
            List<Asignatura> matriculadas = repoAsignatura.findAllById(dto.getAsignaturaIds());
            alumno.setAsignaturas(matriculadas);
        }

        repoAlumno.save(alumno);
    }

    @Transactional
    public void actualizar(Long id, DTO_Alumno dto) {
        Grado grado = null;
        if (dto.getCodigoGrado() != null) {
            grado = repoGrado.findByCodigo(dto.getCodigoGrado()).orElse(null);
        }
        if (grado == null && dto.getGradoId() != null) {
            grado = repoGrado.findById(dto.getGradoId()).orElse(null);
        }
        if (grado == null) throw new RuntimeException("El grado especificado no existe.");

        Alumno alumno = repoAlumno.findById(id)
                .orElseThrow(() -> new RuntimeException("Alumno no encontrado con ID: " + id));
        alumno.setDni(dto.getDni());
        alumno.setNombre(dto.getNombre());
        alumno.setApellidos(dto.getApellidos());
        alumno.setCurso(dto.getCurso() != null ? dto.getCurso() : 1);
        alumno.setGrado(grado);
        if (dto.getAsignaturaIds() != null) {
            alumno.setAsignaturas(repoAsignatura.findAllById(dto.getAsignaturaIds()));
        }
        repoAlumno.save(alumno);
    }

    @Transactional
    public void eliminar(Long id) {
        if (!repoAlumno.existsById(id)) {
            throw new RuntimeException("Alumno no encontrado con ID: " + id);
        }
        repoAlumno.deleteById(id);
    }
}
