import { apiClient } from './apiClient';
import { GenerarTextoDto, RespuestaIa } from '../types/api';

export const iaApi = {
  generarTexto: (data: GenerarTextoDto): Promise<RespuestaIa> => {
    return apiClient.post('/ia/generaciones', data);
  },
};