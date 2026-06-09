import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getRevisionEjemplar } from '../services/examenService';

const LETRAS = ['A', 'B', 'C', 'D'];

const DIFICULTAD_COLOR: Record<string, string> = {
  BAJA:  '#16a34a',
  MEDIA: '#ca8a04',
  ALTA:  '#dc2626',
};

const ExamenRevisionPage: React.FC = () => {
  const { ejemplarId } = useParams<{ ejemplarId: string }>();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['revision', Number(ejemplarId)],
    queryFn: () => getRevisionEjemplar(Number(ejemplarId)),
    enabled: !!ejemplarId,
  });

  if (isLoading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', color: '#64748b', fontSize: '0.9rem' }}>
        Cargando revisión…
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', gap: '1rem' }}>
        <p style={{ color: '#dc2626', fontSize: '0.9rem' }}>Error al cargar los datos del examen.</p>
        <button onClick={() => window.close()} style={{ padding: '0.5rem 1.25rem', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'white', cursor: 'pointer', fontSize: '0.85rem' }}>
          Cerrar
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '780px', margin: '0 auto', padding: '2rem 1.5rem', fontFamily: 'inherit' }}>

      {/* Cabecera */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', paddingBottom: '1.25rem', borderBottom: '1.5px solid #e2e8f0' }}>
        <div>
          <div style={{ fontSize: '0.62rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#3b82f6', marginBottom: '0.3rem' }}>
            Revisión del Ejemplar
          </div>
          <h1 style={{ fontSize: '1.3rem', fontWeight: '900', color: '#0f172a', margin: 0, letterSpacing: '-0.02em' }}>
            {data.alumnoApellidos}, {data.alumnoNombre}
          </h1>
          <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '0.3rem', display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
            <span>{data.alumnoDni}</span>
            <span>·</span>
            <span>{data.asignaturaNombre}</span>
            <span>·</span>
            <span>{data.tipoEvaluacion?.replace(/_/g, ' ')}</span>
            <span>·</span>
            <span>{data.fechaExamen}</span>
            {data.notaFinal != null && (
              <>
                <span>·</span>
                <span style={{ fontWeight: '800', color: data.notaFinal >= 5 ? '#16a34a' : '#dc2626' }}>
                  Nota: {data.notaFinal.toFixed(2)}
                </span>
              </>
            )}
          </div>
        </div>
        <button
          onClick={() => window.close()}
          style={{ padding: '0.4rem 1rem', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'white', cursor: 'pointer', fontSize: '0.8rem', fontWeight: '600', color: '#475569', flexShrink: 0, marginLeft: '1rem' }}
        >
          Cerrar
        </button>
      </div>

      {/* Preguntas */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
        {data.preguntas?.map((item: any, idx: number) => {
          const sinMarcar = item.indiceMarcado == null;
          const acerto    = item.respondidoCorrectamente === true;

          return (
            <div key={item.preguntaId} style={{ paddingBottom: '1.75rem', borderBottom: '1px solid #f1f5f9' }}>
              {/* Pregunta header */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.85rem' }}>
                <span style={{ fontWeight: '800', fontSize: '0.82rem', color: '#94a3b8', flexShrink: 0, minWidth: '1.6rem', paddingTop: '0.05rem' }}>
                  {idx + 1}.
                </span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.4rem' }}>
                    <span style={{ fontSize: '0.6rem', fontWeight: '700', color: DIFICULTAD_COLOR[item.dificultad] ?? '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
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
                  <p style={{ margin: 0, fontSize: '0.92rem', fontWeight: '600', color: '#0f172a', lineHeight: 1.55 }}>{item.enunciado}</p>
                </div>
              </div>

              {/* Respuestas */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', paddingLeft: '2.35rem' }}>
                {item.respuestas?.map((resp: any) => {
                  const esLaMarcada = item.indiceMarcado === resp.indice;
                  const esCorrecta  = resp.esCorrecta;

                  let bg = 'white', borderColor = '#e2e8f0', textColor = '#334155', letraBg = '#f1f5f9', letraColor = '#64748b';

                  if (esCorrecta) {
                    bg = '#f0fdf4'; borderColor = '#86efac'; textColor = '#15803d'; letraBg = '#bbf7d0'; letraColor = '#15803d';
                  }
                  if (esLaMarcada && !esCorrecta) {
                    bg = '#fef2f2'; borderColor = '#fca5a5'; textColor = '#dc2626'; letraBg = '#fecaca'; letraColor = '#dc2626';
                  }

                  return (
                    <div key={resp.indice} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 0.85rem', borderRadius: '8px', border: `1px solid ${borderColor}`, background: bg }}>
                      <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: letraBg, color: letraColor, fontWeight: '800', fontSize: '0.72rem', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {LETRAS[resp.indice] ?? resp.indice}
                      </span>
                      <span style={{ fontSize: '0.875rem', color: textColor, flex: 1, lineHeight: 1.45 }}>{resp.contenido}</span>
                      <div style={{ display: 'flex', gap: '0.4rem', flexShrink: 0, fontSize: '0.65rem', fontWeight: '700' }}>
                        {esCorrecta  && <span style={{ color: '#15803d' }}>✓ Correcta</span>}
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
  );
};

export default ExamenRevisionPage;
