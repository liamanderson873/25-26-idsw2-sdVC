import React, { useState, useRef } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import {
  corregirExamen, getRevisionEjemplar,
  getGruposExamen, getEjemplaresDeGrupo, entregarGrupo, corregirGrupoIA, asignarGrupo,
} from '../services/examenService';

type Vista = 'grupos' | 'detalle' | 'ia_upload' | 'ia_procesando' | 'manual' | 'exito';

const ESTADO_BADGE: Record<string, { label: string; color: string; bg: string }> = {
  PENDIENTE:              { label: 'Sin asignar',  color: '#7c3aed', bg: '#ede9fe' },
  ASIGNADO:               { label: 'Sin entregar', color: '#64748b', bg: '#f1f5f9' },
  PENDIENTE_CALIFICACION: { label: 'Entregado',    color: '#d97706', bg: '#fffbeb' },
  CORREGIDO:              { label: 'Corregido',    color: '#059669', bg: '#ecfdf5' },
};

const LETRAS = ['A', 'B', 'C', 'D'];

const IconCheck = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const CorregirExamenPage: React.FC = () => {
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [searchParams] = useSearchParams();
  const filtroAsignaturaId = searchParams.get('asignaturaId') ? Number(searchParams.get('asignaturaId')) : null;

  const [vista, setVista] = useState<Vista>('grupos');
  const [selGrupo, setSelGrupo] = useState<any>(null);
  const [selEjemplar, setSelEjemplar] = useState<any>(null);
  const [revisionData, setRevisionData] = useState<any>(null);
  const [marcas, setMarcas] = useState<Record<string, number>>({});
  const [archivoNombre, setArchivoNombre] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const [descargando, setDescargando] = useState(false);
  const [modoLectura, setModoLectura] = useState(false);

  /* ── Queries ─────────────────────────────────────────── */
  const { data: grupos = [], isLoading: loadingGrupos } = useQuery({
    queryKey: ['grupos-examenes'],
    queryFn: getGruposExamen,
  });

  const { data: ejemplares = [], isLoading: loadingEjemplares } = useQuery({
    queryKey: ['ejemplares-grupo', selGrupo?.asignaturaId, selGrupo?.tipoEvaluacion, selGrupo?.fechaExamen],
    queryFn: () => getEjemplaresDeGrupo({
      asignaturaId: selGrupo.asignaturaId,
      tipoEvaluacion: selGrupo.tipoEvaluacion,
      fechaExamen: selGrupo.fechaExamen,
    }),
    enabled: !!selGrupo,
  });

  /* ── Derivados ───────────────────────────────────────── */
  const esSinAsignar = (e: any) => e?.estado === 'PENDIENTE';
  const esAsignado   = (e: any) => e?.estado === 'ASIGNADO';
  const esEntregado  = (e: any) => e?.estado === 'PENDIENTE_CALIFICACION';
  const esCorregido  = (e: any) => e?.estado === 'CORREGIDO';
  const tieneClave   = (e: any) => e?.claveCorreccion != null;

  const haySinAsignar  = ejemplares.some(esSinAsignar);
  const hayAsignados   = ejemplares.some(esAsignado);
  const hayEntregados  = ejemplares.some(esEntregado);
  const todosCorregidos = ejemplares.length > 0 && ejemplares.every(esCorregido);

  const stats = {
    total:      ejemplares.length,
    sinAsignar: ejemplares.filter(esSinAsignar).length,
    asignado:   ejemplares.filter(esAsignado).length,
    entregado:  ejemplares.filter(esEntregado).length,
    corregido:  ejemplares.filter(esCorregido).length,
  };

  const grupoKey = selGrupo ? [selGrupo.asignaturaId, selGrupo.tipoEvaluacion, selGrupo.fechaExamen] : null;

  /* ── Mutaciones ──────────────────────────────────────── */
  const entregarMutation = useMutation({
    mutationFn: () => entregarGrupo({ asignaturaId: selGrupo.asignaturaId, tipoEvaluacion: selGrupo.tipoEvaluacion, fechaExamen: selGrupo.fechaExamen }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['grupos-examenes'] });
      queryClient.invalidateQueries({ queryKey: ['ejemplares-grupo', ...grupoKey!] });
      queryClient.invalidateQueries({ queryKey: ['conteos-alumnos'] });
      queryClient.invalidateQueries({ queryKey: ['conteos-asignaturas'] });
    },
    onError: (err: any) => alert('Error: ' + (err.response?.data || err.message)),
  });

  const corregirIAMutation = useMutation({
    mutationFn: () => corregirGrupoIA({ asignaturaId: selGrupo.asignaturaId, tipoEvaluacion: selGrupo.tipoEvaluacion, fechaExamen: selGrupo.fechaExamen }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['grupos-examenes'] });
      queryClient.invalidateQueries({ queryKey: ['ejemplares-grupo', ...grupoKey!] });
      queryClient.invalidateQueries({ queryKey: ['conteos-alumnos'] });
      queryClient.invalidateQueries({ queryKey: ['conteos-asignaturas'] });
      setVista('detalle');
      setArchivoNombre('');
    },
    onError: (err: any) => { alert('Error: ' + (err.response?.data || err.message)); setVista('detalle'); },
  });

  const asignarMutation = useMutation({
    mutationFn: () => asignarGrupo({ asignaturaId: selGrupo.asignaturaId, tipoEvaluacion: selGrupo.tipoEvaluacion, fechaExamen: selGrupo.fechaExamen }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['grupos-examenes'] });
      queryClient.invalidateQueries({ queryKey: ['ejemplares-grupo', ...grupoKey!] });
    },
    onError: (err: any) => alert('Error: ' + (err.response?.data || err.message)),
  });

  const corregirManualMutation = useMutation({
    mutationFn: () => corregirExamen({ claveSHA256: selEjemplar?.claveCorreccion || '', marcas }),
    onSuccess: () => {
      setVista('exito');
      queryClient.invalidateQueries({ queryKey: ['grupos-examenes'] });
      queryClient.invalidateQueries({ queryKey: ['ejemplares-grupo', ...grupoKey!] });
      queryClient.invalidateQueries({ queryKey: ['conteos-alumnos'] });
      queryClient.invalidateQueries({ queryKey: ['conteos-asignaturas'] });
    },
  });

  /* ── Handlers ────────────────────────────────────────── */
  const handleSelectGrupo = (g: any) => {
    setSelGrupo(g);
    setVista('detalle');
  };

  const handleSelectAlumno = async (ej: any, soloVer = false) => {
    setSelEjemplar(ej);
    setModoLectura(soloVer);
    try {
      const data = await getRevisionEjemplar(ej.id);
      setRevisionData(data);
      const initialMarcas: Record<string, number> = {};
      (data?.preguntas || []).forEach((p: any) => {
        initialMarcas[p.preguntaId.toString()] = p.indiceMarcado ?? -1;
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

  const volverAlDetalle = () => {
    setVista('detalle');
    setSelEjemplar(null);
    setRevisionData(null);
    setMarcas({});
    setArchivoNombre('');
    setModoLectura(false);
  };

  const volverAGrupos = () => {
    setVista('grupos');
    setSelGrupo(null);
    setSelEjemplar(null);
    setRevisionData(null);
    setMarcas({});
  };

  const handleDescargarHojas = async () => {
    const conClave = ejemplares.filter(tieneClave);
    if (conClave.length === 0) return;
    setDescargando(true);
    try {
      const revisiones = await Promise.all(
        conClave.map((ej: any) =>
          getRevisionEjemplar(ej.id)
            .then(r => ({ ej, r }))
            .catch(() => null)
        )
      );

      const paginasHTML = revisiones.map(res => {
        if (!res) return '';
        const { ej, r } = res;
        const preguntas: any[] = r?.preguntas || [];

        const filasPreguntas = preguntas.map((p: any, idx: number) => {
          const opciones = (p.respuestas || []).map((resp: any) => {
            const marcada = p.indiceMarcado === resp.indice;
            const letra = LETRAS[resp.indice] ?? resp.indice;
            return `<span style="
              display:inline-flex;align-items:center;justify-content:center;
              width:26px;height:26px;border-radius:50%;margin-right:8px;
              border:2px solid #0f172a;
              background:${marcada ? '#0f172a' : 'white'};
              color:${marcada ? 'white' : '#0f172a'};
              font-weight:800;font-size:12px;font-family:sans-serif;
            ">${letra}</span>`;
          }).join('');

          return `
            <tr style="border-bottom:1px solid #e2e8f0;">
              <td style="padding:8px 12px;font-size:12px;color:#475569;font-weight:700;white-space:nowrap;vertical-align:top;">${idx + 1}.</td>
              <td style="padding:8px 12px;font-size:12px;color:#1e293b;line-height:1.4;vertical-align:top;">${p.enunciado}</td>
              <td style="padding:8px 12px;white-space:nowrap;vertical-align:middle;">${opciones}</td>
            </tr>`;
        }).join('');

        return `
          <div style="page-break-after:always;padding:28px 36px;font-family:sans-serif;max-width:800px;margin:0 auto;">
            <div style="border:2px solid #0f172a;border-radius:10px;overflow:hidden;margin-bottom:0;">
              <div style="background:#0f172a;padding:14px 22px;display:flex;justify-content:space-between;align-items:center;">
                <div>
                  <div style="color:#a5b4fc;font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;">Jorgestor · Hoja de Respuestas</div>
                  <div style="color:white;font-size:17px;font-weight:800;margin-top:3px;">${ej.alumnoApellidos ?? ''}, ${ej.alumnoNombre ?? ''}</div>
                  <div style="color:#94a3b8;font-size:11px;margin-top:2px;">${ej.alumnoDni ?? ''}</div>
                </div>
                <div style="text-align:right;">
                  <div style="color:#64748b;font-size:9px;text-transform:uppercase;font-weight:700;">Clave SHA</div>
                  <div style="color:#a5b4fc;font-family:monospace;font-size:13px;font-weight:700;">${ej.claveCorreccion ?? ''}</div>
                  <div style="color:#64748b;font-size:10px;margin-top:4px;">${selGrupo?.asignaturaNombre} · ${selGrupo?.tipoEvaluacion?.replace(/_/g,' ')} · ${selGrupo?.fechaExamen}</div>
                </div>
              </div>
              <div style="padding:0;">
                <table style="border-collapse:collapse;width:100%;">
                  <thead>
                    <tr style="background:#f8fafc;border-bottom:2px solid #e2e8f0;">
                      <th style="padding:8px 12px;font-size:10px;color:#64748b;text-transform:uppercase;letter-spacing:0.06em;text-align:left;width:30px;">#</th>
                      <th style="padding:8px 12px;font-size:10px;color:#64748b;text-transform:uppercase;letter-spacing:0.06em;text-align:left;">Pregunta</th>
                      <th style="padding:8px 12px;font-size:10px;color:#64748b;text-transform:uppercase;letter-spacing:0.06em;text-align:left;">Respuesta</th>
                    </tr>
                  </thead>
                  <tbody>${filasPreguntas}</tbody>
                </table>
                ${preguntas.length === 0 ? '<p style="padding:24px;text-align:center;color:#94a3b8;font-size:12px;">Sin preguntas asignadas.</p>' : ''}
              </div>
            </div>
          </div>`;
      }).join('');

      const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Hojas de Respuesta — ${selGrupo?.asignaturaNombre} ${selGrupo?.tipoEvaluacion}</title>
  <style>@media print { body { margin:0; } } body { margin:0; background:white; }</style>
</head>
<body>${paginasHTML}</body>
</html>`;

      const win = window.open('', '_blank');
      if (!win) { alert('Permita las ventanas emergentes para generar el PDF.'); return; }
      win.document.write(html);
      win.document.close();
      win.focus();
      setTimeout(() => win.print(), 400);
    } catch {
      alert('Error al generar las hojas de respuesta.');
    } finally {
      setDescargando(false);
    }
  };

  /* ═══════════════════════════════════════════════════════════ */
  /* ── VISTA: LISTA DE GRUPOS ────────────────────────────── */
  /* ═══════════════════════════════════════════════════════════ */
  if (vista === 'grupos') {
    const gruposFiltrados = filtroAsignaturaId
      ? grupos.filter((g: any) => g.asignaturaId === filtroAsignaturaId)
      : grupos;
    const gruposEnProgreso = gruposFiltrados.filter((g: any) =>
      g.totalAlumnos === 0 || g.corregidos < g.totalAlumnos
    );
    const gruposCompletados = gruposFiltrados.filter((g: any) =>
      g.totalAlumnos > 0 && g.corregidos === g.totalAlumnos
    );

    const colHeaders = ['Asignatura', 'Tipo', 'Fecha', 'Alumnos', 'Sin asignar', 'Asignados', 'Entregados', 'Corregidos', ''];

    const GrupoFila = ({ g }: { g: any }) => (
      <tr
        style={{ borderBottom: '1px solid var(--surface-3)', cursor: 'pointer', transition: 'background 0.12s' }}
        onClick={() => handleSelectGrupo(g)}
        onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface-2)')}
        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
      >
        <td style={{ padding: '0.875rem 1.25rem', fontWeight: '700', fontSize: '0.875rem', color: 'var(--text-main)' }}>{g.asignaturaNombre}</td>
        <td style={{ padding: '0.875rem 1.25rem', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{g.tipoEvaluacion?.replace(/_/g, ' ')}</td>
        <td style={{ padding: '0.875rem 1.25rem', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{g.fechaExamen}</td>
        <td style={{ padding: '0.875rem 1.25rem', textAlign: 'center', fontWeight: '700' }}>{g.totalAlumnos}</td>
        <td style={{ padding: '0.875rem 1.25rem', textAlign: 'center', fontWeight: '700', color: g.pendientes > 0 ? '#7c3aed' : 'var(--text-placeholder)' }}>{g.pendientes}</td>
        <td style={{ padding: '0.875rem 1.25rem', textAlign: 'center', fontWeight: '700', color: g.asignados > 0 ? '#64748b' : 'var(--text-placeholder)' }}>{g.asignados}</td>
        <td style={{ padding: '0.875rem 1.25rem', textAlign: 'center', fontWeight: '700', color: g.entregados > 0 ? '#d97706' : 'var(--text-placeholder)' }}>{g.entregados}</td>
        <td style={{ padding: '0.875rem 1.25rem', textAlign: 'center', fontWeight: '700', color: g.corregidos > 0 ? '#059669' : 'var(--text-placeholder)' }}>{g.corregidos}</td>
        <td style={{ padding: '0.875rem 1.25rem', textAlign: 'center' }}>
          <span style={{ fontSize: '0.72rem', color: 'var(--primary)', fontWeight: '700' }}>Ver →</span>
        </td>
      </tr>
    );

    return (
      <div className="page-container fade-in">
        <h1>Gestión de Correcciones</h1>
        <p className="subtitle">
          {filtroAsignaturaId
            ? `Mostrando exámenes de la asignatura seleccionada. `
            : 'Seleccione un grupo de exámenes para gestionar su corrección.'}
        </p>

        {loadingGrupos ? (
          <div className="card" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>Cargando...</div>
        ) : gruposFiltrados.length === 0 ? (
          <div className="card" style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            {filtroAsignaturaId
              ? 'Esta asignatura no tiene exámenes todavía. Genera y asigna exámenes primero.'
              : 'No hay exámenes asignados todavía. Genera y asigna exámenes primero.'}
          </div>
        ) : (
          <>
            {/* ── Grupos en progreso ── */}
            <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: '1.25rem' }}>
              <div style={{ padding: '1rem 1.5rem', background: 'var(--surface-2)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <h3>En progreso</h3>
                {gruposEnProgreso.length > 0 && (
                  <span style={{ fontSize: '0.65rem', fontWeight: '800', background: 'var(--primary-light)', color: 'var(--primary)', padding: '0.2rem 0.6rem', borderRadius: '999px' }}>
                    {gruposEnProgreso.length}
                  </span>
                )}
              </div>
              {gruposEnProgreso.length === 0 ? (
                <div style={{ padding: '2.5rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  Todos los grupos están completamente corregidos.
                </div>
              ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: 'var(--surface-2)' }}>
                      {colHeaders.map((h, i) => (
                        <th key={h + i} style={{ padding: '0.75rem 1.25rem', fontSize: '0.62rem', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: i >= 3 ? 'center' : 'left', borderBottom: '1px solid var(--border)' }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {gruposEnProgreso.map((g: any, idx: number) => <GrupoFila key={idx} g={g} />)}
                  </tbody>
                </table>
              )}
            </div>

            {/* ── Grupos completados ── */}
            {gruposCompletados.length > 0 && (
              <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ padding: '1rem 1.5rem', background: 'var(--surface-2)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <h3 style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Completados</h3>
                  <span style={{ fontSize: '0.65rem', fontWeight: '800', background: '#ecfdf5', color: '#059669', padding: '0.2rem 0.6rem', borderRadius: '999px' }}>
                    {gruposCompletados.length}
                  </span>
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: 'var(--surface-2)' }}>
                      {['Asignatura', 'Tipo', 'Fecha', 'Alumnos', 'Corregidos', ''].map((h, i) => (
                        <th key={h + i} style={{ padding: '0.75rem 1.25rem', fontSize: '0.62rem', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: i >= 3 ? 'center' : 'left', borderBottom: '1px solid var(--border)' }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {gruposCompletados.map((g: any, idx: number) => (
                      <tr key={idx}
                        style={{ borderBottom: '1px solid var(--surface-3)', cursor: 'pointer', transition: 'background 0.12s' }}
                        onClick={() => handleSelectGrupo(g)}
                        onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface-2)')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                      >
                        <td style={{ padding: '0.875rem 1.25rem', fontWeight: '700', fontSize: '0.875rem', color: 'var(--text-main)' }}>{g.asignaturaNombre}</td>
                        <td style={{ padding: '0.875rem 1.25rem', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{g.tipoEvaluacion?.replace(/_/g, ' ')}</td>
                        <td style={{ padding: '0.875rem 1.25rem', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{g.fechaExamen}</td>
                        <td style={{ padding: '0.875rem 1.25rem', textAlign: 'center', fontWeight: '700' }}>{g.totalAlumnos}</td>
                        <td style={{ padding: '0.875rem 1.25rem', textAlign: 'center', fontWeight: '700', color: '#059669' }}>{g.corregidos}</td>
                        <td style={{ padding: '0.875rem 1.25rem', textAlign: 'center' }}>
                          <span style={{ fontSize: '0.65rem', fontWeight: '800', color: '#059669', background: '#ecfdf5', padding: '0.2rem 0.6rem', borderRadius: '999px' }}>Completado ✓</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    );
  }

  /* ═══════════════════════════════════════════════════════════ */
  /* ── VISTA: DETALLE DE GRUPO ────────────────────────────── */
  /* ═══════════════════════════════════════════════════════════ */
  if (vista === 'detalle') return (
    <div className="page-container fade-in">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.25rem' }}>
        <button onClick={volverAGrupos} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.8rem', fontWeight: '600', padding: 0 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          Grupos
        </button>
        <span style={{ color: 'var(--border)' }}>|</span>
        <div>
          <h1 style={{ fontSize: '1.2rem' }}>{selGrupo?.asignaturaNombre}</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginTop: '0.1rem' }}>
            {selGrupo?.tipoEvaluacion?.replace(/_/g, ' ')} · {selGrupo?.fechaExamen}
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '1.25rem', alignItems: 'start', marginTop: '1.5rem' }}>
        {/* Panel estadísticas */}
        <div className="card">
          <div style={{ fontSize: '0.68rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', marginBottom: '1rem' }}>Estado del grupo</div>
          {[
            { label: 'Total alumnos', val: stats.total,      color: 'var(--text-main)' },
            { label: 'Sin asignar',   val: stats.sinAsignar, color: '#7c3aed' },
            { label: 'Asignados',     val: stats.asignado,   color: '#64748b' },
            { label: 'Entregados',    val: stats.entregado,  color: '#d97706' },
            { label: 'Corregidos',    val: stats.corregido,  color: '#059669' },
          ].map(({ label, val, color }) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.5rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>{label}</span>
              <span style={{ fontWeight: '700', color }}>{val}</span>
            </div>
          ))}
          <div style={{ height: '6px', borderRadius: '999px', background: 'var(--surface-3)', overflow: 'hidden', marginTop: '0.75rem' }}>
            <div style={{ height: '100%', width: `${stats.total ? (stats.corregido / stats.total) * 100 : 0}%`, background: 'var(--success)', borderRadius: '999px', transition: 'width 0.3s ease' }} />
          </div>
        </div>

        {/* Panel principal */}
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '1rem 1.5rem', background: 'var(--surface-2)', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3>Alumnos del grupo</h3>
            <div style={{ display: 'flex', gap: '0.625rem' }}>
              {haySinAsignar && (
                <button onClick={() => asignarMutation.mutate()} disabled={asignarMutation.isPending} className="btn btn-secondary" style={{ fontSize: '0.775rem', color: '#7c3aed', borderColor: '#7c3aed' }}>
                  {asignarMutation.isPending ? 'Asignando...' : 'Asignar y generar claves'}
                </button>
              )}
              {ejemplares.some(tieneClave) && (
                <button
                  onClick={handleDescargarHojas}
                  disabled={descargando}
                  className="btn btn-secondary"
                  style={{ fontSize: '0.775rem' }}
                >
                  {descargando ? 'Generando...' : '↓ Hojas de respuesta'}
                </button>
              )}
              {hayAsignados && (
                <button onClick={() => entregarMutation.mutate()} disabled={entregarMutation.isPending} className="btn btn-secondary" style={{ fontSize: '0.775rem' }}>
                  {entregarMutation.isPending ? 'Simulando...' : 'Simular entregas'}
                </button>
              )}
              {hayEntregados && (
                <button onClick={() => setVista('ia_upload')} className="btn btn-primary">
                  Corregir con IA
                </button>
              )}
            </div>
          </div>

          {todosCorregidos && (
            <div style={{ padding: '0.875rem 1.5rem', background: '#ecfdf5', borderBottom: '1px solid #a7f3d0', display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              <span style={{ fontSize: '0.8rem', fontWeight: '600', color: '#047857' }}>Todos los exámenes de este grupo han sido corregidos.</span>
            </div>
          )}

          <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
            {loadingEjemplares ? (
              <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>Cargando alumnos...</div>
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
                    const badge = ESTADO_BADGE[ej.estado] ?? ESTADO_BADGE['ASIGNADO'];
                    const puedeManual = esEntregado(ej) || esCorregido(ej);
                    const puedeVer = esSinAsignar(ej) || esAsignado(ej);
                    return (
                      <tr key={ej.id} style={{ borderBottom: '1px solid var(--surface-3)', transition: 'background 0.12s' }}
                        onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface-2)')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                      >
                        <td style={{ padding: '0.875rem 1.25rem' }}>
                          <div style={{ fontWeight: '700', fontSize: '0.875rem', color: 'var(--text-main)', marginBottom: '0.15rem' }}>
                            {ej.alumnoApellidos ?? '—'}, {ej.alumnoNombre ?? '—'}
                          </div>
                          <code style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{ej.claveCorreccion}</code>
                        </td>
                        <td style={{ padding: '0.875rem 1.25rem' }}>
                          <span style={{ display: 'inline-flex', alignItems: 'center', padding: '0.2rem 0.6rem', borderRadius: '999px', fontSize: '0.65rem', fontWeight: '700', letterSpacing: '0.04em', color: badge.color, background: badge.bg }}>
                            {badge.label}
                          </span>
                        </td>
                        <td style={{ padding: '0.875rem 1.25rem', textAlign: 'center' }}>
                          {ej.notaFinal != null ? (
                            <span style={{ fontWeight: '900', fontSize: '1rem', color: ej.notaFinal >= 5 ? 'var(--success)' : 'var(--danger)' }}>
                              {ej.notaFinal.toFixed(2)}
                            </span>
                          ) : <span style={{ color: 'var(--text-placeholder)', fontSize: '0.85rem' }}>—</span>}
                        </td>
                        <td style={{ padding: '0.875rem 1.25rem', textAlign: 'center' }}>
                          {puedeManual && (
                            <button
                              onClick={() => handleSelectAlumno(ej, false)}
                              className="btn btn-secondary"
                              style={{ fontSize: '0.72rem', padding: '0.3rem 0.75rem' }}
                            >
                              {esCorregido(ej) ? 'Ver / Editar' : 'Manual'}
                            </button>
                          )}
                          {puedeVer && (
                            <button
                              onClick={() => handleSelectAlumno(ej, true)}
                              className="btn btn-secondary"
                              style={{ fontSize: '0.72rem', padding: '0.3rem 0.75rem' }}
                            >
                              Ver examen
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  /* ═══════════════════════════════════════════════════════════ */
  /* ── VISTA: IA UPLOAD ───────────────────────────────────── */
  /* ═══════════════════════════════════════════════════════════ */
  if (vista === 'ia_upload') return (
    <div className="page-container fade-in">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.25rem' }}>
        <button onClick={volverAlDetalle} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.8rem', fontWeight: '600', padding: 0 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          Volver
        </button>
        <span style={{ color: 'var(--border)' }}>|</span>
        <h1 style={{ fontSize: '1.2rem' }}>Corrección por Inteligencia Artificial</h1>
      </div>
      <p className="subtitle">La IA leerá las hojas de respuesta escaneadas y corregirá los {stats.entregado} exámenes entregados.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '1.25rem', alignItems: 'start' }}>
        <div className="card" style={{ padding: '2.5rem' }}>
          <input ref={fileInputRef} type="file" accept=".pdf" style={{ display: 'none' }}
            onChange={e => setArchivoNombre(e.target.files?.[0]?.name ?? '')} />
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={e => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={e => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files[0]; if (f?.type === 'application/pdf') setArchivoNombre(f.name); }}
            style={{ border: `2px dashed ${dragOver ? 'var(--primary)' : archivoNombre ? 'var(--success)' : 'var(--border-strong)'}`, borderRadius: 'var(--radius)', padding: '3rem 2rem', textAlign: 'center', cursor: 'pointer', background: dragOver ? 'var(--primary-light)' : archivoNombre ? 'var(--success-light)' : 'var(--surface-2)', transition: 'all 0.2s ease' }}
          >
            <p style={{ fontWeight: '700', fontSize: '0.95rem', color: archivoNombre ? 'var(--success)' : 'var(--text-main)', marginBottom: '0.35rem' }}>
              {archivoNombre || 'Arrastre el PDF aquí o haga clic para seleccionar'}
            </p>
            {!archivoNombre && <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>PDF con las hojas de respuesta escaneadas</p>}
          </div>
          <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between' }}>
            <button onClick={() => { setVista('ia_procesando'); setTimeout(() => corregirIAMutation.mutate(), 1200); }} className="btn btn-secondary" style={{ fontSize: '0.78rem' }}>
              Simular sin archivo
            </button>
            <button onClick={() => { setVista('ia_procesando'); setTimeout(() => corregirIAMutation.mutate(), 1200); }} disabled={!archivoNombre} className="btn btn-primary" style={{ opacity: archivoNombre ? 1 : 0.4 }}>
              Enviar PDF a IA
            </button>
          </div>
        </div>

        <div className="card" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.68rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', marginBottom: '0.875rem' }}>Grupo seleccionado</div>
          <div style={{ fontWeight: '700', fontSize: '0.9rem', color: 'var(--text-main)' }}>{selGrupo?.asignaturaNombre}</div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{selGrupo?.tipoEvaluacion?.replace(/_/g, ' ')} · {selGrupo?.fechaExamen}</div>
          <div style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: '#d97706', fontWeight: '700' }}>{stats.entregado} examen{stats.entregado !== 1 ? 'es' : ''} para corregir</div>
        </div>
      </div>
    </div>
  );

  /* ═══════════════════════════════════════════════════════════ */
  /* ── VISTA: IA PROCESANDO ───────────────────────────────── */
  /* ═══════════════════════════════════════════════════════════ */
  if (vista === 'ia_procesando') return (
    <div className="page-container fade-in" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
      <div style={{ textAlign: 'center', maxWidth: '420px' }}>
        <div style={{ position: 'relative', width: '80px', height: '80px', margin: '0 auto 2rem' }}>
          <div style={{ position: 'absolute', inset: 0, border: '3px solid var(--surface-3)', borderTop: '3px solid var(--primary)', borderRadius: '50%', animation: 'spin 0.9s linear infinite' }} />
          <div style={{ position: 'absolute', inset: '12px', border: '3px solid var(--surface-3)', borderBottom: '3px solid var(--success)', borderRadius: '50%', animation: 'spin 1.4s linear infinite reverse' }} />
        </div>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Procesando con IA</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
          Corrigiendo {stats.entregado} examen{stats.entregado !== 1 ? 'es' : ''} de {selGrupo?.asignaturaNombre}…
        </p>
      </div>
    </div>
  );

  /* ═══════════════════════════════════════════════════════════ */
  /* ── VISTA: CORRECCIÓN MANUAL ───────────────────────────── */
  /* ═══════════════════════════════════════════════════════════ */
  if (vista === 'manual') return (
    <div className="page-container fade-in">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button onClick={volverAlDetalle} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.8rem', fontWeight: '600', padding: 0 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            Volver
          </button>
          <span style={{ color: 'var(--border)' }}>|</span>
          <div>
            <h1 style={{ fontSize: '1.2rem' }}>{selEjemplar?.alumnoApellidos}, {selEjemplar?.alumnoNombre}</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginTop: '0.15rem' }}>
              {revisionData?.asignaturaNombre} · Clave: <code style={{ fontSize: '0.72rem' }}>{selEjemplar?.claveCorreccion}</code>
              {modoLectura && <span style={{ marginLeft: '0.75rem', fontSize: '0.65rem', fontWeight: '700', background: 'var(--primary-light)', color: 'var(--primary)', padding: '0.15rem 0.5rem', borderRadius: '999px' }}>Solo lectura</span>}
            </p>
          </div>
        </div>
        {!modoLectura && (
          <button onClick={() => corregirManualMutation.mutate()} disabled={corregirManualMutation.isPending} className="btn btn-primary">
            {corregirManualMutation.isPending ? 'Guardando...' : 'Guardar corrección'}
          </button>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
        {(revisionData?.preguntas || []).map((preg: any, idx: number) => {
          const key = preg.preguntaId.toString();
          const marcada = marcas[key];

          return (
            <div key={key} style={{ background: 'var(--surface)', borderRadius: 'var(--radius)', border: `1.5px solid ${marcada !== undefined && marcada !== -1 ? 'var(--border)' : 'var(--border)'}`, overflow: 'hidden' }}>
              <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--surface-3)', background: 'var(--surface-2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.65rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--primary)' }}>Pregunta {idx + 1}</span>
                <span style={{ fontSize: '0.6rem', fontWeight: '700', color: preg.dificultad === 'ALTA' ? '#dc2626' : preg.dificultad === 'MEDIA' ? '#ca8a04' : '#16a34a' }}>
                  {preg.dificultad}
                </span>
              </div>
              <div style={{ padding: '0.875rem 1rem', fontSize: '0.835rem', fontWeight: '500', color: 'var(--text-main)', minHeight: '3.5rem', lineHeight: 1.4 }}>
                {preg.enunciado}
              </div>
              <div style={{ padding: '0.75rem 1rem', display: 'flex', gap: '0.5rem' }}>
                {(preg.respuestas || []).map((resp: any) => {
                  const sel = marcada === resp.indice;
                  const esCorr = resp.esCorrecta;
                  let bg = 'var(--surface-2)', color = 'var(--text-secondary)', border = 'var(--border)';
                  if (sel) { bg = esCorr ? 'var(--success)' : 'var(--danger)'; color = 'white'; border = bg; }
                  else if (!sel && esCorr && marcada !== -1 && marcada !== undefined) { bg = 'var(--success-light)'; color = 'var(--success)'; border = 'var(--success)'; }
                  return (
                    <button key={resp.indice}
                      onClick={() => !modoLectura && handleToggleMarca(key, resp.indice)}
                      title={resp.contenido}
                      style={{ flex: 1, height: '36px', borderRadius: '8px', border: `1.5px solid ${border}`, background: bg, color, fontWeight: '800', fontSize: '0.8rem', cursor: modoLectura ? 'default' : 'pointer', transition: 'all 0.15s ease' }}>
                      {LETRAS[resp.indice] ?? resp.indice}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
        <button onClick={volverAlDetalle} className="btn btn-secondary">
          {modoLectura ? 'Volver' : 'Cancelar'}
        </button>
        {!modoLectura && (
          <button onClick={() => corregirManualMutation.mutate()} disabled={corregirManualMutation.isPending} className="btn btn-primary">
            {corregirManualMutation.isPending ? 'Guardando...' : 'Guardar corrección'}
          </button>
        )}
      </div>
    </div>
  );

  /* ═══════════════════════════════════════════════════════════ */
  /* ── VISTA: ÉXITO ───────────────────────────────────────── */
  /* ═══════════════════════════════════════════════════════════ */
  return (
    <div className="page-container fade-in" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
      <div style={{ textAlign: 'center', maxWidth: '380px' }}>
        <div style={{ width: '64px', height: '64px', background: 'var(--success)', borderRadius: '50%', display: 'grid', placeItems: 'center', margin: '0 auto 1.5rem', boxShadow: '0 8px 20px rgba(16,185,129,0.3)' }}>
          <IconCheck />
        </div>
        <h2 style={{ fontSize: '1.35rem', marginBottom: '0.5rem' }}>Calificación registrada</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '2rem' }}>
          La corrección de {selEjemplar?.alumnoApellidos}, {selEjemplar?.alumnoNombre} ha sido guardada correctamente.
        </p>
        <button onClick={volverAlDetalle} className="btn btn-primary">Volver al grupo</button>
      </div>
    </div>
  );
};

export default CorregirExamenPage;
