package com.jorgestor.api.servicio;

import com.jorgestor.api.dto.DTO_Alumno;
import com.jorgestor.api.modelo.Alumno;
import com.jorgestor.api.modelo.Grado;
import com.jorgestor.api.repositorio.RepositorioAlumno;
import com.jorgestor.api.repositorio.RepositorioGrado;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service // Marca esta clase como el "Cerebro" de la lógica de alumnos
public class ServicioAlumno {

    // Inyección de dependencias (Pedimos los repositorios que necesitamos)
    private final RepositorioAlumno repoAlumno;
    private final RepositorioGrado repoGrado;

    // Constructor: Spring usará este constructor para darnos los repositorios terminados
    public ServicioAlumno(RepositorioAlumno repoAlumno, RepositorioGrado repoGrado) {
        this.repoAlumno = repoAlumno;
        this.repoGrado = repoGrado;
    }

    @Transactional(readOnly = true)
    public List<DTO_Alumno> listarTodos() {
        return repoAlumno.findAll().stream()
                .map(a -> new DTO_Alumno(
                        a.getId(),
                        a.getDni(),
                        a.getNombre(),
                        a.getApellidos(),
                        a.getGrado() != null ? a.getGrado().getCodigo() : null))
                .collect(Collectors.toList());
    }

    /**
     * Lógica de Importación (CU-03)
     * @Transactional: Si un alumno falla, nadie se guarda. Todo o nada (Atomicidad).
     */
    @Transactional
    public void importarAlumnos(List<DTO_Alumno> listaDto) {
        for (DTO_Alumno dto : listaDto) {
            guardarIndividual(dto);
        }
    }

    @Transactional
    public void guardarIndividual(DTO_Alumno dto) {
        // 1. Buscamos el grado (si no existe, lanzamos error)
        Grado grado = repoGrado.findByCodigo(dto.getCodigoGrado())
                .orElseThrow(() -> new RuntimeException("El grado con código '" + dto.getCodigoGrado() + "' no existe."));

        // 2. Buscamos si el alumno ya existe (por ID o por DNI)
        Alumno alumno;
        if (dto.getId() != null) {
            alumno = repoAlumno.findById(dto.getId())
                    .orElseThrow(() -> new RuntimeException("Alumno no encontrado con ID: " + dto.getId()));
        } else {
            alumno = repoAlumno.findByDni(dto.getDni())
                    .orElse(new Alumno());
        }

        // 3. Rellenamos/Actualizamos los datos
        alumno.setDni(dto.getDni());
        alumno.setNombre(dto.getNombre());
        alumno.setApellidos(dto.getApellidos());
        alumno.setGrado(grado);

        // 4. Guardamos (UPSERT)
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
