import api from '../api/axios';
import type { GenerarExamenDTO, Examen, ProcesarCorreccionDTO } from '../types';

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


