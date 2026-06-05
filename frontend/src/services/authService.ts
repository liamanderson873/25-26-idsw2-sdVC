import api from '../api/axios';
import { LoginDTO, Usuario } from '../types';

export const login = async (dto: LoginDTO): Promise<Usuario> => {
  const response = await api.post<Usuario>('/auth/login', dto);
  return response.data;
};
