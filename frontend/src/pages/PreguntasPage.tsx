import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getPreguntas, createPregunta, deletePregunta } from '../services/preguntaService';
import { getTemas, createTema, deleteTema } from '../services/temaService';
import { getAsignaturas } from '../services/asignaturaService';
import DataTable from '../components/DataTable';
import { Pregunta, Tema, Dificultad, Respuesta, Asignatura } from '../types';

const PreguntasPage: React.FC = () => {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<'preguntas' | 'temas'>('preguntas');
  const [searchEnunciado, setSearchEnunciado] = useState('');
  const [filterDificultad, setFilterDificultad] = useState<string>('');

  // Form states
  const [isEditing, setIsEditing] = useState(false);
  const [temaForm, setTemaForm] = useState<Tema>({ nombre: '', codigoAsignatura: '' });
  const [preguntaForm, setPreguntaForm] = useState<Pregunta>({
    enunciado: '',
    dificultad: Dificultad.MEDIO,
    temaId: 0,
    respuestas: [
      { contenido: '', esCorrecta: true, indice: 0 },
      { contenido: '', esCorrecta: false, indice: 1 },
      { contenido: '', esCorrecta: false, indice: 2 },
      { contenido: '', esCorrecta: false, indice: 3 },
    ]
  });

  // Queries
  const { data: preguntas = [], isLoading: loadingPregs } = useQuery({ queryKey: ['preguntas'], queryFn: getPreguntas });
  const { data: temas = [], isLoading: loadingTemas } = useQuery({ queryKey: ['temas'], queryFn: getTemas });
  const { data: asignaturas = [] } = useQuery({ queryKey: ['asignaturas'], queryFn: getAsignaturas });

  // Mutations
  const createPregMutation = useMutation({
    mutationFn: createPregunta,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['preguntas'] });
      resetForm();
    }
  });

  const createTemaMutation = useMutation({
    mutationFn: createTema,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['temas'] });
      setTemaForm({ nombre: '', codigoAsignatura: '' });
    }
  });

  const resetForm = () => {
    setIsEditing(false);
    setPreguntaForm({
      enunciado: '',
      dificultad: Dificultad.MEDIO,
      temaId: 0,
      respuestas: [
        { contenido: '', esCorrecta: true, indice: 0 },
        { contenido: '', esCorrecta: false, indice: 1 },
        { contenido: '', esCorrecta: false, indice: 2 },
        { contenido: '', esCorrecta: false, indice: 3 },
      ]
    });
  };

  const handleEditClick = (p: Pregunta) => {
    setPreguntaForm({ ...p });
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRespuestaChange = (index: number, field: keyof Respuesta, value: any) => {
    const newRespuestas = [...preguntaForm.respuestas];
    if (field === 'esCorrecta' && value === true) {
      newRespuestas.forEach((r, i) => r.esCorrecta = i === index);
    } else {
      (newRespuestas[index] as any)[field] = value;
    }
    setPreguntaForm({ ...preguntaForm, respuestas: newRespuestas });
  };

  const handleTemaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!temaForm.nombre || !temaForm.codigoAsignatura) {
      alert('Rellena los campos obligatorios del tema.');
      return;
    }
    createTemaMutation.mutate(temaForm);
  };

  const handleCreateOrUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!preguntaForm.enunciado || !preguntaForm.temaId) {
      alert('Rellena los campos obligatorios.');
      return;
    }
    createPregMutation.mutate(preguntaForm);
  };

  const filteredPreguntas = (preguntas || []).filter(p => {
    const matchesSearch = !searchEnunciado || p.enunciado.toLowerCase().includes(searchEnunciado.toLowerCase());
    const matchesDif = !filterDificultad || p.dificultad === filterDificultad;
    return matchesSearch && matchesDif;
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Batería de Preguntas</h1>
        <button style={{ padding: '0.6rem 1.2rem', background: '#2ecc71', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>📥 Importar Banco</button>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <button 
          onClick={() => setActiveTab('preguntas')}
          style={{ padding: '0.6rem 1.5rem', borderRadius: '4px', border: 'none', background: activeTab === 'preguntas' ? '#3498db' : '#ddd', color: activeTab === 'preguntas' ? 'white' : '#333', cursor: 'pointer', fontWeight: 'bold' }}
        >
          PREGUNTAS
        </button>
        <button 
          onClick={() => setActiveTab('temas')}
          style={{ padding: '0.6rem 1.5rem', borderRadius: '4px', border: 'none', background: activeTab === 'temas' ? '#3498db' : '#ddd', color: activeTab === 'temas' ? 'white' : '#333', cursor: 'pointer', fontWeight: 'bold' }}
        >
          TEMAS / UNIDADES
        </button>
      </div>

      {activeTab === 'preguntas' && (
        <section>
          {/* Formulario Preguntas */}
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', marginBottom: '2rem', border: isEditing ? '2px solid #e67e22' : 'none' }}>
            <h3>{isEditing ? '📝 Editando Pregunta (ID: ' + preguntaForm.id + ')' : '✨ Nueva Pregunta'}</h3>
            <form onSubmit={handleCreateOrUpdate}>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.3rem' }}>Enunciado</label>
                  <input 
                    placeholder="Enunciado de la pregunta" 
                    value={preguntaForm.enunciado} 
                    onChange={e => setPreguntaForm({...preguntaForm, enunciado: e.target.value})}
                    style={{ width: '100%', padding: '0.6rem', borderRadius: '4px', border: '1px solid #ddd' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.3rem' }}>Tema</label>
                  <select 
                    value={preguntaForm.temaId} 
                    onChange={e => setPreguntaForm({...preguntaForm, temaId: Number(e.target.value)})}
                    style={{ width: '100%', padding: '0.6rem', borderRadius: '4px', border: '1px solid #ddd' }}
                  >
                    <option value={0}>Selecciona Tema...</option>
                    {(temas || []).map((t: Tema) => <option key={t.id} value={t.id}>{t.nombre}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.3rem' }}>Dificultad</label>
                  <select 
                    value={preguntaForm.dificultad} 
                    onChange={e => setPreguntaForm({...preguntaForm, dificultad: e.target.value as Dificultad})}
                    style={{ width: '100%', padding: '0.6rem', borderRadius: '4px', border: '1px solid #ddd' }}
                  >
                    <option value={Dificultad.FACIL}>Fácil</option>
                    <option value={Dificultad.MEDIO}>Medio</option>
                    <option value={Dificultad.DIFICIL}>Difícil</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem', background: '#f8fafc', padding: '1rem', borderRadius: '8px' }}>
                <h4 style={{ margin: '0 0 1rem 0', fontSize: '0.9rem' }}>Opciones de Respuesta</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  {(preguntaForm.respuestas || []).map((resp: Respuesta, idx: number) => (
                    <div key={idx} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', alignItems: 'center' }}>
                      <input 
                        type="radio" 
                        name="correcta"
                        checked={resp.esCorrecta} 
                        onChange={() => handleRespuestaChange(idx, 'esCorrecta', true)}
                      />
                      <input 
                        placeholder={`Opción ${idx + 1}`} 
                        value={resp.contenido} 
                        onChange={e => handleRespuestaChange(idx, 'contenido', e.target.value)}
                        style={{ flex: 1, padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd' }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ textAlign: 'right', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                {isEditing && <button type="button" onClick={resetForm} style={{ padding: '0.7rem 2rem', background: '#95a5a6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Cancelar</button>}
                <button type="submit" disabled={createPregMutation.isPending} style={{ padding: '0.7rem 2rem', background: isEditing ? '#e67e22' : '#3498db', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                  {createPregMutation.isPending ? 'Guardando...' : (isEditing ? 'Guardar Cambios' : 'Crear Pregunta')}
                </button>
              </div>
            </form>
          </div>

          {/* Filtros de Búsqueda */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 200px', gap: '1rem', marginBottom: '1.5rem' }}>
            <input 
              placeholder="🔍 Buscar en enunciados..." 
              value={searchEnunciado}
              onChange={e => setSearchEnunciado(e.target.value)}
              style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd', background: '#f8fafc' }}
            />
            <select 
              value={filterDificultad} 
              onChange={e => setFilterDificultad(e.target.value)}
              style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd', background: '#f8fafc' }}
            >
              <option value="">Todas las Dificultades</option>
              <option value={Dificultad.FACIL}>Fácil</option>
              <option value={Dificultad.MEDIO}>Medio</option>
              <option value={Dificultad.DIFICIL}>Difícil</option>
            </select>
          </div>

          <DataTable<Pregunta>
            data={filteredPreguntas}
            isLoading={loadingPregs}
            columns={[
              { header: 'ID', accessor: 'id' },
              { header: 'Enunciado', accessor: 'enunciado' },
              { header: 'Dificultad', accessor: (p) => (
                <span style={{ 
                  padding: '2px 8px', 
                  borderRadius: '12px', 
                  fontSize: '0.75rem', 
                  fontWeight: 'bold',
                  background: p.dificultad === Dificultad.FACIL ? '#dcfce7' : p.dificultad === Dificultad.MEDIO ? '#fef3c7' : '#fee2e2',
                  color: p.dificultad === Dificultad.FACIL ? '#166534' : p.dificultad === Dificultad.MEDIO ? '#92400e' : '#991b1b'
                }}>
                  {p.dificultad}
                </span>
              )},
              { 
                header: 'Tema', 
                accessor: (p) => (temas || []).find(t => t.id === p.temaId)?.nombre || '...'
              }
            ]}
            onEdit={handleEditClick}
            onDelete={(p) => p.id && deletePregunta(p.id).then(() => queryClient.invalidateQueries({queryKey:['preguntas']}))}
          />
        </section>
      )}

      {activeTab === 'temas' && (
        <section>
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', marginBottom: '2rem' }}>
            <h3>✨ Nuevo Tema</h3>
            <form onSubmit={handleTemaSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '1rem', alignItems: 'end' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.4rem' }}>Nombre del Tema</label>
                <input 
                  value={temaForm.nombre} 
                  onChange={e => setTemaForm({...temaForm, nombre: e.target.value})}
                  placeholder="Ej. Tema 1: Introducción"
                  style={{ width: '100%', padding: '0.6rem', borderRadius: '4px', border: '1px solid #ddd' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.4rem' }}>Asignatura</label>
                <select 
                  value={temaForm.codigoAsignatura} 
                  onChange={e => setTemaForm({...temaForm, codigoAsignatura: e.target.value})}
                  style={{ width: '100%', padding: '0.6rem', borderRadius: '4px', border: '1px solid #ddd' }}
                >
                  <option value="">Selecciona Asignatura...</option>
                  {(asignaturas || []).map((asig: Asignatura) => (
                    <option key={asig.id} value={asig.codigo}>{asig.nombre} ({asig.codigo})</option>
                  ))}
                </select>
              </div>
              <button 
                type="submit" 
                disabled={createTemaMutation.isPending}
                style={{ padding: '0.7rem 2rem', background: '#3498db', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                {createTemaMutation.isPending ? 'Guardando...' : 'Crear Tema'}
              </button>
            </form>
          </div>

          <DataTable<Tema>
            data={temas}
            isLoading={loadingTemas}
            columns={[
              { header: 'ID', accessor: 'id' },
              { header: 'Nombre', accessor: 'nombre' },
              { 
                header: 'Asignatura', 
                accessor: (t) => {
                  const asig = (asignaturas || []).find(a => a.codigo === t.codigoAsignatura);
                  return asig ? `${asig.nombre} (${t.codigoAsignatura})` : t.codigoAsignatura;
                }
              }
            ]}
            onDelete={(t) => t.id && deleteTema(t.id).then(() => queryClient.invalidateQueries({queryKey:['temas']}))}
          />
        </section>
      )}
    </div>
  );
};

export default PreguntasPage;
