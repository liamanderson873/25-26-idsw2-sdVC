import React, { useState, useMemo, useRef } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  corregirExamen, exportarExamen, getExamenes, getEjemplares,
  entregarExamenMasivo, corregirExamenMasivo, getAuditoriaAlumno,
} from '../services/examenService';
import { getGrados }      from '../services/gradoService';
import { getAsignaturas } from '../services/asignaturaService';

/* ── Tipos de estado interno ──────────────────────────────── */
type Vista = 'listado' | 'ia_upload' | 'ia_procesando' | 'manual' | 'exito';

const ESTADO_BADGE: Record<string, { label: string; color: string; bg: string }> = {
  ASIGNADO:              { label: 'Sin entregar',  color: '#64748b', bg: '#f1f5f9' },
  PENDIENTE:             { label: 'Sin entregar',  color: '#64748b', bg: '#f1f5f9' },
  ENTREGADO:             { label: 'Entregado',     color: '#d97706', bg: '#fffbeb' },
  PENDIENTE_CALIFICACION:{ label: 'Entregado',     color: '#d97706', bg: '#fffbeb' },
  REALIZADO:             { label: 'Entregado',     color: '#d97706', bg: '#fffbeb' },
  CORREGIDO:             { label: 'Corregido',     color: '#059669', bg: '#ecfdf5' },
};

const IconUpload = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 16 12 12 8 16"/>
    <line x1="12" y1="12" x2="12" y2="21"/>
    <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>
  </svg>
);

const IconCheck = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const CorregirExamenPage: React.FC = () => {
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  /* ── Estado de selección ──────────────────────────────── */
  const [selGradoId,      setSelGradoId]      = useState<number>(0);
  const [selAsignaturaId, setSelAsignaturaId] = useState<number>(0);
  const [selExamenId,     setSelExamenId]     = useState<number>(0);
  const [selEjemplar,     setSelEjemplar]     = useState<any>(null);

  /* ── Estado de corrección manual ──────────────────────── */
  const [examenData, setExamenData] = useState<any>(null);
  const [marcas,     setMarcas]     = useState<Record<string, number>>({});

  /* ── Descarga de hoja de respuestas ──────────────────── */
  const [descargando, setDescargando] = useState(false);

  const handleDescargarHojas = async () => {
    setDescargando(true);
    try {
      const examenInfo = examenesFiltrados.find(e => e.id === selExamenId);
      const entregados = ejemplares.filter(esEntregado);

      const auditorias = await Promise.all(
        entregados.map(ej => getAuditoriaAlumno(ej.id).then(a => ({ ej, a })).catch(() => null))
      );

      const letras = ['A', 'B', 'C', 'D'];
      const fecha  = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });

      const alumnosHTML = auditorias.map(res => {
        if (!res) return '';
        const { ej, a } = res;
        const filas = a?.marcas && Object.keys(a.marcas).length > 0
          ? Object.entries(a.marcas).map(([, indice], i) => `
              <tr>
                <td style="padding:6px 12px;border:1px solid #e2e8f0;text-align:center;color:#64748b;font-size:13px;">${i + 1}</td>
                <td style="padding:6px 12px;border:1px solid #e2e8f0;text-align:center;">
                  <span style="display:inline-block;width:28px;height:28px;border-radius:50%;background:#0f172a;color:white;font-weight:700;font-size:13px;line-height:28px;">${letras[Number(indice)] ?? '?'}</span>
                </td>
              </tr>`).join('')
          : `<tr><td colspan="2" style="padding:12px;text-align:center;color:#94a3b8;font-size:12px;">Sin respuestas registradas</td></tr>`;

        return `
          <div style="page-break-after:always;padding:32px;font-family:sans-serif;">
            <div style="border:2px solid #0f172a;border-radius:8px;overflow:hidden;">
              <div style="background:#0f172a;padding:16px 24px;display:flex;justify-content:space-between;align-items:center;">
                <div>
                  <div style="color:#a5b4fc;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;">Jorgestor · Hoja de Respuestas</div>
                  <div style="color:white;font-size:18px;font-weight:800;margin-top:4px;">${ej.alumno?.apellidos ?? ''}, ${ej.alumno?.nombre ?? ''}</div>
                </div>
                <div style="text-align:right;">
                  <div style="color:#64748b;font-size:10px;">Clave de corrección</div>
                  <div style="color:#a5b4fc;font-family:monospace;font-size:14px;font-weight:700;">${ej.claveCorreccion}</div>
                </div>
              </div>
              <div style="padding:16px 24px;background:#f8fafc;border-bottom:1px solid #e2e8f0;display:flex;gap:32px;">
                <div><span style="font-size:10px;color:#64748b;text-transform:uppercase;font-weight:700;">Examen</span><br><span style="font-size:13px;font-weight:600;">#${selExamenId} — ${examenInfo?.tipoEvaluacion?.replace(/_/g, ' ') ?? ''}</span></div>
                <div><span style="font-size:10px;color:#64748b;text-transform:uppercase;font-weight:700;">Fecha</span><br><span style="font-size:13px;font-weight:600;">${fecha}</span></div>
                <div><span style="font-size:10px;color:#64748b;text-transform:uppercase;font-weight:700;">Preguntas</span><br><span style="font-size:13px;font-weight:600;">${a?.marcas ? Object.keys(a.marcas).length : 0}</span></div>
              </div>
              <div style="padding:24px;">
                <table style="border-collapse:collapse;width:100%;max-width:240px;margin:0 auto;">
                  <thead>
                    <tr>
                      <th style="padding:6px 12px;border:1px solid #e2e8f0;background:#f1f5f9;font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:0.06em;">Nº</th>
                      <th style="padding:6px 12px;border:1px solid #e2e8f0;background:#f1f5f9;font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:0.06em;">Respuesta</th>
                    </tr>
                  </thead>
                  <tbody>${filas}</tbody>
                </table>
              </div>
            </div>
          </div>`;
      }).join('');

      const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Hojas de Respuesta — Examen #${selExamenId}</title>
  <style>
    @media print { body { margin: 0; } }
    body { margin: 0; background: white; }
  </style>
</head>
<body>${alumnosHTML}</body>
</html>`;

      const win = window.open('', '_blank');
      if (!win) { alert('Permita las ventanas emergentes para generar el PDF.'); return; }
      win.document.write(html);
      win.document.close();
      win.focus();
      setTimeout(() => { win.print(); }, 400);
    } catch {
      alert('Error al generar las hojas de respuesta.');
    } finally {
      setDescargando(false);
    }
  };

  /* ── Estado de la vista ───────────────────────────────── */
  const [vista,       setVista]       = useState<Vista>('listado');
  const [archivoNombre, setArchivoNombre] = useState<string>('');
  const [dragOver,    setDragOver]    = useState(false);

  /* ── Queries ──────────────────────────────────────────── */
  const { data: grados      = [] } = useQuery({ queryKey: ['grados'],      queryFn: getGrados });
  const { data: asignaturas = [] } = useQuery({ queryKey: ['asignaturas'], queryFn: getAsignaturas });
  const { data: examenes    = [] } = useQuery({ queryKey: ['examenes'],    queryFn: getExamenes });
  const { data: ejemplares  = [], isLoading: loadingEjemplares } = useQuery({
    queryKey: ['ejemplares', selExamenId],
    queryFn: () => getEjemplares(selExamenId),
    enabled:  selExamenId > 0,
  });

  /* ── Derivados ────────────────────────────────────────── */
  const asignaturasFiltradas = useMemo(() =>
    asignaturas.filter(a =>
      selGradoId === 0 || a.gradoId === selGradoId || (a as any).gradoIds?.includes(selGradoId)
    ),
  [asignaturas, selGradoId]);

  const examenesFiltrados = useMemo(() =>
    examenes.filter(e => selAsignaturaId === 0 || e.asignatura?.id === selAsignaturaId),
  [examenes, selAsignaturaId]);

  const esPendiente  = (e: any) => e?.estado === 'ASIGNADO' || e?.estado === 'PENDIENTE';
  const esEntregado  = (e: any) => e?.estado === 'ENTREGADO' || e?.estado === 'PENDIENTE_CALIFICACION' || e?.estado === 'REALIZADO';
  const esCorregido  = (e: any) => e?.estado === 'CORREGIDO';

  const hayPendientes   = ejemplares.some(esPendiente);
  const hayEntregados   = ejemplares.some(esEntregado);
  const todosCorregidos = ejemplares.length > 0 && ejemplares.every(esCorregido);

  const stats = {
    total:     ejemplares.length,
    pendiente: ejemplares.filter(esPendiente).length,
    entregado: ejemplares.filter(esEntregado).length,
    corregido: ejemplares.filter(esCorregido).length,
  };

  /* ── Mutaciones ───────────────────────────────────────── */
  const entregarMutation = useMutation({
    mutationFn: () => entregarExamenMasivo(selExamenId),
    onSuccess: (msg) => {
      alert(msg);
      queryClient.invalidateQueries({ queryKey: ['ejemplares', selExamenId] });
    },
    onError: (err: any) => {
      alert('Error al simular entrega: ' + (err.response?.data || err.message || 'Error desconocido'));
    },
  });

  const corregirIAMutation = useMutation({
    mutationFn: () => corregirExamenMasivo(selExamenId),
    onSuccess: (msg) => {
      alert('✓ Corrección completada: ' + msg);
      queryClient.invalidateQueries({ queryKey: ['ejemplares', selExamenId] });
      setVista('listado');
      setArchivoNombre('');
    },
    onError: (err: any) => {
      alert('Error en la corrección: ' + (err.response?.data || err.message));
      setVista('listado');
    },
  });

  const corregirManualMutation = useMutation({
    mutationFn: () => corregirExamen({ claveSHA256: selEjemplar?.claveCorreccion || '', marcas }),
    onSuccess: () => {
      setVista('exito');
      queryClient.invalidateQueries({ queryKey: ['ejemplares', selExamenId] });
    },
  });

  /* ── Handlers ─────────────────────────────────────────── */
  const handleIniciarIA = () => {
    setArchivoNombre('');
    setVista('ia_upload');
  };

  const handleArchivoSeleccionado = (nombre: string) => {
    if (!nombre) return;
    setArchivoNombre(nombre);
  };

  const handleProcesarIA = () => {
    setVista('ia_procesando');
    setTimeout(() => corregirIAMutation.mutate(), 1200);
  };

  const handleSelectAlumno = async (ej: any) => {
    if (!ej) return;
    setSelEjemplar(ej);
    try {
      const data = await exportarExamen(selExamenId);
      setExamenData(data);
      const initialMarcas: Record<string, number> = {};
      if (ej.estado !== 'ASIGNADO' && ej.estado !== 'PENDIENTE') {
        const aud = await getAuditoriaAlumno(ej.id);
        if (aud?.marcas) {
          Object.entries(aud.marcas).forEach(([k, v]) => { initialMarcas[k] = Number(v); });
        }
      }
      (data?.preguntas || []).forEach((p: any, i: number) => {
        const k = p.id?.toString() || i.toString();
        if (initialMarcas[k] === undefined) initialMarcas[k] = -1;
      });
      setMarcas(initialMarcas);
      setVista('manual');
    } catch {
      alert('Error al cargar los datos del alumno.');
    }
  };

  const handleToggleMarca = (pregId: string, idx: number) => {
    setMarcas(prev => ({ ...prev, [pregId]: prev[pregId] === idx ? -1 : idx }));
  };

  const volverAlListado = () => {
    setVista('listado');
    setSelEjemplar(null);
    setExamenData(null);
    setMarcas({});
    setArchivoNombre('');
  };

  /* ═══════════════════════════════════════════════════════ */
  /* ── VISTA: LISTADO ──────────────────────────────────── */
  /* ═══════════════════════════════════════════════════════ */
  if (vista === 'listado') return (
    <div className="page-container fade-in">
      <h1>Gestión de Correcciones</h1>
      <p className="subtitle">Supervise el estado de los exámenes y procese las correcciones mediante IA o de forma manual.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '1.25rem', alignItems: 'start' }}>

        {/* Panel de configuración */}
        <aside>
          <div className="card">
            <h3 style={{ marginBottom: '1.25rem' }}>Selección</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label>Grado</label>
                <select value={selGradoId} onChange={e => { setSelGradoId(Number(e.target.value)); setSelAsignaturaId(0); setSelExamenId(0); }}>
                  <option value={0}>Todos los grados...</option>
                  {grados.map(g => <option key={g.id} value={g.id}>{g.nombre}</option>)}
                </select>
              </div>
              <div>
                <label>Asignatura</label>
                <select value={selAsignaturaId} onChange={e => { setSelAsignaturaId(Number(e.target.value)); setSelExamenId(0); }} disabled={!selGradoId}>
                  <option value={0}>Seleccionar...</option>
                  {asignaturasFiltradas.map(a => <option key={a.id} value={a.id}>{a.nombre}</option>)}
                </select>
              </div>
              <div>
                <label>Modelo de Examen</label>
                <select value={selExamenId} onChange={e => setSelExamenId(Number(e.target.value))} disabled={!selAsignaturaId}>
                  <option value={0}>Seleccionar...</option>
                  {examenesFiltrados.map(ex => (
                    <option key={ex.id} value={ex.id}>
                      #{ex.id} — {ex.tipoEvaluacion?.replace(/_/g, ' ')}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Stats del examen seleccionado */}
            {selExamenId > 0 && stats.total > 0 && (
              <div style={{ marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ fontSize: '0.68rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                  Estado del Examen
                </div>
                {[
                  { label: 'Total alumnos',  val: stats.total,     color: 'var(--text-muted)' },
                  { label: 'Pendientes',     val: stats.pendiente, color: '#64748b' },
                  { label: 'Entregados',     val: stats.entregado, color: '#d97706' },
                  { label: 'Corregidos',     val: stats.corregido, color: '#059669' },
                ].map(({ label, val, color }) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>{label}</span>
                    <span style={{ fontWeight: '700', color }}>{val}</span>
                  </div>
                ))}
                {/* Barra de progreso */}
                <div style={{ height: '6px', borderRadius: '999px', background: 'var(--surface-3)', overflow: 'hidden', marginTop: '0.25rem' }}>
                  <div style={{ height: '100%', width: `${stats.total ? (stats.corregido / stats.total) * 100 : 0}%`, background: 'var(--success)', borderRadius: '999px', transition: 'width 0.3s ease' }} />
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* Panel principal */}
        <section>
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>

            {/* Cabecera del panel */}
            <div style={{ padding: '1.25rem 1.5rem', background: 'var(--surface-2)', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3>Alumnos Asignados</h3>
                {selExamenId === 0 && (
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                    Seleccione un modelo de examen para ver los alumnos.
                  </p>
                )}
              </div>
              <div style={{ display: 'flex', gap: '0.625rem' }}>
                {selExamenId > 0 && hayPendientes && (
                  <button
                    onClick={() => entregarMutation.mutate()}
                    disabled={entregarMutation.isPending}
                    className="btn btn-secondary"
                    style={{ fontSize: '0.775rem !important' }}
                  >
                    {entregarMutation.isPending ? 'Simulando...' : 'Simular entregas'}
                  </button>
                )}
                {selExamenId > 0 && hayEntregados && !hayPendientes && (
                  <button
                    onClick={handleIniciarIA}
                    className="btn btn-primary"
                  >
                    Corregir con IA
                  </button>
                )}
              </div>
            </div>

            {/* Banner informativo cuando todos están corregidos */}
            {todosCorregidos && (
              <div style={{ padding: '0.875rem 1.5rem', background: '#ecfdf5', borderBottom: '1px solid #a7f3d0', display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span style={{ fontSize: '0.8rem', fontWeight: '600', color: '#047857' }}>
                  Todos los exámenes de este modelo han sido corregidos.
                </span>
              </div>
            )}

            {/* Banner cuando hay ENTREGADOS listos para IA */}
            {hayEntregados && !hayPendientes && !todosCorregidos && (
              <div style={{ padding: '0.875rem 1.5rem', background: '#fffbeb', borderBottom: '1px solid #fde68a', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                  </svg>
                  <span style={{ fontSize: '0.8rem', fontWeight: '600', color: '#92400e' }}>
                    {stats.entregado} examen{stats.entregado !== 1 ? 'es' : ''} entregado{stats.entregado !== 1 ? 's' : ''}. Descargue las hojas y súbalas a la IA.
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '0.625rem', flexShrink: 0 }}>
                  <button
                    onClick={handleDescargarHojas}
                    disabled={descargando}
                    style={{ fontSize: '0.75rem', fontWeight: '700', color: '#92400e', background: 'rgba(217,119,6,0.1)', border: '1px solid rgba(217,119,6,0.3)', borderRadius: '6px', padding: '0.3rem 0.75rem', cursor: 'pointer', whiteSpace: 'nowrap' }}
                  >
                    {descargando ? 'Descargando...' : '↓ Descargar hojas'}
                  </button>
                  <button
                    onClick={handleIniciarIA}
                    style={{ fontSize: '0.75rem', fontWeight: '700', color: '#d97706', background: 'transparent', border: 'none', cursor: 'pointer', textDecoration: 'underline', whiteSpace: 'nowrap' }}
                  >
                    Subir a IA →
                  </button>
                </div>
              </div>
            )}

            {/* Tabla de alumnos */}
            <div style={{ maxHeight: '480px', overflowY: 'auto' }}>
              {loadingEjemplares ? (
                <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  Cargando alumnos...
                </div>
              ) : selExamenId === 0 ? (
                <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  Seleccione un grado, asignatura y modelo de examen.
                </div>
              ) : ejemplares.length === 0 ? (
                <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  No hay alumnos asignados a este modelo de examen.
                </div>
              ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: 'var(--surface-2)' }}>
                      {['Estudiante', 'Estado', 'Nota', 'Acción'].map((h, i) => (
                        <th key={h} style={{ padding: '0.75rem 1.25rem', fontSize: '0.62rem', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: i >= 2 ? 'center' : 'left', borderBottom: '1px solid var(--border)' }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {ejemplares.map((ej: any) => {
                      if (!ej) return null;
                      const badge  = ESTADO_BADGE[ej.estado] ?? ESTADO_BADGE['PENDIENTE'];
                      const puedeManual = esEntregado(ej) || esCorregido(ej);
                      return (
                        <tr key={ej.id} style={{ borderBottom: '1px solid var(--surface-3)', transition: 'background 0.12s' }}
                          onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface-2)')}
                          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                        >
                          <td style={{ padding: '0.875rem 1.25rem' }}>
                            <div style={{ fontWeight: '700', fontSize: '0.875rem', color: 'var(--text-main)', marginBottom: '0.15rem' }}>
                              {ej.alumno?.apellidos ?? '—'}, {ej.alumno?.nombre ?? '—'}
                            </div>
                            <code style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{ej.claveCorreccion}</code>
                          </td>
                          <td style={{ padding: '0.875rem 1.25rem' }}>
                            <span style={{ display: 'inline-flex', alignItems: 'center', padding: '0.2rem 0.6rem', borderRadius: '999px', fontSize: '0.65rem', fontWeight: '700', letterSpacing: '0.04em', color: badge.color, background: badge.bg }}>
                              {badge.label}
                            </span>
                          </td>
                          <td style={{ padding: '0.875rem 1.25rem', textAlign: 'center' }}>
                            {ej.notaFinal !== null && ej.notaFinal !== undefined ? (
                              <span style={{ fontWeight: '900', fontSize: '1rem', color: ej.notaFinal >= 5 ? 'var(--success)' : 'var(--danger)' }}>
                                {ej.notaFinal.toFixed(2)}
                              </span>
                            ) : (
                              <span style={{ color: 'var(--text-placeholder)', fontSize: '0.85rem' }}>—</span>
                            )}
                          </td>
                          <td style={{ padding: '0.875rem 1.25rem', textAlign: 'center' }}>
                            <button
                              onClick={() => handleSelectAlumno(ej)}
                              disabled={!puedeManual}
                              className="btn btn-secondary"
                              style={{ fontSize: '0.72rem !important', padding: '0.3rem 0.75rem !important', opacity: puedeManual ? 1 : 0.35 }}
                            >
                              {ej.estado === 'CORREGIDO' ? 'Ver corrección' : 'Manual'}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );

  /* ═══════════════════════════════════════════════════════ */
  /* ── VISTA: IA UPLOAD ─────────────────────────────────── */
  /* ═══════════════════════════════════════════════════════ */
  if (vista === 'ia_upload') return (
    <div className="page-container fade-in">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.25rem' }}>
        <button onClick={volverAlListado} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.8rem', fontWeight: '600', padding: 0 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          Volver
        </button>
        <span style={{ color: 'var(--border)' }}>|</span>
        <h1 style={{ fontSize: '1.2rem' }}>Corrección por Inteligencia Artificial</h1>
      </div>
      <p className="subtitle">Suba el PDF con los exámenes escaneados. La IA procesará y corregirá las respuestas automáticamente.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '1.25rem', alignItems: 'start' }}>

        {/* Zona de subida */}
        <div className="card" style={{ padding: '2.5rem' }}>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            style={{ display: 'none' }}
            onChange={e => handleArchivoSeleccionado(e.target.files?.[0]?.name ?? '')}
          />
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={e => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={e => {
              e.preventDefault();
              setDragOver(false);
              const f = e.dataTransfer.files[0];
              if (f?.type === 'application/pdf') handleArchivoSeleccionado(f.name);
            }}
            style={{
              border: `2px dashed ${dragOver ? 'var(--primary)' : archivoNombre ? 'var(--success)' : 'var(--border-strong)'}`,
              borderRadius: 'var(--radius)',
              padding: '3rem 2rem',
              textAlign: 'center',
              cursor: 'pointer',
              background: dragOver ? 'var(--primary-light)' : archivoNombre ? 'var(--success-light)' : 'var(--surface-2)',
              transition: 'all 0.2s ease',
            }}
          >
            <div style={{ color: archivoNombre ? 'var(--success)' : dragOver ? 'var(--primary)' : 'var(--text-muted)', marginBottom: '1.25rem' }}>
              {archivoNombre ? (
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <polyline points="9 15 12 18 15 15"/>
                  <line x1="12" y1="12" x2="12" y2="18"/>
                </svg>
              ) : <IconUpload />}
            </div>
            {archivoNombre ? (
              <>
                <p style={{ fontWeight: '700', fontSize: '0.95rem', color: 'var(--success)', marginBottom: '0.35rem' }}>
                  {archivoNombre}
                </p>
                <p style={{ fontSize: '0.8rem', color: '#059669' }}>Archivo listo para procesar. Haga clic para cambiar.</p>
              </>
            ) : (
              <>
                <p style={{ fontWeight: '700', fontSize: '0.95rem', color: 'var(--text-main)', marginBottom: '0.35rem' }}>
                  Arrastre el PDF aquí o haga clic para seleccionar
                </p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Suba el PDF de hojas de respuesta de los {stats.entregado} alumno{stats.entregado !== 1 ? 's' : ''} (generado en el paso anterior)
                </p>
              </>
            )}
          </div>

          <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.875rem' }}>
            {/* Opción para demo: saltar la subida de archivo */}
            <button
              onClick={handleProcesarIA}
              className="btn btn-secondary"
              style={{ fontSize: '0.78rem !important' }}
            >
              Simular sin archivo
            </button>
            <div style={{ display: 'flex', gap: '0.875rem' }}>
              {archivoNombre && (
                <button onClick={() => setArchivoNombre('')} className="btn btn-secondary">
                  Quitar archivo
                </button>
              )}
              <button
                onClick={handleProcesarIA}
                disabled={!archivoNombre}
                className="btn btn-primary"
                style={{ opacity: archivoNombre ? 1 : 0.4 }}
              >
                Enviar PDF a IA
              </button>
            </div>
          </div>
        </div>

        {/* Panel informativo */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="card" style={{ padding: '1.25rem' }}>
            <div style={{ fontSize: '0.68rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', marginBottom: '0.875rem' }}>
              Examen seleccionado
            </div>
            <div style={{ fontSize: '0.875rem', fontWeight: '700', color: 'var(--text-main)' }}>
              {examenesFiltrados.find(e => e.id === selExamenId)?.tipoEvaluacion?.replace(/_/g, ' ') ?? `Modelo #${selExamenId}`}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              {stats.entregado} examen{stats.entregado !== 1 ? 'es' : ''} para corregir
            </div>
          </div>

          <div className="card" style={{ padding: '1.25rem' }}>
            <div style={{ fontSize: '0.68rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', marginBottom: '0.875rem' }}>
              Proceso de IA
            </div>
            {[
              { n: '1', text: 'La IA extrae las respuestas marcadas del PDF escaneado' },
              { n: '2', text: 'Compara cada respuesta con la clave de corrección SHA-256' },
              { n: '3', text: 'Calcula la nota y actualiza el acta de cada alumno' },
            ].map(({ n, text }) => (
              <div key={n} style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem', alignItems: 'flex-start' }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'var(--primary-light)', color: 'var(--primary)', display: 'grid', placeItems: 'center', fontSize: '0.65rem', fontWeight: '900', flexShrink: 0 }}>
                  {n}
                </div>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.4, paddingTop: '0.1rem' }}>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  /* ═══════════════════════════════════════════════════════ */
  /* ── VISTA: IA PROCESANDO ─────────────────────────────── */
  /* ═══════════════════════════════════════════════════════ */
  if (vista === 'ia_procesando') return (
    <div className="page-container fade-in" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
      <div style={{ textAlign: 'center', maxWidth: '420px' }}>
        {/* Spinner animado */}
        <div style={{ position: 'relative', width: '80px', height: '80px', margin: '0 auto 2rem' }}>
          <div style={{
            position: 'absolute', inset: 0,
            border: '3px solid var(--surface-3)',
            borderTop: '3px solid var(--primary)',
            borderRadius: '50%',
            animation: 'spin 0.9s linear infinite',
          }} />
          <div style={{
            position: 'absolute', inset: '12px',
            border: '3px solid var(--surface-3)',
            borderBottom: '3px solid var(--success)',
            borderRadius: '50%',
            animation: 'spin 1.4s linear infinite reverse',
          }} />
        </div>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Procesando con IA</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
          Analizando el PDF y corrigiendo {stats.entregado} examen{stats.entregado !== 1 ? 'es' : ''}…
        </p>
        <p style={{ color: 'var(--text-placeholder)', fontSize: '0.78rem' }}>{archivoNombre}</p>
      </div>
    </div>
  );

  /* ═══════════════════════════════════════════════════════ */
  /* ── VISTA: CORRECCIÓN MANUAL ─────────────────────────── */
  /* ═══════════════════════════════════════════════════════ */
  if (vista === 'manual') return (
    <div className="page-container fade-in">
      {/* Cabecera */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button onClick={volverAlListado} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.8rem', fontWeight: '600', padding: 0 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            Volver
          </button>
          <span style={{ color: 'var(--border)' }}>|</span>
          <div>
            <h1 style={{ fontSize: '1.2rem' }}>
              {selEjemplar?.alumno?.apellidos}, {selEjemplar?.alumno?.nombre}
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginTop: '0.15rem' }}>
              {examenData?.nombreAsignatura} &nbsp;·&nbsp; Clave: <code style={{ fontSize: '0.72rem' }}>{selEjemplar?.claveCorreccion}</code>
            </p>
          </div>
        </div>
        <button
          onClick={() => corregirManualMutation.mutate()}
          disabled={corregirManualMutation.isPending}
          className="btn btn-primary"
        >
          {corregirManualMutation.isPending ? 'Guardando...' : 'Guardar corrección'}
        </button>
      </div>

      {/* Cuadrícula de preguntas */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: '1rem' }}>
        {(examenData?.preguntas || []).map((preg: any, idx: number) => {
          const key     = preg.id?.toString() || idx.toString();
          const marcada = marcas[key];
          const correcta = 0; // índice correcto simulado

          return (
            <div key={idx} style={{
              background: 'var(--surface)',
              borderRadius: 'var(--radius)',
              border: `1.5px solid ${marcada !== undefined && marcada !== -1 ? (marcada === correcta ? '#a7f3d0' : '#fecaca') : 'var(--border)'}`,
              overflow: 'hidden',
              transition: 'border-color 0.15s ease',
            }}>
              {/* Header pregunta */}
              <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--surface-3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--surface-2)' }}>
                <span style={{ fontSize: '0.65rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--primary)' }}>
                  Pregunta {idx + 1}
                </span>
                {marcada !== undefined && marcada !== -1 && (
                  <span style={{ fontSize: '0.62rem', fontWeight: '800', color: marcada === correcta ? 'var(--success)' : 'var(--danger)' }}>
                    {marcada === correcta ? '✓ Correcta' : '✗ Incorrecta'}
                  </span>
                )}
              </div>

              {/* Enunciado */}
              <div style={{ padding: '0.875rem 1rem', fontSize: '0.835rem', fontWeight: '500', color: 'var(--text-main)', minHeight: '3.5rem', lineHeight: 1.4 }}>
                {preg.enunciado}
              </div>

              {/* Opciones A B C D */}
              <div style={{ padding: '0.75rem 1rem', display: 'flex', gap: '0.5rem' }}>
                {[0, 1, 2, 3].map(i => {
                  const sel      = marcada === i;
                  const esCorr   = i === correcta;
                  const mostrarCorr = !sel && esCorr && marcada !== -1 && marcada !== undefined;

                  let bg      = 'var(--surface-2)';
                  let color   = 'var(--text-secondary)';
                  let border  = 'var(--border)';

                  if (sel) {
                    bg     = esCorr ? 'var(--success)'      : 'var(--danger)';
                    color  = 'white';
                    border = esCorr ? 'var(--success)'      : 'var(--danger)';
                  } else if (mostrarCorr) {
                    bg     = 'var(--success-light)';
                    color  = 'var(--success)';
                    border = 'var(--success)';
                  }

                  return (
                    <button
                      key={i}
                      onClick={() => handleToggleMarca(key, i)}
                      style={{
                        flex: 1,
                        height: '36px',
                        borderRadius: '8px',
                        border: `1.5px solid ${border}`,
                        background: bg,
                        color,
                        fontWeight: '800',
                        fontSize: '0.8rem',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      {String.fromCharCode(65 + i)}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer de acción */}
      <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
        <button onClick={volverAlListado} className="btn btn-secondary">Cancelar</button>
        <button
          onClick={() => corregirManualMutation.mutate()}
          disabled={corregirManualMutation.isPending}
          className="btn btn-primary"
        >
          {corregirManualMutation.isPending ? 'Guardando...' : 'Guardar corrección'}
        </button>
      </div>
    </div>
  );

  /* ═══════════════════════════════════════════════════════ */
  /* ── VISTA: ÉXITO ─────────────────────────────────────── */
  /* ═══════════════════════════════════════════════════════ */
  return (
    <div className="page-container fade-in" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
      <div style={{ textAlign: 'center', maxWidth: '380px' }}>
        <div style={{ width: '64px', height: '64px', background: 'var(--success)', borderRadius: '50%', display: 'grid', placeItems: 'center', margin: '0 auto 1.5rem', boxShadow: '0 8px 20px rgba(16,185,129,0.3)' }}>
          <IconCheck />
        </div>
        <h2 style={{ fontSize: '1.35rem', marginBottom: '0.5rem' }}>Calificación registrada</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '2rem' }}>
          La corrección de {selEjemplar?.alumno?.nombre} {selEjemplar?.alumno?.apellidos} ha sido guardada correctamente.
        </p>
        <button onClick={volverAlListado} className="btn btn-primary">
          Volver al listado
        </button>
      </div>
    </div>
  );
};

export default CorregirExamenPage;
