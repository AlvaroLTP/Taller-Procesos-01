import { apiClient } from './apiClient';
import { Salud } from '../types/api';

export const saludApi = {
  obtenerSalud: (): Promise<Salud> => {
    return apiClient.get('/salud');
  },
};