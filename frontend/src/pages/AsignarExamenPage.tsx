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
  const [filterGradoId, setFilterGradoId] = useState<number>(0);
  const [searchTermAlumno, setSearchTermAlumno] = useState('');
  const [filterAsignaturaId, setFilterAsignaturaId] = useState<number>(0);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Consultas con fallback inmediato para evitar bloqueos
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

  const alumnosFiltrados = useMemo(() => {
    return (alumnos || []).filter(a => {
      const matchGrado = !filterGradoId || a.gradoId === filterGradoId;
      const search = (searchTermAlumno || '').toLowerCase();
      return matchGrado && ((a.nombre || '').toLowerCase().includes(search) || (a.apellidos || '').toLowerCase().includes(search));
    });
  }, [alumnos, filterGradoId, searchTermAlumno]);

  const handleToggleAlumno = (id: number) => {
    setSelectedAlumnoIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
    <div style={{ maxWidth: '1200px' }}>
      <h1>Asignación de Alumnos</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem' }}>Vincula modelos de examen a grupos de alumnos específicos.</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '2.5rem' }}>
        
        {/* PANEL IZQUIERDO: MODELOS */}
        <section>
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', boxShadow: 'var(--shadow)' }}>
            <h3 style={{ fontSize: '1rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>1. Elegir Modelo</h3>
            <select 
              value={filterAsignaturaId} 
              onChange={e => setFilterAsignaturaId(Number(e.target.value))}
              style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid var(--border)', marginBottom: '1.5rem' }}
            >
              <option value={0}>Todas las Asignaturas</option>
              {(asignaturas || []).map(asig => <option key={asig.id} value={asig.id}>{asig.nombre}</option>)}
            </select>

            <div style={{ maxHeight: '500px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {examenesFiltrados.map(ex => (
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
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>ID: {ex.id} • {ex.tipoEvaluacion}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PANEL DERECHO: ALUMNOS */}
        <section>
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', boxShadow: 'var(--shadow)' }}>
             <h3 style={{ fontSize: '1rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>2. Seleccionar Grupo</h3>
             
             <div style={{ display: 'grid', gridTemplateColumns: '1fr 200px', gap: '1rem', marginBottom: '1.5rem' }}>
                <input 
                  type="text" 
                  placeholder="Buscar alumno..." 
                  value={searchTermAlumno}
                  onChange={e => setSearchTermAlumno(e.target.value)}
                  style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', background: '#f8fafc' }}
                />
                <select 
                  value={filterGradoId} 
                  onChange={e => setFilterGradoId(Number(e.target.value))}
                  style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', background: '#f8fafc' }}
                >
                  <option value={0}>Todos los Grados</option>
                  {(grados || []).map(g => <option key={g.id} value={g.id}>{g.nombre}</option>)}
                </select>
             </div>

             <div style={{ maxHeight: '400px', overflowY: 'auto', border: '1px solid var(--border)', borderRadius: '10px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <tbody style={{ fontSize: '0.9rem' }}>
                    {(alumnosFiltrados || []).map(al => (
                      <tr 
                        key={al.id} 
                        onClick={() => handleToggleAlumno(al.id!)}
                        style={{ borderBottom: '1px solid var(--border)', cursor: 'pointer', background: selectedAlumnoIds.includes(al.id!) ? '#f0f9ff' : 'transparent' }}
                      >
                        <td style={{ padding: '0.75rem 1.5rem', width: '40px' }}>
                          <input type="checkbox" checked={selectedAlumnoIds.includes(al.id!)} readOnly />
                        </td>
                        <td style={{ padding: '0.75rem' }}>{al.apellidos}, {al.nombre}</td>
                        <td style={{ padding: '0.75rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>{al.dni}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             </div>

             <div style={{ marginTop: '2rem' }}>
                {successMsg && (
                  <div style={{ marginBottom: '1rem', padding: '1rem', background: '#ecfdf5', borderRadius: '8px', border: '1px solid #10b981', color: '#065f46', fontSize: '0.85rem' }}>
                    {successMsg} 
                    <button onClick={() => window.location.href='/corregir-examen'} style={{ marginLeft: '10px', background: '#10b981', color: 'white', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}>IR A CORREGIR</button>
                  </div>
                )}
                <button 
                  disabled={selectedExamenId === 0 || selectedAlumnoIds.length === 0 || mutation.isPending}
                  onClick={() => { setSuccessMsg(null); mutation.mutate(); }}
                  style={{ 
                    width: '100%', 
                    padding: '1rem', 
                    background: 'var(--primary)', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '10px', 
                    fontWeight: '700',
                    cursor: 'pointer',
                    opacity: (selectedExamenId === 0 || selectedAlumnoIds.length === 0) ? 0.5 : 1
                  }}
                >
                  {mutation.isPending ? 'Asignando...' : 'VINCULAR MODELO (' + selectedAlumnoIds.length + ' ALUMNOS)'}
                </button>
             </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AsignarExamenPage;
