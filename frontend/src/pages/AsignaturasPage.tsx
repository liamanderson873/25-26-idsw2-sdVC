import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAsignaturas, createAsignatura, deleteAsignatura } from '../services/asignaturaService';
import { getProfesores } from '../services/profesorService';
import DataTable from '../components/DataTable';
import type { Asignatura } from '../types';

const AsignaturasPage: React.FC = () => {
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

  const { data: profesores = [], isLoading: loadingProfs } = useQuery({
    queryKey: ['profesores'],
    queryFn: getProfesores,
  });

  const { data: grados = [], isLoading: loadingGrados } = useQuery({
    queryKey: ['grados'],
    queryFn: getGrados,
  });

  const createMutation = useMutation({
    mutationFn: createAsignatura,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['asignaturas'] });
      setForm({ nombre: '', codigo: '', cursoAcademico: '2025/26', dniProfesor: '', gradoId: 0 });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteAsignatura(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['asignaturas'] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nombre || !form.codigo || !form.dniProfesor || !form.gradoId) {
      alert('Por favor, rellena todos los campos obligatorios.');
      return;
    }
    createMutation.mutate(form);
  };

  if (loadingAsig || loadingProfs || loadingGrados) {
    return <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>Cargando asignaturas...</div>;
  }

  return (
    <div>
      <h1>Gestión de Asignaturas</h1>
      
      <section style={{ marginBottom: '2rem', background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <h3>Nueva Asignatura</h3>
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
          <div style={{ gridColumn: 'span 2', textAlign: 'right' }}>
            <button 
              type="submit" 
              disabled={createMutation.isPending}
              style={{ padding: '0.7rem 2rem', background: '#3498db', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              {createMutation.isPending ? 'Guardando...' : 'Crear Asignatura'}
            </button>
          </div>
        </form>
      </section>

      <DataTable<Asignatura>
        data={asignaturas}
        isLoading={loadingAsig}
        columns={[
          { header: 'Código', accessor: 'codigo' },
          { header: 'Nombre', accessor: 'nombre' },
          { 
            header: 'Grado', 
            accessor: (asig) => (grados || []).find(g => g.id === asig.gradoId)?.nombre || '...' 
          },
          { header: 'Curso', accessor: 'cursoAcademico' },
          { header: 'DNI Profesor', accessor: 'dniProfesor' }
        ]}
        onDelete={(asig) => asig.id && deleteMutation.mutate(asig.id)}
      />
    </div>
  );
};

export default AsignaturasPage;


