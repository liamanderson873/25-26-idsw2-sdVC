import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getGrados, createGrado, deleteGrado } from '../services/gradoService';
import DataTable from '../components/DataTable';
import type { Grado } from '../types';

const GradosPage: React.FC = () => {
  const [nuevoNombre, setNuevoNombre] = useState('');
  const queryClient = useQueryClient();

  const { data: grados = [], isLoading } = useQuery({
    queryKey: ['grados'],
    queryFn: getGrados,
  });

  const createMutation = useMutation({
    mutationFn: createGrado,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['grados'] });
      setNuevoNombre('');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteGrado(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['grados'] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoNombre.trim()) return;
    createMutation.mutate({ nombre: nuevoNombre });
  };

  return (
    <div>
      <h1>Gestión de Grados</h1>
      
      <section style={{ marginBottom: '2rem', background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <h3>Añadir Nuevo Grado</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '1rem' }}>
          <input
            type="text"
            value={nuevoNombre}
            onChange={(e) => setNuevoNombre(e.target.value)}
            placeholder="Nombre del grado (ej. Ingeniería Informática)"
            style={{ flex: 1, padding: '0.6rem', borderRadius: '4px', border: '1px solid #ddd' }}
          />
          <button 
            type="submit" 
            disabled={createMutation.isPending}
            style={{ padding: '0.6rem 1.2rem', background: '#3498db', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            {createMutation.isPending ? 'Guardando...' : 'Añadir'}
          </button>
        </form>
      </section>

      <DataTable<Grado>
        data={grados}
        isLoading={isLoading}
        columns={[
          { header: 'ID', accessor: 'id' },
          { header: 'Nombre del Grado', accessor: 'nombre' }
        ]}
        onDelete={(grado) => grado.id && deleteMutation.mutate(grado.id)}
      />
    </div>
  );
};

export default GradosPage;


