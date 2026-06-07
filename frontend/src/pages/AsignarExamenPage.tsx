import React from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getGruposExamen, asignarGrupo } from '../services/examenService';

const AsignarExamenPage: React.FC = () => {
  const queryClient = useQueryClient();

  const { data: grupos = [], isLoading } = useQuery({
    queryKey: ['grupos-examenes'],
    queryFn: getGruposExamen,
  });

  const pendientes = grupos.filter((g: any) => g.pendientes > 0);

  const asignarMutation = useMutation({
    mutationFn: (g: any) => asignarGrupo({
      asignaturaId: g.asignaturaId,
      tipoEvaluacion: g.tipoEvaluacion,
      fechaExamen: g.fechaExamen,
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['grupos-examenes'] });
    },
    onError: (err: any) => alert('Error: ' + (err.response?.data || err.message)),
  });

  return (
    <div className="page-container fade-in">
      <h1>Asignar Exámenes</h1>
      <p className="subtitle">
        Grupos generados pendientes de asignación formal. Al asignar se generan las claves SHA-256 de cada alumno.
      </p>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '1rem 1.5rem', background: 'var(--surface-2)', borderBottom: '1px solid var(--border)' }}>
          <h3>Grupos pendientes de asignación</h3>
        </div>

        {isLoading ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>Cargando...</div>
        ) : pendientes.length === 0 ? (
          <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            No hay grupos pendientes de asignación. Genera exámenes desde "Generar Examen" primero.
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--surface-2)' }}>
                {['Asignatura', 'Tipo', 'Fecha', 'Sin asignar', 'Asignados', ''].map((h, i) => (
                  <th key={h + i} style={{
                    padding: '0.75rem 1.25rem',
                    fontSize: '0.62rem', fontWeight: '800',
                    color: 'var(--text-muted)', textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    textAlign: i >= 3 ? 'center' : 'left',
                    borderBottom: '1px solid var(--border)',
                  }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pendientes.map((g: any, idx: number) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--surface-3)' }}>
                  <td style={{ padding: '0.875rem 1.25rem', fontWeight: '700', fontSize: '0.875rem', color: 'var(--text-main)' }}>
                    {g.asignaturaNombre}
                  </td>
                  <td style={{ padding: '0.875rem 1.25rem', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                    {g.tipoEvaluacion?.replace(/_/g, ' ')}
                  </td>
                  <td style={{ padding: '0.875rem 1.25rem', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                    {g.fechaExamen}
                  </td>
                  <td style={{ padding: '0.875rem 1.25rem', textAlign: 'center', fontWeight: '700', color: '#7c3aed' }}>
                    {g.pendientes}
                  </td>
                  <td style={{ padding: '0.875rem 1.25rem', textAlign: 'center', fontWeight: '700', color: g.asignados > 0 ? '#64748b' : 'var(--text-placeholder)' }}>
                    {g.asignados}
                  </td>
                  <td style={{ padding: '0.875rem 1.25rem', textAlign: 'center' }}>
                    <button
                      className="btn btn-primary"
                      style={{ fontSize: '0.775rem' }}
                      disabled={asignarMutation.isPending}
                      onClick={() => asignarMutation.mutate(g)}
                    >
                      {asignarMutation.isPending ? 'Asignando...' : 'Asignar y generar claves'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {grupos.filter((g: any) => g.asignados > 0 || g.entregados > 0 || g.corregidos > 0).length > 0 && (
        <div className="card" style={{ padding: 0, overflow: 'hidden', marginTop: '1.25rem' }}>
          <div style={{ padding: '1rem 1.5rem', background: 'var(--surface-2)', borderBottom: '1px solid var(--border)' }}>
            <h3 style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Grupos ya asignados</h3>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--surface-2)' }}>
                {['Asignatura', 'Tipo', 'Fecha', 'Asignados', 'Entregados', 'Corregidos'].map((h, i) => (
                  <th key={h + i} style={{
                    padding: '0.75rem 1.25rem',
                    fontSize: '0.62rem', fontWeight: '800',
                    color: 'var(--text-muted)', textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    textAlign: i >= 3 ? 'center' : 'left',
                    borderBottom: '1px solid var(--border)',
                  }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {grupos.filter((g: any) => g.pendientes === 0).map((g: any, idx: number) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--surface-3)' }}>
                  <td style={{ padding: '0.875rem 1.25rem', fontWeight: '700', fontSize: '0.875rem', color: 'var(--text-main)' }}>
                    {g.asignaturaNombre}
                  </td>
                  <td style={{ padding: '0.875rem 1.25rem', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                    {g.tipoEvaluacion?.replace(/_/g, ' ')}
                  </td>
                  <td style={{ padding: '0.875rem 1.25rem', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                    {g.fechaExamen}
                  </td>
                  <td style={{ padding: '0.875rem 1.25rem', textAlign: 'center', fontWeight: '700', color: '#64748b' }}>{g.asignados}</td>
                  <td style={{ padding: '0.875rem 1.25rem', textAlign: 'center', fontWeight: '700', color: g.entregados > 0 ? '#d97706' : 'var(--text-placeholder)' }}>{g.entregados}</td>
                  <td style={{ padding: '0.875rem 1.25rem', textAlign: 'center', fontWeight: '700', color: g.corregidos > 0 ? '#059669' : 'var(--text-placeholder)' }}>{g.corregidos}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AsignarExamenPage;
