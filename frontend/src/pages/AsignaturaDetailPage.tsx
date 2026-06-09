import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getAsignaturas } from '../services/asignaturaService';
import { getProfesores } from '../services/profesorService';
import { getGrados } from '../services/gradoService';

const ACCIONES = [
  {
    id: 'corregir',
    titulo: 'Corregir Exámenes',
    desc: 'Accede a los grupos de exámenes para corregirlos manualmente o con IA.',
    color: '#10b981',
    bg: '#ecfdf5',
    ruta: (id: number) => `/corregir-examen?asignaturaId=${id}`,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
      </svg>
    ),
  },
  {
    id: 'generar',
    titulo: 'Generar Exámenes',
    desc: 'Genera exámenes personalizados por alumno a partir de la batería de preguntas.',
    color: '#3b82f6',
    bg: '#eff6ff',
    ruta: (id: number) => `/generar-examen?asignaturaId=${id}`,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
        <line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/>
      </svg>
    ),
  },
  {
    id: 'preguntas',
    titulo: 'Batería de Preguntas',
    desc: 'Consulta y gestiona las preguntas y respuestas de esta asignatura.',
    color: '#f59e0b',
    bg: '#fffbeb',
    ruta: (id: number) => `/preguntas?asignaturaId=${id}`,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    ),
  },
];

const AsignaturaDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: asignaturas = [] } = useQuery({ queryKey: ['asignaturas'], queryFn: getAsignaturas });
  const { data: profesores = [] }  = useQuery({ queryKey: ['profesores'],  queryFn: getProfesores });
  const { data: grados = [] }      = useQuery({ queryKey: ['grados'],      queryFn: getGrados });

  const asignatura = asignaturas.find(a => a.id === Number(id));
  const profesor   = profesores.find(p => p.dni === asignatura?.dniProfesor);
  const grado      = grados.find(g => g.id === asignatura?.gradoId);

  if (asignaturas.length > 0 && !asignatura) {
    return (
      <div className="fade-in">
        <button onClick={() => navigate('/asignaturas')} className="btn btn-secondary" style={{ marginBottom: '1.5rem' }}>
          ← Asignaturas
        </button>
        <p style={{ color: 'var(--text-muted)' }}>Asignatura no encontrada.</p>
      </div>
    );
  }

  if (!asignatura) {
    return <div style={{ padding: '2rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Cargando...</div>;
  }

  return (
    <div className="fade-in">
      <button
        onClick={() => navigate('/asignaturas')}
        className="btn btn-secondary"
        style={{ fontSize: '0.8rem', marginBottom: '1.25rem' }}
      >
        ← Asignaturas
      </button>

      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ marginBottom: '0.3rem' }}>{asignatura.nombre}</h1>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <span><strong>Código:</strong> {asignatura.codigo}</span>
          <span><strong>Curso:</strong> {asignatura.cursoAcademico}</span>
          {grado && <span><strong>Grado:</strong> {grado.nombre}</span>}
          {profesor && <span><strong>Profesor:</strong> {profesor.apellidos}, {profesor.nombre}</span>}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
        {ACCIONES.map(acc => (
          <button
            key={acc.id}
            onClick={() => navigate(acc.ruta(asignatura.id!))}
            style={{
              background: 'white',
              border: '1.5px solid var(--border)',
              borderRadius: 'var(--radius)',
              padding: '1.5rem 1.25rem',
              textAlign: 'left',
              cursor: 'pointer',
              transition: 'border-color 0.15s, box-shadow 0.15s',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = acc.color;
              (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(0,0,0,0.07)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
              (e.currentTarget as HTMLElement).style.boxShadow = 'none';
            }}
          >
            <div style={{
              width: '48px', height: '48px', borderRadius: '12px',
              background: acc.bg, color: acc.color,
              display: 'grid', placeItems: 'center',
            }}>
              {acc.icon}
            </div>
            <div>
              <div style={{ fontWeight: '800', fontSize: '0.92rem', color: 'var(--text-main)', marginBottom: '0.3rem' }}>
                {acc.titulo}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                {acc.desc}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AsignaturaDetailPage;
