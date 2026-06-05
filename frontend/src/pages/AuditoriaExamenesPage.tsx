import React, { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getExamenes, getEjemplares, entregarExamenMasivo, corregirExamenMasivo } from '../services/examenService';
import { getGrados } from '../services/gradoService';
import { getAsignaturas } from '../services/asignaturaService';
import DataTable from '../components/DataTable';
import { Examen, Grado, Asignatura } from '../types';

const AuditoriaExamenesPage: React.FC = () => {
  const queryClient = useQueryClient();

  // Estados de filtro
  const [filterGradoId, setFilterGradoId] = useState<number>(0);
  const [filterAsignaturaId, setFilterAsignaturaId] = useState<number>(0);
  const [selectedExamenId, setSelectedExamenId] = useState<number | null>(null);

  // Queries
  const { data: grados = [] } = useQuery({ queryKey: ['grados'], queryFn: getGrados });
  const { data: asignaturas = [] } = useQuery({ queryKey: ['asignaturas'], queryFn: getAsignaturas });
  const { data: examenes = [] } = useQuery({ queryKey: ['examenes'], queryFn: getExamenes });
  const { data: ejemplares = [], isLoading: loadingEjemplares } = useQuery({ 
    queryKey: ['ejemplares', selectedExamenId], 
    queryFn: () => getEjemplares(selectedExamenId!),
    enabled: !!selectedExamenId
  });

  const mutationSimular = useMutation({
    mutationFn: () => entregarExamenMasivo(selectedExamenId!),
    onSuccess: (msg) => {
      alert(msg);
      queryClient.invalidateQueries({ queryKey: ['ejemplares', selectedExamenId] });
    },
    onError: (error: any) => {
      alert('Error en simulación: ' + (error.response?.data || error.message));
    }
  });

  const mutationCorregir = useMutation({
    mutationFn: () => corregirExamenMasivo(selectedExamenId!),
    onSuccess: (msg) => {
      alert(msg);
      queryClient.invalidateQueries({ queryKey: ['ejemplares', selectedExamenId] });
    },
    onError: (error: any) => {
      alert('Error en corrección: ' + (error.response?.data || error.message));
    }
  });

  // Filtrado de asignaturas según grado
  const asignaturasFiltradas = useMemo(() => {
    return (asignaturas || []).filter(a => a && (!filterGradoId || a.gradoId === filterGradoId));
  }, [asignaturas, filterGradoId]);

  // Filtrado de exámenes
  const examenesFiltrados = useMemo(() => {
    return (examenes || []).filter(ex => {
      if (!ex || !ex.id) return false;
      const matchGrado = !filterGradoId || (ex.asignatura && ex.asignatura.gradoId === filterGradoId);
      const matchAsig = !filterAsignaturaId || (ex.asignatura && ex.asignatura.id === filterAsignaturaId);
      return matchGrado && matchAsig;
    });
  }, [examenes, filterGradoId, filterAsignaturaId]);

  const hayPendientes = useMemo(() => 
    (ejemplares || []).some(ej => ej && (ej.estado === 'ASIGNADO' || ej.estado === 'PENDIENTE')),
  [ejemplares]);

  const hayParaCorregir = useMemo(() => 
    (ejemplares || []).some(ej => ej && (ej.estado === 'PENDIENTE_CALIFICACION' || ej.estado === 'ENTREGADO')),
  [ejemplares]);

  return (
    <div style={{ maxWidth: '1200px' }}>
      <h1>Auditoría de Exámenes</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem' }}>Vista centralizada de modelos generados, asignaciones y actas de calificación.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '2.5rem', alignItems: 'start' }}>
        
        {/* PANEL DE FILTROS Y MODELOS */}
        <aside>
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', boxShadow: 'var(--shadow)', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1rem', marginBottom: '1.25rem' }}>Filtros de Búsqueda</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
               <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>Grado Académico</label>
                  <select 
                    value={filterGradoId} 
                    onChange={e => { setFilterGradoId(Number(e.target.value)); setFilterAsignaturaId(0); }} 
                    style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid var(--border)' }}
                  >
                    <option value={0}>Todos los grados</option>
                    {(grados || []).map(g => g && <option key={g.id} value={g.id}>{g.nombre}</option>)}
                  </select>
               </div>
               <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>Asignatura</label>
                  <select 
                    value={filterAsignaturaId} 
                    onChange={e => setFilterAsignaturaId(Number(e.target.value))} 
                    style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid var(--border)' }}
                  >
                    <option value={0}>Todas las asignaturas</option>
                    {asignaturasFiltradas.map(a => a && <option key={a.id} value={a.id}>{a.nombre}</option>)}
                  </select>
               </div>
            </div>
          </div>

          <div style={{ background: 'white', padding: '1.5rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', boxShadow: 'var(--shadow)' }}>
            <h3 style={{ fontSize: '1rem', marginBottom: '1.25rem' }}>Modelos Generados</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '500px', overflowY: 'auto' }}>
              {examenesFiltrados.length === 0 ? (
                <p style={{ color: '#999', textAlign: 'center', padding: '1rem' }}>No hay exámenes con estos filtros.</p>
              ) : (
                examenesFiltrados.map(ex => ex && (
                  <div 
                    key={ex.id} 
                    onClick={() => setSelectedExamenId(ex.id!)}
                    style={{ 
                      padding: '1rem', 
                      borderRadius: '10px', 
                      border: `2px solid ${selectedExamenId === ex.id ? 'var(--primary)' : 'transparent'}`,
                      background: selectedExamenId === ex.id ? '#eff6ff' : '#f8fafc',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{ex.asignatura?.nombre || 'Sin Nombre'}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>ID: {ex.id} • {ex.tipoEvaluacion?.replace('_', ' ') || 'S/E'}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </aside>

        {/* PANEL DE DETALLE: EJEMPLARES Y CALIFICACIONES */}
        <main>
          {selectedExamenId ? (
            <div style={{ background: 'white', padding: '2rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', boxShadow: 'var(--shadow)' }}>
               <div style={{ marginBottom: '2rem', borderBottom: '1px solid var(--border)', paddingBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h2 style={{ fontSize: '1.25rem' }}>Detalle de Modelo #{selectedExamenId}</h2>
                    <p style={{ color: 'var(--text-muted)' }}>Listado de alumnos vinculados y estado de calificación.</p>
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    {hayPendientes && (
                      <button 
                        onClick={() => mutationSimular.mutate()}
                        disabled={mutationSimular.isPending}
                        style={{ padding: '0.6rem 1.2rem', background: 'var(--warning)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
                      >
                        {mutationSimular.isPending ? 'RECOGIENDO...' : '📥 HACER EXAMEN'}
                      </button>
                    )}
                    {hayParaCorregir && (
                      <button 
                        onClick={() => mutationCorregir.mutate()}
                        disabled={mutationCorregir.isPending}
                        style={{ padding: '0.6rem 1.2rem', background: 'var(--success)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
                      >
                        {mutationCorregir.isPending ? 'CORRIGIENDO...' : '🤖 CORREGIR IA'}
                      </button>
                    )}
                    <button 
                      onClick={() => window.location.href=`/corregir-examen`} 
                      style={{ padding: '0.6rem 1.2rem', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
                    >
                      MANUAL
                    </button>
                  </div>
               </div>

               <DataTable<any>
                 data={ejemplares}
                 isLoading={loadingEjemplares}
                 columns={[
                   { 
                     header: 'Alumno', 
                     accessor: (ej) => (ej && ej.alumno) ? (
                       <div>
                         <div style={{ fontWeight: '600' }}>{ej.alumno.apellidos || 'N/A'}, {ej.alumno.nombre || 'Alumno'}</div>
                         <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>{ej.alumno.dni || 'S/D'}</div>
                       </div>
                     ) : <div>Sin Alumno</div>
                   },
                   { 
                     header: 'Estado', 
                     accessor: (ej) => ej && (
                       <span style={{ 
                         padding: '0.25rem 0.6rem', borderRadius: '20px', fontSize: '0.7rem', fontWeight: '700',
                         background: ej.estado === 'CORREGIDO' ? '#ecfdf5' : (ej.estado === 'PENDIENTE_CALIFICACION' || ej.estado === 'ENTREGADO') ? '#eef2ff' : '#fff7ed',
                         color: ej.estado === 'CORREGIDO' ? '#059669' : (ej.estado === 'PENDIENTE_CALIFICACION' || ej.estado === 'ENTREGADO') ? '#4f46e5' : '#d97706'
                       }}>
                         {ej.estado?.replace('_', ' ') || 'DESCONOCIDO'}
                       </span>
                     )
                   },
                   { 
                     header: 'Nota Final', 
                     accessor: (ej) => ej && (
                       <div style={{ fontWeight: '800', color: (ej.notaFinal !== null && ej.notaFinal >= 5) ? 'var(--success)' : (ej.notaFinal === null) ? 'var(--text-muted)' : 'var(--danger)' }}>
                         {ej.notaFinal !== null ? ej.notaFinal.toFixed(2) : '-'}
                       </div>
                     )
                   },
                   { 
                     header: 'Clave Firma', 
                     accessor: (ej) => ej && <code style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{ej.claveCorreccion?.substring(0,12) || '...'}</code> 
                   }
                 ]}
               />
            </div>
          ) : (
            <div style={{ height: '400px', display: 'grid', placeItems: 'center', background: '#f1f5f9', borderRadius: 'var(--radius)', border: '2px dashed var(--border)', color: 'var(--text-muted)' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📋</div>
                <p>Selecciona un modelo de examen en la izquierda para ver su auditoría.</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AuditoriaExamenesPage;
