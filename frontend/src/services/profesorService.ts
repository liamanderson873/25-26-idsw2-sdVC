import api from '../api/axios';
import type { Profesor } from '../types';

export const getProfesores = async (): Promise<Profesor[]> => {
  const response = await api.get<Profesor[]>('/profesores');
  return response.data;
};

export const createProfesor = async (profesor: Profesor): Promise<Profesor> => {
  const response = await api.post<Profesor>('/profesores', profesor);
  return response.data;
};

export const deleteProfesor = async (id: number): Promise<void> => {
  await api.delete(`/profesores/${id}`);
};


