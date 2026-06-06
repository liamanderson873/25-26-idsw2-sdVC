package com.jorgestor.api.config;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@Order(1)
public class DatabaseCleaner implements CommandLineRunner {

    @PersistenceContext
    private EntityManager entityManager;

    @Value("${jorgestor.db.clean-on-startup:false}")
    private boolean shouldClean;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        if (shouldClean) {
            System.out.println("⚠️ ALERTA: Iniciando limpieza profunda de la base de datos...");
            
            entityManager.createNativeQuery("TRUNCATE TABLE usuarios, respuestas, examen_preguntas, preguntas, temas, examen_alumnos, marcas_examen_alumno, examenes, alumnos, asignaturas, grados, profesores RESTART IDENTITY CASCADE").executeUpdate();

            // Eliminar check constraint del enum Dificultad si existe con valores antiguos
            entityManager.createNativeQuery("ALTER TABLE preguntas DROP CONSTRAINT IF EXISTS preguntas_dificultad_check").executeUpdate();

            System.out.println("✅ ÉXITO: Base de datos limpia.");
        }
        
        crearUsuariosPorDefecto();
    }

    @Transactional
    public void crearUsuariosPorDefecto() {
        long count = (long) entityManager.createQuery("SELECT count(u) FROM Usuario u").getSingleResult();
        if (count == 0) {
            System.out.println("👤 Creando usuarios por defecto...");
            
            // Administrador Institucional
            entityManager.createNativeQuery("INSERT INTO usuarios (username, password, rol, nombre) VALUES ('admin', 'admin123', 'ADMINISTRADOR_INSTITUCIONAL', 'Admin Institucional')").executeUpdate();
            
            // Docente
            entityManager.createNativeQuery("INSERT INTO usuarios (username, password, rol, nombre) VALUES ('docente', 'docente123', 'DOCENTE', 'Prof. Juan Pérez')").executeUpdate();
            
            System.out.println("✅ Usuarios creados: admin/admin123 y docente/docente123");
        }
    }
}
