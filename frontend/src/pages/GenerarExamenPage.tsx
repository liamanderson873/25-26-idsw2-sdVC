import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAsignaturas } from '../services/asignaturaService';
import { getTemas } from '../services/temaService';
import { generarExamen } from '../services/examenService';
import { Dificultad, TipoEvaluacion } from '../types';

const GenerarExamenPage: React.FC = () => {
  const [asignaturaId, setAsignaturaId] = useState<number>(0);
  const [temaIds, setTemaIds] = useState<number[]>([]);
  const [numPreguntas, setNumPreguntas] = useState<number>(10);
  const [tipo, setTipo] = useState<TipoEvaluacion>(TipoEvaluacion.PARCIAL_1);
  const [resultado, setResultado] = useState<string | null>(null);

  const { data: asignaturas = [] } = useQuery({ queryKey: ['asignaturas'], queryFn: getAsignaturas });
  const { data: temas = [] } = useQuery({ 
    queryKey: ['temas', asignaturaId], 
    queryFn: getTemas,
    enabled: asignaturaId > 0 
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: generarExamen,
    onSuccess: (data) => {
      setResultado(data);
      queryClient.invalidateQueries({ queryKey: ['examenes'] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({
      asignaturaId,
      temaIds,
      numPreguntas,
      tipoEvaluacion: tipo,
      esPersonalizado: false,
      proporcionesDificultad: {
        [Dificultad.FACIL]: 0.4,
        [Dificultad.MEDIO]: 0.4,
        [Dificultad.DIFICIL]: 0.2,
      },
    });
  };

  const toggleTema = (id: number) => {
    setTemaIds(prev => prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]);
  };

  return (
    <div style={{ maxWidth: '800px' }}>
      <h1 style={{ marginBottom: '0.5rem' }}>Generador Inteligente</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Crea modelos de examen equilibrados basados en la batería de preguntas.</p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div style={{ background: 'white', padding: '2rem', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)', border: '1px solid var(--border)' }}>
          <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: 'var(--primary)' }}>01</span> Configuración Base
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem' }}>Asignatura</label>
              <select 
                value={asignaturaId} 
                onChange={(e) => setAsignaturaId(Number(e.target.value))}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', background: '#f8fafc' }}
              >
                <option value={0}>Seleccionar...</option>
                {asignaturas.map(a => <option key={a.id} value={a.id}>{a.nombre}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem' }}>Tipo de Evaluación</label>
              <select 
                value={tipo} 
                onChange={(e) => setTipo(e.target.value as TipoEvaluacion)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', background: '#f8fafc' }}
              >
                {Object.values(TipoEvaluacion).map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
        </div>

        {asignaturaId > 0 && (
          <div style={{ background: 'white', padding: '2rem', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)', border: '1px solid var(--border)' }}>
            <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: 'var(--primary)' }}>02</span> Selección de Temas
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {temas.map((t: any) => (
                <div 
                  key={t.id} 
                  onClick={() => toggleTema(t.id)}
                  style={{ 
                    padding: '1rem', 
                    borderRadius: '10px', 
                    border: `2px solid ${temaIds.includes(t.id) ? 'var(--primary)' : 'var(--border)'}`,
                    background: temaIds.includes(t.id) ? '#eff6ff' : 'white',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    fontSize: '0.9rem',
                    fontWeight: '500'
                  }}
                >
                  {t.nombre}
                </div>
              ))}
            </div>
          </div>
        )}

        <button 
          type="submit" 
          disabled={mutation.isPending || !asignaturaId || temaIds.length === 0}
          style={{ 
            padding: '1.25rem', 
            borderRadius: 'var(--radius)', 
            border: 'none', 
            background: 'var(--primary)', 
            color: 'white', 
            fontWeight: '700', 
            fontSize: '1.1rem',
            cursor: 'pointer',
            boxShadow: '0 10px 15px -3px rgba(37, 99, 235, 0.4)'
          }}
        >
          {mutation.isPending ? 'Generando Algoritmo...' : 'CREAR MODELO DE EXAMEN'}
        </button>
      </form>

      {resultado && (
        <div style={{ marginTop: '2.5rem', padding: '2rem', background: '#ecfdf5', borderRadius: 'var(--radius)', border: '1px solid #10b981', textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>✨</div>
          <h3 style={{ color: '#065f46', marginBottom: '0.5rem' }}>Examen Generado con Éxito</h3>
          <p style={{ color: '#047857' }}>{resultado}</p>
        </div>
      )}
    </div>
  );
};

export default GenerarExamenPage;
