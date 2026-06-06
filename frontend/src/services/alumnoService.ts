import api from '../api/axios';
import type { Alumno } from '../types';

export const getAlumnos = async (): Promise<Alumno[]> => {
  const response = await api.get<Alumno[]>('/alumnos');
  return response.data;
};

export const createAlumno = async (alumno: Alumno): Promise<Alumno> => {
  const response = await api.post<Alumno>('/alumnos', alumno);
  return response.data;
};

export const updateAlumno = async (id: number, alumno: Alumno): Promise<Alumno> => {
  const response = await api.post<Alumno>(`/alumnos`, { ...alumno, id });
  return response.data;
};

export const deleteAlumno = async (id: number): Promise<void> => {
  await api.delete(`/alumnos/${id}`);
};

export const importarAlumnos = async (alumnos: Alumno[]): Promise<string> => {
  const response = await api.post<string>('/alumnos/importar', alumnos);
  return response.data;
};
