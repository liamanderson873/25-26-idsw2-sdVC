import api from '../api/axios';
import type { Tema } from '../types';

export const getTemas = async (): Promise<Tema[]> => {
  const response = await api.get<Tema[]>('/temas');
  return response.data;
};

export const createTema = async (tema: Tema): Promise<Tema> => {
  const response = await api.post<Tema>('/temas', tema);
  return response.data;
};

export const deleteTema = async (id: number): Promise<void> => {
  await api.delete(`/temas/${id}`);
};


