import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAlumnos, createAlumno, deleteAlumno } from '../services/alumnoService';
import { getGrados } from '../services/gradoService';
import DataTable from '../components/DataTable';
import type { Alumno } from '../types';

const AlumnosPage: React.FC = () => {
  const [form, setForm] = useState<Alumno>({
    dni: '',
    nombre: '',
    apellidos: '',
    gradoId: 0
  });
  
  const queryClient = useQueryClient();

  const { data: alumnos = [], isLoading: loadingAlumnos } = useQuery({
    queryKey: ['alumnos'],
    queryFn: getAlumnos,
  });

  const { data: grados = [] } = useQuery({
    queryKey: ['grados'],
    queryFn: getGrados,
  });

  const createMutation = useMutation({
    mutationFn: createAlumno,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alumnos'] });
      setForm({ dni: '', nombre: '', apellidos: '', gradoId: 0 });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteAlumno(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alumnos'] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.dni || !form.nombre || !form.apellidos || !form.gradoId) {
      alert('Por favor, rellena todos los campos obligatorios.');
      return;
    }
    createMutation.mutate(form);
  };

  if (loadingAlumnos) {
    return <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>Cargando alumnos...</div>;
  }

  return (
    <div>
      <h1>Gestión de Alumnos</h1>
      
      <section style={{ marginBottom: '2rem', background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <h3>Nuevo Alumno</h3>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem' }}>DNI</label>
            <input
              type="text"
              value={form.dni}
              onChange={(e) => setForm({...form, dni: e.target.value})}
              placeholder="Ej. 12345678A"
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
            <label style={{ display: 'block', marginBottom: '0.4rem' }}>Nombre</label>
            <input
              type="text"
              value={form.nombre}
              onChange={(e) => setForm({...form, nombre: e.target.value})}
              placeholder="Nombre"
              style={{ width: '100%', padding: '0.6rem', borderRadius: '4px', border: '1px solid #ddd' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem' }}>Apellidos</label>
            <input
              type="text"
              value={form.apellidos}
              onChange={(e) => setForm({...form, apellidos: e.target.value})}
              placeholder="Apellidos"
              style={{ width: '100%', padding: '0.6rem', borderRadius: '4px', border: '1px solid #ddd' }}
            />
          </div>
          <div style={{ gridColumn: 'span 2', textAlign: 'right' }}>
            <button 
              type="submit" 
              disabled={createMutation.isPending}
              style={{ padding: '0.7rem 2rem', background: '#3498db', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              {createMutation.isPending ? 'Guardando...' : 'Registrar Alumno'}
            </button>
          </div>
        </form>
      </section>

      <DataTable<Alumno>
        data={alumnos}
        isLoading={loadingAlumnos}
        columns={[
          { header: 'DNI', accessor: 'dni' },
          { header: 'Nombre', accessor: 'nombre' },
          { header: 'Apellidos', accessor: 'apellidos' },
          { 
            header: 'Grado', 
            accessor: (alumno) => {
              const grado = (grados || []).find(g => g.id === alumno.gradoId);
              return grado ? grado.nombre : '...';
            }
          }
        ]}
        onDelete={(alumno) => alumno.id && deleteMutation.mutate(alumno.id)}
      />
    </div>
  );
};

export default AlumnosPage;


