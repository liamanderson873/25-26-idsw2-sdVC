package com.jorgestor.api.servicio;

import com.jorgestor.api.dto.DTO_Tema;
import com.jorgestor.api.modelo.Asignatura;
import com.jorgestor.api.modelo.Tema;
import com.jorgestor.api.repositorio.RepositorioAsignatura;
import com.jorgestor.api.repositorio.RepositorioTema;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ServicioTema {
    private final RepositorioTema repoTema;
    private final RepositorioAsignatura repoAsignatura;

    public ServicioTema(RepositorioTema repoTema, RepositorioAsignatura repoAsignatura) {
        this.repoTema = repoTema;
        this.repoAsignatura = repoAsignatura;
    }

    @Transactional
    public void crearOActualizar(DTO_Tema dto) {
        Asignatura asig = repoAsignatura.findByCodigo(dto.getCodigoAsignatura())
                .orElseThrow(() -> new RuntimeException("Asignatura no encontrada"));

        Tema tema = new Tema(); // Los temas suelen ser nuevos, pero podríamos buscar por nombre si quisiéramos
        tema.setNombre(dto.getNombre());
        tema.setAsignatura(asig);
        
        repoTema.save(tema);
    }
}
