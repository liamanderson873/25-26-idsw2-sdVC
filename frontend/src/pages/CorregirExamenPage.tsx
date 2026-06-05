import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { corregirExamen, exportarExamen, getExamenes, getEjemplares, entregarExamenMasivo, corregirExamenMasivo } from '../services/examenService';
import { getGrados } from '../services/gradoService';
import { getAsignaturas } from '../services/asignaturaService';

const CorregirExamenPage: React.FC = () => {
  const queryClient = useQueryClient();

  // Selección jerárquica
  const [selGradoId, setSelGradoId] = useState<number>(0);
  const [selAsignaturaId, setSelAsignaturaId] = useState<number>(0);
  const [selExamenId, setSelExamenId] = useState<number>(0);
  const [selEjemplar, setSelEjemplar] = useState<any>(null);

  // Datos de corrección
  const [examenData, setExamenData] = useState<any>(null);
  const [marcas, setMarcas] = useState<Record<string, number>>({});
  const [paso, setPaso] = useState(1); 

  // Queries
  const { data: grados = [] } = useQuery({ queryKey: ['grados'], queryFn: getGrados });
  const { data: asignaturas = [] } = useQuery({ queryKey: ['asignaturas'], queryFn: getAsignaturas });
  const { data: examenes = [] } = useQuery({ queryKey: ['examenes'], queryFn: getExamenes });
  const { data: ejemplares = [], isLoading: loadingEjemplares } = useQuery({ 
    queryKey: ['ejemplares', selExamenId], 
    queryFn: async () => {
      const data = await getEjemplares(selExamenId);
      return data || [];
    },
    enabled: selExamenId > 0
  });

  // Mutaciones
  const entregarMasivoMutation = useMutation({
    mutationFn: () => entregarExamenMasivo(selExamenId),
    onSuccess: (msg) => {
      alert(msg);
      queryClient.invalidateQueries({ queryKey: ['ejemplares', selExamenId] });
    }
  });

  const corregirMasivoMutation = useMutation({
    mutationFn: () => corregirExamenMasivo(selExamenId),
    onSuccess: (msg) => {
      alert(msg);
      queryClient.invalidateQueries({ queryKey: ['ejemplares', selExamenId] });
    }
  });

  const corregirMutation = useMutation({
    mutationFn: () => corregirExamen({
      claveSHA256: selEjemplar?.claveCorreccion || '',
      marcas: marcas
    }),
    onSuccess: () => {
      setPaso(3);
      queryClient.invalidateQueries({ queryKey: ['ejemplares', selExamenId] });
    }
  });

  const handleSelectAlumno = async (ejemplar: any) => {
    if (!ejemplar) return;
    setSelEjemplar(ejemplar);
    try {
      const data = await exportarExamen(selExamenId);
      setExamenData(data);
      const initialMarcas: Record<string, number> = {};
      (data?.preguntas || []).forEach((p: any, idx: number) => {
        initialMarcas[p.id?.toString() || idx.toString()] = -1;
      });
      setMarcas(initialMarcas);
      setPaso(2);
    } catch (err) {
      alert("Error al cargar.");
    }
  };

  const handleToggleMarca = (preguntaId: string, indice: number) => {
    setMarcas(prev => ({
      ...prev,
      [preguntaId]: prev[preguntaId] === indice ? -1 : indice
    }));
  };

  const asignaturasFiltradas = (asignaturas || []).filter(a => selGradoId === 0 || a.gradoId === selGradoId);
  const examenesFiltrados = (examenes || []).filter(e => selAsignaturaId === 0 || e.asignatura?.id === selAsignaturaId);
  const hayPendientesDeEntrega = (ejemplares || []).some(ej => ej && (ej.estado === 'PENDIENTE' || ej.estado === 'ASIGNADO'));

  return (
    <div style={{ maxWidth: '1200px' }} className="fade-in">
      <h1>Gestión de Correcciones</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>Supervisa la entrega y automatiza la calificación mediante IA.</p>

      {paso === 1 && (
        <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '2rem' }}>
          <aside>
             <div className="card">
                <h3 style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>Configuración</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                   <div>
                      <label>Grado</label>
                      <select value={selGradoId} onChange={e => { setSelGradoId(Number(e.target.value)); setSelAsignaturaId(0); setSelExamenId(0); }}>
                        <option value={0}>Todos...</option>
                        {grados.map(g => <option key={g.id} value={g.id}>{g.nombre}</option>)}
                      </select>
                   </div>
                   <div>
                      <label>Asignatura</label>
                      <select value={selAsignaturaId} onChange={e => { setSelAsignaturaId(Number(e.target.value)); setSelExamenId(0); }}>
                        <option value={0}>Seleccionar...</option>
                        {asignaturasFiltradas.map(a => <option key={a.id} value={a.id}>{a.nombre}</option>)}
                      </select>
                   </div>
                   <div>
                      <label>Modelo</label>
                      <select value={selExamenId} onChange={e => setSelExamenId(Number(e.target.value))}>
                        <option value={0}>Seleccionar...</option>
                        {examenesFiltrados.map(ex => <option key={ex.id} value={ex.id}>ID: {ex.id} - {ex.tipoEvaluacion?.replace('_', ' ')}</option>)}
                      </select>
                   </div>
                </div>
             </div>
          </aside>

          <main>
             <div className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>
                   <h3 style={{ fontSize: '0.9rem' }}>Alumnos Asignados</h3>
                   <div style={{ display: 'flex', gap: '0.5rem' }}>
                      {selExamenId > 0 && hayPendientesDeEntrega && (
                        <button 
                          onClick={() => entregarMasivoMutation.mutate()}
                          className="btn btn-primary"
                          style={{ background: 'var(--warning)', color: 'black', padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}
                        >
                          SIMULAR ENTREGAS
                        </button>
                      )}
                      {selExamenId > 0 && !hayPendientesDeEntrega && (ejemplares || []).some(ej => ej && ej.estado !== 'CORREGIDO') && (
                        <button 
                          onClick={() => corregirMasivoMutation.mutate()}
                          className="btn btn-primary"
                          style={{ background: 'var(--success)', padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}
                        >
                          CORRECCIÓN IA
                        </button>
                      )}
                   </div>
                </div>

                <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
                   {loadingEjemplares ? <p style={{ fontSize: '0.85rem' }}>Cargando alumnos...</p> : (
                     <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                           <tr style={{ textAlign: 'left', fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--text-muted)', borderBottom: '1px solid var(--border)' }}>
                              <th style={{ padding: '0.75rem' }}>Estudiante</th>
                              <th style={{ padding: '0.75rem' }}>Estado</th>
                              <th style={{ padding: '0.75rem', textAlign: 'center' }}>Nota</th>
                              <th style={{ padding: '0.75rem', textAlign: 'right' }}>Acción</th>
                           </tr>
                        </thead>
                        <tbody>
                           {(ejemplares || []).map(ej => {
                             if (!ej) return null;
                             const isSelected = selEjemplar?.id === ej.id;
                             return (
                               <tr key={ej.id} style={{ borderBottom: '1px solid var(--border)', fontSize: '0.85rem', background: isSelected ? 'var(--primary-soft)' : 'transparent' }}>
                                  <td style={{ padding: '0.75rem' }}>
                                     <div style={{ fontWeight: '600', color: isSelected ? 'var(--primary)' : 'var(--text-main)' }}>{ej.alumno?.apellidos || 'Sin apellidos'}, {ej.alumno?.nombre || 'Sin nombre'}</div>
                                     <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>{ej.claveCorreccion}</div>
                                  </td>
                                  <td style={{ padding: '0.75rem' }}>
                                     <span className="badge" style={{ 
                                       background: ej.estado === 'CORREGIDO' ? 'var(--success)' : 'var(--warning)',
                                       color: ej.estado === 'CORREGIDO' ? 'white' : 'black'
                                     }}>
                                       {ej.estado?.replace('_', ' ')}
                                     </span>
                                  </td>
                                  <td style={{ padding: '0.75rem', textAlign: 'center', fontWeight: '800' }}>
                                     {ej.notaFinal !== null ? ej.notaFinal.toFixed(2) : '-'}
                                  </td>
                                  <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                                     <button 
                                       onClick={() => handleSelectAlumno(ej)}
                                       disabled={ej.estado === 'PENDIENTE' || ej.estado === 'ASIGNADO'}
                                       className="btn btn-primary"
                                       style={{ padding: '0.3rem 0.6rem', fontSize: '0.7rem', opacity: (ej.estado === 'PENDIENTE' || ej.estado === 'ASIGNADO') ? 0.4 : 1 }}
                                     >
                                       Manual
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
          </main>
        </div>
      )}

      {paso === 2 && examenData && (
        <div className="card" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
              <div>
                <h2 style={{ fontSize: '1.25rem' }}>{selEjemplar?.alumno?.nombre || 'Alumno'} {selEjemplar?.alumno?.apellidos || ''}</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{examenData?.nombreAsignatura || 'Asignatura'} • {selEjemplar?.claveCorreccion}</p>
              </div>
              <button onClick={() => setPaso(1)} className="btn btn-secondary">Cerrar</button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
            {(examenData?.preguntas || []).map((preg: any, idx: number) => (
              <div key={idx} style={{ padding: '1rem', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--background)' }}>
                <div style={{ fontSize: '0.65rem', fontWeight: '800', color: 'var(--primary)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>Pregunta {idx + 1}</div>
                <p style={{ fontSize: '0.85rem', fontWeight: '500', marginBottom: '1rem', height: '2.5rem', overflow: 'hidden' }}>{preg.enunciado}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', background: 'white', padding: '0.5rem', borderRadius: '10px', border: '1px solid var(--border)' }}>
                  {[0, 1, 2, 3].map((i) => (
                    <button
                      key={i}
                      onClick={() => handleToggleMarca(preg.id?.toString() || idx.toString(), i)}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        border: '1px solid var(--border)',
                        background: marcas[preg.id?.toString() || idx.toString()] === i ? 'var(--primary)' : 'white',
                        color: marcas[preg.id?.toString() || idx.toString()] === i ? 'white' : 'var(--text-main)',
                        fontWeight: '700',
                        fontSize: '0.75rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      {String.fromCharCode(65 + i)}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <button 
              onClick={() => corregirMutation.mutate()}
              disabled={corregirMutation.isPending}
              className="btn btn-primary"
              style={{ padding: '1rem 3rem', fontSize: '1rem' }}
            >
              {corregirMutation.isPending ? 'Guardando...' : 'FINALIZAR CORRECCIÓN MANUAL'}
            </button>
          </div>
        </div>
      )}

      {paso === 3 && (
        <div className="card" style={{ padding: '4rem', textAlign: 'center' }}>
          <div style={{ width: '60px', height: '60px', background: '#ecfdf5', color: 'var(--success)', borderRadius: '50%', display: 'grid', placeItems: 'center', margin: '0 auto 1.5rem', fontSize: '1.5rem', fontWeight: 'bold' }}>✓</div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Calificación Registrada</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '0.9rem' }}>El acta del alumno ha sido actualizada correctamente en el sistema.</p>
          <button onClick={() => setPaso(1)} className="btn btn-primary" style={{ padding: '0.8rem 2.5rem' }}>VOLVER AL LISTADO</button>
        </div>
      )}
    </div>
  );
};

export default CorregirExamenPage;
