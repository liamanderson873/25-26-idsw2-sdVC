package com.jorgestor.api.config;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
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
            
            entityManager.createNativeQuery("TRUNCATE TABLE respuestas, examen_preguntas, preguntas, temas, examen_alumnos, examenes, alumnos, asignaturas, grados, profesores RESTART IDENTITY CASCADE").executeUpdate();
            
            System.out.println("✅ ÉXITO: Base de datos limpia. Por favor, cambia 'jorgestor.db.clean-on-startup' a 'false' para el próximo arranque.");
        }
    }
}
