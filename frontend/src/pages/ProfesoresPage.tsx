import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProfesores, createProfesor, deleteProfesor, updateProfesor } from '../services/profesorService';
import DataTable from '../components/DataTable';
import type { Profesor } from '../types';

const ProfesoresPage: React.FC = () => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<Profesor>({
    dni: '',
    nombre: '',
    apellidos: '',
    email: '',
    usuario: '',
    password: ''
  });

  const queryClient = useQueryClient();

  const { data: profesores = [], isLoading } = useQuery({
    queryKey: ['profesores'],
    queryFn: getProfesores,
  });

  const saveMutation = useMutation({
    mutationFn: (prof: Profesor) => editingId ? updateProfesor(editingId, prof) : createProfesor(prof),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profesores'] });
      resetForm();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteProfesor(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profesores'] });
    },
  });

  const resetForm = () => {
    setEditingId(null);
    setForm({ dni: '', nombre: '', apellidos: '', email: '', usuario: '', password: '' });
  };

  const handleEdit = (p: Profesor) => {
    setEditingId(p.id || null);
    setForm({ ...p });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.dni || !form.nombre || !form.apellidos || !form.email || !form.usuario || !form.password) {
      alert('Todos los campos son obligatorios.');
      return;
    }
    saveMutation.mutate(form);
  };

  return (
    <div className="page-container fade-in">
      <h1>Cuerpo Docente</h1>
      <p className="subtitle">Administración de credenciales y perfiles del profesorado institucional.</p>
      
      <section className="card" style={{ marginBottom: '2rem', border: editingId ? '1px solid var(--primary)' : '1px solid var(--border)' }}>
        <h3 style={{ fontSize: '0.9rem', marginBottom: '1.25rem' }}>{editingId ? 'Modificar Perfil' : 'Registrar Nuevo Docente'}</h3>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
          <div>
            <label>Identificación (DNI)</label>
            <input
              type="text"
              value={form.dni}
              onChange={(e) => setForm({...form, dni: e.target.value})}
              placeholder="Ej. 12345678Z"
              disabled={!!editingId}
            />
          </div>
          <div>
            <label>Nombre</label>
            <input
              type="text"
              value={form.nombre}
              onChange={(e) => setForm({...form, nombre: e.target.value})}
              placeholder="Nombre"
            />
          </div>
          <div>
            <label>Apellidos</label>
            <input
              type="text"
              value={form.apellidos}
              onChange={(e) => setForm({...form, apellidos: e.target.value})}
              placeholder="Apellidos"
            />
          </div>
          <div>
            <label>Correo Institucional</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({...form, email: e.target.value})}
              placeholder="ejemplo@uneatlantico.es"
            />
          </div>
          <div>
            <label>Usuario</label>
            <input
              type="text"
              value={form.usuario}
              onChange={(e) => setForm({...form, usuario: e.target.value})}
              placeholder="Nombre de usuario"
            />
          </div>
          <div>
            <label>Contraseña</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({...form, password: e.target.value})}
              placeholder="********"
            />
          </div>
          <div style={{ gridColumn: 'span 3', display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '0.5rem' }}>
            {editingId && (
              <button type="button" onClick={resetForm} className="btn btn-secondary">
                Cancelar
              </button>
            )}
            <button 
              type="submit" 
              disabled={saveMutation.isPending}
              className="btn btn-primary"
              style={{ padding: '0.6rem 2.5rem' }}
            >
              {saveMutation.isPending ? '...' : (editingId ? 'Guardar Cambios' : 'Registrar Docente')}
            </button>
          </div>
        </form>
      </section>

      <DataTable<Profesor>
        data={profesores}
        isLoading={isLoading}
        columns={[
          { header: 'Apellidos y Nombre', accessor: (p) => <div style={{ fontWeight: '700', color: 'var(--text-main)' }}>{p.apellidos}, {p.nombre}</div> },
          { header: 'Identificación', accessor: (p) => <code style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{p.dni}</code> },
          { header: 'Usuario', accessor: 'usuario' },
          { header: 'Email', accessor: (p) => <span style={{ fontSize: '0.85rem' }}>{p.email}</span> },
        ]}
        onEdit={handleEdit}
        onDelete={(p) => p.id && deleteMutation.mutate(p.id)}
      />
    </div>
  );
};

export default ProfesoresPage;
