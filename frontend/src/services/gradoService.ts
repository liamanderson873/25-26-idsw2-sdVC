import api from '../api/axios';
import type { Grado } from '../types';

export const getGrados = async (): Promise<Grado[]> => {
  const response = await api.get<Grado[]>('/grados');
  return response.data;
};

export const createGrado = async (grado: Grado): Promise<Grado> => {
  const response = await api.post<Grado>('/grados', grado);
  return response.data;
};

export const deleteGrado = async (id: number): Promise<void> => {
  await api.delete(`/grados/${id}`);
};


