import api from '../api/axios';
import type { Pregunta } from '../types';

export const getPreguntas = async (): Promise<Pregunta[]> => {
  const response = await api.get<Pregunta[]>('/preguntas');
  return response.data;
};

export const createPregunta = async (pregunta: Pregunta): Promise<Pregunta> => {
  const response = await api.post<Pregunta>('/preguntas', pregunta);
  return response.data;
};

export const deletePregunta = async (id: number): Promise<void> => {
  await api.delete(`/preguntas/${id}`);
};


