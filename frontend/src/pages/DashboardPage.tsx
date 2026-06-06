import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getResumenSistema } from '../services/examenService';
import { useNavigate } from 'react-router-dom';

interface Indicador {
  key: string;
  label: string;
  descripcion: string;
  ruta?: string;
  valor: number;
  umbral?: number;
}

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { data: resumen, isLoading } = useQuery({
    queryKey: ['resumen-sistema'],
    queryFn: getResumenSistema,
    refetchInterval: 15000,
  });

  const indicadores: Indicador[] = resumen ? [
    { key: 'docentes',    label: 'Docentes',         descripcion: 'Docentes registrados en el sistema',          ruta: '/docentes',          valor: resumen.docentes,    umbral: 1 },
    { key: 'grados',      label: 'Grados',            descripcion: 'Grados académicos configurados',              ruta: '/grados',            valor: resumen.grados,      umbral: 1 },
    { key: 'asignaturas', label: 'Asignaturas',       descripcion: 'Asignaturas con batería de preguntas',        ruta: '/asignaturas',       valor: resumen.asignaturas, umbral: 1 },
    { key: 'alumnos',     label: 'Alumnos',           descripcion: 'Alumnos matriculados en el sistema',          ruta: '/alumnos',           valor: resumen.alumnos,     umbral: 1 },
    { key: 'preguntas',   label: 'Preguntas',         descripcion: 'Preguntas en la batería (habilitadas/total)', ruta: '/preguntas',         valor: resumen.preguntas,   umbral: 1 },
    { key: 'examenes',    label: 'Exámenes Generados',descripcion: 'Modelos de examen creados',                   ruta: '/generar-examen',    valor: resumen.examenes,    umbral: 1 },
    { key: 'asignados',   label: 'Asignados',         descripcion: 'Ejemplares asignados a alumnos',              ruta: '/asignar-examen',    valor: resumen.asignados,   umbral: 1 },
    { key: 'corregidos',  label: 'Corregidos',        descripcion: 'Ejemplares calificados por la IA',            ruta: '/corregir-examen',   valor: resumen.corregidos,  umbral: 1 },
  ] : [];

  const completos = indicadores.filter(i => i.valor >= (i.umbral ?? 1)).length;
  const pct = indicadores.length > 0 ? Math.round((completos / indicadores.length) * 100) : 0;
  const sistemaListo = resumen?.sistemaDisponible ?? false;

  return (
    <div className="page-container fade-in">
      <div style={{ marginBottom: '2rem' }}>
        <h1>Panel de Control — completarGestion</h1>
        <p className="subtitle">Estado global del sistema. Todos los indicadores deben estar activos para que el ciclo docente esté completo (CU-41).</p>
      </div>

      {/* Barra de progreso global */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.06em' }}>
              Progreso del ciclo
            </div>
            <div style={{ fontSize: '2rem', fontWeight: '900', lineHeight: 1.1, color: sistemaListo ? 'var(--success)' : 'var(--primary)', letterSpacing: '-0.04em' }}>
              {isLoading ? '...' : `${completos} / ${indicadores.length}`}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>indicadores completados</div>
          </div>
          <div style={{
            padding: '0.75rem 1.5rem',
            borderRadius: '999px',
            background: sistemaListo ? 'var(--success-light)' : 'var(--surface-3)',
            border: `2px solid ${sistemaListo ? 'var(--success)' : 'var(--border)'}`,
            color: sistemaListo ? 'var(--success)' : 'var(--text-muted)',
            fontWeight: '800',
            fontSize: '0.85rem',
          }}>
            {sistemaListo ? 'SISTEMA_DISPONIBLE' : 'EN CONFIGURACIÓN'}
          </div>
        </div>

        <div style={{ height: '10px', borderRadius: '999px', background: 'var(--surface-3)', overflow: 'hidden' }}>
          <div style={{
            height: '100%',
            width: `${pct}%`,
            background: sistemaListo ? 'var(--success)' : 'var(--primary)',
            borderRadius: '999px',
            transition: 'width 0.5s ease',
          }} />
        </div>
        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.5rem', textAlign: 'right' }}>{pct}%</div>
      </div>

      {/* Grid de indicadores */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
        {isLoading ? (
          Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="card" style={{ height: '110px', background: 'var(--surface-2)', animation: 'pulse 1.5s ease-in-out infinite' }} />
          ))
        ) : (
          indicadores.map(ind => {
            const ok = ind.valor >= (ind.umbral ?? 1);
            return (
              <div
                key={ind.key}
                className="card"
                onClick={() => ind.ruta && navigate(ind.ruta)}
                style={{
                  cursor: ind.ruta ? 'pointer' : 'default',
                  border: `1.5px solid ${ok ? 'var(--success)' : 'var(--border)'}`,
                  background: ok ? 'var(--success-light)' : 'var(--surface-1)',
                  transition: 'all 0.2s ease',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Indicador de estado */}
                <div style={{
                  position: 'absolute', top: '1rem', right: '1rem',
                  width: '28px', height: '28px', borderRadius: '50%',
                  background: ok ? 'var(--success)' : 'var(--surface-3)',
                  display: 'grid', placeItems: 'center',
                  boxShadow: ok ? '0 2px 8px rgba(16,185,129,0.3)' : 'none',
                }}>
                  {ok ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  ) : (
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--border-strong)' }} />
                  )}
                </div>

                <div style={{ fontSize: '0.65rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.07em', color: ok ? '#065f46' : 'var(--text-muted)', marginBottom: '0.4rem' }}>
                  {ind.label}
                </div>
                <div style={{ fontSize: '2rem', fontWeight: '900', lineHeight: 1, color: ok ? 'var(--success)' : 'var(--text-main)', letterSpacing: '-0.04em', marginBottom: '0.4rem' }}>
                  {ind.valor.toLocaleString()}
                </div>
                <div style={{ fontSize: '0.75rem', color: ok ? '#047857' : 'var(--text-muted)' }}>
                  {ind.descripcion}
                </div>
              </div>
            );
          })
        )}
      </div>

      {sistemaListo && (
        <div style={{
          marginTop: '2rem',
          padding: '1.5rem 2rem',
          borderRadius: 'var(--radius)',
          background: 'var(--success-light)',
          border: '1.5px solid var(--success)',
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
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <div>
            <div style={{ fontWeight: '800', color: '#065f46', fontSize: '0.95rem' }}>SISTEMA_DISPONIBLE — Ciclo completo</div>
            <div style={{ color: '#047857', fontSize: '0.8rem', marginTop: '0.2rem' }}>
              Todos los indicadores del CU-41 están satisfechos. El sistema está operativo para un nuevo ciclo académico.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
