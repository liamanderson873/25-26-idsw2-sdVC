import api from '../api/axios';
import type { GenerarExamenDTO, GenerarYAsignarDTO, Examen, ProcesarCorreccionDTO } from '../types';

export const getExamenes = async (): Promise<Examen[]> => {
  const response = await api.get<Examen[]>('/examenes');
  return Array.isArray(response.data) ? response.data : [];
};

export const getEjemplares = async (examenId: number): Promise<any[]> => {
  const response = await api.get<any[]>(`/examenes/${examenId}/ejemplares`);
  return Array.isArray(response.data) ? response.data : [];
};

export const generarExamen = async (dto: GenerarExamenDTO): Promise<string> => {
  const response = await api.post('/examenes/generar', dto);
  return response.data;
};

export const generarYAsignar = async (dto: GenerarYAsignarDTO): Promise<string> => {
  const response = await api.post('/examenes/generar-y-asignar', dto);
  return response.data;
};

export const asignarExamen = async (examenId: number, alumnoIds: number[]): Promise<string> => {
  const response = await api.post('/examenes/asignar', { examenId, alumnoIds });
  return response.data;
};

export const entregarExamenMasivo = async (examenId: number): Promise<string> => {
  const response = await api.post(`/examenes/${examenId}/entregar`);
  return response.data;
};

export const corregirExamenMasivo = async (examenId: number): Promise<string> => {
  const response = await api.post(`/examenes/${examenId}/corregir-masivo`);
  return response.data;
};

export const corregirExamen = async (dto: ProcesarCorreccionDTO): Promise<string> => {
  const response = await api.post('/examenes/corregir', dto);
  return response.data;
};

export const exportarExamen = async (id: number): Promise<any> => {
  const response = await api.get(`/examenes/${id}/exportar`);
  return response.data;
};

export const getAuditoriaAlumno = async (ejemplarId: number): Promise<any> => {
  const response = await api.get(`/examenes/ejemplar/${ejemplarId}/auditoria`);
  return response.data;
};

export const getRevisionEjemplar = async (ejemplarId: number): Promise<any> => {
  const response = await api.get(`/examenes/ejemplar/${ejemplarId}/revision`);
  return response.data;
};

export const getGruposExamen = async (): Promise<any[]> => {
  const response = await api.get('/examenes/grupos');
  return Array.isArray(response.data) ? response.data : [];
};

export const getEjemplaresDeGrupo = async (dto: { asignaturaId: number; tipoEvaluacion: string; fechaExamen: string }): Promise<any[]> => {
  const response = await api.post('/examenes/grupos/alumnos', dto);
  return Array.isArray(response.data) ? response.data : [];
};

export const entregarGrupo = async (dto: { asignaturaId: number; tipoEvaluacion: string; fechaExamen: string }): Promise<string> => {
  const response = await api.post('/examenes/grupos/entregar', dto);
  return response.data;
};

export const corregirGrupoIA = async (dto: { asignaturaId: number; tipoEvaluacion: string; fechaExamen: string }): Promise<string> => {
  const response = await api.post('/examenes/grupos/corregir', dto);
  return response.data;
};

export const getConteosPorAlumno = async (): Promise<Record<number, number>> => {
  const response = await api.get('/examenes/conteos/alumnos');
  return response.data;
};

export const getConteosPorAsignatura = async (): Promise<Record<number, number>> => {
  const response = await api.get('/examenes/conteos/asignaturas');
  return response.data;
};

/** CU-33: cancelarGeneracion — solo funciona si el examen no tiene alumnos asignados */
export const cancelarGeneracion = async (examenId: number): Promise<string> => {
  const response = await api.delete(`/examenes/${examenId}`);
  return response.data;
};

export const getExamenesPorAlumno = async (alumnoId: number): Promise<any[]> => {
  const response = await api.get<any[]>(`/examenes/alumno/${alumnoId}`);
  return response.data;
};

export const getExamenesPorAsignatura = async (asignaturaId: number): Promise<any[]> => {
  const response = await api.get<any[]>(`/examenes/asignatura/${asignaturaId}`);
  return response.data;
};

export const getResumenSistema = async (): Promise<any> => {
  const response = await api.get('/sistema/resumen');
  return response.data;
};


