import React, { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getExamenes, asignarExamen } from '../services/examenService';
import { getAlumnos } from '../services/alumnoService';
import { getGrados } from '../services/gradoService';
import { getAsignaturas } from '../services/asignaturaService';
import { Alumno } from '../types';

const AsignarExamenPage: React.FC = () => {
  const queryClient = useQueryClient();

  // Estados de filtro jerárquico
  const [gradoId, setGradoId] = useState<number>(0);
  const [asignaturaId, setAsignaturaId] = useState<number>(0);
  const [selectedExamenId, setSelectedExamenId] = useState<number>(0);
  
  // Selección de alumnos
  const [selectedAlumnoIds, setSelectedAlumnoIds] = useState<number[]>([]);

  // Queries
  const { data: grados = [] } = useQuery({ queryKey: ['grados'], queryFn: getGrados });
  const { data: asignaturas = [] } = useQuery({ queryKey: ['asignaturas'], queryFn: getAsignaturas });
  const { data: examenes = [] } = useQuery({ queryKey: ['examenes'], queryFn: getExamenes });
  const { data: alumnos = [] } = useQuery({ queryKey: ['alumnos'], queryFn: getAlumnos });

  // Filtrado Lógico
  const asignaturasFiltradas = useMemo(() => 
    asignaturas.filter(a => gradoId === 0 || a.gradoId === gradoId || (a as any).gradoIds?.includes(gradoId)),
  [asignaturas, gradoId]);

  const examenesFiltrados = useMemo(() => 
    examenes.filter(e => asignaturaId === 0 || e.asignatura?.id === asignaturaId),
  [examenes, asignaturaId]);

  const alumnosMatriculados = useMemo(() => {
    if (asignaturaId === 0) return [];
    // Solo alumnos que tengan el ID de la asignatura en su lista de matrículas
    return alumnos.filter(al => al.asignaturaIds?.includes(asignaturaId));
  }, [alumnos, asignaturaId]);

  // Mutación
  const mutation = useMutation({
    mutationFn: () => asignarExamen(selectedExamenId, selectedAlumnoIds),
    onSuccess: () => {
      alert("Exámenes asignados con éxito. Se han generado las firmas SHA-256.");
      setSelectedAlumnoIds([]);
      queryClient.invalidateQueries({ queryKey: ['ejemplares'] });
    }
  });

  const handleToggleAlumno = (id: number) => {
    setSelectedAlumnoIds(prev => 
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedAlumnoIds.length === alumnosMatriculados.length) {
      setSelectedAlumnoIds([]);
    } else {
      setSelectedAlumnoIds(alumnosMatriculados.map(a => a.id!));
    }
  };

  return (
    <div className="page-container fade-in">
      <h1>Asignar Exámenes</h1>
      <p className="subtitle">Vincule modelos de examen con estudiantes matriculados para generar sus ejemplares únicos.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '2rem', alignItems: 'start' }}>
        
        {/* PANEL IZQUIERDO: SELECCIÓN DE MODELO */}
        <aside>
          <div className="card">
            <h3 style={{ fontSize: '0.9rem', marginBottom: '1.25rem' }}>Configuración del Modelo</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
               <div>
                  <label>Grado</label>
                  <select value={gradoId} onChange={e => { setGradoId(Number(e.target.value)); setAsignaturaId(0); setSelectedExamenId(0); }}>
                    <option value={0}>Seleccionar Grado...</option>
                    {grados.map(g => <option key={g.id} value={g.id}>{g.nombre}</option>)}
                  </select>
               </div>
               <div>
                  <label>Asignatura</label>
                  <select 
                    value={asignaturaId} 
                    onChange={e => { setAsignaturaId(Number(e.target.value)); setSelectedExamenId(0); }}
                    disabled={!gradoId}
                  >
                    <option value={0}>Seleccionar Asignatura...</option>
                    {asignaturasFiltradas.map(a => <option key={a.id} value={a.id}>{a.nombre}</option>)}
                  </select>
               </div>
               <div>
                  <label>Modelo de Examen</label>
                  <select 
                    value={selectedExamenId} 
                    onChange={e => setSelectedExamenId(Number(e.target.value))}
                    disabled={!asignaturaId}
                  >
                    <option value={0}>Seleccionar Modelo...</option>
                    {examenesFiltrados.map(ex => (
                      <option key={ex.id} value={ex.id}>ID: {ex.id} - {ex.tipoEvaluacion?.replace('_', ' ')}</option>
                    ))}
                  </select>
               </div>
            </div>
          </div>
        </aside>

        {/* PANEL DERECHO: SELECCIÓN DE ALUMNOS */}
        <section>
          <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
             <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc' }}>
                <div>
                  <h3 style={{ fontSize: '0.9rem' }}>Alumnos Matriculados</h3>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Solo se muestran alumnos inscritos en la asignatura seleccionada.</p>
                </div>
                {asignaturaId > 0 && (
                  <button onClick={handleSelectAll} className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}>
                    {selectedAlumnoIds.length === alumnosMatriculados.length ? 'Desmarcar todos' : 'Seleccionar todos'}
                  </button>
                )}
             </div>

             <div style={{ maxHeight: '450px', overflowY: 'auto' }}>
                {asignaturaId === 0 ? (
                  <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                    <p>Seleccione una asignatura para ver los alumnos matriculados.</p>
                  </div>
                ) : alumnosMatriculados.length === 0 ? (
                  <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                    <p>No hay alumnos matriculados en esta asignatura.</p>
                  </div>
                ) : (
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <tbody>
                      {alumnosMatriculados.map(al => (
                        <tr 
                          key={al.id} 
                          onClick={() => handleToggleAlumno(al.id!)}
                          style={{ borderBottom: '1px solid var(--border)', cursor: 'pointer', background: selectedAlumnoIds.includes(al.id!) ? 'var(--primary-soft)' : 'transparent', transition: 'background 0.2s' }}
                        >
                          <td style={{ padding: '1rem 1.5rem', width: '40px' }}>
                            <div className={`custom-checkbox ${selectedAlumnoIds.includes(al.id!) ? 'checked' : ''}`}></div>
                          </td>
                          <td style={{ padding: '1rem' }}>
                            <div style={{ fontWeight: '700', color: selectedAlumnoIds.includes(al.id!) ? 'var(--primary)' : 'var(--text-main)' }}>{al.apellidos}, {al.nombre}</div>
                            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>{al.dni} • {al.curso}º Año</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
             </div>

             <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: '600' }}>
                  Seleccionados: <span style={{ color: 'var(--primary)', fontWeight: '800' }}>{selectedAlumnoIds.length}</span> alumnos
                </div>
                <button 
                  className="btn btn-primary"
                  disabled={selectedAlumnoIds.length === 0 || selectedExamenId === 0 || mutation.isPending}
                  onClick={() => mutation.mutate()}
                  style={{ padding: '0.8rem 2.5rem' }}
                >
                  {mutation.isPending ? 'ASIGNANDO...' : 'CONFIRMAR ASIGNACIÓN'}
                </button>
             </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AsignarExamenPage;
