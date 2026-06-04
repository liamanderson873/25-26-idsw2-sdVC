import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProfesores, createProfesor, deleteProfesor } from '../services/profesorService';
import DataTable from '../components/DataTable';
import type { Profesor } from '../types';

const ProfesoresPage: React.FC = () => {
  const [form, setForm] = useState<Profesor>({
    dni: '',
    nombre: '',
    apellidos: '',
    email: ''
  });
  
  const queryClient = useQueryClient();

  const { data: profesores = [], isLoading } = useQuery({
    queryKey: ['profesores'],
    queryFn: getProfesores,
  });

  const createMutation = useMutation({
    mutationFn: createProfesor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profesores'] });
      setForm({ dni: '', nombre: '', apellidos: '', email: '' });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteProfesor(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profesores'] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.dni || !form.nombre || !form.apellidos) return;
    createMutation.mutate(form);
  };

  return (
    <div>
      <h1>Gestión de Docentes</h1>
      
      <section style={{ marginBottom: '2rem', background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <h3>Nuevo Docente</h3>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <input
            type="text"
            value={form.dni}
            onChange={(e) => setForm({...form, dni: e.target.value})}
            placeholder="DNI"
            style={{ padding: '0.6rem', borderRadius: '4px', border: '1px solid #ddd' }}
          />
          <input
            type="text"
            value={form.nombre}
            onChange={(e) => setForm({...form, nombre: e.target.value})}
            placeholder="Nombre"
            style={{ padding: '0.6rem', borderRadius: '4px', border: '1px solid #ddd' }}
          />
          <input
            type="text"
            value={form.apellidos}
            onChange={(e) => setForm({...form, apellidos: e.target.value})}
            placeholder="Apellidos"
            style={{ padding: '0.6rem', borderRadius: '4px', border: '1px solid #ddd' }}
          />
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({...form, email: e.target.value})}
            placeholder="Email"
            style={{ padding: '0.6rem', borderRadius: '4px', border: '1px solid #ddd' }}
          />
          <div style={{ gridColumn: 'span 2', textAlign: 'right' }}>
            <button 
              type="submit" 
              disabled={createMutation.isPending}
              style={{ padding: '0.7rem 2rem', background: '#3498db', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              {createMutation.isPending ? 'Guardando...' : 'Añadir Docente'}
            </button>
          </div>
        </form>
      </section>

      <DataTable<Profesor>
        data={profesores}
        isLoading={isLoading}
        columns={[
          { header: 'DNI', accessor: 'dni' },
          { header: 'Nombre', accessor: 'nombre' },
          { header: 'Apellidos', accessor: 'apellidos' },
          { header: 'Email', accessor: 'email' }
        ]}
        onDelete={(profe) => profe.id && deleteMutation.mutate(profe.id)}
      />
    </div>
  );
};

export default ProfesoresPage;


