import React, { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { getPreguntas, createPregunta, deletePregunta, toggleHabilitadaPregunta } from '../services/preguntaService';
import { getTemas } from '../services/temaService';
import { getAsignaturas } from '../services/asignaturaService';
import { getGrados } from '../services/gradoService';
import DataTable from '../components/DataTable';
import { Pregunta, Dificultad, Respuesta } from '../types';

const DIF_LABELS: Record<Dificultad, string> = {
  [Dificultad.BAJA]:  'Baja',
  [Dificultad.MEDIA]: 'Media',
  [Dificultad.ALTA]:  'Alta',
};

const PreguntasPage: React.FC = () => {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const [selectedAsignaturaId, setSelectedAsignaturaId] = useState<number | null>(
    searchParams.get('asignaturaId') ? Number(searchParams.get('asignaturaId')) : null
  );
  const [searchAsig, setSearchAsig] = useState('');
  const [filterGradoId, setFilterGradoId] = useState<number>(0);
  const [filterTemaId, setFilterTemaId] = useState<number>(0);
  const [filterDificultad, setFilterDificultad] = useState<string>('');
  const [mostrarSoloHabilitadas, setMostrarSoloHabilitadas] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [preguntaForm, setPreguntaForm] = useState<Pregunta>({
    enunciado: '',
    dificultad: Dificultad.MEDIA,
    temaId: 0,
    habilitada: true,
    respuestas: [
      { contenido: '', esCorrecta: true },
      { contenido: '', esCorrecta: false },
      { contenido: '', esCorrecta: false },
      { contenido: '', esCorrecta: false },
    ]
  });

  const { data: preguntas = [], isLoading: loadingPregs } = useQuery({ queryKey: ['preguntas'], queryFn: getPreguntas });
  const { data: temas = [] } = useQuery({ queryKey: ['temas'], queryFn: getTemas });
  const { data: asignaturas = [] } = useQuery({ queryKey: ['asignaturas'], queryFn: getAsignaturas });
  const { data: grados = [] } = useQuery({ queryKey: ['grados'], queryFn: getGrados });

  const createPregMutation = useMutation({
    mutationFn: createPregunta,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['preguntas'] });
      resetForm();
    }
  });

  const deletePregMutation = useMutation({
    mutationFn: deletePregunta,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['preguntas'] })
  });

  const toggleMutation = useMutation({
    mutationFn: toggleHabilitadaPregunta,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['preguntas'] })
  });

  const resetForm = () => {
    setIsEditing(false);
    setPreguntaForm({
      enunciado: '',
      dificultad: Dificultad.MEDIA,
      temaId: 0,
      habilitada: true,
      respuestas: [
        { contenido: '', esCorrecta: true },
        { contenido: '', esCorrecta: false },
        { contenido: '', esCorrecta: false },
        { contenido: '', esCorrecta: false },
      ]
    });
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

  const asignaturasFiltradas = useMemo(() => {
    return asignaturas.filter(asig => {
      const matchesGrado = filterGradoId === 0 || asig.gradoId === filterGradoId;
      const matchesSearch = !searchAsig || asig.nombre.toLowerCase().includes(searchAsig.toLowerCase());
      return matchesGrado && matchesSearch;
    });
  }, [asignaturas, filterGradoId, searchAsig]);

  const preguntasFiltradas = useMemo(() => {
    if (!selectedAsignaturaId) return [];
    const asig = asignaturas.find(a => a.id === selectedAsignaturaId);
    return preguntas.filter(p => {
      const tema = temas.find(t => t.id === p.temaId);
      const matchesAsig = tema && (tema.asignaturaId === selectedAsignaturaId || tema.codigoAsignatura === asig?.codigo);
      const matchesTema = filterTemaId === 0 || p.temaId === filterTemaId;
      const matchesDif = !filterDificultad || p.dificultad === filterDificultad;
      const matchesHab = !mostrarSoloHabilitadas || p.habilitada;
      return matchesAsig && matchesTema && matchesDif && matchesHab;
    });
  }, [preguntas, selectedAsignaturaId, filterTemaId, filterDificultad, mostrarSoloHabilitadas, temas, asignaturas]);

  const temasDeAsignatura = useMemo(() => {
    if (!selectedAsignaturaId) return [];
    const asig = asignaturas.find(a => a.id === selectedAsignaturaId);
    return temas.filter(t => t.asignaturaId === selectedAsignaturaId || t.codigoAsignatura === asig?.codigo);
  }, [temas, selectedAsignaturaId, asignaturas]);

  return (
    <div className="page-container fade-in">
      <div style={{ marginBottom: '1.5rem' }}>
        <h1>Baterías de Preguntas</h1>
        <p className="subtitle">Gestión del banco de reactivos por disciplina académica. Las preguntas inhabilitadas no se incluyen en la generación de exámenes.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '2rem', alignItems: 'start' }}>

        <aside style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="card" style={{ padding: '1rem' }}>
            <label style={{ fontSize: '0.65rem' }}>Filtrar por Grado</label>
            <select
              value={filterGradoId}
              onChange={e => setFilterGradoId(Number(e.target.value))}
              style={{ marginBottom: '1rem' }}
            >
              <option value={0}>Todos los grados</option>
              {grados.map(g => <option key={g.id} value={g.id}>{g.nombre}</option>)}
            </select>
            <input
              type="text"
              placeholder="Buscar asignatura..."
              value={searchAsig}
              onChange={e => setSearchAsig(e.target.value)}
            />
          </div>

          <div className="card" style={{ padding: '1rem' }}>
            <h3 style={{ fontSize: '0.75rem', marginBottom: '1rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Asignaturas</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', maxHeight: '50vh', overflowY: 'auto' }}>
              {asignaturasFiltradas.length === 0 ? (
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center' }}>No se encontraron asignaturas.</p>
              ) : (
                asignaturasFiltradas.map(asig => (
                  <div
                    key={asig.id}
                    onClick={() => { setSelectedAsignaturaId(asig.id!); setFilterTemaId(0); resetForm(); }}
                    style={{
                      padding: '0.6rem 0.85rem',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '0.8rem',
                      fontWeight: '600',
                      transition: 'all 0.2s',
                      background: selectedAsignaturaId === asig.id ? 'var(--primary-soft)' : 'transparent',
                      color: selectedAsignaturaId === asig.id ? 'var(--primary)' : 'var(--text-main)',
                      border: `1px solid ${selectedAsignaturaId === asig.id ? 'var(--primary)' : 'transparent'}`
                    }}
                  >
                    {asig.nombre}
                  </div>
                ))
              )}
            </div>
          </div>
        </aside>

        <main>
          {selectedAsignaturaId ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'end', padding: '1rem 1.5rem', flexWrap: 'wrap' }}>
                <div style={{ flex: 2 }}>
                  <label>Filtrar por Tema</label>
                  <select value={filterTemaId} onChange={e => setFilterTemaId(Number(e.target.value))}>
                    <option value={0}>Todos los temas</option>
                    {temasDeAsignatura.map(t => <option key={t.id} value={t.id}>{t.nombre}</option>)}
                  </select>
                </div>
                <div style={{ flex: 1 }}>
                  <label>Dificultad</label>
                  <select value={filterDificultad} onChange={e => setFilterDificultad(e.target.value)}>
                    <option value="">Cualquiera</option>
                    <option value={Dificultad.BAJA}>Baja</option>
                    <option value={Dificultad.MEDIA}>Media</option>
                    <option value={Dificultad.ALTA}>Alta</option>
                  </select>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', paddingBottom: '2px' }}>
                  <input
                    type="checkbox"
                    id="soloHab"
                    checked={mostrarSoloHabilitadas}
                    onChange={e => setMostrarSoloHabilitadas(e.target.checked)}
                    style={{ width: '14px', height: '14px', cursor: 'pointer' }}
                  />
                  <label htmlFor="soloHab" style={{ fontSize: '0.78rem', cursor: 'pointer', marginBottom: 0 }}>Solo habilitadas</label>
                </div>
                <button className="btn btn-primary" onClick={() => setIsEditing(true)}>Nueva Pregunta</button>
              </div>

              {isEditing && (
                <div className="card" style={{ border: '1px solid var(--primary)', background: 'var(--primary-soft)' }}>
                  <h3 style={{ fontSize: '0.9rem', marginBottom: '1.25rem' }}>Configuración de la Cuestión</h3>
                  <form onSubmit={(e) => { e.preventDefault(); createPregMutation.mutate(preguntaForm); }}>
                    <div style={{ marginBottom: '1.5rem' }}>
                      <label>Enunciado</label>
                      <textarea
                        value={preguntaForm.enunciado}
                        onChange={e => setPreguntaForm({...preguntaForm, enunciado: e.target.value})}
                        style={{ background: 'white !important', minHeight: '80px' }}
                        required
                      />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                      <div>
                        <label>Tema Asociado</label>
                        <select
                          value={preguntaForm.temaId}
                          onChange={e => setPreguntaForm({...preguntaForm, temaId: Number(e.target.value)})}
                          required
                        >
                          <option value={0}>Seleccionar tema...</option>
                          {temasDeAsignatura.map(t => <option key={t.id} value={t.id}>{t.nombre}</option>)}
                        </select>
                      </div>
                      <div>
                        <label>Nivel de Dificultad</label>
                        <select value={preguntaForm.dificultad} onChange={e => setPreguntaForm({...preguntaForm, dificultad: e.target.value as Dificultad})}>
                          {Object.values(Dificultad).map(d => <option key={d} value={d}>{DIF_LABELS[d]}</option>)}
                        </select>
                      </div>
                    </div>
                    <div style={{ marginBottom: '1.5rem' }}>
                      <label>Respuestas (Marca la correcta)</label>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                        {preguntaForm.respuestas.map((r, idx) => (
                          <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'white', padding: '0.5rem', borderRadius: '10px', border: '1px solid var(--border)' }}>
                            <div className={`custom-checkbox ${r.esCorrecta ? 'checked' : ''}`} onClick={() => handleRespuestaChange(idx, 'esCorrecta', true)}></div>
                            <input
                              value={r.contenido}
                              onChange={e => handleRespuestaChange(idx, 'contenido', e.target.value)}
                              style={{ border: 'none', background: 'transparent', boxShadow: 'none' }}
                              placeholder={`Opción ${String.fromCharCode(65 + idx)}`}
                              required
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                      <button type="button" onClick={resetForm} className="btn btn-secondary">Cancelar</button>
                      <button type="submit" className="btn btn-primary">Guardar Pregunta</button>
                    </div>
                  </form>
                </div>
              )}

              <div className="card" style={{ padding: '0' }}>
                <DataTable<Pregunta>
                  data={preguntasFiltradas}
                  isLoading={loadingPregs}
                  columns={[
                    { header: 'Enunciado', accessor: (p) => (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <span style={{
                          display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', flexShrink: 0,
                          background: p.habilitada ? 'var(--success)' : '#94a3b8',
                          boxShadow: p.habilitada ? '0 0 0 2px rgba(16,185,129,0.2)' : 'none',
                        }} title={p.habilitada ? 'Habilitada' : 'Inhabilitada'} />
                        <span style={{ fontWeight: '600', maxWidth: '360px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', opacity: p.habilitada ? 1 : 0.45 }}>{p.enunciado}</span>
                      </div>
                    )},
                    { header: 'Tema', accessor: (p) => temas.find(t => t.id === p.temaId)?.nombre || '...' },
                    { header: 'Dificultad', accessor: (p) => (
                      <span className={`badge ${p.dificultad === Dificultad.BAJA ? 'badge-success' : p.dificultad === Dificultad.MEDIA ? 'badge-warning' : 'badge-danger'}`}>
                        {DIF_LABELS[p.dificultad]}
                      </span>
                    )},
                    { header: 'Estado', accessor: (p) => (
                      <button
                        className="btn btn-secondary"
                        style={{
                          fontSize: '0.7rem !important',
                          padding: '0.25rem 0.75rem !important',
                          background: p.habilitada ? 'var(--success-light)' : 'var(--surface-3)',
                          color: p.habilitada ? 'var(--success)' : 'var(--text-muted)',
                          border: `1px solid ${p.habilitada ? 'var(--success)' : 'var(--border)'}`,
                        }}
                        onClick={() => toggleMutation.mutate(p.id!)}
                      >
                        {p.habilitada ? 'Habilitada' : 'Inhabilitada'}
                      </button>
                    )},
                  ]}
                  onEdit={(p) => { setPreguntaForm({...p}); setIsEditing(true); window.scrollTo({top: 0, behavior: 'smooth'}); }}
                  onDelete={(p) => deletePregMutation.mutate(p.id!)}
                />
              </div>
            </div>
          ) : (
            <div className="card" style={{ height: '400px', display: 'grid', placeItems: 'center', textAlign: 'center' }}>
              <div>
                <div style={{ width: '64px', height: '64px', background: 'var(--primary-soft)', color: 'var(--primary)', borderRadius: '50%', display: 'grid', placeItems: 'center', margin: '0 auto 1.5rem', fontWeight: '900', fontSize: '1.5rem' }}>?</div>
                <h3 style={{ marginBottom: '0.5rem' }}>Selecciona una Asignatura</h3>
                <p style={{ color: 'var(--text-muted)', maxWidth: '300px' }}>Para gestionar las preguntas, primero debes elegir una asignatura del panel izquierdo.</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default PreguntasPage;
