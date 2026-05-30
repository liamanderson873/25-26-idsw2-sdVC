-- 1. Insertar Grado
INSERT INTO grados (codigo, nombre) VALUES ('GII', 'Grado en Ingeniería Informática') ON CONFLICT DO NOTHING;

-- 2. Insertar Profesor
INSERT INTO profesores (dni, nombre, apellidos, email) VALUES ('12345678A', 'Jorge', 'Masías', 'jorge.masias@uneatlantico.es') ON CONFLICT DO NOTHING;

-- 3. Insertar Asignatura (ID 1)
INSERT INTO asignaturas (nombre, codigo, profesor_id) VALUES ('Ingeniería del Software II', 'IDSW2', 1) ON CONFLICT DO NOTHING;

-- 4. Insertar Temas (ID 1 y 2)
INSERT INTO temas (nombre, asignatura_id) VALUES ('Requisitos y RUP', 1), ('Análisis y Diseño', 1) ON CONFLICT DO NOTHING;

-- 5. Insertar Batería de Preguntas (20 preguntas: 6 FÁCIL, 10 MEDIO, 4 DIFÍCIL)
-- Tema 1
INSERT INTO preguntas (enunciado, dificultad, tema_id) VALUES ('¿Qué significa RUP?', 'FACIL', 1);
INSERT INTO preguntas (enunciado, dificultad, tema_id) VALUES ('¿Cuál es la primera fase de RUP?', 'FACIL', 1);
INSERT INTO preguntas (enunciado, dificultad, tema_id) VALUES ('Define un Actor en un CU', 'MEDIO', 1);
INSERT INTO preguntas (enunciado, dificultad, tema_id) VALUES ('¿Qué es el Diagrama de Contexto?', 'MEDIO', 1);
INSERT INTO preguntas (enunciado, dificultad, tema_id) VALUES ('Diferencia entre Requisito Funcional y No Funcional', 'MEDIO', 1);
INSERT INTO preguntas (enunciado, dificultad, tema_id) VALUES ('Explica la arquitectura 4+1 vistas', 'DIFICIL', 1);
INSERT INTO preguntas (enunciado, dificultad, tema_id) VALUES ('¿Cómo se gestiona el riesgo en RUP?', 'DIFICIL', 1);

-- Tema 2
INSERT INTO preguntas (enunciado, dificultad, tema_id) VALUES ('¿Qué es una clase @Entity?', 'FACIL', 2);
INSERT INTO preguntas (enunciado, dificultad, tema_id) VALUES ('¿Para qué sirve @Id?', 'FACIL', 2);
INSERT INTO preguntas (enunciado, dificultad, tema_id) VALUES ('¿Qué es un DTO?', 'FACIL', 2);
INSERT INTO preguntas (enunciado, dificultad, tema_id) VALUES ('¿Qué es el patrón BCE?', 'FACIL', 2);
INSERT INTO preguntas (enunciado, dificultad, tema_id) VALUES ('Diferencia entre Análisis y Diseño', 'MEDIO', 2);
INSERT INTO preguntas (enunciado, dificultad, tema_id) VALUES ('¿Cómo funciona la Inyección de Dependencias?', 'MEDIO', 2);
INSERT INTO preguntas (enunciado, dificultad, tema_id) VALUES ('Define el patrón Repositorio', 'MEDIO', 2);
INSERT INTO preguntas (enunciado, dificultad, tema_id) VALUES ('Explica el ciclo de vida de una entidad JPA', 'MEDIO', 2);
INSERT INTO preguntas (enunciado, dificultad, tema_id) VALUES ('¿Qué es la integridad referencial en el DER?', 'MEDIO', 2);
INSERT INTO preguntas (enunciado, dificultad, tema_id) VALUES ('Diferencia entre @ManyToOne y @OneToMany', 'MEDIO', 2);
INSERT INTO preguntas (enunciado, dificultad, tema_id) VALUES ('Explica el principio de Inversión de Control (IoC)', 'MEDIO', 2);
INSERT INTO preguntas (enunciado, dificultad, tema_id) VALUES ('Optimización de consultas con Query Methods complejos', 'DIFICIL', 2);
INSERT INTO preguntas (enunciado, dificultad, tema_id) VALUES ('Implementación de seguridad a nivel de datos', 'DIFICIL', 2);
