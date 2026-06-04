export interface Grado {
  id?: number;
  nombre: string;
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
}

export interface Alumno {
  id?: number;
  dni: string;
  nombre: string;
  apellidos: string;
  gradoId: number;
}

export enum Dificultad {
  FACIL = 'FACIL',
  MEDIO = 'MEDIO',
  DIFICIL = 'DIFICIL'
}

export interface Pregunta {
  id?: number;
  enunciado: string;
  dificultad: Dificultad;
  temaId: number;
  respuestas: Respuesta[];
}

export interface Tema {
  id?: number;
  nombre: string;
  codigoAsignatura: string;
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
  marcas: Record<number, number>;
}


