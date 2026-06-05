import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAsignaturas, createAsignatura, deleteAsignatura } from '../services/asignaturaService';
import { getProfesores } from '../services/profesorService';
import { getGrados } from '../services/gradoService';
import DataTable from '../components/DataTable';
import type { Asignatura } from '../types';

const AsignaturasPage: React.FC = () => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [filterCurso, setFilterCurso] = useState('');
  const [filterGrado, setFilterGrado] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState('');

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
    },
  });

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
    <div>
      <h1>Gestión de Asignaturas</h1>

      {/* 1. Criterios de Búsqueda */}
      <section style={{ marginBottom: '2rem', background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
        <h3 style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>🔍 Criterios de Búsqueda</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.3rem' }}>Curso Académico</label>
            <input 
              value={filterCurso} 
              onChange={e => setFilterCurso(e.target.value)}
              placeholder="Ej. 2025/26"
              style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.3rem' }}>Grado Asociado</label>
            <select 
              value={filterGrado} 
              onChange={e => setFilterGrado(Number(e.target.value))}
              style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1' }}
            >
              <option value={0}>Todos los grados</option>
              {(grados || []).map(g => <option key={g.id} value={g.id}>{g.nombre}</option>)}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.3rem' }}>Búsqueda rápida</label>
            <input 
              value={searchTerm} 
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Nombre o código..."
              style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1' }}
            />
          </div>
        </div>
      </section>
      
      <section style={{ marginBottom: '2rem', background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', border: editingId ? '2px solid #e67e22' : 'none' }}>
        <h3>{editingId ? '📝 Editar Asignatura' : '✨ Nueva Asignatura'}</h3>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem' }}>Nombre</label>
            <input
              type="text"
              value={form.nombre}
              onChange={(e) => setForm({...form, nombre: e.target.value})}
              placeholder="Ej. Programación I"
              style={{ width: '100%', padding: '0.6rem', borderRadius: '4px', border: '1px solid #ddd' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem' }}>Código</label>
            <input
              type="text"
              value={form.codigo}
              onChange={(e) => setForm({...form, codigo: e.target.value})}
              placeholder="Ej. PROG1"
              style={{ width: '100%', padding: '0.6rem', borderRadius: '4px', border: '1px solid #ddd' }}
              disabled={!!editingId}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem' }}>Grado</label>
            <select
              value={form.gradoId}
              onChange={(e) => setForm({...form, gradoId: Number(e.target.value)})}
              style={{ width: '100%', padding: '0.6rem', borderRadius: '4px', border: '1px solid #ddd' }}
            >
              <option value={0}>Selecciona un grado...</option>
              {(grados || []).map(g => (
                <option key={g.id} value={g.id}>{g.nombre}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem' }}>Curso Académico</label>
            <input
              type="text"
              value={form.cursoAcademico}
              onChange={(e) => setForm({...form, cursoAcademico: e.target.value})}
              style={{ width: '100%', padding: '0.6rem', borderRadius: '4px', border: '1px solid #ddd' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem' }}>Profesor</label>
            <select
              value={form.dniProfesor}
              onChange={(e) => setForm({...form, dniProfesor: e.target.value})}
              style={{ width: '100%', padding: '0.6rem', borderRadius: '4px', border: '1px solid #ddd' }}
            >
              <option value="">Selecciona un profesor...</option>
              {(profesores || []).map(p => (
                <option key={p.id} value={p.dni}>{p.apellidos}, {p.nombre} ({p.dni})</option>
              ))}
            </select>
          </div>
          <div style={{ gridColumn: 'span 2', textAlign: 'right', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
            {editingId && (
              <button 
                type="button" 
                onClick={resetForm}
                style={{ padding: '0.7rem 2rem', background: '#95a5a6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                Cancelar
              </button>
            )}
            <button 
              type="submit" 
              disabled={saveMutation.isPending}
              style={{ padding: '0.7rem 2rem', background: editingId ? '#e67e22' : '#3498db', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              {saveMutation.isPending ? 'Guardando...' : (editingId ? 'Guardar Cambios' : 'Crear Asignatura')}
            </button>
          </div>
        </form>
      </section>

      <DataTable<Asignatura>
        data={filteredAsignaturas}
        isLoading={loadingAsig}
        columns={[
          { header: 'Código', accessor: 'codigo' },
          { header: 'Nombre de la Asignatura', accessor: 'nombre' },
          { header: 'Curso', accessor: 'cursoAcademico' },
          { 
            header: 'Grado', 
            accessor: (asig) => (grados || []).find(g => g.id === asig.gradoId)?.nombre || '...' 
          },
          { header: 'Profesor', accessor: (asig) => {
            const prof = (profesores || []).find(p => p.dni === asig.dniProfesor);
            return prof ? `${prof.apellidos}, ${prof.nombre}` : asig.dniProfesor;
          }}
        ]}
        onEdit={handleEdit}
        onDelete={(asig) => asig.id && deleteMutation.mutate(asig.id)}
      />
    </div>
  );
};

export default AsignaturasPage;


