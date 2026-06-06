export interface Grado {
  id?: number;
  nombre: string;
  codigo?: string;
}

export interface Asignatura {
  id?: number;
  nombre: string;
  codigo: string;
  cursoAcademico: string;
  dniProfesor: string;
  gradoId?: number;
}

export interface Profesor {
  id?: number;
  dni: string;
  nombre: string;
  apellidos: string;
  email: string;
  usuario?: string;
  password?: string;
}

export interface Alumno {
  id?: number;
  dni: string;
  nombre: string;
  apellidos: string;
  curso: number;
  gradoId: number;
  asignaturaIds?: number[];
}

export enum Dificultad {
  BAJA = 'BAJA',
  MEDIA = 'MEDIA',
  ALTA = 'ALTA'
}

export interface Pregunta {
  id?: number;
  enunciado: string;
  dificultad: Dificultad;
  temaId: number;
  asignaturaId?: number;
  habilitada: boolean;
  respuestas: Respuesta[];
}

export interface Tema {
  id?: number;
  nombre: string;
  codigoAsignatura: string;
  asignaturaId?: number;
}

export interface Respuesta {
  id?: number;
  contenido: string;
  esCorrecta: boolean;
  indice?: number;
}

export enum TipoEvaluacion {
  PARCIAL_1 = 'PARCIAL_1',
  PARCIAL_2 = 'PARCIAL_2',
  PARCIAL_3 = 'PARCIAL_3',
  FINAL = 'FINAL',
  EXTRAORDINARIO = 'EXTRAORDINARIO'
}

export interface GenerarExamenDTO {
  asignaturaId: number;
  temaIds: number[];
  numPreguntas: number;
  proporcionesDificultad: Record<Dificultad, number>;
  tipoEvaluacion: TipoEvaluacion;
  esPersonalizado: boolean;
}

export interface Examen {
  id: number;
  fechaExamen: string;
  tipoEvaluacion: TipoEvaluacion;
  esPersonalizado: boolean;
  asignatura: Asignatura;
}

export interface ProcesarCorreccionDTO {
  claveSHA256: string;
  marcas: Record<string, number>;
}

export interface Usuario {
  id: number;
  username: string;
  rol: 'DOCENTE' | 'ADMINISTRADOR_INSTITUCIONAL';
  nombre: string;
}

export interface LoginDTO {
  username: string;
  password: string;
}
