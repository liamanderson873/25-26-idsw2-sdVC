import React, { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getExamenes, asignarExamen } from '../services/examenService';
import { getAlumnos } from '../services/alumnoService';
import { getGrados } from '../services/gradoService';
import { getAsignaturas } from '../services/asignaturaService';

const AsignarExamenPage: React.FC = () => {
  const queryClient = useQueryClient();

  const [selectedExamenId, setSelectedExamenId] = useState<number>(0);
  const [selectedAlumnoIds, setSelectedAlumnoIds] = useState<number[]>([]);
  const [searchTermAlumno, setSearchTermAlumno] = useState('');
  const [filterAsignaturaId, setFilterAsignaturaId] = useState<number>(0); // Global filter for LEFT panel
  const [gradoFilters, setGradoFilters] = useState<Record<number, number>>({}); // Local filters for RIGHT panel
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const { data: examenes = [] } = useQuery({ queryKey: ['examenes'], queryFn: getExamenes });
  const { data: alumnos = [] } = useQuery({ queryKey: ['alumnos'], queryFn: getAlumnos });
  const { data: grados = [] } = useQuery({ queryKey: ['grados'], queryFn: getGrados });
  const { data: asignaturas = [] } = useQuery({ queryKey: ['asignaturas'], queryFn: getAsignaturas });

  const mutation = useMutation({
    mutationFn: () => asignarExamen(selectedExamenId, selectedAlumnoIds),
    onSuccess: (data) => {
      setSuccessMsg(data);
      setSelectedAlumnoIds([]);
      queryClient.invalidateQueries({ queryKey: ['examenes'] });
    }
  });

  const examenesFiltrados = useMemo(() => {
    return (examenes || []).filter(ex => !filterAsignaturaId || ex.asignatura?.id === filterAsignaturaId);
  }, [examenes, filterAsignaturaId]);

  const handleToggleAlumno = (id: number) => {
    setSelectedAlumnoIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const handleSelectAllInGrado = (studentIds: number[]) => {
    const allSelected = studentIds.length > 0 && studentIds.every(id => selectedAlumnoIds.includes(id));
    if (allSelected) {
      setSelectedAlumnoIds(prev => prev.filter(id => !studentIds.includes(id)));
    } else {
      setSelectedAlumnoIds(prev => [...new Set([...prev, ...studentIds])]);
    }
  };

  const setLocalGradoFilter = (gradoId: number, asigId: number) => {
    setGradoFilters(prev => ({ ...prev, [gradoId]: asigId }));
  };

  return (
    <div style={{ maxWidth: '1200px' }} className="fade-in">
      <h1>Asignación de Alumnos</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>Vincula modelos de examen a grupos de alumnos específicos siguiendo el diseño RUP.</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '2rem', alignItems: 'start' }}>
        
        {/* PANEL IZQUIERDO: SELECCIÓN DE MODELO */}
        <section style={{ position: 'sticky', top: '2rem' }}>
          <div className="card">
            <h3 style={{ fontSize: '0.9rem', marginBottom: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
               <span style={{ background: 'var(--primary)', color: 'white', width: '20px', height: '20px', borderRadius: '50%', display: 'grid', placeItems: 'center', fontSize: '0.7rem' }}>1</span>
               Elegir Modelo
            </h3>
            <select 
              value={filterAsignaturaId} 
              onChange={e => setFilterAsignaturaId(Number(e.target.value))}
              style={{ marginBottom: '1rem' }}
            >
              <option value={0}>Todas las Asignaturas</option>
              {(asignaturas || []).map(asig => <option key={asig.id} value={asig.id}>{asig.nombre}</option>)}
            </select>

            <div style={{ maxHeight: '400px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {examenesFiltrados.length === 0 ? (
                <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '1rem', fontSize: '0.85rem' }}>No hay modelos disponibles.</p>
              ) : (
                examenesFiltrados.map(ex => (
                  <div 
                    key={ex.id} 
                    onClick={() => setSelectedExamenId(ex.id)}
                    style={{ 
                      padding: '0.75rem', 
                      borderRadius: '8px', 
                      border: `2px solid ${selectedExamenId === ex.id ? 'var(--primary)' : 'transparent'}`,
                      background: selectedExamenId === ex.id ? 'var(--primary-soft)' : 'var(--background)',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    <div style={{ fontWeight: '600', fontSize: '0.85rem', color: selectedExamenId === ex.id ? 'var(--primary)' : 'var(--text-main)' }}>
                      {ex.asignatura?.nombre || 'Sin asignatura'}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>ID: {ex.id} • {ex.tipoEvaluacion?.replace('_', ' ')}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* PANEL DERECHO: SELECCIÓN DE ALUMNOS (AGRUPADOS POR GRADO) */}
        <section>
          <div className="card">
             <h3 style={{ fontSize: '0.9rem', marginBottom: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ background: 'var(--primary)', color: 'white', width: '20px', height: '20px', borderRadius: '50%', display: 'grid', placeItems: 'center', fontSize: '0.7rem' }}>2</span>
                Destinatarios
             </h3>
             
             <div style={{ marginBottom: '1.5rem' }}>
                <input 
                  type="text" 
                  placeholder="Buscar alumno por nombre o DNI..." 
                  value={searchTermAlumno}
                  onChange={e => setSearchTermAlumno(e.target.value)}
                  style={{ background: 'var(--background)' }}
                />
             </div>

             <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {grados.map(grado => {
                  const localAsigFilter = gradoFilters[grado.id!] || 0;
                  const asigsDelGrado = (asignaturas || []).filter(asig => asig.gradoId === grado.id);

                  const alumnosEnGrado = (alumnos || []).filter(a => a.gradoId === grado.id);
                  const alumnosFiltrados = alumnosEnGrado.filter(a => {
                    const search = (searchTermAlumno || '').toLowerCase();
                    const matchesSearch = (a.nombre || '').toLowerCase().includes(search) || 
                                         (a.apellidos || '').toLowerCase().includes(search) || 
                                         (a.dni || '').toLowerCase().includes(search);
                    return matchesSearch;
                  });

                  if (alumnosFiltrados.length === 0 && searchTermAlumno) return null;

                  return (
                    <div key={grado.id} style={{ border: '1px solid var(--border)', borderRadius: '10px', overflow: 'hidden' }}>
                      <div style={{ background: 'var(--background)', padding: '0.75rem 1rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h4 style={{ margin: 0, color: 'var(--primary)', fontSize: '0.9rem' }}>{grado.nombre}</h4>
                        
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <select
                            value={localAsigFilter}
                            onChange={e => setLocalGradoFilter(grado.id!, Number(e.target.value))}
                            style={{ padding: '0.3rem 0.5rem', fontSize: '0.75rem', minWidth: '150px' }}
                          >
                            <option value={0}>Ver todas las asignaturas</option>
                            {asigsDelGrado.map(asig => (
                              <option key={asig.id} value={asig.id}>{asig.nombre}</option>
                            ))}
                          </select>

                          <label style={{ fontSize: '0.75rem', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: 0, textTransform: 'none' }}>
                            <div className={`custom-checkbox ${alumnosFiltrados.length > 0 && alumnosFiltrados.every(a => selectedAlumnoIds.includes(a.id!)) ? 'checked' : ''}`}
                                 onClick={() => handleSelectAllInGrado(alumnosFiltrados.map(a => a.id!))}></div>
                            Seleccionar todos
                          </label>
                        </div>
                      </div>
                      <div style={{ maxHeight: '250px', overflowY: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                          <tbody style={{ fontSize: '0.85rem' }}>
                            {alumnosFiltrados.map(al => (
                              <tr 
                                key={al.id} 
                                onClick={() => handleToggleAlumno(al.id!)}
                                style={{ borderBottom: '1px solid var(--border)', cursor: 'pointer', background: selectedAlumnoIds.includes(al.id!) ? 'var(--primary-soft)' : 'transparent', transition: 'background 0.2s' }}
                              >
                                <td style={{ padding: '0.5rem 1rem', width: '30px' }}>
                                  <div className={`custom-checkbox ${selectedAlumnoIds.includes(al.id!) ? 'checked' : ''}`}></div>
                                </td>
                                <td style={{ padding: '0.5rem' }}>
                                  <div style={{ fontWeight: '600', color: selectedAlumnoIds.includes(al.id!) ? 'var(--primary)' : 'var(--text-main)' }}>{al.apellidos}, {al.nombre}</div>
                                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>{al.dni}</div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  );
                })}
             </div>

             <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Alumnos seleccionados:</span>
                  <span style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--primary)' }}>{selectedAlumnoIds.length}</span>
                </div>

                {successMsg && (
                  <div style={{ marginBottom: '1rem', padding: '0.75rem', background: '#ecfdf5', borderRadius: '8px', border: '1px solid var(--success)', color: '#065f46', fontSize: '0.85rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>{successMsg}</span>
                    <button onClick={() => window.location.href='/corregir-examen'} className="btn btn-primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}>IR A CORREGIR</button>
                  </div>
                )}
                
                <button 
                  disabled={selectedExamenId === 0 || selectedAlumnoIds.length === 0 || mutation.isPending}
                  onClick={() => { setSuccessMsg(null); mutation.mutate(); }}
                  className="btn btn-primary"
                  style={{ 
                    width: '100%', 
                    padding: '0.8rem', 
                    fontSize: '1rem',
                    opacity: (selectedExamenId === 0 || selectedAlumnoIds.length === 0) ? 0.5 : 1
                  }}
                >
                  {mutation.isPending ? 'PROCESANDO FIRMAS...' : 'VINCULAR MODELO A ' + selectedAlumnoIds.length + ' ALUMNOS'}
                </button>
                <p style={{ textAlign: 'center', fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.75rem', fontStyle: 'italic' }}>
                   * El sistema generará una clave alfanumérica única para el examen de cada alumno.
                </p>
             </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AsignarExamenPage;
