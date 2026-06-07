import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getRevisionEjemplar } from '../services/examenService';

const LETRAS = ['A', 'B', 'C', 'D'];

const DIFICULTAD_COLOR: Record<string, string> = {
  BAJA:  '#16a34a',
  MEDIA: '#ca8a04',
  ALTA:  '#dc2626',
};

interface Props {
  ejemplarId: number;
  onClose: () => void;
}

const RevisionModal: React.FC<Props> = ({ ejemplarId, onClose }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['revision', ejemplarId],
    queryFn: () => getRevisionEjemplar(ejemplarId),
  });

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 1000,
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: 'white', borderRadius: '16px', width: '100%', maxWidth: '720px',
          maxHeight: '90vh', display: 'flex', flexDirection: 'column', overflow: 'hidden',
          boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
        }}
      >
        {/* Header */}
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: '0.65rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--primary)', marginBottom: '0.2rem' }}>
              Revisión del Ejemplar
            </div>
            {data && (
              <>
                <div style={{ fontWeight: '800', fontSize: '1rem', color: 'var(--text-main)' }}>
                  {data.alumnoApellidos}, {data.alumnoNombre}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                  {data.alumnoDni} · {data.asignaturaNombre} · {data.tipoEvaluacion?.replace(/_/g, ' ')} · {data.fechaExamen}
                  {data.notaFinal != null && (
                    <span style={{ marginLeft: '0.75rem', fontWeight: '800', color: data.notaFinal >= 5 ? 'var(--success)' : 'var(--danger)' }}>
                      Nota: {data.notaFinal.toFixed(2)}
                    </span>
                  )}
                </div>
              </>
            )}
          </div>
          <button onClick={onClose} className="btn btn-secondary" style={{ padding: '0.35rem 0.9rem', fontSize: '0.75rem', flexShrink: 0, marginLeft: '1rem' }}>
            Cerrar
          </button>
        </div>

        {/* Body */}
        <div style={{ overflowY: 'auto', padding: '1.25rem 1.5rem', flex: 1 }}>
          {isLoading && <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>Cargando revisión...</p>}
          {isError && <p style={{ color: 'var(--danger)', textAlign: 'center', padding: '2rem' }}>Error al cargar los datos.</p>}

          {data?.preguntas?.map((item: any, idx: number) => {
            const sinMarcar = item.indiceMarcado == null;
            const acerto = item.respondidoCorrectamente === true;

            return (
              <div key={item.preguntaId} style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--surface-3)', paddingBottom: '1.25rem' }}>
                {/* Pregunta header */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <span style={{ fontWeight: '800', fontSize: '0.8rem', color: 'var(--text-muted)', flexShrink: 0, minWidth: '1.5rem' }}>
                    {idx + 1}.
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.3rem' }}>
                      <span style={{ fontSize: '0.62rem', fontWeight: '700', color: DIFICULTAD_COLOR[item.dificultad] ?? '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        {item.dificultad}
                      </span>
                      {sinMarcar ? (
                        <span style={{ fontSize: '0.62rem', fontWeight: '700', color: '#94a3b8', background: '#f1f5f9', padding: '0.1rem 0.5rem', borderRadius: '999px' }}>Sin responder</span>
                      ) : acerto ? (
                        <span style={{ fontSize: '0.62rem', fontWeight: '700', color: '#16a34a', background: '#f0fdf4', padding: '0.1rem 0.5rem', borderRadius: '999px' }}>Correcta</span>
                      ) : (
                        <span style={{ fontSize: '0.62rem', fontWeight: '700', color: '#dc2626', background: '#fef2f2', padding: '0.1rem 0.5rem', borderRadius: '999px' }}>Incorrecta</span>
                      )}
                    </div>
                    <p style={{ margin: 0, fontSize: '0.88rem', fontWeight: '600', color: 'var(--text-main)', lineHeight: 1.5 }}>{item.enunciado}</p>
                  </div>
                </div>

                {/* Respuestas */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', paddingLeft: '2.25rem' }}>
                  {item.respuestas?.map((resp: any) => {
                    const esLaMarcada = item.indiceMarcado === resp.indice;
                    const esCorrecta = resp.esCorrecta;

                    let bg = 'white';
                    let borderColor = 'var(--border)';
                    let textColor = 'var(--text-main)';
                    let letraBg = '#f1f5f9';
                    let letraColor = '#64748b';

                    if (esCorrecta) {
                      bg = '#f0fdf4';
                      borderColor = '#86efac';
                      textColor = '#15803d';
                      letraBg = '#bbf7d0';
                      letraColor = '#15803d';
                    }
                    if (esLaMarcada && !esCorrecta) {
                      bg = '#fef2f2';
                      borderColor = '#fca5a5';
                      textColor = '#dc2626';
                      letraBg = '#fecaca';
                      letraColor = '#dc2626';
                    }

                    return (
                      <div key={resp.indice} style={{
                        display: 'flex', alignItems: 'center', gap: '0.75rem',
                        padding: '0.55rem 0.75rem', borderRadius: '8px',
                        border: `1px solid ${borderColor}`, background: bg,
                      }}>
                        <span style={{
                          width: '22px', height: '22px', borderRadius: '50%',
                          background: letraBg, color: letraColor,
                          fontWeight: '800', fontSize: '0.7rem', flexShrink: 0,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          {LETRAS[resp.indice] ?? resp.indice}
                        </span>
                        <span style={{ fontSize: '0.83rem', color: textColor, flex: 1 }}>{resp.contenido}</span>
                        <div style={{ display: 'flex', gap: '0.35rem', flexShrink: 0, fontSize: '0.65rem', fontWeight: '700' }}>
                          {esCorrecta && <span style={{ color: '#15803d' }}>✓ Correcta</span>}
                          {esLaMarcada && <span style={{ color: esCorrecta ? '#15803d' : '#dc2626' }}>← Alumno</span>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RevisionModal;
