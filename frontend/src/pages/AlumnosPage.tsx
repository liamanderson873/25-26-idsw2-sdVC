import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAlumnos, createAlumno, deleteAlumno } from '../services/alumnoService';
import { getGrados } from '../services/gradoService';
import DataTable from '../components/DataTable';
import type { Alumno } from '../types';

const AlumnosPage: React.FC = () => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
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

  const saveMutation = useMutation({
    mutationFn: (alumno: Alumno) => createAlumno(alumno),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alumnos'] });
      resetForm();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteAlumno(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alumnos'] });
    },
  });

  const resetForm = () => {
    setEditingId(null);
    setForm({ dni: '', nombre: '', apellidos: '', gradoId: 0 });
  };

  const handleEdit = (alumno: Alumno) => {
    setEditingId(alumno.id || null);
    setForm({ ...alumno });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.dni || !form.nombre || !form.apellidos || !form.gradoId) {
      alert('Por favor, rellena todos los campos obligatorios.');
      return;
    }
    saveMutation.mutate(form);
  };

  const filteredAlumnos = (alumnos || []).filter(a => 
    !searchTerm || 
    a.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
    a.apellidos.toLowerCase().includes(searchTerm.toLowerCase()) || 
    a.dni.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Gestión de Alumnos</h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button style={{ padding: '0.6rem 1.2rem', background: '#2ecc71', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>📥 Importar CSV</button>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ padding: '0.6rem 1.2rem', background: '#3498db', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>✨ Crear Nuevo</button>
        </div>
      </div>
      
      <section style={{ marginBottom: '2rem', background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', border: editingId ? '2px solid #e67e22' : 'none' }}>
        <h3>{editingId ? '📝 Editar Alumno' : '✨ Registrar Nuevo Alumno'}</h3>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem' }}>DNI</label>
            <input
              type="text"
              value={form.dni}
              onChange={(e) => setForm({...form, dni: e.target.value})}
              placeholder="Ej. 12345678A"
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
              {saveMutation.isPending ? 'Guardando...' : (editingId ? 'Guardar Cambios' : 'Registrar Alumno')}
            </button>
          </div>
        </form>
      </section>

      {/* Filtro de Búsqueda */}
      <div style={{ marginBottom: '1.5rem' }}>
        <input 
          type="text" 
          placeholder="🔍 Buscar por nombre, apellidos o DNI..." 
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd', background: '#f8fafc' }}
        />
      </div>

      <DataTable<Alumno>
        data={filteredAlumnos}
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
        onEdit={handleEdit}
        onDelete={(alumno) => alumno.id && deleteMutation.mutate(alumno.id)}
      />
    </div>
  );
};

export default AlumnosPage;


