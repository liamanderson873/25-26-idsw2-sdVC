import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getResumenSistema } from '../services/examenService';
import { useNavigate } from 'react-router-dom';

const greeting = () => {
  const h = new Date().getHours();
  if (h < 13) return 'Buenos días';
  if (h < 21) return 'Buenas tardes';
  return 'Buenas noches';
};

const fecha = new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

const ACCIONES = [
  {
    ruta: '/generar-examen',
    titulo: 'Generar Examen',
    desc: 'Crea exámenes personalizados y asígnalos a los alumnos de una asignatura.',
    color: '#3b82f6',
    bg: '#eff6ff',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
        <line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/>
      </svg>
    ),
  },
  {
    ruta: '/asignar-examen',
    titulo: 'Asignar Examen',
    desc: 'Genera las claves SHA-256 y asigna formalmente los exámenes pendientes a los alumnos.',
    color: '#7c3aed',
    bg: '#ede9fe',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="7.5" cy="15.5" r="4.5"/>
        <path d="M21 2l-9.6 9.6"/>
        <path d="M15.5 7.5l3 3L22 7l-3-3"/>
      </svg>
    ),
  },
  {
    ruta: '/corregir-examen',
    titulo: 'Corregir Exámenes',
    desc: 'Gestiona las correcciones por grupo: simulación, IA y corrección manual.',
    color: '#10b981',
    bg: '#ecfdf5',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
      </svg>
    ),
  },
  {
    ruta: '/alumnos',
    titulo: 'Listado de Alumnos',
    desc: 'Consulta matrículas, historial de exámenes y expediente académico.',
    color: '#8b5cf6',
    bg: '#f5f3ff',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    ruta: '/preguntas',
    titulo: 'Batería de Preguntas',
    desc: 'Añade, edita y habilita preguntas para la generación aleatoria de exámenes.',
    color: '#f59e0b',
    bg: '#fffbeb',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    ),
  },
  {
    ruta: '/asignaturas',
    titulo: 'Asignaturas',
    desc: 'Configura las asignaturas, grados y el profesorado asociado.',
    color: '#64748b',
    bg: '#f8fafc',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    ),
  },
  {
    ruta: '/importar-exportar',
    titulo: 'Importar / Exportar',
    desc: 'Importa datos desde CSV o exporta la configuración global del sistema.',
    color: '#0ea5e9',
    bg: '#f0f9ff',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="8 17 12 21 16 17"/><line x1="12" y1="12" x2="12" y2="21"/>
        <path d="M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29"/>
      </svg>
    ),
  },
];

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  const { data: resumen, isLoading } = useQuery({
    queryKey: ['resumen-sistema'],
    queryFn: getResumenSistema,
    refetchInterval: 30000,
  });

  const sistemaOk = resumen?.sistemaDisponible ?? false;

  return (
    <div className="page-container fade-in">

      {/* ── Bienvenida ── */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ fontSize: '0.72rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
          {greeting()}
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: '900', letterSpacing: '-0.03em', marginBottom: '0.3rem', color: 'var(--text-main)' }}>
          {user?.nombre ?? 'Docente'}
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'capitalize' }}>
          {fecha}
        </p>
      </div>

      {/* ── Layout: acciones + estado ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 260px', gap: '1.75rem', alignItems: 'start' }}>

        {/* Acciones rápidas */}
        <div>
          <div style={{ fontSize: '0.65rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            Acceso rápido
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.875rem' }}>
            {ACCIONES.map(a => (
              <div
                key={a.ruta}
                onClick={() => navigate(a.ruta)}
                className="card"
                style={{ cursor: 'pointer', padding: '1.25rem', transition: 'all 0.18s ease', border: '1.5px solid var(--border)' }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = a.color;
                  (e.currentTarget as HTMLElement).style.background = a.bg;
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 24px ${a.color}22`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                  (e.currentTarget as HTMLElement).style.background = 'white';
                  (e.currentTarget as HTMLElement).style.transform = 'none';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                <div style={{ color: a.color, marginBottom: '0.875rem' }}>{a.icon}</div>
                <div style={{ fontWeight: '800', fontSize: '0.875rem', color: 'var(--text-main)', marginBottom: '0.4rem' }}>{a.titulo}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>{a.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Estado del sistema */}
        <div>
          <div style={{ fontSize: '0.65rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            Estado del sistema
          </div>
          <div className="card" style={{ padding: '1.25rem' }}>

            {/* Indicador global */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1.25rem', paddingBottom: '1.25rem', borderBottom: '1px solid var(--border)' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: sistemaOk ? '#10b981' : '#f59e0b', flexShrink: 0, boxShadow: sistemaOk ? '0 0 0 3px #d1fae5' : '0 0 0 3px #fef3c7' }} />
              <div>
                <div style={{ fontSize: '0.78rem', fontWeight: '800', color: 'var(--text-main)' }}>
                  {isLoading ? '...' : sistemaOk ? 'Sistema operativo' : 'En configuración'}
                </div>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>
                  {sistemaOk ? 'Ciclo académico disponible' : 'Completa la configuración'}
                </div>
              </div>
            </div>

            {/* Métricas */}
            {isLoading ? (
              <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem', textAlign: 'center', padding: '1rem 0' }}>Cargando...</div>
            ) : resumen && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  { label: 'Grados',      val: resumen.grados,      ok: resumen.grados > 0 },
                  { label: 'Asignaturas', val: resumen.asignaturas, ok: resumen.asignaturas > 0 },
                  { label: 'Alumnos',     val: resumen.alumnos,     ok: resumen.alumnos > 0 },
                  { label: 'Preguntas',   val: resumen.preguntas,   ok: resumen.preguntas > 0 },
                  { label: 'Exámenes',    val: resumen.examenes,    ok: resumen.examenes >= 0 },
                  { label: 'Corregidos',  val: resumen.corregidos,  ok: resumen.corregidos >= 0 },
                ].map(({ label, val, ok }) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: ok ? '#10b981' : '#e2e8f0', flexShrink: 0 }} />
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{label}</span>
                    </div>
                    <span style={{ fontSize: '0.875rem', fontWeight: '800', color: ok ? 'var(--text-main)' : 'var(--text-placeholder)' }}>
                      {val.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardPage;
