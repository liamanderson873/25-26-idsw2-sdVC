import React, { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getExamenes, asignarExamen } from '../services/examenService';
import { getAlumnos } from '../services/alumnoService';
import { getGrados } from '../services/gradoService';
import { getAsignaturas } from '../services/asignaturaService';

const AsignarExamenPage: React.FC = () => {
  const queryClient = useQueryClient();

  // Selección de modelo (panel izquierdo)
  const [gradoId, setGradoId] = useState<number>(0);
  const [asignaturaId, setAsignaturaId] = useState<number>(0);
  const [selectedExamenId, setSelectedExamenId] = useState<number>(0);

  // Filtro de grado dentro del panel de alumnos
  const [filtroGradoId, setFiltroGradoId] = useState<number>(0);

  // Selección de alumnos
  const [selectedAlumnoIds, setSelectedAlumnoIds] = useState<number[]>([]);

  const { data: grados = [] }      = useQuery({ queryKey: ['grados'],      queryFn: getGrados });
  const { data: asignaturas = [] } = useQuery({ queryKey: ['asignaturas'], queryFn: getAsignaturas });
  const { data: examenes = [] }    = useQuery({ queryKey: ['examenes'],    queryFn: getExamenes });
  const { data: alumnos = [] }     = useQuery({ queryKey: ['alumnos'],     queryFn: getAlumnos });

  // Asignaturas del grado seleccionado (panel izquierdo)
  const asignaturasFiltradas = useMemo(() =>
    asignaturas.filter(a =>
      gradoId === 0 ||
      a.gradoId === gradoId ||
      (a as any).gradoIds?.includes(gradoId)
    ),
  [asignaturas, gradoId]);

  // Exámenes de la asignatura seleccionada
  const examenesFiltrados = useMemo(() =>
    examenes.filter(e => asignaturaId === 0 || e.asignatura?.id === asignaturaId),
  [examenes, asignaturaId]);

  // Todos los alumnos matriculados en la asignatura seleccionada
  const alumnosMatriculados = useMemo(() => {
    if (asignaturaId === 0) return [];
    return alumnos.filter(al => al.asignaturaIds?.includes(asignaturaId));
  }, [alumnos, asignaturaId]);

  // Grados disponibles para el filtro interno (solo los grados de la asignatura seleccionada)
  const gradosDeLaAsignatura = useMemo(() => {
    if (asignaturaId === 0) return [];
    const asig = asignaturas.find(a => a.id === asignaturaId);
    if (!asig) return [];
    const ids: number[] = (asig as any).gradoIds?.length > 0
      ? (asig as any).gradoIds
      : asig.gradoId ? [asig.gradoId] : [];
    return grados.filter(g => g.id !== undefined && ids.includes(g.id as number));
  }, [asignaturaId, asignaturas, grados]);

  // Alumnos visibles tras aplicar el filtro de grado interno
  const alumnosMostrados = useMemo(() =>
    filtroGradoId === 0
      ? alumnosMatriculados
      : alumnosMatriculados.filter(al => al.gradoId === filtroGradoId),
  [alumnosMatriculados, filtroGradoId]);

  const mutation = useMutation({
    mutationFn: () => asignarExamen(selectedExamenId, selectedAlumnoIds),
    onSuccess: () => {
      alert('Exámenes asignados con éxito. Se han generado las firmas SHA-256.');
      setSelectedAlumnoIds([]);
      queryClient.invalidateQueries({ queryKey: ['ejemplares'] });
    },
  });

  const handleToggleAlumno = (id: number) => {
    setSelectedAlumnoIds(prev =>
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  // Seleccionar / deseleccionar solo los alumnos visibles actualmente
  const visibleIds = alumnosMostrados.map(a => a.id!);
  const todosVisiblesSeleccionados =
    visibleIds.length > 0 && visibleIds.every(id => selectedAlumnoIds.includes(id));

  const handleSelectAll = () => {
    if (todosVisiblesSeleccionados) {
      setSelectedAlumnoIds(prev => prev.filter(id => !visibleIds.includes(id)));
    } else {
      setSelectedAlumnoIds(prev => [...new Set([...prev, ...visibleIds])]);
    }
  };

  const handleCambiarAsignatura = (id: number) => {
    setAsignaturaId(id);
    setSelectedExamenId(0);
    setFiltroGradoId(0);
    setSelectedAlumnoIds([]);
  };

  return (
    <div className="page-container fade-in">
      <h1>Asignar Exámenes</h1>
      <p className="subtitle">Vincule modelos de examen con estudiantes matriculados para generar sus ejemplares únicos.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '1.5rem', alignItems: 'start' }}>

        {/* PANEL IZQUIERDO */}
        <aside>
          <div className="card">
            <h3 style={{ marginBottom: '1.25rem' }}>Configurar Modelo</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label>Grado</label>
                <select
                  value={gradoId}
                  onChange={e => {
                    setGradoId(Number(e.target.value));
                    handleCambiarAsignatura(0);
                  }}
                >
                  <option value={0}>Seleccionar Grado...</option>
                  {grados.map(g => <option key={g.id} value={g.id}>{g.nombre}</option>)}
                </select>
              </div>
              <div>
                <label>Asignatura</label>
                <select
                  value={asignaturaId}
                  onChange={e => handleCambiarAsignatura(Number(e.target.value))}
                  disabled={!gradoId}
                >
                  <option value={0}>Seleccionar Asignatura...</option>
                  {asignaturasFiltradas.map(a => <option key={a.id} value={a.id}>{a.nombre}</option>)}
                </select>
              </div>
              <div>
                <label>Modelo de Examen</label>
                <select
                  value={selectedExamenId}
                  onChange={e => setSelectedExamenId(Number(e.target.value))}
                  disabled={!asignaturaId}
                >
                  <option value={0}>Seleccionar Modelo...</option>
                  {examenesFiltrados.map(ex => (
                    <option key={ex.id} value={ex.id}>
                      ID {ex.id} — {ex.tipoEvaluacion?.replace(/_/g, ' ')}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Resumen de selección */}
            {selectedExamenId > 0 && (
              <div style={{
                marginTop: '1.25rem',
                padding: '0.875rem',
                background: 'var(--primary-light)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--primary-soft)',
              }}>
                <div style={{ fontSize: '0.68rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--primary)', marginBottom: '0.4rem' }}>
                  Modelo seleccionado
                </div>
                <div style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-main)' }}>
                  Examen #{selectedExamenId}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>
                  {examenesFiltrados.find(e => e.id === selectedExamenId)?.tipoEvaluacion?.replace(/_/g, ' ')}
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* PANEL DERECHO: ALUMNOS */}
        <section>
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>

            {/* Cabecera del panel */}
            <div style={{
              padding: '1.25rem 1.5rem',
              borderBottom: '1px solid var(--border)',
              background: 'var(--surface-2)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: gradosDeLaAsignatura.length > 1 ? '0.875rem' : 0 }}>
                <div>
                  <h3>Alumnos Matriculados</h3>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                    {asignaturaId === 0
                      ? 'Seleccione una asignatura para ver los alumnos.'
                      : `${alumnosMatriculados.length} alumno${alumnosMatriculados.length !== 1 ? 's' : ''} matriculado${alumnosMatriculados.length !== 1 ? 's' : ''}${filtroGradoId > 0 ? ` · mostrando ${alumnosMostrados.length}` : ''}`
                    }
                  </p>
                </div>
                {asignaturaId > 0 && alumnosMostrados.length > 0 && (
                  <button onClick={handleSelectAll} className="btn btn-secondary" style={{ fontSize: '0.75rem !important', padding: '0.4rem 0.875rem !important', flexShrink: 0 }}>
                    {todosVisiblesSeleccionados ? 'Desmarcar visibles' : 'Seleccionar visibles'}
                  </button>
                )}
              </div>

              {/* Filtro por grado — solo aparece si la asignatura pertenece a más de un grado */}
              {gradosDeLaAsignatura.length > 1 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.68rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)' }}>
                    Filtrar grado:
                  </span>
                  <button
                    onClick={() => setFiltroGradoId(0)}
                    style={{
                      padding: '0.25rem 0.7rem',
                      borderRadius: '999px',
                      border: `1.5px solid ${filtroGradoId === 0 ? 'var(--primary)' : 'var(--border)'}`,
                      background: filtroGradoId === 0 ? 'var(--primary-light)' : 'var(--surface)',
                      color: filtroGradoId === 0 ? 'var(--primary)' : 'var(--text-muted)',
                      fontSize: '0.75rem',
                      fontWeight: '700',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    Todos
                  </button>
                  {gradosDeLaAsignatura.map(g => (
                    <button
                      key={g.id}
                      onClick={() => setFiltroGradoId(g.id === filtroGradoId ? 0 : g.id!)}
                      style={{
                        padding: '0.25rem 0.7rem',
                        borderRadius: '999px',
                        border: `1.5px solid ${filtroGradoId === g.id ? 'var(--primary)' : 'var(--border)'}`,
                        background: filtroGradoId === g.id ? 'var(--primary-light)' : 'var(--surface)',
                        color: filtroGradoId === g.id ? 'var(--primary)' : 'var(--text-muted)',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      {g.codigo ?? g.nombre}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Lista de alumnos */}
            <div style={{ maxHeight: '420px', overflowY: 'auto' }}>
              {asignaturaId === 0 ? (
                <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  Seleccione una asignatura para ver los alumnos matriculados.
                </div>
              ) : alumnosMostrados.length === 0 ? (
                <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  {alumnosMatriculados.length === 0
                    ? 'No hay alumnos matriculados en esta asignatura.'
                    : 'Ningún alumno coincide con el filtro de grado seleccionado.'}
                </div>
              ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <tbody>
                    {alumnosMostrados.map(al => {
                      const seleccionado = selectedAlumnoIds.includes(al.id!);
                      return (
                        <tr
                          key={al.id}
                          onClick={() => handleToggleAlumno(al.id!)}
                          style={{
                            borderBottom: '1px solid var(--surface-3)',
                            cursor: 'pointer',
                            background: seleccionado ? 'var(--primary-light)' : 'transparent',
                            transition: 'background 0.15s ease',
                          }}
                        >
                          {/* Checkbox visual */}
                          <td style={{ padding: '0.875rem 1rem 0.875rem 1.5rem', width: '44px' }}>
                            <div style={{
                              width: '18px', height: '18px',
                              borderRadius: '5px',
                              border: `2px solid ${seleccionado ? 'var(--primary)' : 'var(--border-strong)'}`,
                              background: seleccionado ? 'var(--primary)' : 'transparent',
                              display: 'grid', placeItems: 'center',
                              transition: 'all 0.15s ease',
                              flexShrink: 0,
                            }}>
                              {seleccionado && (
                                <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                                  <polyline points="2,6 5,9 10,3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              )}
                            </div>
                          </td>
                          {/* Datos del alumno */}
                          <td style={{ padding: '0.875rem 1.5rem 0.875rem 0' }}>
                            <div style={{
                              fontWeight: '700',
                              fontSize: '0.875rem',
                              color: seleccionado ? 'var(--primary)' : 'var(--text-main)',
                              marginBottom: '0.15rem',
                            }}>
                              {al.apellidos}, {al.nombre}
                            </div>
                            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'flex', gap: '0.5rem' }}>
                              <code>{al.dni}</code>
                              <span>·</span>
                              <span>{al.curso}º Año</span>
                              {gradosDeLaAsignatura.length > 1 && (
                                <>
                                  <span>·</span>
                                  <span style={{ color: 'var(--primary)', fontWeight: '600' }}>
                                    {grados.find(g => g.id === al.gradoId)?.codigo ?? grados.find(g => g.id === al.gradoId)?.nombre ?? ''}
                                  </span>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>

            {/* Footer con acción */}
            <div style={{
              padding: '1.25rem 1.5rem',
              borderTop: '1px solid var(--border)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: 'var(--surface-2)',
            }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <span style={{ fontWeight: '700', color: 'var(--primary)', fontSize: '1rem' }}>
                  {selectedAlumnoIds.length}
                </span>
                {' '} alumno{selectedAlumnoIds.length !== 1 ? 's' : ''} seleccionado{selectedAlumnoIds.length !== 1 ? 's' : ''}
              </div>
              <button
                className="btn btn-primary"
                disabled={selectedAlumnoIds.length === 0 || selectedExamenId === 0 || mutation.isPending}
                onClick={() => mutation.mutate()}
              >
                {mutation.isPending ? 'Asignando...' : 'Confirmar Asignación'}
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AsignarExamenPage;
