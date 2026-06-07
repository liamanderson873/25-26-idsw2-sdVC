import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAsignaturas, createAsignatura, deleteAsignatura } from '../services/asignaturaService';
import { getProfesores } from '../services/profesorService';
import { getGrados } from '../services/gradoService';
import { getExamenesPorAsignatura } from '../services/examenService';
import DataTable from '../components/DataTable';
import RevisionModal from '../components/RevisionModal';
import type { Asignatura } from '../types';

const ESTADO_STYLE: Record<string, { bg: string; color: string; label: string }> = {
  ASIGNADO:               { bg: '#eff6ff', color: '#2563eb', label: 'Asignado' },
  PENDIENTE:              { bg: '#fefce8', color: '#ca8a04', label: 'Pendiente' },
  ENTREGADO:              { bg: '#fff7ed', color: '#ea580c', label: 'Entregado' },
  PENDIENTE_CALIFICACION: { bg: '#faf5ff', color: '#9333ea', label: 'Pendiente Cal.' },
  CORREGIDO:              { bg: '#f0fdf4', color: '#16a34a', label: 'Corregido' },
};

const AsignaturasPage: React.FC = () => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [filterCurso, setFilterCurso] = useState('');
  const [filterGrado, setFilterGrado] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAsignatura, setSelectedAsignatura] = useState<Asignatura | null>(null);
  const [revisionEjemplarId, setRevisionEjemplarId] = useState<number | null>(null);

  const [form, setForm] = useState<Asignatura>({
    nombre: '',
    codigo: '',
    cursoAcademico: '2025/26',
    dniProfesor: '',
    gradoId: 0
  });
  
  const queryClient = useQueryClient();

  const { data: asignaturas = [], isLoading: loadingAsig } = useQuery({
    queryKey: ['asignaturas'],
    queryFn: getAsignaturas,
  });

  const { data: profesores = [] } = useQuery({
    queryKey: ['profesores'],
    queryFn: getProfesores,
  });

  const { data: grados = [] } = useQuery({
    queryKey: ['grados'],
    queryFn: getGrados,
  });

  const { data: examenesAsignatura = [], isLoading: loadingExamenes } = useQuery({
    queryKey: ['examenes-asignatura', selectedAsignatura?.id],
    queryFn: () => getExamenesPorAsignatura(selectedAsignatura!.id!),
    enabled: !!selectedAsignatura?.id,
  });

  const saveMutation = useMutation({
    mutationFn: (asig: Asignatura) => createAsignatura(asig),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['asignaturas'] });
      resetForm();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteAsignatura(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['asignaturas'] });
      setSelectedAsignatura(null);
    },
  });

  const handleRowClick = (asig: Asignatura) => {
    setSelectedAsignatura(prev => prev?.id === asig.id ? null : asig);
    setEditingId(null);
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({ nombre: '', codigo: '', cursoAcademico: '2025/26', dniProfesor: '', gradoId: 0 });
  };

  const handleEdit = (asig: Asignatura) => {
    setEditingId(asig.id || null);
    setForm({ ...asig });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nombre || !form.codigo || !form.dniProfesor || !form.gradoId) {
      alert('Por favor, rellena todos los campos obligatorios.');
      return;
    }
    saveMutation.mutate(form);
  };

  const filteredAsignaturas = (asignaturas || []).filter(asig => {
    const matchesCurso = !filterCurso || asig.cursoAcademico.includes(filterCurso);
    const matchesGrado = !filterGrado || asig.gradoId === filterGrado;
    const matchesSearch = !searchTerm || 
      asig.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
      asig.codigo.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCurso && matchesGrado && matchesSearch;
  });

  return (
    <div className="fade-in">
      <h1>Gestión de Asignaturas</h1>

      {/* 1. Criterios de Búsqueda */}
      <section className="card" style={{ marginBottom: '1.5rem', background: 'var(--primary-soft)', border: '1px solid var(--primary-light)' }}>
        <h3 style={{ fontSize: '0.8rem', color: 'var(--primary)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '800' }}>Criterios de Búsqueda</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr', gap: '1rem' }}>
          <div>
            <label>Curso Académico</label>
            <input 
              value={filterCurso} 
              onChange={e => setFilterCurso(e.target.value)}
              placeholder="Ej. 2025/26"
            />
          </div>
          <div>
            <label>Grado Asociado</label>
            <select 
              value={filterGrado} 
              onChange={e => setFilterGrado(Number(e.target.value))}
            >
              <option value={0}>Todos los grados</option>
              {(grados || []).map(g => <option key={g.id} value={g.id}>{g.nombre}</option>)}
            </select>
          </div>
          <div>
            <label>Búsqueda rápida</label>
            <input 
              value={searchTerm} 
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Nombre o código..."
            />
          </div>
        </div>
      </section>
      
      <section className="card" style={{ marginBottom: '1.5rem', border: editingId ? '2px solid var(--primary)' : '1px solid var(--border)' }}>
        <h2 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>{editingId ? 'Editar Asignatura' : 'Nueva Asignatura'}</h2>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label>Nombre</label>
            <input
              type="text"
              value={form.nombre}
              onChange={(e) => setForm({...form, nombre: e.target.value})}
              placeholder="Ej. Programación I"
            />
          </div>
          <div>
            <label>Código</label>
            <input
              type="text"
              value={form.codigo}
              onChange={(e) => setForm({...form, codigo: e.target.value})}
              placeholder="Ej. PROG1"
              disabled={!!editingId}
            />
          </div>
          <div>
            <label>Grado</label>
            <select
              value={form.gradoId}
              onChange={(e) => setForm({...form, gradoId: Number(e.target.value)})}
            >
              <option value={0}>Selecciona un grado...</option>
              {(grados || []).map(g => (
                <option key={g.id} value={g.id}>{g.nombre}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Curso Académico</label>
            <input
              type="text"
              value={form.cursoAcademico}
              onChange={(e) => setForm({...form, cursoAcademico: e.target.value})}
            />
          </div>
          <div style={{ gridColumn: 'span 2' }}>
            <label>Profesor</label>
            <select
              value={form.dniProfesor}
              onChange={(e) => setForm({...form, dniProfesor: e.target.value})}
            >
              <option value="">Selecciona un profesor...</option>
              {(profesores || []).map(p => (
                <option key={p.id} value={p.dni}>{p.apellidos}, {p.nombre} ({p.dni})</option>
              ))}
            </select>
          </div>
          <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
            {editingId && (
              <button 
                type="button" 
                onClick={resetForm}
                className="btn btn-secondary"
              >
                Cancelar
              </button>
            )}
            <button 
              type="submit" 
              disabled={saveMutation.isPending}
              className="btn btn-primary"
              style={{ minWidth: '160px' }}
            >
              {saveMutation.isPending ? 'Guardando...' : (editingId ? 'Guardar Cambios' : 'Crear Asignatura')}
            </button>
          </div>
        </form>
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: selectedAsignatura ? '1fr 420px' : '1fr', gap: '1.5rem', alignItems: 'start' }}>
        <DataTable<Asignatura>
          data={filteredAsignaturas}
          isLoading={loadingAsig}
          columns={[
            { header: 'Código', accessor: 'codigo' },
            { header: 'Nombre de la Asignatura', accessor: (asig) => (
              <div style={{ fontWeight: '700', color: selectedAsignatura?.id === asig.id ? 'var(--primary)' : 'var(--text-main)', cursor: 'pointer' }}
                onClick={() => handleRowClick(asig)}>
                {asig.nombre}
              </div>
            )},
            { header: 'Curso', accessor: 'cursoAcademico' },
            { header: 'Grado', accessor: (asig) => (grados || []).find(g => g.id === asig.gradoId)?.nombre || '...' },
            { header: 'Profesor', accessor: (asig) => {
              const prof = (profesores || []).find(p => p.dni === asig.dniProfesor);
              return prof ? `${prof.apellidos}, ${prof.nombre}` : asig.dniProfesor;
            }},
            { header: 'Exámenes', accessor: (asig) => (
              <button className="btn btn-secondary"
                style={{ fontSize: '0.7rem', padding: '0.2rem 0.65rem', background: selectedAsignatura?.id === asig.id ? 'var(--primary-light)' : undefined, color: selectedAsignatura?.id === asig.id ? 'var(--primary)' : undefined }}
                onClick={() => handleRowClick(asig)}>
                {selectedAsignatura?.id === asig.id ? 'Cerrar' : 'Ver'}
              </button>
            )},
          ]}
          onEdit={handleEdit}
          onDelete={(asig) => asig.id && deleteMutation.mutate(asig.id)}
        />

        {selectedAsignatura && (
          <div className="card fade-in" style={{ padding: 0, overflow: 'hidden', position: 'sticky', top: '1rem' }}>
            <div style={{ padding: '1rem 1.25rem', background: 'var(--primary-light)', borderBottom: '1px solid var(--border)' }}>
              <div style={{ fontSize: '0.65rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--primary)', marginBottom: '0.2rem' }}>
                Exámenes de la asignatura
              </div>
              <div style={{ fontWeight: '800', fontSize: '0.95rem', color: 'var(--text-main)' }}>
                {selectedAsignatura.nombre}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{selectedAsignatura.codigo} · {selectedAsignatura.cursoAcademico}</div>
            </div>

            <div style={{ maxHeight: '520px', overflowY: 'auto' }}>
              {loadingExamenes ? (
                <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>Cargando...</div>
              ) : examenesAsignatura.length === 0 ? (
                <div style={{ padding: '2.5rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  Esta asignatura no tiene exámenes asignados.
                </div>
              ) : (
                examenesAsignatura.map((ex: any) => {
                  const est = ESTADO_STYLE[ex.estado] ?? { bg: '#f1f5f9', color: '#475569', label: ex.estado };
                  return (
                    <div key={ex.id} style={{ padding: '0.875rem 1.25rem', borderBottom: '1px solid var(--surface-3)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.35rem' }}>
                        <div style={{ fontWeight: '700', fontSize: '0.85rem', color: 'var(--text-main)', flex: 1, paddingRight: '0.5rem' }}>
                          {ex.alumnoApellidos}, {ex.alumnoNombre}
                        </div>
                        <span style={{ fontSize: '0.68rem', fontWeight: '700', padding: '0.2rem 0.6rem', borderRadius: '999px', background: est.bg, color: est.color, flexShrink: 0 }}>
                          {est.label}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>{ex.alumnoDni}</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                          <span>{ex.tipoEvaluacion?.replace(/_/g, ' ')}</span>
                          <span>·</span>
                          <span>{ex.fechaExamen}</span>
                          {ex.notaFinal != null && (
                            <>
                              <span>·</span>
                              <span style={{ fontWeight: '800', color: ex.notaFinal >= 5 ? 'var(--success)' : 'var(--danger)' }}>
                                {ex.notaFinal.toFixed(2)}
                              </span>
                            </>
                          )}
                        </div>
                        <button
                          className="btn btn-secondary"
                          style={{ fontSize: '0.65rem', padding: '0.15rem 0.55rem' }}
                          onClick={() => setRevisionEjemplarId(ex.id)}
                        >
                          Revisar
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>

      {revisionEjemplarId && (
        <RevisionModal ejemplarId={revisionEjemplarId} onClose={() => setRevisionEjemplarId(null)} />
      )}
    </div>
  );
};

export default AsignaturasPage;


