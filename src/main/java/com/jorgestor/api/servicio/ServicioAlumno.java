package com.jorgestor.api.servicio;

import com.jorgestor.api.dto.DTO_Alumno;
import com.jorgestor.api.modelo.Alumno;
import com.jorgestor.api.modelo.Grado;
import com.jorgestor.api.repositorio.RepositorioAlumno;
import com.jorgestor.api.repositorio.RepositorioGrado;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

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

    /**
     * Lógica de Importación (CU-03)
     * @Transactional: Si un alumno falla, nadie se guarda. Todo o nada (Atomicidad).
     */
    @Transactional
    public void importarAlumnos(List<DTO_Alumno> listaDto) {
        for (DTO_Alumno dto : listaDto) {
            // 1. Buscamos el grado (si no existe, lanzamos error)
            Grado grado = repoGrado.findByCodigo(dto.getCodigoGrado())
                    .orElseThrow(() -> new RuntimeException("Error al importar a " + dto.getNombre() + " " + dto.getApellidos() + " (DNI: " + dto.getDni() + "): El grado con código '" + dto.getCodigoGrado() + "' no existe. Revise el archivo."));

            // 2. Buscamos si el alumno ya existe por DNI
            Alumno alumno = repoAlumno.findByDni(dto.getDni())
                    .orElse(new Alumno()); // Si no existe, creamos uno nuevo vacío

            // 3. Rellenamos/Actualizamos los datos
            alumno.setDni(dto.getDni());
            alumno.setNombre(dto.getNombre());
            alumno.setApellidos(dto.getApellidos());
            alumno.setGrado(grado);

            // 4. Guardamos (UPSERT)
            repoAlumno.save(alumno);
        }
    }
}
