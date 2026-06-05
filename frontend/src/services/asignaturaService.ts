import api from '../api/axios';
import type { Asignatura } from '../types';

export const getAsignaturas = async (): Promise<Asignatura[]> => {
  const response = await api.get<Asignatura[]>('/asignaturas');
  return Array.isArray(response.data) ? response.data : [];
};

export const createAsignatura = async (asignatura: Asignatura): Promise<Asignatura> => {
  const response = await api.post<Asignatura>('/asignaturas', asignatura);
  return response.data;
};

export const deleteAsignatura = async (id: number): Promise<void> => {
  await api.delete(`/asignaturas/${id}`);
};


