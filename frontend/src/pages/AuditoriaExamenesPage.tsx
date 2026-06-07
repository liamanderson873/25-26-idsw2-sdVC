import React, { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getExamenes, getEjemplares, entregarExamenMasivo, corregirExamenMasivo, exportarExamen, getAuditoriaAlumno, cancelarGeneracion } from '../services/examenService';
import { getGrados } from '../services/gradoService';
import { getAsignaturas } from '../services/asignaturaService';
import DataTable from '../components/DataTable';

const AuditoriaExamenesPage: React.FC = () => {
  const queryClient = useQueryClient();

  // Estados de filtro
  const [filterGradoId, setFilterGradoId] = useState<number>(0);
  const [filterAsignaturaId, setFilterAsignaturaId] = useState<number>(0);
  const [selectedExamenId, setSelectedExamenId] = useState<number | null>(null);

  // Estado para Revisión
  const [revisionEjemplar, setRevisionEjemplar] = useState<any>(null);
  const [examenRevisionData, setExamenRevisionData] = useState<any>(null);
  const [marcasRevision, setMarcasRevision] = useState<Record<string, number>>({});
  const [isRevisionOpen, setIsRevisionOpen] = useState(false);

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

  const handleOpenRevision = async (ejemplar: any) => {
    try {
      setRevisionEjemplar(ejemplar);
      const exData = await exportarExamen(selectedExamenId!);
      const audData = await getAuditoriaAlumno(ejemplar.id);
      
      setExamenRevisionData(exData);
      setMarcasRevision(audData.marcas || {});
      setIsRevisionOpen(true);
    } catch (err) {
      alert("Error al cargar la revisión técnica.");
    }
  };

  const handleExport = async () => {
    if (!selectedExamenId) return;
    try {
      const data = await exportarExamen(selectedExamenId);
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `examen-${selectedExamenId}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      alert('Error al exportar el examen.');
    }
  };

  const mutacionCancelar = useMutation({
    mutationFn: () => cancelarGeneracion(selectedExamenId!),
    onSuccess: (msg) => {
      alert(msg);
      setSelectedExamenId(null);
      queryClient.invalidateQueries({ queryKey: ['examenes'] });
    },
    onError: (error: any) => {
      alert('Error: ' + (error.response?.data || error.message));
    }
  });

  const hayPendientes = useMemo(() =>
    (ejemplares || []).some(ej => ej && (ej.estado === 'ASIGNADO' || ej.estado === 'PENDIENTE')),
  [ejemplares]);

  const hayParaCorregir = useMemo(() => 
    (ejemplares || []).some(ej => ej && ej.estado === 'PENDIENTE_CALIFICACION'),
  [ejemplares]);

  return (
    <div style={{ maxWidth: '1200px' }} className="fade-in">
      <h1>Auditoría de Exámenes</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>Vista centralizada de modelos generados, asignaciones y actas de calificación.</p>

      {/* MODAL DE REVISIÓN */}
      {isRevisionOpen && examenRevisionData && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.4)', zIndex: 1000, display: 'grid', placeItems: 'center', padding: '1.5rem' }}>
          <div className="card" style={{ width: '100%', maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto', padding: '1.5rem' }}>
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>
                <div>
                  <h2 style={{ fontSize: '1.1rem' }}>Revisión: {revisionEjemplar?.alumno?.nombre} {revisionEjemplar?.alumno?.apellidos}</h2>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ID Ejemplar: {revisionEjemplar?.id} • Nota: {revisionEjemplar?.notaFinal?.toFixed(2) || '0.00'}</p>
                </div>
                <button onClick={() => setIsRevisionOpen(false)} className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem' }}>Cerrar</button>
             </div>

             <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {(examenRevisionData.preguntas || []).map((p: any, idx: number) => {
                  const rtaMarcada = marcasRevision[p.id] !== undefined ? marcasRevision[p.id] : -1;
                  return (
                    <div key={idx} style={{ padding: '1rem', borderRadius: '10px', border: '1px solid var(--border)', background: 'var(--background)' }}>
                      <div style={{ fontSize: '0.65rem', fontWeight: '800', color: 'var(--primary)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>Pregunta {idx + 1}</div>
                      <p style={{ fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.75rem' }}>{p.enunciado}</p>
                      
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                        {(p.opciones || []).map((opt: string, oIdx: number) => {
                          const esLaMarcada = rtaMarcada === oIdx;
                          return (
                            <div key={oIdx} style={{ 
                              padding: '0.6rem', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '0.8rem',
                              background: esLaMarcada ? 'var(--primary)' : 'white',
                              color: esLaMarcada ? 'white' : 'var(--text-main)',
                              display: 'flex', alignItems: 'center', gap: '0.4rem'
                            }}>
                              <span style={{ fontWeight: 'bold' }}>{String.fromCharCode(65 + oIdx)})</span> {opt}
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
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '2rem', alignItems: 'start' }}>
        
        {/* PANEL DE FILTROS Y MODELOS */}
        <aside>
          <div className="card" style={{ marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>Filtros de Búsqueda</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
               <div>
                  <label>Grado Académico</label>
                  <select 
                    value={filterGradoId} 
                    onChange={e => { setFilterGradoId(Number(e.target.value)); setFilterAsignaturaId(0); }} 
                  >
                    <option value={0}>Todos los grados</option>
                    {(grados || []).map(g => g && <option key={g.id} value={g.id}>{g.nombre}</option>)}
                  </select>
               </div>
               <div>
                  <label>Asignatura</label>
                  <select 
                    value={filterAsignaturaId} 
                    onChange={e => setFilterAsignaturaId(Number(e.target.value))} 
                  >
                    <option value={0}>Todas las asignaturas</option>
                    {asignaturasFiltradas.map(a => a && <option key={a.id} value={a.id}>{a.nombre}</option>)}
                  </select>
               </div>
            </div>
          </div>

          <div className="card">
            <h3 style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>Modelos Generados</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '450px', overflowY: 'auto' }}>
              {examenesFiltrados.length === 0 ? (
                <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '1rem', fontSize: '0.8rem' }}>No hay exámenes con estos filtros.</p>
              ) : (
                examenesFiltrados.map(ex => ex && (
                  <div 
                    key={ex.id} 
                    onClick={() => setSelectedExamenId(ex.id!)}
                    style={{ 
                      padding: '0.75rem', 
                      borderRadius: '10px', 
                      border: `1px solid ${selectedExamenId === ex.id ? 'var(--primary)' : 'transparent'}`,
                      background: selectedExamenId === ex.id ? 'rgba(37, 99, 235, 0.1)' : 'var(--background)',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    <div style={{ fontWeight: '700', fontSize: '0.85rem', color: selectedExamenId === ex.id ? 'var(--primary)' : 'var(--text-main)' }}>{ex.asignatura?.nombre || 'Sin Nombre'}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>ID: {ex.id} • {ex.tipoEvaluacion?.replace('_', ' ')}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </aside>

        {/* PANEL DE DETALLE: EJEMPLARES Y CALIFICACIONES */}
        <main>
          {selectedExamenId ? (
            <div className="card">
               <div style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h2 style={{ fontSize: '1.1rem' }}>Detalle de Modelo #{selectedExamenId}</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Listado de alumnos vinculados y estado de calificación.</p>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {hayPendientes && (
                      <button 
                        onClick={() => mutationSimular.mutate()}
                        className="btn btn-primary"
                        style={{ background: 'var(--warning)', color: 'black' }}
                      >
                        {mutationSimular.isPending ? 'RECOGIENDO...' : 'HACER EXAMEN'}
                      </button>
                    )}
                    {hayParaCorregir && (
                      <button 
                        onClick={() => mutationCorregir.mutate()}
                        className="btn btn-primary"
                        style={{ background: 'var(--success)' }}
                      >
                        {mutationCorregir.isPending ? 'CORRIGIENDO...' : 'CORREGIR IA'}
                      </button>
                    )}
                    <button
                      onClick={() => window.location.href=`/corregir-examen`}
                      className="btn btn-secondary"
                    >
                      MANUAL
                    </button>
                    <button
                      onClick={handleExport}
                      className="btn btn-secondary"
                    >
                      EXPORTAR JSON
                    </button>
                    {ejemplares.length === 0 && (
                      <button
                        onClick={() => {
                          if (window.confirm('¿Cancelar la generación de este examen? Se eliminará permanentemente.')) {
                            mutacionCancelar.mutate();
                          }
                        }}
                        className="btn btn-danger"
                        style={{ fontSize: '0.75rem' }}
                      >
                        CANCELAR GENERACIÓN
                      </button>
                    )}
                  </div>
               </div>

               <DataTable<any>
                 data={ejemplares}
                 isLoading={loadingEjemplares}
                 columns={[
                   { 
                     header: 'Alumno', 
                     accessor: (ej) => (ej && ej.alumno) ? (
                       <div style={{ padding: '0.25rem 0' }}>
                         <div style={{ fontWeight: '700', color: 'var(--text-main)', fontSize: '0.85rem' }}>{ej.alumno.apellidos}, {ej.alumno.nombre}</div>
                         <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>{ej.alumno.dni}</div>
                       </div>
                     ) : <div>Sin Alumno</div>
                   },
                   { 
                     header: 'Estado', 
                     accessor: (ej) => ej && (
                       <span className={`badge ${ej.estado === 'CORREGIDO' ? 'badge-success' : 'badge-warning'}`} style={{ 
                         background: ej.estado === 'CORREGIDO' ? 'var(--success)' : 'var(--warning)',
                         color: ej.estado === 'CORREGIDO' ? 'white' : 'black'
                        }}>
                         {ej.estado?.replace('_', ' ')}
                       </span>
                     )
                   },
                   { 
                     header: 'Nota Final', 
                     accessor: (ej) => ej && (
                       <div style={{ fontWeight: '800', fontSize: '0.95rem', color: (ej.notaFinal !== null && ej.notaFinal >= 5) ? 'var(--success)' : (ej.notaFinal === null) ? 'var(--text-muted)' : 'var(--danger)' }}>
                         {ej.notaFinal !== null ? ej.notaFinal.toFixed(2) : '-'}
                       </div>
                     )
                   },
                   { 
                     header: 'Acciones', 
                     accessor: (ej) => (ej && ej.estado !== 'ASIGNADO' && ej.estado !== 'PENDIENTE') && (
                       <button 
                         onClick={() => handleOpenRevision(ej)}
                         className="btn btn-secondary"
                         style={{ padding: '0.25rem 0.5rem', fontSize: '0.65rem' }}
                       >
                         REVISIÓN
                       </button>
                     )
                   }
                 ]}
               />
            </div>
          ) : (
            <div style={{ height: '350px', display: 'grid', placeItems: 'center', background: 'white', borderRadius: 'var(--radius)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: '40px', height: '40px', background: 'var(--background)', borderRadius: '50%', display: 'grid', placeItems: 'center', margin: '0 auto 1rem', border: '1px solid var(--border)' }}>
                   <div style={{ width: '10px', height: '10px', borderRadius: '2px', border: '2px solid var(--border-strong)' }}></div>
                </div>
                <p style={{ fontWeight: '600', fontSize: '0.85rem' }}>Selecciona un modelo de examen</p>
                <p style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>Utiliza el panel de la izquierda para ver la auditoría.</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AuditoriaExamenesPage;
