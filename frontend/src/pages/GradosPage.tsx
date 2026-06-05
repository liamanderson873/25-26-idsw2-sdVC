import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getGrados, createGrado, deleteGrado, updateGrado } from '../services/gradoService';
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
    mutationFn: (grado: Grado) => editingId ? updateGrado(editingId, grado) : createGrado(grado),
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
    if (!form.nombre.trim() || !form.codigo?.trim()) return;
    saveMutation.mutate(form);
  };

  return (
    <div className="page-container fade-in">
      <h1>Grados Académicos</h1>
      <p className="subtitle">Gestión de la oferta educativa y códigos institucionales.</p>
      
      <section className="card" style={{ marginBottom: '2rem', maxWidth: '800px', border: editingId ? '1px solid var(--primary)' : '1px solid var(--border)' }}>
        <h3 style={{ fontSize: '0.9rem', marginBottom: '1.25rem' }}>{editingId ? 'Editar Registro' : 'Añadir Nuevo Grado'}</h3>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '1rem', alignItems: 'end' }}>
          <div>
            <label>Código</label>
            <input
              type="text"
              value={form.codigo}
              onChange={(e) => setForm({...form, codigo: e.target.value})}
              placeholder="Ej. GII"
              disabled={!!editingId}
            />
          </div>
          <div>
            <label>Nombre del Grado</label>
            <input
              type="text"
              value={form.nombre}
              onChange={(e) => setForm({...form, nombre: e.target.value})}
              placeholder="Ej. Ingeniería Informática"
            />
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {editingId && (
              <button type="button" onClick={resetForm} className="btn btn-secondary">
                Cancelar
              </button>
            )}
            <button 
              type="submit" 
              disabled={saveMutation.isPending}
              className="btn btn-primary"
              style={{ minWidth: '100px' }}
            >
              {saveMutation.isPending ? '...' : (editingId ? 'Actualizar' : 'Añadir')}
            </button>
          </div>
        </form>
      </section>

      <DataTable<Grado>
        data={grados}
        isLoading={isLoading}
        columns={[
          { header: 'Código', accessor: (g) => g.codigo || '...' },
          { header: 'Título del Grado', accessor: 'nombre' }
        ]}
        onEdit={handleEdit}
        onDelete={(grado) => grado.id && deleteMutation.mutate(grado.id)}
      />
    </div>
  );
};

export default GradosPage;
