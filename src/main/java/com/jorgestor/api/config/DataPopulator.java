package com.jorgestor.api.config;

import com.jorgestor.api.modelo.*;
import com.jorgestor.api.repositorio.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Component
@Order(2)
public class DataPopulator implements CommandLineRunner {

    private final RepositorioGrado repoGrado;
    private final RepositorioProfesor repoProfesor;
    private final RepositorioAsignatura repoAsignatura;
    private final RepositorioTema repoTema;
    private final RepositorioPregunta repoPregunta;
    private final RepositorioAlumno repoAlumno;

    @Value("${jorgestor.db.populate-on-startup:false}")
    private boolean shouldPopulate;

    public DataPopulator(RepositorioGrado repoGrado, RepositorioProfesor repoProfesor,
                         RepositorioAsignatura repoAsignatura, RepositorioTema repoTema,
                         RepositorioPregunta repoPregunta, RepositorioAlumno repoAlumno) {
        this.repoGrado = repoGrado;
        this.repoProfesor = repoProfesor;
        this.repoAsignatura = repoAsignatura;
        this.repoTema = repoTema;
        this.repoPregunta = repoPregunta;
        this.repoAlumno = repoAlumno;
    }

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        if (!shouldPopulate) return;

        System.out.println("🚀 Iniciando MEGA-POBLACIÓN ACADÉMICA REALISTA FINAL...");

        if (repoGrado.count() > 0) {
            System.out.println("⚠️ La base de datos ya tiene datos. Saltando.");
            return;
        }

        Random random = new Random();

        // 1. Grados
        List<Grado> grados = new ArrayList<>();
        grados.add(crearGrado("GII", "Ingeniería Informática"));
        grados.add(crearGrado("GIOI", "Organización Industrial"));
        grados.add(crearGrado("GPSI", "Psicología"));
        grados.add(crearGrado("GADE", "ADE"));
        grados.add(crearGrado("GPER", "Periodismo"));

        // 2. Profesores
        List<Profesor> profesores = new ArrayList<>();
        String[] nombresP = {"Alberto", "Beatriz", "Carlos", "Diana", "Elena", "Fernando", "Gloria", "Hugo"};
        for (int i = 0; i < nombresP.length; i++) {
            Profesor p = new Profesor();
            p.setNombre(nombresP[i]);
            p.setApellidos("Sánchez " + (i + 1));
            p.setDni("0000000" + i + "P");
            p.setEmail(nombresP[i].toLowerCase() + "@uneatlantico.es");
            p.setUsuario(nombresP[i].toLowerCase());
            p.setPassword(nombresP[i].toLowerCase() + "123");
            profesores.add(repoProfesor.save(p));
        }

        // 3. Asignaturas Reales por Grado
        List<Asignatura> todasAsig = new ArrayList<>();

        // TRANSVERSALES
        todasAsig.add(crearAsignatura("Estadística Aplicada", "TRANS-01", 1, profesores.get(0), grados));
        todasAsig.add(crearAsignatura("Gestión de Recursos Humanos", "TRANS-02", 3, profesores.get(1), Arrays.asList(grados.get(1), grados.get(2), grados.get(3))));
        todasAsig.add(crearAsignatura("Ética y Deontología", "TRANS-03", 4, profesores.get(2), grados));

        // INGENIERÍA INFORMÁTICA
        todasAsig.add(crearAsignatura("Programación I", "GII-11", 1, profesores.get(3), Arrays.asList(grados.get(0))));
        todasAsig.add(crearAsignatura("Sistemas Operativos", "GII-12", 1, profesores.get(4), Arrays.asList(grados.get(0))));
        todasAsig.add(crearAsignatura("Estructura de Datos", "GII-21", 2, profesores.get(5), Arrays.asList(grados.get(0))));
        todasAsig.add(crearAsignatura("Redes de Computadores", "GII-22", 2, profesores.get(6), Arrays.asList(grados.get(0))));
        todasAsig.add(crearAsignatura("Ingeniería del Software II", "GII-31", 3, profesores.get(7), Arrays.asList(grados.get(0))));
        todasAsig.add(crearAsignatura("Bases de Datos Avanzadas", "GII-32", 3, profesores.get(0), Arrays.asList(grados.get(0))));
        todasAsig.add(crearAsignatura("Inteligencia Artificial", "GII-41", 4, profesores.get(1), Arrays.asList(grados.get(0))));

        // ADE
        todasAsig.add(crearAsignatura("Contabilidad Financiera", "GADE-11", 1, profesores.get(2), Arrays.asList(grados.get(3))));
        todasAsig.add(crearAsignatura("Microeconomía", "GADE-12", 1, profesores.get(3), Arrays.asList(grados.get(3))));
        todasAsig.add(crearAsignatura("Marketing Estratégico", "GADE-21", 2, profesores.get(4), Arrays.asList(grados.get(3))));
        todasAsig.add(crearAsignatura("Derecho Mercantil", "GADE-22", 2, profesores.get(5), Arrays.asList(grados.get(3))));
        todasAsig.add(crearAsignatura("Dirección de Operaciones", "GADE-31", 3, profesores.get(6), Arrays.asList(grados.get(3))));

        // PSICOLOGÍA
        todasAsig.add(crearAsignatura("Psicología del Desarrollo", "GPSI-11", 1, profesores.get(7), Arrays.asList(grados.get(2))));
        todasAsig.add(crearAsignatura("Neurociencia Cognitiva", "GPSI-21", 2, profesores.get(0), Arrays.asList(grados.get(2))));
        todasAsig.add(crearAsignatura("Psicopatología Clínica", "GPSI-31", 3, profesores.get(1), Arrays.asList(grados.get(2))));

        // PERIODISMO
        todasAsig.add(crearAsignatura("Teoría de la Comunicación", "GPER-11", 1, profesores.get(2), Arrays.asList(grados.get(4))));
        todasAsig.add(crearAsignatura("Redacción Periodística", "GPER-21", 2, profesores.get(3), Arrays.asList(grados.get(4))));
        todasAsig.add(crearAsignatura("Periodismo Digital", "GPER-31", 3, profesores.get(4), Arrays.asList(grados.get(4))));

        // 4. Temas y Preguntas
        for (Asignatura asig : todasAsig) {
            for (int t = 1; t <= 3; t++) {
                Tema tema = new Tema();
                tema.setNombre("Tema " + t + " de " + asig.getNombre());
                tema.setAsignatura(asig);
                tema = repoTema.save(tema);
                
                for (int p_idx = 1; p_idx <= 12; p_idx++) {
                    Pregunta preg = new Pregunta();
                    preg.setEnunciado("Pregunta técnica " + p_idx + " sobre " + asig.getNombre());
                    preg.setTema(tema);
                    preg.setDificultad(Dificultad.values()[random.nextInt(3)]);
                    List<Respuesta> rs = new ArrayList<>();
                    for (int r = 0; r < 4; r++) {
                        Respuesta res = new Respuesta();
                        res.setContenido("Respuesta " + (char)('A'+r) + " para " + asig.getNombre());
                        res.setEsCorrecta(r == 0);
                        res.setIndice(r);
                        res.setPregunta(preg);
                        rs.add(res);
                    }
                    preg.setRespuestas(rs);
                    repoPregunta.save(preg);
                }
            }
        }

        // 5. Alumnos Trayectorias
        String[] nomAl = {"Juan", "Maria", "Pedro", "Lucia", "Diego", "Paula", "Andres", "Sara", "Mateo", "Carla", "Hugo", "Alba"};
        int alumnosTotal = 0;
        for (Grado g : grados) {
            for (int i = 1; i <= 35; i++) {
                Alumno al = new Alumno();
                al.setNombre(nomAl[random.nextInt(nomAl.length)]);
                al.setApellidos("Expediente " + g.getCodigo() + "-" + (2000 + i));
                al.setDni(String.format("%08d", random.nextInt(99999999)) + (char)('A' + random.nextInt(26)));
                
                int cursoActual = 1 + random.nextInt(4);
                al.setCurso(cursoActual);
                al.setGrado(g);
                
                // Lógica de Matriculación
                List<Asignatura> matriculas = new ArrayList<>();
                List<Asignatura> candidatas = todasAsig.stream()
                        .filter(a -> a.getGrados().contains(g))
                        .collect(Collectors.toList());
                
                for (Asignatura cand : candidatas) {
                    if (cand.getCursoSugerido() == cursoActual) {
                        if (random.nextDouble() < 0.95) matriculas.add(cand);
                    } else if (cand.getCursoSugerido() < cursoActual) {
                        if (random.nextDouble() < 0.3) matriculas.add(cand); // Repetidor
                    }
                }
                al.setAsignaturas(matriculas);
                repoAlumno.save(al);
                alumnosTotal++;
            }
        }

        System.out.println("✅ MEGA-POBLACIÓN REALISTA FINAL COMPLETADA:");
        System.out.println("- Alumnos: " + alumnosTotal);
        System.out.println("- Asignaturas Reales: " + todasAsig.size());
    }

    private Grado crearGrado(String codigo, String nombre) {
        Grado g = new Grado();
        g.setCodigo(codigo);
        g.setNombre(nombre);
        return repoGrado.save(g);
    }

    private Asignatura crearAsignatura(String nombre, String codigo, int curso, Profesor prof, List<Grado> grados) {
        Asignatura a = new Asignatura();
        a.setNombre(nombre);
        a.setCodigo(codigo);
        a.setCursoAcademico("2025/26");
        a.setCursoSugerido(curso);
        a.setProfesor(prof);
        a.setGrados(grados);
        return repoAsignatura.save(a);
    }
}
