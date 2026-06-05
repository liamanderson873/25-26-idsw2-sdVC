import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getGrados, createGrado, deleteGrado } from '../services/gradoService';
import DataTable from '../components/DataTable';
import type { Grado } from '../types';

const GradosPage: React.FC = () => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<Grado>({ nombre: '', codigo: '' });
  const queryClient = useQueryClient();

  const { data: grados = [], isLoading } = useQuery({
    queryKey: ['grados'],
    queryFn: getGrados,
  });

  const saveMutation = useMutation({
    mutationFn: (grado: Grado) => createGrado(grado),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['grados'] });
      resetForm();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteGrado(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['grados'] });
    },
  });

  const resetForm = () => {
    setEditingId(null);
    setForm({ nombre: '', codigo: '' });
  };

  const handleEdit = (grado: Grado) => {
    setEditingId(grado.id || null);
    setForm({ ...grado });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nombre.trim() || !form.codigo.trim()) return;
    saveMutation.mutate(form);
  };

  return (
    <div>
      <h1>Gestión de Grados</h1>
      
      <section style={{ marginBottom: '2rem', background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', border: editingId ? '2px solid #e67e22' : 'none' }}>
        <h3>{editingId ? '📝 Editar Grado' : '✨ Añadir Nuevo Grado'}</h3>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '1rem', alignItems: 'end' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Código del Grado</label>
            <input
              type="text"
              value={form.codigo}
              onChange={(e) => setForm({...form, codigo: e.target.value})}
              placeholder="Ej. GII"
              style={{ width: '100%', padding: '0.6rem', borderRadius: '4px', border: '1px solid #ddd' }}
              disabled={!!editingId}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Nombre del Grado</label>
            <input
              type="text"
              value={form.nombre}
              onChange={(e) => setForm({...form, nombre: e.target.value})}
              placeholder="Ej. Ingeniería Informática"
              style={{ width: '100%', padding: '0.6rem', borderRadius: '4px', border: '1px solid #ddd' }}
            />
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {editingId && (
              <button 
                type="button" 
                onClick={resetForm}
                style={{ padding: '0.6rem 1.2rem', background: '#95a5a6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                Cancelar
              </button>
            )}
            <button 
              type="submit" 
              disabled={saveMutation.isPending}
              style={{ padding: '0.6rem 1.2rem', background: editingId ? '#e67e22' : '#3498db', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              {saveMutation.isPending ? 'Guardando...' : (editingId ? 'Guardar' : 'Añadir')}
            </button>
          </div>
        </form>
      </section>

      <DataTable<Grado>
        data={grados}
        isLoading={isLoading}
        columns={[
          { header: 'Código', accessor: 'codigo' },
          { header: 'Título del Grado', accessor: 'nombre' }
        ]}
        onEdit={handleEdit}
        onDelete={(grado) => grado.id && deleteMutation.mutate(grado.id)}
      />
    </div>
  );
};

export default GradosPage;


