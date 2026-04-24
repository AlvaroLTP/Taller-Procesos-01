// Enums del backend
export enum Rol {
  ADMIN = 'admin',
  DOCENTE = 'docente',
  PSICOLOGO = 'psicologo',
  ADMINISTRATIVO = 'administrativo',
  ESTUDIANTE = 'estudiante',
}

export enum NivelEscolar {
  PRIMARIA = 'primaria',
  SECUNDARIA = 'secundaria',
}

export enum TipoIncidencia {
  BULLYING_VERBAL = 'bullying_verbal',
  EXCLUSION_SOCIAL = 'exclusion_social',
  CIBERBULLYING = 'ciberbullying',
  AGRESION_FISICA = 'agresion_fisica',
  HOSTIGAMIENTO_REITERADO = 'hostigamiento_reiterado',
  DISCRIMINACION = 'discriminacion',
}

export enum ResultadoIntervencion {
  PENDIENTE = 'pendiente',
  PARCIAL = 'parcial',
  EXITOSO = 'exitoso',
  SIN_CAMBIOS = 'sin_cambios',
}

// DTOs de entrada
export interface LoginDto {
  correo: string;
  password: string;
}

export interface RegistrarReporteAnonimoDto {
  nivelEscolar: NivelEscolar;
  grado: string;
  seccion: string;
  tipoIncidencia: TipoIncidencia;
  descripcion: string;
}

export interface GenerarTextoDto {
  prompt: string;
}

export interface CrearIncidenciaManualDto {
  nivelEscolar: NivelEscolar;
  grado: string;
  seccion: string;
  tipoIncidencia: TipoIncidencia;
  descripcion: string;
}

export interface AgregarIntervencionDto {
  estrategia: string;
  resultado: ResultadoIntervencion;
  observaciones: string;
}

export interface RegistrarUsuarioInstitucionalDto {
  nombre: string;
  correo: string;
  rol: Rol;
  area: string;
  password: string;
}

// DTOs de respuesta
export interface UsuarioAutenticado {
  id: string;
  nombre: string;
  correo: string;
  rol: Rol;
  area: string;
}

export interface RespuestaLogin {
  accessToken: string;
  usuario: UsuarioAutenticado;
}

export interface RespuestaSesion {
  usuario: UsuarioAutenticado;
}

export interface RespuestaLogout {
  ok: true;
}

export interface Salud {
  status: string;
  service: string;
}

export interface ReporteAnonimo {
  id: string;
  fechaCreacion: string;
  nivelEscolar: NivelEscolar;
  grado: string;
  seccion: string;
  tipoIncidencia: TipoIncidencia;
  descripcion: string;
  nivelAlerta: string;
  alertaCritica: boolean;
}

export interface IncidenciaPsicologica {
  id: string;
  fechaCreacion: string;
  nivelEscolar: NivelEscolar;
  grado: string;
  seccion: string;
  tipoIncidencia: TipoIncidencia;
  descripcion: string;
  nivelAlerta: string;
  alertaCritica: boolean;
  estado: string;
  intervenciones?: Intervencion[];
}

export interface Intervencion {
  id: string;
  fecha: string;
  estrategia: string;
  resultado: ResultadoIntervencion;
  observaciones: string;
  responsableId: string;
  responsableRol: Rol;
}

export interface MaterialDocente {
  id: string;
  titulo: string;
  contenido: string;
  tipo: string;
  creadoPor: string;
  fechaCreacion: string;
}

export interface UsuarioInstitucional {
  id: string;
  nombre: string;
  correo: string;
  rol: Rol;
  area: string;
  activo: boolean;
}

export interface EstadisticasClimaEscolar {
  totalIncidencias: number;
  incidenciasCriticas: number;
  intervencionesRealizadas: number;
  tasaResolucion: number;
  distribucionPorTipo: Record<TipoIncidencia, number>;
  distribucionPorNivel: Record<NivelEscolar, number>;
}

export interface RespuestaIa {
  contenido: string;
  modelo: string;
}

// Estructura de respuesta uniforme del backend
export interface RespuestaApi<T> {
  ok: boolean;
  data: T;
  meta: {
    path: string;
    timestamp: string;
  };
}