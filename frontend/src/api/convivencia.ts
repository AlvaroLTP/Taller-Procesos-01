import { apiClient } from './apiClient';
import {
  RegistrarReporteAnonimoDto,
  CrearIncidenciaManualDto,
  AgregarIntervencionDto,
  RegistrarUsuarioInstitucionalDto,
  ReporteAnonimo,
  IncidenciaPsicologica,
  Intervencion,
  MaterialDocente,
  UsuarioInstitucional,
  EstadisticasClimaEscolar,
} from '../types/api';

export const convivenciaApi = {
  // Reportes anónimos
  registrarReporteAnonimo: (data: RegistrarReporteAnonimoDto): Promise<ReporteAnonimo> => {
    return apiClient.post('/convivencia/reportes-anonimos', data);
  },

  // Incidencias
  crearIncidenciaDesdeReporte: (reporteId: string): Promise<IncidenciaPsicologica> => {
    return apiClient.post(`/convivencia/incidencias/desde-reporte/${reporteId}`);
  },

  crearIncidenciaManual: (data: CrearIncidenciaManualDto): Promise<IncidenciaPsicologica> => {
    return apiClient.post('/convivencia/incidencias/manual', data);
  },

  listarIncidencias: (): Promise<IncidenciaPsicologica[]> => {
    return apiClient.get('/convivencia/incidencias');
  },

  agregarIntervencion: (incidenciaId: string, data: AgregarIntervencionDto): Promise<Intervencion> => {
    return apiClient.post(`/convivencia/incidencias/${incidenciaId}/intervenciones`, data);
  },

  // Materiales docentes
  crearMaterialDocente: (data: { titulo: string; contenido: string; tipo: string }): Promise<MaterialDocente> => {
    return apiClient.post('/convivencia/materiales', data);
  },

  listarMaterialesDocentes: (): Promise<MaterialDocente[]> => {
    return apiClient.get('/convivencia/materiales');
  },

  // Usuarios institucionales
  registrarUsuarioInstitucional: (data: RegistrarUsuarioInstitucionalDto): Promise<UsuarioInstitucional> => {
    return apiClient.post('/convivencia/usuarios-institucionales', data);
  },

  listarUsuariosInstitucionales: (): Promise<UsuarioInstitucional[]> => {
    return apiClient.get('/convivencia/usuarios-institucionales');
  },

  // Alertas y estadísticas
  listarAlertasCriticas: (): Promise<IncidenciaPsicologica[]> => {
    return apiClient.get('/convivencia/alertas-criticas');
  },

  obtenerEstadisticasClimaEscolar: (): Promise<EstadisticasClimaEscolar> => {
    return apiClient.get('/convivencia/estadisticas/clima-escolar');
  },
};