import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProfesores, createProfesor, deleteProfesor } from '../services/profesorService';
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
    mutationFn: (prof: Profesor) => createProfesor(prof),
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
    <div>
      <h1>Gestión de Docentes</h1>
      
      <section style={{ marginBottom: '2rem', background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', border: editingId ? '2px solid #e67e22' : 'none' }}>
        <h3>{editingId ? '📝 Editar Docente' : '✨ Registrar Nuevo Docente'}</h3>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem' }}>DNI</label>
            <input
              type="text"
              value={form.dni}
              onChange={(e) => setForm({...form, dni: e.target.value})}
              placeholder="Ej. 12345678Z"
              style={{ width: '100%', padding: '0.6rem', borderRadius: '4px', border: '1px solid #ddd' }}
              disabled={!!editingId}
            />
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
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem' }}>Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({...form, email: e.target.value})}
              placeholder="ejemplo@uneatlantico.es"
              style={{ width: '100%', padding: '0.6rem', borderRadius: '4px', border: '1px solid #ddd' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem' }}>Usuario</label>
            <input
              type="text"
              value={form.usuario}
              onChange={(e) => setForm({...form, usuario: e.target.value})}
              placeholder="Usuario"
              style={{ width: '100%', padding: '0.6rem', borderRadius: '4px', border: '1px solid #ddd' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem' }}>Contraseña</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({...form, password: e.target.value})}
              placeholder="********"
              style={{ width: '100%', padding: '0.6rem', borderRadius: '4px', border: '1px solid #ddd' }}
            />
          </div>
          <div style={{ gridColumn: 'span 3', textAlign: 'right', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
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
              {saveMutation.isPending ? 'Guardando...' : (editingId ? 'Guardar Cambios' : 'Registrar Docente')}
            </button>
          </div>
        </form>
      </section>

      <DataTable<Profesor>
        data={profesores}
        isLoading={isLoading}
        columns={[
          { header: 'Nombre', accessor: 'nombre' },
          { header: 'Apellidos', accessor: 'apellidos' },
          { header: 'DNI', accessor: 'dni' },
          { header: 'Usuario', accessor: 'usuario' },
          { header: 'Email', accessor: 'email' },
          { header: 'Password', accessor: () => '********' }
        ]}
        onEdit={handleEdit}
        onDelete={(p) => p.id && deleteMutation.mutate(p.id)}
      />
    </div>
  );
};

export default ProfesoresPage;
