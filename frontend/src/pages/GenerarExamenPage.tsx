import React, { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAsignaturas } from '../services/asignaturaService';
import { getTemas } from '../services/temaService';
import { getGrados } from '../services/gradoService';
import { generarExamen } from '../services/examenService';
import { Dificultad, TipoEvaluacion } from '../types';

const TIPO_LABELS: Record<TipoEvaluacion, string> = {
  [TipoEvaluacion.PARCIAL_1]:       'Parcial 1',
  [TipoEvaluacion.PARCIAL_2]:       'Parcial 2',
  [TipoEvaluacion.PARCIAL_3]:       'Parcial 3',
  [TipoEvaluacion.FINAL]:           'Examen Final',
  [TipoEvaluacion.EXTRAORDINARIO]:  'Extraordinario',
};

const DIF_CONFIG = {
  [Dificultad.BAJA]:  { label: 'Baja',    color: 'var(--success)', bg: 'var(--success-light)',  accent: '#059669' },
  [Dificultad.MEDIA]: { label: 'Media',   color: 'var(--warning)', bg: 'var(--warning-light)',  accent: '#d97706' },
  [Dificultad.ALTA]:  { label: 'Alta',    color: 'var(--danger)',  bg: 'var(--danger-light)',   accent: '#dc2626' },
};

const StepBadge: React.FC<{ n: string }> = ({ n }) => (
  <div style={{
    width: '26px', height: '26px',
    borderRadius: '8px',
    background: 'var(--primary-light)',
    color: 'var(--primary)',
    display: 'grid', placeItems: 'center',
    fontSize: '0.7rem', fontWeight: '900',
    letterSpacing: '-0.02em',
    flexShrink: 0,
  }}>{n}</div>
);

const GenerarExamenPage: React.FC = () => {
  const queryClient = useQueryClient();

  const [gradoId,       setGradoId]       = useState<number>(0);
  const [asignaturaId,  setAsignaturaId]  = useState<number>(0);
  const [temaIds,       setTemaIds]       = useState<number[]>([]);
  const [numPreguntas,  setNumPreguntas]  = useState<number>(10);
  const [tipo,          setTipo]          = useState<TipoEvaluacion>(TipoEvaluacion.PARCIAL_1);
  const [resultado,     setResultado]     = useState<string | null>(null);

  const [proporciones, setProporciones] = useState<Record<Dificultad, number>>({
    [Dificultad.BAJA]:  40,
    [Dificultad.MEDIA]: 40,
    [Dificultad.ALTA]:  20,
  });

  const { data: grados      = [] } = useQuery({ queryKey: ['grados'],              queryFn: getGrados });
  const { data: asignaturas = [] } = useQuery({ queryKey: ['asignaturas'],         queryFn: getAsignaturas });
  const { data: temas       = [] } = useQuery({
    queryKey: ['temas', asignaturaId],
    queryFn: getTemas,
    enabled: asignaturaId > 0,
  });

  const asignaturasDelGrado = useMemo(() =>
    asignaturas.filter(a =>
      gradoId === 0 || a.gradoId === gradoId || (a as any).gradoIds?.includes(gradoId)
    ),
  [asignaturas, gradoId]);

  const temasDeAsignatura = useMemo(() => {
    if (asignaturaId === 0) return [];
    const asig = asignaturas.find(a => a.id === asignaturaId);
    return temas.filter((t: any) => t.asignaturaId === asignaturaId || t.codigoAsignatura === asig?.codigo);
  }, [temas, asignaturaId, asignaturas]);

  const totalPct = proporciones[Dificultad.BAJA] + proporciones[Dificultad.MEDIA] + proporciones[Dificultad.ALTA];
  const totalOk  = totalPct === 100;

  // Limita el slider para que el total nunca supere 100%
  const maxParaDif = (dif: Dificultad) =>
    100 - Object.entries(proporciones)
      .filter(([k]) => k !== dif)
      .reduce((s, [, v]) => s + v, 0);

  const handlePropChange = (dif: Dificultad, raw: number) => {
    const max    = maxParaDif(dif);
    const capped = Math.min(raw, max);
    setProporciones(prev => ({ ...prev, [dif]: capped }));
  };

  const mutation = useMutation({
    mutationFn: generarExamen,
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
    if (!totalOk) return;
    mutation.mutate({
      asignaturaId,
      temaIds,
      numPreguntas,
      tipoEvaluacion: tipo,
      esPersonalizado: false,
      proporcionesDificultad: {
        [Dificultad.BAJA]:  proporciones[Dificultad.BAJA]  / 100,
        [Dificultad.MEDIA]: proporciones[Dificultad.MEDIA] / 100,
        [Dificultad.ALTA]:  proporciones[Dificultad.ALTA]  / 100,
      },
    });
  };

  const toggleTema = (id: number) =>
    setTemaIds(prev => prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]);

  const resetForm = () => {
    setGradoId(0); setAsignaturaId(0); setTemaIds([]);
    setNumPreguntas(10); setTipo(TipoEvaluacion.PARCIAL_1);
    setProporciones({ [Dificultad.BAJA]: 40, [Dificultad.MEDIA]: 40, [Dificultad.ALTA]: 20 });
    setResultado(null);
  };

  const canSubmit = asignaturaId > 0 && temaIds.length > 0 && totalOk && !mutation.isPending;

  return (
    <div className="page-container fade-in">
      <h1>Generar Modelo de Examen</h1>
      <p className="subtitle">Configure los parámetros para la generación aleatoria estratificada por dificultad.</p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

        {/* ── 01 PARÁMETROS GENERALES ─────────────────────── */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <StepBadge n="01" />
            <div>
              <h3>Parámetros Generales</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>
                Seleccione el grado, la asignatura, el tipo de evaluación y el número de preguntas.
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '1.25rem' }}>
            <div>
              <label>Grado Académico</label>
              <select
                value={gradoId}
                onChange={e => { setGradoId(Number(e.target.value)); setAsignaturaId(0); setTemaIds([]); }}
              >
                <option value={0}>Seleccionar...</option>
                {grados.map(g => <option key={g.id} value={g.id}>{g.nombre}</option>)}
              </select>
            </div>
            <div>
              <label>Asignatura</label>
              <select
                value={asignaturaId}
                onChange={e => { setAsignaturaId(Number(e.target.value)); setTemaIds([]); }}
                disabled={!gradoId}
              >
                <option value={0}>Seleccionar...</option>
                {asignaturasDelGrado.map(a => <option key={a.id} value={a.id}>{a.nombre}</option>)}
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
            <div>
              <label>Número de Preguntas</label>
              <input
                type="number"
                min={1} max={50}
                value={numPreguntas}
                onChange={e => setNumPreguntas(Number(e.target.value))}
              />
            </div>
          </div>
        </div>

        {/* ── 02 SELECCIÓN DE TEMAS ───────────────────────── */}
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
                <button
                  type="button"
                  className="btn btn-secondary"
                  style={{ fontSize: '0.75rem !important', padding: '0.35rem 0.875rem !important' }}
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
              <div style={{ padding: '2.5rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem', background: 'var(--surface-2)', borderRadius: 'var(--radius-sm)' }}>
                No hay temas registrados para esta asignatura.
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.625rem' }}>
                {temasDeAsignatura.map((t: any) => {
                  const sel = temaIds.includes(t.id);
                  return (
                    <div
                      key={t.id}
                      onClick={() => toggleTema(t.id)}
                      style={{
                        padding: '0.75rem 1rem',
                        borderRadius: 'var(--radius-sm)',
                        border: `1.5px solid ${sel ? 'var(--primary)' : 'var(--border)'}`,
                        background: sel ? 'var(--primary-light)' : 'var(--surface-2)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        transition: 'all 0.15s ease',
                        userSelect: 'none',
                      }}
                    >
                      <div style={{
                        width: '16px', height: '16px',
                        borderRadius: '4px',
                        border: `2px solid ${sel ? 'var(--primary)' : 'var(--border-strong)'}`,
                        background: sel ? 'var(--primary)' : 'transparent',
                        display: 'grid', placeItems: 'center',
                        flexShrink: 0,
                        transition: 'all 0.15s ease',
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

        {/* ── 03 ESTRATEGIA DE DIFICULTAD ─────────────────── */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <StepBadge n="03" />
              <div>
                <h3>Distribución de Dificultad</h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>
                  Ajuste los porcentajes. El total debe sumar exactamente 100%.
                </p>
              </div>
            </div>
            {/* Indicador de total */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.4rem 0.875rem',
              borderRadius: '999px',
              border: `1.5px solid ${totalOk ? 'var(--success)' : totalPct > 100 ? 'var(--danger)' : 'var(--warning)'}`,
              background: totalOk ? 'var(--success-light)' : totalPct > 100 ? 'var(--danger-light)' : 'var(--warning-light)',
              transition: 'all 0.2s ease',
            }}>
              <span style={{ fontSize: '1rem', fontWeight: '900', color: totalOk ? 'var(--success)' : totalPct > 100 ? 'var(--danger)' : 'var(--warning)' }}>
                {totalPct}%
              </span>
              <span style={{ fontSize: '0.7rem', fontWeight: '700', color: totalOk ? '#059669' : totalPct > 100 ? '#dc2626' : '#d97706' }}>
                {totalOk ? '✓ OK' : totalPct > 100 ? 'excedido' : `falta ${100 - totalPct}%`}
              </span>
            </div>
          </div>

          {/* Barra visual apilada */}
          <div style={{ marginBottom: '1.75rem' }}>
            <div style={{ display: 'flex', height: '12px', borderRadius: '999px', overflow: 'hidden', background: 'var(--surface-3)', gap: '2px' }}>
              {[Dificultad.BAJA, Dificultad.MEDIA, Dificultad.ALTA].map(dif => (
                proporciones[dif] > 0 && (
                  <div
                    key={dif}
                    style={{
                      width: `${proporciones[dif]}%`,
                      background: DIF_CONFIG[dif].color,
                      borderRadius: '999px',
                      transition: 'width 0.2s ease',
                      minWidth: '4px',
                    }}
                  />
                )
              ))}
            </div>
            {/* Leyenda bajo la barra */}
            <div style={{ display: 'flex', gap: '1.25rem', marginTop: '0.625rem' }}>
              {[Dificultad.BAJA, Dificultad.MEDIA, Dificultad.ALTA].map(dif => (
                <div key={dif} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: DIF_CONFIG[dif].color }} />
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: '600' }}>
                    {DIF_CONFIG[dif].label} — {proporciones[dif]}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Sliders */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem' }}>
            {([Dificultad.BAJA, Dificultad.MEDIA, Dificultad.ALTA] as Dificultad[]).map(dif => {
              const cfg = DIF_CONFIG[dif];
              const val = proporciones[dif];
              const maxVal = maxParaDif(dif);
              return (
                <div key={dif} style={{
                  padding: '1.25rem',
                  background: val > 0 ? cfg.bg : 'var(--surface-2)',
                  borderRadius: 'var(--radius-sm)',
                  border: `1.5px solid ${val > 0 ? cfg.color + '40' : 'var(--border)'}`,
                  transition: 'all 0.2s ease',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <span style={{
                      fontSize: '0.72rem', fontWeight: '800',
                      textTransform: 'uppercase', letterSpacing: '0.06em',
                      color: val > 0 ? cfg.accent : 'var(--text-muted)',
                    }}>
                      {cfg.label}
                    </span>
                    <span style={{
                      fontSize: '1.3rem', fontWeight: '900',
                      color: val > 0 ? cfg.color : 'var(--text-muted)',
                      letterSpacing: '-0.04em',
                      lineHeight: 1,
                    }}>
                      {val}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={maxVal}
                    step={5}
                    value={val}
                    onChange={e => handlePropChange(dif, Number(e.target.value))}
                    style={{ width: '100%', accentColor: cfg.color, cursor: 'pointer' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.4rem', fontSize: '0.65rem', color: 'var(--text-placeholder)' }}>
                    <span>0%</span>
                    <span>máx {maxVal}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── ACCIONES ──────────────────────────────────────── */}
        <div style={{ display: 'flex', gap: '1rem', paddingTop: '0.25rem' }}>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={resetForm}
            style={{ padding: '0.8rem 1.5rem !important' }}
          >
            Reiniciar
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!canSubmit}
            style={{ flex: 1, padding: '0.8rem !important', fontSize: '0.875rem !important' }}
          >
            {mutation.isPending
              ? 'Generando modelo...'
              : !asignaturaId
                ? 'Seleccione una asignatura'
                : temaIds.length === 0
                  ? 'Seleccione al menos un tema'
                  : !totalOk
                    ? `Total de dificultad: ${totalPct}% (debe ser 100%)`
                    : 'Generar Modelo de Examen'}
          </button>
        </div>
      </form>

      {/* ── RESULTADO ─────────────────────────────────────── */}
      {resultado && (
        <div style={{
          marginTop: '2rem',
          padding: '2rem',
          background: 'var(--success-light)',
          border: '1.5px solid var(--success)',
          borderRadius: 'var(--radius)',
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
        }}>
          <div style={{
            width: '48px', height: '48px',
            background: 'var(--success)',
            borderRadius: '50%',
            display: 'grid', placeItems: 'center',
            flexShrink: 0,
            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.875rem', fontWeight: '800', color: '#065f46', marginBottom: '0.25rem' }}>
              Examen generado correctamente
            </div>
            <div style={{ fontSize: '0.82rem', color: '#047857' }}>{resultado}</div>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => window.location.href = '/asignar-examen'}
            style={{ flexShrink: 0 }}
          >
            Ir a Asignación
          </button>
        </div>
      )}
    </div>
  );
};

export default GenerarExamenPage;
