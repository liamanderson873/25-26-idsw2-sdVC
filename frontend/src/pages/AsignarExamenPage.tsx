import React, { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getExamenes, asignarExamen } from '../services/examenService';
import { getAlumnos } from '../services/alumnoService';
import { getGrados } from '../services/gradoService';
import { getAsignaturas } from '../services/asignaturaService';
import { Alumno, Grado, Asignatura } from '../types';

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
    <div style={{ maxWidth: '1200px' }}>
      <h1>Asignación de Alumnos</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem' }}>Vincula modelos de examen a grupos de alumnos específicos siguiendo el diseño RUP.</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: '350px 1fr', gap: '2.5rem', alignItems: 'start' }}>
        
        {/* PANEL IZQUIERDO: SELECCIÓN DE MODELO */}
        <section style={{ position: 'sticky', top: '2rem' }}>
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', boxShadow: 'var(--shadow)' }}>
            <h3 style={{ fontSize: '1rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
               <span style={{ background: 'var(--primary)', color: 'white', width: '24px', height: '24px', borderRadius: '50%', display: 'grid', placeItems: 'center', fontSize: '0.8rem' }}>1</span>
               Elegir Modelo
            </h3>
            <select 
              value={filterAsignaturaId} 
              onChange={e => setFilterAsignaturaId(Number(e.target.value))}
              style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid var(--border)', marginBottom: '1.5rem' }}
            >
              <option value={0}>Todas las Asignaturas</option>
              {(asignaturas || []).map(asig => <option key={asig.id} value={asig.id}>{asig.nombre}</option>)}
            </select>

            <div style={{ maxHeight: '500px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {examenesFiltrados.length === 0 ? (
                <p style={{ color: '#999', textAlign: 'center', padding: '1rem' }}>No hay modelos disponibles.</p>
              ) : (
                examenesFiltrados.map(ex => (
                  <div 
                    key={ex.id} 
                    onClick={() => setSelectedExamenId(ex.id)}
                    style={{ 
                      padding: '1rem', 
                      borderRadius: '10px', 
                      border: `2px solid ${selectedExamenId === ex.id ? 'var(--primary)' : 'transparent'}`,
                      background: selectedExamenId === ex.id ? '#eff6ff' : '#f8fafc',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    <div style={{ fontWeight: '600', fontSize: '0.9rem', color: selectedExamenId === ex.id ? 'var(--primary)' : 'var(--text-main)' }}>
                      {ex.asignatura?.nombre || 'Sin asignatura'}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>ID: {ex.id} • {ex.tipoEvaluacion?.replace('_', ' ')}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* PANEL DERECHO: SELECCIÓN DE ALUMNOS (AGRUPADOS POR GRADO) */}
        <section>
          <div style={{ background: 'white', padding: '2rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', boxShadow: 'var(--shadow)' }}>
             <h3 style={{ fontSize: '1rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ background: 'var(--primary)', color: 'white', width: '24px', height: '24px', borderRadius: '50%', display: 'grid', placeItems: 'center', fontSize: '0.8rem' }}>2</span>
                Destinatarios
             </h3>
             
             <div style={{ marginBottom: '2rem' }}>
                <input 
                  type="text" 
                  placeholder="🔍 Buscar alumno por nombre o DNI..." 
                  value={searchTermAlumno}
                  onChange={e => setSearchTermAlumno(e.target.value)}
                  style={{ width: '100%', padding: '0.8rem 1.2rem', borderRadius: '10px', border: '1px solid var(--border)', background: '#f8fafc', fontSize: '1rem' }}
                />
             </div>

             <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {grados.map(grado => {
                  const localAsigFilter = gradoFilters[grado.id!] || 0;
                  const asigsDelGrado = (asignaturas || []).filter(asig => asig.gradoId === grado.id);

                  // Filter logic: In this system, all students of a grade are candidates for all subjects of that grade.
                  // The filter is a visual confirmation for the teacher.
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
                    <div key={grado.id} style={{ border: '1px solid #edf2f7', borderRadius: '12px', overflow: 'hidden' }}>
                      <div style={{ background: '#f8fafc', padding: '1rem 1.5rem', borderBottom: '1px solid #edf2f7', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h4 style={{ margin: 0, color: 'var(--primary)', fontSize: '1rem' }}>{grado.nombre}</h4>
                        
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                          <select
                            value={localAsigFilter}
                            onChange={e => setLocalGradoFilter(grado.id!, Number(e.target.value))}
                            style={{ padding: '0.4rem 0.6rem', borderRadius: '6px', border: '1px solid #ddd', fontSize: '0.8rem', background: 'white', minWidth: '180px' }}
                          >
                            <option value={0}>Ver todas las asignaturas</option>
                            {asigsDelGrado.map(asig => (
                              <option key={asig.id} value={asig.id}>{asig.nombre}</option>
                            ))}
                          </select>

                          <label style={{ fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <input 
                              type="checkbox" 
                              checked={alumnosFiltrados.length > 0 && alumnosFiltrados.every(a => selectedAlumnoIds.includes(a.id!))}
                              onChange={() => handleSelectAllInGrado(alumnosFiltrados.map(a => a.id!))}
                            />
                            Seleccionar todos
                          </label>
                        </div>
                      </div>
                      <div style={{ maxHeight: '300px', overflowY: 'auto', padding: '0.5rem' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                          <tbody style={{ fontSize: '0.9rem' }}>
                            {alumnosFiltrados.map(al => (
                              <tr 
                                key={al.id} 
                                onClick={() => handleToggleAlumno(al.id!)}
                                style={{ borderBottom: '1px solid #f1f5f9', cursor: 'pointer', background: selectedAlumnoIds.includes(al.id!) ? '#f0f9ff' : 'transparent', transition: 'background 0.2s' }}
                              >
                                <td style={{ padding: '0.75rem 1.5rem', width: '40px' }}>
                                  <input type="checkbox" checked={selectedAlumnoIds.includes(al.id!)} readOnly />
                                </td>
                                <td style={{ padding: '0.75rem' }}>
                                  <div style={{ fontWeight: '600' }}>{al.apellidos}, {al.nombre}</div>
                                  <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontFamily: 'monospace' }}>{al.dni}</div>
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

             <div style={{ marginTop: '2.5rem', borderTop: '2px dashed var(--border)', paddingTop: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Alumnos seleccionados:</span>
                  <span style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--primary)' }}>{selectedAlumnoIds.length}</span>
                </div>

                {successMsg && (
                  <div style={{ marginBottom: '1.5rem', padding: '1.25rem', background: '#ecfdf5', borderRadius: '10px', border: '1px solid #10b981', color: '#065f46', fontSize: '0.9rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>✅ {successMsg}</span>
                    <button onClick={() => window.location.href='/corregir-examen'} style={{ background: '#10b981', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>IR A CORREGIR</button>
                  </div>
                )}
                
                <button 
                  disabled={selectedExamenId === 0 || selectedAlumnoIds.length === 0 || mutation.isPending}
                  onClick={() => { setSuccessMsg(null); mutation.mutate(); }}
                  style={{ 
                    width: '100%', 
                    padding: '1.25rem', 
                    background: 'var(--primary)', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '12px', 
                    fontWeight: '700',
                    fontSize: '1.1rem',
                    cursor: 'pointer',
                    boxShadow: '0 10px 15px -3px rgba(37, 99, 235, 0.4)',
                    opacity: (selectedExamenId === 0 || selectedAlumnoIds.length === 0) ? 0.5 : 1
                  }}
                >
                  {mutation.isPending ? 'PROCESANDO FIRMAS...' : 'VINCULAR MODELO A ' + selectedAlumnoIds.length + ' ALUMNOS'}
                </button>
                <p style={{ textAlign: 'center', fontSize: '0.75rem', color: '#94a3b8', marginTop: '1rem', fontStyle: 'italic' }}>
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
