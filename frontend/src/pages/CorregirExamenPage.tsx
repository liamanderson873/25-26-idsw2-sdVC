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

  const [resultadoMsg, setResultadoMsg] = useState('');

  // Queries
  const { data: grados = [] } = useQuery({ queryKey: ['grados'], queryFn: getGrados });
  const { data: asignaturas = [] } = useQuery({ queryKey: ['asignaturas'], queryFn: getAsignaturas });
  const { data: examenes = [] } = useQuery({ queryKey: ['examenes'], queryFn: getExamenes });
  const { data: ejemplares = [], isLoading: loadingEjemplares } = useQuery({ 
    queryKey: ['ejemplares', selExamenId], 
    queryFn: async () => {
      const data = await getEjemplares(selExamenId);
      console.log('Ejemplares cargados:', data);
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
    onSuccess: (data) => {
      setResultadoMsg(data);
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
    <div style={{ maxWidth: '1200px' }}>
      <h1>Gestión de Correcciones</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem' }}>Supervisa la entrega y automatiza la calificación mediante IA.</p>

      {paso === 1 && (
        <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '2.5rem' }}>
          <aside>
             <div style={{ background: 'white', padding: '1.5rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', boxShadow: 'var(--shadow)' }}>
                <h3 style={{ fontSize: '1rem', marginBottom: '1.25rem' }}>Configuración</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                   <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>Grado</label>
                      <select value={selGradoId} onChange={e => { setSelGradoId(Number(e.target.value)); setSelAsignaturaId(0); setSelExamenId(0); }} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid var(--border)' }}>
                        <option value={0}>Todos...</option>
                        {grados.map(g => <option key={g.id} value={g.id}>{g.nombre}</option>)}
                      </select>
                   </div>
                   <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>Asignatura</label>
                      <select value={selAsignaturaId} onChange={e => { setSelAsignaturaId(Number(e.target.value)); setSelExamenId(0); }} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid var(--border)' }}>
                        <option value={0}>Seleccionar...</option>
                        {asignaturasFiltradas.map(a => <option key={a.id} value={a.id}>{a.nombre}</option>)}
                      </select>
                   </div>
                   <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>Modelo</label>
                      <select value={selExamenId} onChange={e => setSelExamenId(Number(e.target.value))} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid var(--border)' }}>
                        <option value={0}>Seleccionar...</option>
                        {examenesFiltrados.map(ex => <option key={ex.id} value={ex.id}>ID: {ex.id} - {ex.tipoEvaluacion?.replace('_', ' ')}</option>)}
                      </select>
                   </div>
                </div>
             </div>
          </aside>

          <main>
             <div style={{ background: 'white', padding: '1.5rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', boxShadow: 'var(--shadow)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
                   <h3 style={{ fontSize: '1rem' }}>Alumnos Asignados</h3>
                   <div style={{ display: 'flex', gap: '0.75rem' }}>
                      {selExamenId > 0 && hayPendientesDeEntrega && (
                        <button 
                          onClick={() => entregarMasivoMutation.mutate()}
                          style={{ padding: '0.5rem 1rem', background: '#f59e0b', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.8rem' }}
                        >
                          📥 SIMULAR ENTREGAS
                        </button>
                      )}
                      {selExamenId > 0 && !hayPendientesDeEntrega && (ejemplares || []).some(ej => ej && ej.estado !== 'CORREGIDO') && (
                        <button 
                          onClick={() => corregirMasivoMutation.mutate()}
                          style={{ padding: '0.5rem 1rem', background: '#10b981', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.8rem' }}
                        >
                          🤖 CORRECCIÓN IA
                        </button>
                      )}
                   </div>
                </div>

                <div style={{ maxHeight: '550px', overflowY: 'auto' }}>
                   {loadingEjemplares ? <p>Cargando alumnos...</p> : (
                     <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                           <tr style={{ textAlign: 'left', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                              <th style={{ padding: '1rem' }}>Estudiante</th>
                              <th style={{ padding: '1rem' }}>Estado</th>
                              <th style={{ padding: '1rem', textAlign: 'center' }}>Nota</th>
                              <th style={{ padding: '1rem', textAlign: 'right' }}>Acción</th>
                           </tr>
                        </thead>
                        <tbody>
                           {(ejemplares || []).map(ej => {
                             if (!ej) return null;
                             return (
                               <tr key={ej.id} style={{ borderBottom: '1px solid var(--border)', fontSize: '0.9rem' }}>
                                  <td style={{ padding: '1rem' }}>
                                     <div style={{ fontWeight: '600' }}>{ej.alumno?.apellidos || 'Sin apellidos'}, {ej.alumno?.nombre || 'Sin nombre'}</div>
                                     <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>{ej.claveCorreccion}</div>
                                  </td>
                                  <td style={{ padding: '1rem' }}>
                                     <span style={{ 
                                       padding: '0.25rem 0.6rem', borderRadius: '20px', fontSize: '0.7rem', fontWeight: '700',
                                       background: ej.estado === 'CORREGIDO' ? '#ecfdf5' : '#fff7ed',
                                       color: ej.estado === 'CORREGIDO' ? '#059669' : '#d97706'
                                     }}>
                                       {ej.estado}
                                     </span>
                                  </td>
                                  <td style={{ padding: '1rem', textAlign: 'center', fontWeight: '700' }}>
                                     {ej.notaFinal !== null ? ej.notaFinal : '-'}
                                  </td>
                                  <td style={{ padding: '1rem', textAlign: 'right' }}>
                                     <button 
                                       onClick={() => handleSelectAlumno(ej)}
                                       disabled={ej.estado === 'PENDIENTE' || ej.estado === 'ASIGNADO'}
                                       style={{ padding: '0.4rem 0.8rem', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', opacity: (ej.estado === 'PENDIENTE' || ej.estado === 'ASIGNADO') ? 0.5 : 1 }}
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
        <div style={{ background: 'white', padding: '2.5rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-lg)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', borderBottom: '2px solid var(--background)', paddingBottom: '1.5rem' }}>
              <div>
                <h2 style={{ fontSize: '1.5rem' }}>{selEjemplar?.alumno?.nombre || 'Alumno'} {selEjemplar?.alumno?.apellidos || ''}</h2>
                <p style={{ color: 'var(--text-muted)' }}>{examenData?.nombreAsignatura || 'Asignatura'} • {selEjemplar?.claveCorreccion}</p>
              </div>
              <button onClick={() => setPaso(1)} style={{ padding: '0.6rem 1.2rem', background: '#f1f5f9', border: '1px solid var(--border)', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>Cerrar</button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {(examenData?.preguntas || []).map((preg: any, idx: number) => (
              <div key={idx} style={{ padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--border)', background: '#f8fafc' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: '800', color: 'var(--primary)', marginBottom: '0.5rem' }}>PREGUNTA {idx + 1}</div>
                <p style={{ fontSize: '0.9rem', fontWeight: '500', marginBottom: '1.25rem', height: '3em', overflow: 'hidden' }}>{preg.enunciado}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', background: 'white', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--border)' }}>
                  {[0, 1, 2, 3].map((i) => (
                    <button
                      key={i}
                      onClick={() => handleToggleMarca(preg.id?.toString() || idx.toString(), i)}
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '50%',
                        border: '2px solid var(--border)',
                        background: marcas[preg.id?.toString() || idx.toString()] === i ? 'var(--primary)' : 'white',
                        color: marcas[preg.id?.toString() || idx.toString()] === i ? 'white' : 'var(--text-main)',
                        fontWeight: '700',
                        cursor: 'pointer'
                      }}
                    >
                      {String.fromCharCode(65 + i)}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '3rem', textAlign: 'center' }}>
            <button 
              onClick={() => corregirMutation.mutate()}
              disabled={corregirMutation.isPending}
              style={{ padding: '1.25rem 5rem', background: 'var(--success)', color: 'white', border: 'none', borderRadius: '12px', fontWeight: '700', fontSize: '1.1rem', cursor: 'pointer', boxShadow: '0 8px 16px rgba(16, 185, 129, 0.2)' }}
            >
              {corregirMutation.isPending ? 'Guardando...' : 'FINALIZAR CORRECCIÓN MANUAL'}
            </button>
          </div>
        </div>
      )}

      {paso === 3 && (
        <div style={{ background: 'white', padding: '5rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', textAlign: 'center', boxShadow: 'var(--shadow-lg)' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>🎯</div>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Calificación Registrada</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem' }}>El acta del alumno ha sido actualizada correctamente en el sistema.</p>
          <button onClick={() => setPaso(1)} style={{ padding: '1rem 3rem', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '10px', fontWeight: '700', cursor: 'pointer' }}>VOLVER AL LISTADO</button>
        </div>
      )}
    </div>
  );
};

export default CorregirExamenPage;
