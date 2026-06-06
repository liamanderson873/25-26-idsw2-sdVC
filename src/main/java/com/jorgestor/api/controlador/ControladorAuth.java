package com.jorgestor.api.controlador;

import com.jorgestor.api.dto.DTO_Login;
import com.jorgestor.api.modelo.Usuario;
import com.jorgestor.api.repositorio.RepositorioUsuario;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class ControladorAuth {

    private final RepositorioUsuario repoUsuario;

    public ControladorAuth(RepositorioUsuario repoUsuario) {
        this.repoUsuario = repoUsuario;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody DTO_Login dto) {
        Optional<Usuario> userOpt = repoUsuario.findByUsername(dto.getUsername());
        
        if (userOpt.isPresent() && userOpt.get().getPassword().equals(dto.getPassword())) {
            // En un sistema real usaríamos JWT, aquí devolvemos el objeto usuario para simplicidad académica
            return ResponseEntity.ok(userOpt.get());
        }
        
        return ResponseEntity.status(401).body("Credenciales inválidas");
    }
}
