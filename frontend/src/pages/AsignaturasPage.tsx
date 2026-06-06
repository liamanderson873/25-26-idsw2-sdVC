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


