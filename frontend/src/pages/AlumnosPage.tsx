import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { getAlumnos, createAlumno, deleteAlumno } from '../services/alumnoService';
import { getGrados } from '../services/gradoService';
import { getAsignaturas } from '../services/asignaturaService';
import { getConteosPorAlumno } from '../services/examenService';
import DataTable from '../components/DataTable';
import type { Alumno, Asignatura } from '../types';

const AlumnosPage: React.FC = () => {
  const navigate = useNavigate();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [form, setForm] = useState<Alumno>({
    dni: '', nombre: '', apellidos: '', curso: 1, gradoId: 0, asignaturaIds: [],
  });

  const queryClient = useQueryClient();

  const { data: alumnos = [], isLoading: loadingAlumnos } = useQuery({ queryKey: ['alumnos'],     queryFn: getAlumnos });
  const { data: grados = [] }      = useQuery({ queryKey: ['grados'],      queryFn: getGrados });
  const { data: asignaturas = [] } = useQuery({ queryKey: ['asignaturas'], queryFn: getAsignaturas });
  const { data: conteosAlumno = {} } = useQuery({ queryKey: ['conteos-alumnos'], queryFn: getConteosPorAlumno });

  const saveMutation = useMutation({
    mutationFn: (alumno: Alumno) => createAlumno(alumno),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['alumnos'] }); resetForm(); },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteAlumno(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['alumnos'] }),
  });

  const resetForm = () => {
    setEditingId(null);
    setForm({ dni: '', nombre: '', apellidos: '', curso: 1, gradoId: 0, asignaturaIds: [] });
  };

  const handleEdit = (alumno: Alumno) => {
    setEditingId(alumno.id || null);
    setForm({ ...alumno, asignaturaIds: alumno.asignaturaIds || [] });
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

  const toggleAsignatura = (id: number) => {
    const ids = form.asignaturaIds || [];
    setForm({ ...form, asignaturaIds: ids.includes(id) ? ids.filter(a => a !== id) : [...ids, id] });
  };

  const filteredAlumnos = alumnos.filter(a =>
    !searchTerm ||
    a.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.apellidos.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.dni.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const asignaturasDelGrado = asignaturas.filter(a => a.gradoId === form.gradoId);

  return (
    <div className="page-container fade-in">
      <div style={{ marginBottom: '1.5rem' }}>
        <h1>Gestión de Alumnos</h1>
        <p className="subtitle">Administración del censo estudiantil y matriculación por curso.</p>
      </div>

      <section className="card" style={{ marginBottom: '2rem', border: editingId ? '1px solid var(--primary)' : '1px solid var(--border)' }}>
        <h3 style={{ fontSize: '0.9rem', marginBottom: '1.25rem' }}>{editingId ? 'Modificar Matrícula' : 'Registrar Nuevo Alumno'}</h3>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem', marginBottom: '1.5rem' }}>
            <div>
              <label>Identificación (DNI)</label>
              <input type="text" value={form.dni} onChange={e => setForm({...form, dni: e.target.value})} placeholder="Ej. 12345678A" disabled={!!editingId} />
            </div>
            <div>
              <label>Nombre</label>
              <input type="text" value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})} placeholder="Nombre" />
            </div>
            <div>
              <label>Apellidos</label>
              <input type="text" value={form.apellidos} onChange={e => setForm({...form, apellidos: e.target.value})} placeholder="Apellidos" />
            </div>
            <div>
              <label>Año / Curso</label>
              <select value={form.curso} onChange={e => setForm({...form, curso: Number(e.target.value)})}>
                <option value={1}>1º Año</option><option value={2}>2º Año</option>
                <option value={3}>3º Año</option><option value={4}>4º Año</option>
              </select>
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <label>Grado Académico</label>
              <select value={form.gradoId} onChange={e => setForm({...form, gradoId: Number(e.target.value), asignaturaIds: []})}>
                <option value={0}>Selecciona un grado...</option>
                {grados.map(g => <option key={g.id} value={g.id}>{g.nombre}</option>)}
              </select>
            </div>
          </div>

          {form.gradoId > 0 && (
            <div style={{ marginBottom: '2rem', background: 'var(--background)', padding: '1.25rem', borderRadius: '12px' }}>
              <label style={{ marginBottom: '1rem' }}>Matriculación en Asignaturas</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {asignaturasDelGrado.length === 0 ? (
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>No hay asignaturas registradas para este grado.</p>
                ) : (
                  asignaturasDelGrado.map((asig: Asignatura) => (
                    <div key={asig.id} onClick={() => toggleAsignatura(asig.id!)} style={{
                      padding: '0.75rem', borderRadius: '10px', cursor: 'pointer',
                      border: `1px solid ${form.asignaturaIds?.includes(asig.id!) ? 'var(--primary)' : 'var(--border)'}`,
                      background: 'white', display: 'flex', alignItems: 'center', gap: '1rem', transition: 'all 0.2s',
                    }}>
                      <div className={`custom-checkbox ${form.asignaturaIds?.includes(asig.id!) ? 'checked' : ''}`}></div>
                      <span style={{ fontSize: '0.85rem', fontWeight: '600', color: form.asignaturaIds?.includes(asig.id!) ? 'var(--primary)' : 'var(--text-main)' }}>{asig.nombre}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
            {editingId && <button type="button" onClick={resetForm} className="btn btn-secondary">Cancelar</button>}
            <button type="submit" disabled={saveMutation.isPending} className="btn btn-primary" style={{ padding: '0.6rem 2.5rem' }}>
              {saveMutation.isPending ? '...' : (editingId ? 'Actualizar Matrícula' : 'Matricular Alumno')}
            </button>
          </div>
        </form>
      </section>

      <div style={{ marginBottom: '1.5rem', maxWidth: '400px' }}>
        <input type="text" placeholder="Buscar estudiante..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
      </div>

      <DataTable<Alumno>
        data={filteredAlumnos}
        isLoading={loadingAlumnos}
        columns={[
          { header: 'DNI', accessor: (al) => <code style={{ fontSize: '0.8rem' }}>{al.dni}</code> },
          { header: 'Apellidos y Nombre', accessor: (al) => (
            <div
              style={{ fontWeight: '700', color: 'var(--primary)', cursor: 'pointer' }}
              onClick={() => navigate(`/alumnos/${al.id}`)}
            >
              {al.apellidos}, {al.nombre}
            </div>
          )},
          { header: 'Curso', accessor: (al) => <span className="badge" style={{ background: '#f1f5f9', color: '#475569' }}>{al.curso}º Año</span> },
          { header: 'Grado', accessor: (al) => {
            if ((al as any).codigoGrado) return (al as any).codigoGrado;
            return grados.find(g => g.id === al.gradoId)?.nombre || '...';
          }},
          { header: 'Asigs.', accessor: (al) => <span style={{ fontWeight: '800', color: 'var(--primary)' }}>{al.asignaturaIds?.length || 0}</span> },
          { header: 'Exámenes', accessor: (al) => {
            const total = al.id ? (conteosAlumno[al.id] ?? 0) : 0;
            return (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontWeight: '800', color: total > 0 ? 'var(--primary)' : 'var(--text-muted)', minWidth: '1.2rem', textAlign: 'center' }}>{total}</span>
                <button
                  className="btn btn-secondary"
                  style={{ fontSize: '0.7rem', padding: '0.2rem 0.65rem' }}
                  onClick={() => navigate(`/alumnos/${al.id}`)}
                >
                  Ver
                </button>
              </div>
            );
          }},
        ]}
        onEdit={handleEdit}
        onDelete={(al) => al.id && deleteMutation.mutate(al.id)}
      />
    </div>
  );
};

export default AlumnosPage;
