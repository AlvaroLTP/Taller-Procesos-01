import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { RespuestaApi } from '../types/api';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      withCredentials: true, // Para cookies de sesión
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Interceptor para agregar JWT si existe
    this.client.interceptors.request.use((config) => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Interceptor para manejar respuestas uniformes
    this.client.interceptors.response.use(
      (response: AxiosResponse<RespuestaApi<any>>) => {
        if (response.data.ok) {
          return response.data.data;
        }
        throw new Error('Respuesta no exitosa del servidor');
      },
      (error) => {
        console.error('Error en API:', error);
        throw error;
      }
    );
  }

  get<T>(url: string): Promise<T> {
    return this.client.get(url);
  }

  post<T>(url: string, data?: any): Promise<T> {
    return this.client.post(url, data);
  }

  put<T>(url: string, data?: any): Promise<T> {
    return this.client.put(url, data);
  }

  delete<T>(url: string): Promise<T> {
    return this.client.delete(url);
  }
}

export const apiClient = new ApiClient();