import { apiClient } from './apiClient';
import { LoginDto, RespuestaLogin, RespuestaSesion, RespuestaLogout } from '../types/api';

export const authApi = {
  login: (data: LoginDto): Promise<RespuestaLogin> => {
    return apiClient.post('/auth/login', data);
  },

  getSession: (): Promise<RespuestaSesion> => {
    return apiClient.get('/auth/sesion');
  },

  logout: (): Promise<RespuestaLogout> => {
    return apiClient.post('/auth/logout');
  },
};