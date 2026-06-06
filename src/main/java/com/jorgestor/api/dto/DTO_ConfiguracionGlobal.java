package com.jorgestor.api.dto;

import java.util.List;

public class DTO_ConfiguracionGlobal {

    private String exportadoEn;
    private List<DTO_Grado> grados;
    private List<DTO_Asignatura> asignaturas;
    private List<DTO_Alumno> alumnos;
    private List<DTO_Pregunta> preguntas;

    public DTO_ConfiguracionGlobal() {}

    public DTO_ConfiguracionGlobal(String exportadoEn,
                                   List<DTO_Grado> grados,
                                   List<DTO_Asignatura> asignaturas,
                                   List<DTO_Alumno> alumnos,
                                   List<DTO_Pregunta> preguntas) {
        this.exportadoEn = exportadoEn;
        this.grados = grados;
        this.asignaturas = asignaturas;
        this.alumnos = alumnos;
        this.preguntas = preguntas;
    }

    public String getExportadoEn() { return exportadoEn; }
    public void setExportadoEn(String exportadoEn) { this.exportadoEn = exportadoEn; }

    public List<DTO_Grado> getGrados() { return grados; }
    public void setGrados(List<DTO_Grado> grados) { this.grados = grados; }

    public List<DTO_Asignatura> getAsignaturas() { return asignaturas; }
    public void setAsignaturas(List<DTO_Asignatura> asignaturas) { this.asignaturas = asignaturas; }

    public List<DTO_Alumno> getAlumnos() { return alumnos; }
    public void setAlumnos(List<DTO_Alumno> alumnos) { this.alumnos = alumnos; }

    public List<DTO_Pregunta> getPreguntas() { return preguntas; }
    public void setPreguntas(List<DTO_Pregunta> preguntas) { this.preguntas = preguntas; }
}
