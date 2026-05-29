package com.jorgestor.api.controlador;

import com.jorgestor.api.dto.DTO_Tema;
import com.jorgestor.api.servicio.ServicioTema;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/temas")
public class ControladorTema {
    private final ServicioTema servicioTema;

    public ControladorTema(ServicioTema servicioTema) {
        this.servicioTema = servicioTema;
    }

    @PostMapping
    public ResponseEntity<String> guardar(@RequestBody DTO_Tema dto) {
        servicioTema.crearOActualizar(dto);
        return ResponseEntity.ok("Tema guardado correctamente.");
    }
}
