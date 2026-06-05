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
  
  // Proporciones de dificultad (según prototipo)
  const [proporciones, setProporciones] = useState<Record<Dificultad, number>>({
    [Dificultad.FACIL]: 0.4,
    [Dificultad.MEDIO]: 0.4,
    [Dificultad.DIFICIL]: 0.2,
  });

  const { data: asignaturas = [] } = useQuery({ queryKey: ['asignaturas'], queryFn: async () => {
    const data = await getAsignaturas();
    console.log('Asignaturas recibidas:', data);
    return data;
  }});
  const { data: temas = [] } = useQuery({ 
    queryKey: ['temas', asignaturaId], 
    queryFn: async () => {
      const data = await getTemas();
      console.log('Temas recibidos para asig ' + asignaturaId + ':', data);
      return data;
    },
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
      proporcionesDificultad: proporciones,
    });
  };

  const toggleTema = (id: number) => {
    setTemaIds(prev => prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]);
  };

  const handlePropChange = (dif: Dificultad, val: string) => {
    const num = parseFloat(val) / 100;
    setProporciones(prev => ({ ...prev, [dif]: num }));
  };

  return (
    <div style={{ maxWidth: '900px' }}>
      <h1 style={{ marginBottom: '0.5rem' }}>Generar Exámenes</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Configure los parámetros para la creación del modelo de evaluación.</p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        {/* 1. CONFIGURACIÓN BASE */}
        <div style={{ background: 'white', padding: '2rem', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)', border: '1px solid var(--border)' }}>
          <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>01</span> Parámetros Generales
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem' }}>
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
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem' }}>Evaluación</label>
              <select 
                value={tipo} 
                onChange={(e) => setTipo(e.target.value as TipoEvaluacion)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', background: '#f8fafc' }}
              >
                {Object.values(TipoEvaluacion).map(t => <option key={t} value={t}>{t.replace('_', ' ')}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem' }}>Nº de Preguntas</label>
              <input 
                type="number" 
                min={1} 
                max={50}
                value={numPreguntas} 
                onChange={e => setNumPreguntas(Number(e.target.value))}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', background: '#f8fafc' }}
              />
            </div>
          </div>
        </div>

        {/* 2. SELECCIÓN DE TEMAS */}
        {asignaturaId > 0 && (
          <div style={{ background: 'white', padding: '2rem', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)', border: '1px solid var(--border)' }}>
            <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>02</span> Selección de Temas (Batería)
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {temas.length === 0 ? (
                <p style={{ color: '#999', gridColumn: 'span 2' }}>No hay temas registrados para esta asignatura.</p>
              ) : (
                temas.map((t: any) => (
                  <div 
                    key={t.id} 
                    onClick={() => toggleTema(t.id)}
                    style={{ 
                      padding: '1rem', 
                      borderRadius: '10px', 
                      border: `2px solid ${temaIds.includes(t.id) ? 'var(--primary)' : 'var(--border)'}`,
                      background: temaIds.includes(t.id) ? '#eff6ff' : 'white',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      transition: 'all 0.2s'
                    }}
                  >
                    <input type="checkbox" checked={temaIds.includes(t.id)} readOnly />
                    <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>{t.nombre}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* 3. ESTRATEGIA DE DIFICULTAD */}
        <div style={{ background: 'white', padding: '2rem', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)', border: '1px solid var(--border)' }}>
          <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>03</span> Estrategia de Dificultad
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: '#10b981', fontWeight: 'bold', marginBottom: '0.5rem' }}>🟢 FÁCIL (%)</label>
              <input type="range" min="0" max="100" step="5" value={proporciones[Dificultad.FACIL]*100} onChange={e => handlePropChange(Dificultad.FACIL, e.target.value)} style={{ width: '100%' }} />
              <div style={{ textAlign: 'center', fontWeight: 'bold' }}>{Math.round(proporciones[Dificultad.FACIL]*100)}%</div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: '#f59e0b', fontWeight: 'bold', marginBottom: '0.5rem' }}>🟡 MEDIO (%)</label>
              <input type="range" min="0" max="100" step="5" value={proporciones[Dificultad.MEDIO]*100} onChange={e => handlePropChange(Dificultad.MEDIO, e.target.value)} style={{ width: '100%' }} />
              <div style={{ textAlign: 'center', fontWeight: 'bold' }}>{Math.round(proporciones[Dificultad.MEDIO]*100)}%</div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: '#ef4444', fontWeight: 'bold', marginBottom: '0.5rem' }}>🔴 DIFÍCIL (%)</label>
              <input type="range" min="0" max="100" step="5" value={proporciones[Dificultad.DIFICIL]*100} onChange={e => handlePropChange(Dificultad.DIFICIL, e.target.value)} style={{ width: '100%' }} />
              <div style={{ textAlign: 'center', fontWeight: 'bold' }}>{Math.round(proporciones[Dificultad.DIFICIL]*100)}%</div>
            </div>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '1rem', textAlign: 'center' }}>
            Total: {Math.round((proporciones[Dificultad.FACIL] + proporciones[Dificultad.MEDIO] + proporciones[Dificultad.DIFICIL])*100)}% 
            {(proporciones[Dificultad.FACIL] + proporciones[Dificultad.MEDIO] + proporciones[Dificultad.DIFICIL] !== 1) && 
              <span style={{ color: '#ef4444', marginLeft: '10px' }}>(Debe sumar 100%)</span>}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button 
            type="button" 
            onClick={() => window.location.reload()}
            style={{ flex: 1, padding: '1.25rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'white', color: 'var(--text-main)', fontWeight: '600', cursor: 'pointer' }}
          >
            CANCELAR
          </button>
          <button 
            type="submit" 
            disabled={mutation.isPending || !asignaturaId || temaIds.length === 0 || Math.round((proporciones[Dificultad.FACIL] + proporciones[Dificultad.MEDIO] + proporciones[Dificultad.DIFICIL])*100) !== 100}
            style={{ 
              flex: 2,
              padding: '1.25rem', 
              borderRadius: 'var(--radius)', 
              border: 'none', 
              background: 'var(--primary)', 
              color: 'white', 
              fontWeight: '700', 
              fontSize: '1.1rem',
              cursor: 'pointer',
              boxShadow: '0 10px 15px -3px rgba(37, 99, 235, 0.4)',
              opacity: (mutation.isPending || !asignaturaId || temaIds.length === 0) ? 0.5 : 1
            }}
          >
            {mutation.isPending ? 'GENERANDO ALGORITMO...' : 'CONFIRMAR Y GENERAR'}
          </button>
        </div>
      </form>

      {resultado && (
        <div style={{ marginTop: '2.5rem', padding: '2rem', background: '#ecfdf5', borderRadius: 'var(--radius)', border: '1px solid #10b981', textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>✨</div>
          <h3 style={{ color: '#065f46', marginBottom: '0.5rem' }}>Examen Generado con Éxito</h3>
          <p style={{ color: '#047857', fontWeight: '500', marginBottom: '1.5rem' }}>{resultado}</p>
          <button 
            onClick={() => window.location.href='/asignar-examen'}
            style={{ padding: '0.75rem 2rem', background: '#10b981', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            PASAR A ASIGNACIÓN
          </button>
        </div>
      )}
    </div>
  );
};

export default GenerarExamenPage;
