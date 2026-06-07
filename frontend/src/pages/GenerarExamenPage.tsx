import React, { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { getAsignaturas } from '../services/asignaturaService';
import { getTemas } from '../services/temaService';
import { getGrados } from '../services/gradoService';
import { getAlumnos } from '../services/alumnoService';
import { generarYAsignar } from '../services/examenService';
import { Dificultad, TipoEvaluacion } from '../types';
import type { ConfigPorGrado } from '../types';

const TIPO_LABELS: Record<TipoEvaluacion, string> = {
  [TipoEvaluacion.PARCIAL_1]:      'Parcial 1',
  [TipoEvaluacion.PARCIAL_2]:      'Parcial 2',
  [TipoEvaluacion.PARCIAL_3]:      'Parcial 3',
  [TipoEvaluacion.FINAL]:          'Examen Final',
  [TipoEvaluacion.EXTRAORDINARIO]: 'Extraordinario',
};

const DIF_CONFIG = {
  [Dificultad.BAJA]:  { label: 'Baja',  color: 'var(--success)', bg: 'var(--success-light)', accent: '#059669' },
  [Dificultad.MEDIA]: { label: 'Media', color: 'var(--warning)', bg: 'var(--warning-light)', accent: '#d97706' },
  [Dificultad.ALTA]:  { label: 'Alta',  color: 'var(--danger)',  bg: 'var(--danger-light)',  accent: '#dc2626' },
};

const DEFAULT_PROPS = (): Record<Dificultad, number> => ({
  [Dificultad.BAJA]: 40, [Dificultad.MEDIA]: 40, [Dificultad.ALTA]: 20,
});

interface ConfigGrado {
  numPreguntas: number;
  proporciones: Record<Dificultad, number>;
  alumnoIds: number[];
}

const StepBadge: React.FC<{ n: string }> = ({ n }) => (
  <div style={{
    width: '26px', height: '26px', borderRadius: '8px',
    background: 'var(--primary-light)', color: 'var(--primary)',
    display: 'grid', placeItems: 'center',
    fontSize: '0.7rem', fontWeight: '900', letterSpacing: '-0.02em', flexShrink: 0,
  }}>{n}</div>
);

const GenerarExamenPage: React.FC = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [filterGradoId, setFilterGradoId] = useState<number>(0);
  const [asignaturaId, setAsignaturaId] = useState<number>(0);
  const [temaIds, setTemaIds] = useState<number[]>([]);
  const [tipo, setTipo] = useState<TipoEvaluacion>(TipoEvaluacion.PARCIAL_1);
  const [configPorGrado, setConfigPorGrado] = useState<Record<number, ConfigGrado>>({});
  const [resultado, setResultado] = useState<string | null>(null);

  const { data: asignaturas = [] } = useQuery({ queryKey: ['asignaturas'], queryFn: getAsignaturas });
  const { data: grados = [] }      = useQuery({ queryKey: ['grados'],      queryFn: getGrados });
  const { data: alumnos = [] }     = useQuery({ queryKey: ['alumnos'],     queryFn: getAlumnos });
  const { data: temas = [] }       = useQuery({
    queryKey: ['temas', asignaturaId],
    queryFn: getTemas,
    enabled: asignaturaId > 0,
  });

  const asignaturasFiltradas = useMemo(() =>
    asignaturas.filter(a =>
      filterGradoId === 0 ||
      a.gradoId === filterGradoId ||
      (a as any).gradoIds?.includes(filterGradoId)
    ),
  [asignaturas, filterGradoId]);

  const asignaturaSeleccionada = useMemo(
    () => asignaturas.find(a => a.id === asignaturaId),
    [asignaturas, asignaturaId]
  );

  // Grados de la asignatura seleccionada
  const gradosDeAsignatura = useMemo(() => {
    if (!asignaturaSeleccionada) return [];
    const ids: number[] = (asignaturaSeleccionada as any).gradoIds?.length > 0
      ? (asignaturaSeleccionada as any).gradoIds
      : asignaturaSeleccionada.gradoId ? [asignaturaSeleccionada.gradoId] : [];
    return grados.filter(g => g.id !== undefined && ids.includes(g.id as number));
  }, [asignaturaSeleccionada, grados]);

  // Temas de la asignatura seleccionada
  const temasDeAsignatura = useMemo(() => {
    if (asignaturaId === 0) return [];
    return temas.filter((t: any) =>
      t.asignaturaId === asignaturaId || t.codigoAsignatura === asignaturaSeleccionada?.codigo
    );
  }, [temas, asignaturaId, asignaturaSeleccionada]);

  // Alumnos matriculados en la asignatura por grado
  const alumnosPorGrado = useMemo(() => {
    const map: Record<number, typeof alumnos> = {};
    if (asignaturaId === 0) return map;
    const matriculados = alumnos.filter(al => al.asignaturaIds?.includes(asignaturaId));
    for (const g of gradosDeAsignatura) {
      map[g.id!] = matriculados.filter(al => al.gradoId === g.id);
    }
    return map;
  }, [alumnos, asignaturaId, gradosDeAsignatura]);

  const handleGradoFilterChange = (id: number) => {
    setFilterGradoId(id);
    // Si la asignatura actual no pertenece al nuevo grado, resetear
    if (id !== 0 && asignaturaSeleccionada) {
      const perteneceAlGrado =
        asignaturaSeleccionada.gradoId === id ||
        (asignaturaSeleccionada as any).gradoIds?.includes(id);
      if (!perteneceAlGrado) handleAsignaturaChange(0);
    }
  };

  // Inicializar config por grado cuando cambia la asignatura
  const handleAsignaturaChange = (id: number) => {
    setAsignaturaId(id);
    setTemaIds([]);
    setResultado(null);
    if (id === 0) { setConfigPorGrado({}); return; }

    const asig = asignaturas.find(a => a.id === id);
    const ids: number[] = (asig as any)?.gradoIds?.length > 0
      ? (asig as any).gradoIds
      : asig?.gradoId ? [asig.gradoId] : [];

    const init: Record<number, ConfigGrado> = {};
    for (const gid of ids) {
      init[gid] = { numPreguntas: 10, proporciones: DEFAULT_PROPS(), alumnoIds: [] };
    }
    setConfigPorGrado(init);
  };

  const updateConfig = (gradoId: number, patch: Partial<ConfigGrado>) => {
    setConfigPorGrado(prev => ({
      ...prev,
      [gradoId]: { ...prev[gradoId], ...patch },
    }));
  };

  const handlePropChange = (gradoId: number, dif: Dificultad, raw: number) => {
    const prev = configPorGrado[gradoId]?.proporciones ?? DEFAULT_PROPS();
    const max = 100 - Object.entries(prev)
      .filter(([k]) => k !== dif)
      .reduce((s, [, v]) => s + (v as number), 0);
    updateConfig(gradoId, {
      proporciones: { ...prev, [dif]: Math.min(raw, max) }
    });
  };

  const toggleTema = (id: number) =>
    setTemaIds(prev => prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]);

  const toggleAlumno = (gradoId: number, alumnoId: number) => {
    const prev = configPorGrado[gradoId]?.alumnoIds ?? [];
    const next = prev.includes(alumnoId) ? prev.filter(id => id !== alumnoId) : [...prev, alumnoId];
    updateConfig(gradoId, { alumnoIds: next });
  };

  const toggleTodosGrado = (gradoId: number) => {
    const todos = (alumnosPorGrado[gradoId] ?? []).map(a => a.id!);
    const prev = configPorGrado[gradoId]?.alumnoIds ?? [];
    const allSelected = todos.every(id => prev.includes(id));
    updateConfig(gradoId, { alumnoIds: allSelected ? [] : todos });
  };

  const totalAlumnosSeleccionados = Object.values(configPorGrado)
    .reduce((s, c) => s + c.alumnoIds.length, 0);

  const propTotales = (gradoId: number) => {
    const p = configPorGrado[gradoId]?.proporciones ?? DEFAULT_PROPS();
    return p[Dificultad.BAJA] + p[Dificultad.MEDIA] + p[Dificultad.ALTA];
  };

  const todosOk = gradosDeAsignatura.every(g => propTotales(g.id!) === 100);
  const canSubmit = asignaturaId > 0 && temaIds.length > 0 && todosOk && totalAlumnosSeleccionados > 0;

  const mutation = useMutation({
    mutationFn: generarYAsignar,
    onSuccess: (data) => {
      setResultado(data);
      queryClient.invalidateQueries({ queryKey: ['examenes'] });
      setTimeout(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }), 100);
    },
    onError: (error: any) => {
      alert('Error al generar: ' + (error.response?.data || error.message || 'Error desconocido'));
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    const configuraciones: ConfigPorGrado[] = gradosDeAsignatura
      .filter(g => (configPorGrado[g.id!]?.alumnoIds?.length ?? 0) > 0)
      .map(g => ({
        gradoId: g.id!,
        numPreguntas: configPorGrado[g.id!].numPreguntas,
        proporcionesDificultad: {
          [Dificultad.BAJA]:  configPorGrado[g.id!].proporciones[Dificultad.BAJA]  / 100,
          [Dificultad.MEDIA]: configPorGrado[g.id!].proporciones[Dificultad.MEDIA] / 100,
          [Dificultad.ALTA]:  configPorGrado[g.id!].proporciones[Dificultad.ALTA]  / 100,
        },
        alumnoIds: configPorGrado[g.id!].alumnoIds,
      }));

    mutation.mutate({ asignaturaId, temaIds, tipoEvaluacion: tipo, configuraciones });
  };

  return (
    <div className="page-container fade-in">
      <h1>Generar Exámenes Personalizados</h1>
      <p className="subtitle">
        Cada alumno recibe un examen único con preguntas seleccionadas aleatoriamente e independientemente.
      </p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

        {/* ── 01 ASIGNATURA + TIPO ───────────────────────────── */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <StepBadge n="01" />
            <div>
              <h3>Asignatura y Tipo de Evaluación</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>
                Los grados vinculados a la asignatura se configurarán de forma independiente.
              </p>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.25rem' }}>
            <div>
              <label>Filtrar por Grado</label>
              <select value={filterGradoId} onChange={e => handleGradoFilterChange(Number(e.target.value))}>
                <option value={0}>Todos los grados</option>
                {grados.map(g => <option key={g.id} value={g.id}>{g.nombre}</option>)}
              </select>
            </div>
            <div>
              <label>Asignatura</label>
              <select value={asignaturaId} onChange={e => handleAsignaturaChange(Number(e.target.value))}>
                <option value={0}>Seleccionar asignatura...</option>
                {asignaturasFiltradas.map(a => <option key={a.id} value={a.id}>{a.nombre}</option>)}
              </select>
            </div>
            <div>
              <label>Tipo de Evaluación</label>
              <select value={tipo} onChange={e => setTipo(e.target.value as TipoEvaluacion)}>
                {Object.values(TipoEvaluacion).map(t => (
                  <option key={t} value={t}>{TIPO_LABELS[t]}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* ── 02 TEMAS ──────────────────────────────────────── */}
        {asignaturaId > 0 && (
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <StepBadge n="02" />
                <div>
                  <h3>Temas a Incluir</h3>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>
                    Las preguntas se extraerán únicamente de los temas seleccionados.
                  </p>
                </div>
              </div>
              {temasDeAsignatura.length > 0 && (
                <button type="button" className="btn btn-secondary"
                  style={{ fontSize: '0.75rem' }}
                  onClick={() =>
                    temaIds.length === temasDeAsignatura.length
                      ? setTemaIds([])
                      : setTemaIds(temasDeAsignatura.map((t: any) => t.id))
                  }
                >
                  {temaIds.length === temasDeAsignatura.length ? 'Desmarcar todos' : 'Seleccionar todos'}
                </button>
              )}
            </div>
            {temasDeAsignatura.length === 0 ? (
              <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem', background: 'var(--surface-2)', borderRadius: 'var(--radius-sm)' }}>
                No hay temas registrados para esta asignatura.
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.625rem' }}>
                {temasDeAsignatura.map((t: any) => {
                  const sel = temaIds.includes(t.id);
                  return (
                    <div key={t.id} onClick={() => toggleTema(t.id)} style={{
                      padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', cursor: 'pointer',
                      border: `1.5px solid ${sel ? 'var(--primary)' : 'var(--border)'}`,
                      background: sel ? 'var(--primary-light)' : 'var(--surface-2)',
                      display: 'flex', alignItems: 'center', gap: '0.75rem',
                      transition: 'all 0.15s ease', userSelect: 'none',
                    }}>
                      <div style={{
                        width: '16px', height: '16px', borderRadius: '4px', flexShrink: 0,
                        border: `2px solid ${sel ? 'var(--primary)' : 'var(--border-strong)'}`,
                        background: sel ? 'var(--primary)' : 'transparent',
                        display: 'grid', placeItems: 'center', transition: 'all 0.15s ease',
                      }}>
                        {sel && (
                          <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
                            <polyline points="2,6 5,9 10,3" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                      <span style={{ fontSize: '0.835rem', fontWeight: '600', color: sel ? 'var(--primary)' : 'var(--text-main)' }}>
                        {t.nombre}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ── 03 CONFIGURACIÓN POR GRADO ────────────────────── */}
        {gradosDeAsignatura.length > 0 && temaIds.length > 0 && gradosDeAsignatura.map((grado, gi) => {
          const cfg = configPorGrado[grado.id!] ?? { numPreguntas: 10, proporciones: DEFAULT_PROPS(), alumnoIds: [] };
          const total = propTotales(grado.id!);
          const totalOk = total === 100;
          const alumnosGrado = alumnosPorGrado[grado.id!] ?? [];
          const todosSeleccionados = alumnosGrado.length > 0 && alumnosGrado.every(a => cfg.alumnoIds.includes(a.id!));

          return (
            <div key={grado.id} className="card" style={{ border: '1.5px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <StepBadge n={`0${gi + 3}`} />
                  <div>
                    <h3>{grado.nombre} {grado.codigo ? `(${grado.codigo})` : ''}</h3>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>
                      {alumnosGrado.length} alumno{alumnosGrado.length !== 1 ? 's' : ''} matriculado{alumnosGrado.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
                <div style={{
                  padding: '0.4rem 0.875rem', borderRadius: '999px',
                  border: `1.5px solid ${totalOk ? 'var(--success)' : total > 100 ? 'var(--danger)' : 'var(--warning)'}`,
                  background: totalOk ? 'var(--success-light)' : total > 100 ? 'var(--danger-light)' : 'var(--warning-light)',
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                }}>
                  <span style={{ fontSize: '1rem', fontWeight: '900', color: totalOk ? 'var(--success)' : total > 100 ? 'var(--danger)' : 'var(--warning)' }}>
                    {total}%
                  </span>
                  <span style={{ fontSize: '0.7rem', fontWeight: '700', color: totalOk ? '#059669' : total > 100 ? '#dc2626' : '#d97706' }}>
                    {totalOk ? '✓ OK' : total > 100 ? 'excedido' : `falta ${100 - total}%`}
                  </span>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: '2rem' }}>
                {/* Nº preguntas */}
                <div>
                  <label>Nº de Preguntas</label>
                  <input
                    type="number" min={1} max={50}
                    value={cfg.numPreguntas}
                    onChange={e => updateConfig(grado.id!, { numPreguntas: Number(e.target.value) })}
                  />
                </div>

                {/* Sliders de dificultad */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                  {([Dificultad.BAJA, Dificultad.MEDIA, Dificultad.ALTA] as Dificultad[]).map(dif => {
                    const dc = DIF_CONFIG[dif];
                    const val = cfg.proporciones[dif];
                    const maxVal = 100 - Object.entries(cfg.proporciones)
                      .filter(([k]) => k !== dif)
                      .reduce((s, [, v]) => s + (v as number), 0);
                    return (
                      <div key={dif} style={{
                        padding: '0.875rem',
                        background: val > 0 ? dc.bg : 'var(--surface-2)',
                        borderRadius: 'var(--radius-sm)',
                        border: `1.5px solid ${val > 0 ? dc.color + '40' : 'var(--border)'}`,
                        transition: 'all 0.2s ease',
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                          <span style={{ fontSize: '0.68rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.06em', color: val > 0 ? dc.accent : 'var(--text-muted)' }}>
                            {dc.label}
                          </span>
                          <span style={{ fontSize: '1.1rem', fontWeight: '900', color: val > 0 ? dc.color : 'var(--text-muted)', letterSpacing: '-0.04em' }}>
                            {val}%
                          </span>
                        </div>
                        <input
                          type="range" min={0} max={maxVal} step={5} value={val}
                          onChange={e => handlePropChange(grado.id!, dif, Number(e.target.value))}
                          style={{ width: '100%', accentColor: dc.color, cursor: 'pointer' }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Lista de alumnos del grado */}
              <div style={{ marginTop: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <label style={{ margin: 0 }}>
                    Alumnos — <span style={{ color: 'var(--primary)', fontWeight: '700' }}>{cfg.alumnoIds.length}</span> seleccionado{cfg.alumnoIds.length !== 1 ? 's' : ''}
                  </label>
                  {alumnosGrado.length > 0 && (
                    <button type="button" className="btn btn-secondary"
                      style={{ fontSize: '0.72rem', padding: '0.25rem 0.75rem' }}
                      onClick={() => toggleTodosGrado(grado.id!)}
                    >
                      {todosSeleccionados ? 'Desmarcar todos' : 'Seleccionar todos'}
                    </button>
                  )}
                </div>

                {alumnosGrado.length === 0 ? (
                  <div style={{ padding: '1rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.82rem', background: 'var(--surface-2)', borderRadius: 'var(--radius-sm)' }}>
                    No hay alumnos matriculados en este grado para esta asignatura.
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '0.5rem', maxHeight: '220px', overflowY: 'auto', padding: '2px' }}>
                    {alumnosGrado.map(al => {
                      const sel = cfg.alumnoIds.includes(al.id!);
                      return (
                        <div key={al.id} onClick={() => toggleAlumno(grado.id!, al.id!)} style={{
                          display: 'flex', alignItems: 'center', gap: '0.75rem',
                          padding: '0.6rem 0.875rem', borderRadius: 'var(--radius-sm)', cursor: 'pointer',
                          border: `1.5px solid ${sel ? 'var(--primary)' : 'var(--border)'}`,
                          background: sel ? 'var(--primary-light)' : 'var(--surface-2)',
                          transition: 'all 0.15s ease', userSelect: 'none',
                        }}>
                          <div style={{
                            width: '16px', height: '16px', borderRadius: '4px', flexShrink: 0,
                            border: `2px solid ${sel ? 'var(--primary)' : 'var(--border-strong)'}`,
                            background: sel ? 'var(--primary)' : 'transparent',
                            display: 'grid', placeItems: 'center',
                          }}>
                            {sel && (
                              <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
                                <polyline points="2,6 5,9 10,3" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            )}
                          </div>
                          <div>
                            <div style={{ fontSize: '0.82rem', fontWeight: '700', color: sel ? 'var(--primary)' : 'var(--text-main)' }}>
                              {al.apellidos}, {al.nombre}
                            </div>
                            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{al.dni}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* ── ACCIONES ──────────────────────────────────────── */}
        {asignaturaId > 0 && (
          <div style={{ display: 'flex', gap: '1rem', paddingTop: '0.25rem' }}>
            <button type="button" className="btn btn-secondary"
              onClick={() => { setFilterGradoId(0); setAsignaturaId(0); setTemaIds([]); setConfigPorGrado({}); setResultado(null); }}
            >
              Reiniciar
            </button>
            <button type="submit" className="btn btn-primary"
              disabled={!canSubmit || mutation.isPending}
              style={{ flex: 1 }}
            >
              {mutation.isPending
                ? 'Generando exámenes personalizados...'
                : !temaIds.length
                  ? 'Seleccione al menos un tema'
                  : !todosOk
                    ? 'Las proporciones de dificultad deben sumar 100%'
                    : totalAlumnosSeleccionados === 0
                      ? 'Seleccione al menos un alumno'
                      : `Generar ${totalAlumnosSeleccionados} examen${totalAlumnosSeleccionados !== 1 ? 'es' : ''} (pendientes de asignación)`}
            </button>
          </div>
        )}
      </form>

      {/* ── RESULTADO ─────────────────────────────────────── */}
      {resultado && (
        <div style={{
          marginTop: '2rem', padding: '2rem',
          background: 'var(--success-light)', border: '1.5px solid var(--success)',
          borderRadius: 'var(--radius)', display: 'flex', alignItems: 'center', gap: '1.5rem',
        }}>
          <div style={{
            width: '48px', height: '48px', background: 'var(--success)', borderRadius: '50%',
            display: 'grid', placeItems: 'center', flexShrink: 0,
            boxShadow: '0 4px 12px rgba(16,185,129,0.3)',
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.875rem', fontWeight: '800', color: '#065f46', marginBottom: '0.25rem' }}>
              Exámenes generados correctamente — pendientes de asignación formal
            </div>
            <div style={{ fontSize: '0.82rem', color: '#047857' }}>{resultado}</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flexShrink: 0 }}>
            <button type="button" className="btn btn-primary"
              onClick={() => navigate(`/corregir-examen?asignaturaId=${asignaturaId}`)}
            >
              Ver exámenes generados
            </button>
            <button type="button" className="btn btn-secondary"
              onClick={() => navigate('/asignar-examen')}
              style={{ fontSize: '0.75rem' }}
            >
              Ir a Asignación
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenerarExamenPage;
