import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getAlumnos } from '../services/alumnoService';
import { getGrados } from '../services/gradoService';
import { getAsignaturas } from '../services/asignaturaService';
import { getExamenesPorAlumno } from '../services/examenService';

const ESTADO_STYLE: Record<string, { bg: string; color: string; label: string }> = {
  ASIGNADO:               { bg: '#eff6ff', color: '#2563eb', label: 'Asignado' },
  PENDIENTE:              { bg: '#fefce8', color: '#ca8a04', label: 'Pendiente' },
  PENDIENTE_CALIFICACION: { bg: '#fff7ed', color: '#ea580c', label: 'Entregado' },
  CORREGIDO:              { bg: '#f0fdf4', color: '#16a34a', label: 'Corregido' },
};

const AlumnoDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: alumnos = [] }     = useQuery({ queryKey: ['alumnos'],     queryFn: getAlumnos });
  const { data: grados = [] }      = useQuery({ queryKey: ['grados'],      queryFn: getGrados });
  const { data: asignaturas = [] } = useQuery({ queryKey: ['asignaturas'], queryFn: getAsignaturas });

  const { data: examenes = [], isLoading: loadingExamenes } = useQuery({
    queryKey: ['examenes-alumno', Number(id)],
    queryFn: () => getExamenesPorAlumno(Number(id)),
    enabled: !!id,
  });

  const alumno = alumnos.find(a => a.id === Number(id));

  if (alumnos.length > 0 && !alumno) {
    return (
      <div className="fade-in">
        <button onClick={() => navigate('/alumnos')} className="btn btn-secondary" style={{ marginBottom: '1.5rem' }}>
          ← Alumnos
        </button>
        <p style={{ color: 'var(--text-muted)' }}>Alumno no encontrado.</p>
      </div>
    );
  }

  if (!alumno) {
    return <div style={{ padding: '2rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Cargando...</div>;
  }

  const grado = grados.find(g => g.id === alumno.gradoId);
  const asignaturasAlumno = asignaturas.filter(a => alumno.asignaturaIds?.includes(a.id!));

  return (
    <div className="fade-in">
      <button
        onClick={() => navigate('/alumnos')}
        className="btn btn-secondary"
        style={{ fontSize: '0.8rem', marginBottom: '1.25rem' }}
      >
        ← Alumnos
      </button>

      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ marginBottom: '0.3rem' }}>{alumno.apellidos}, {alumno.nombre}</h1>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <span><strong>DNI:</strong> {alumno.dni}</span>
          <span><strong>Curso:</strong> {alumno.curso}º Año</span>
          {grado && <span><strong>Grado:</strong> {grado.nombre}</span>}
        </div>
      </div>

      {asignaturasAlumno.length > 0 && (
        <section className="card" style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--primary)', marginBottom: '0.75rem' }}>
            Asignaturas matriculadas
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {asignaturasAlumno.map(a => (
              <button
                key={a.id}
                onClick={() => navigate(`/asignaturas/${a.id}`)}
                style={{
                  padding: '0.3rem 0.8rem',
                  borderRadius: '999px',
                  background: 'var(--primary-light)',
                  color: 'var(--primary)',
                  fontSize: '0.78rem',
                  fontWeight: '600',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                {a.nombre}
              </button>
            ))}
          </div>
        </section>
      )}

      <section className="card">
        <h3 style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--primary)', marginBottom: '1rem' }}>
          Exámenes asignados ({examenes.length})
        </h3>

        {loadingExamenes ? (
          <div style={{ padding: '1rem 0', color: 'var(--text-muted)', fontSize: '0.85rem' }}>Cargando...</div>
        ) : examenes.length === 0 ? (
          <div style={{ padding: '2rem 0', color: 'var(--text-muted)', fontSize: '0.85rem', textAlign: 'center' }}>
            Este alumno no tiene exámenes asignados todavía.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {(examenes as any[]).map(ex => {
              const est = ESTADO_STYLE[ex.estado] ?? { bg: '#f1f5f9', color: '#475569', label: ex.estado };
              return (
                <div key={ex.id} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '0.875rem 1rem',
                  background: 'var(--background)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border)',
                }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: '700', fontSize: '0.88rem', color: 'var(--text-main)', marginBottom: '0.2rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {ex.asignaturaNombre}
                    </div>
                    <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.72rem', color: 'var(--text-muted)', flexWrap: 'wrap' }}>
                      <span>{ex.tipoEvaluacion?.replace(/_/g, ' ')}</span>
                      <span>·</span>
                      <span>{ex.fechaExamen}</span>
                      {ex.notaFinal != null && (
                        <>
                          <span>·</span>
                          <span style={{ fontWeight: '800', color: ex.notaFinal >= 5 ? 'var(--success)' : 'var(--danger)' }}>
                            {ex.notaFinal.toFixed(2)}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0, marginLeft: '1rem' }}>
                    <span style={{
                      fontSize: '0.68rem', fontWeight: '700',
                      padding: '0.2rem 0.6rem', borderRadius: '999px',
                      background: est.bg, color: est.color,
                    }}>
                      {est.label}
                    </span>
                    <button
                      className="btn btn-secondary"
                      style={{ fontSize: '0.7rem', padding: '0.25rem 0.65rem' }}
                      onClick={() => window.open(`/examenes/revision/${ex.id}`, '_blank')}
                    >
                      Ver examen
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

    </div>
  );
};

export default AlumnoDetailPage;
