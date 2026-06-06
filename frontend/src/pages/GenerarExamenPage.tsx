import React, { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAsignaturas } from '../services/asignaturaService';
import { getTemas } from '../services/temaService';
import { getGrados } from '../services/gradoService';
import { generarExamen } from '../services/examenService';
import { Dificultad, TipoEvaluacion } from '../types';

const GenerarExamenPage: React.FC = () => {
  const queryClient = useQueryClient();

  // Selección jerárquica
  const [gradoId, setGradoId] = useState<number>(0);
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

  // Queries
  const { data: grados = [] } = useQuery({ queryKey: ['grados'], queryFn: getGrados });
  const { data: asignaturas = [] } = useQuery({ queryKey: ['asignaturas'], queryFn: getAsignaturas });
  const { data: temas = [] } = useQuery({ 
    queryKey: ['temas', asignaturaId], 
    queryFn: getTemas,
    enabled: asignaturaId > 0 
  });

  // Filtrado Lógico en Cascada
  const asignaturasDelGrado = useMemo(() => {
    return (asignaturas || []).filter(a => gradoId === 0 || a.gradoId === gradoId || (a as any).gradoIds?.includes(gradoId));
  }, [asignaturas, gradoId]);

  const temasDeAsignatura = useMemo(() => {
    if (asignaturaId === 0) return [];
    const asig = asignaturas.find(a => a.id === asignaturaId);
    return (temas || []).filter(t => t.asignaturaId === asignaturaId || t.codigoAsignatura === asig?.codigo);
  }, [temas, asignaturaId, asignaturas]);

  const mutation = useMutation({
    mutationFn: generarExamen,
    onSuccess: (data) => {
      setResultado(data);
      queryClient.invalidateQueries({ queryKey: ['examenes'] });
      // Scroll automático suave hacia el resultado de éxito
      setTimeout(() => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      }, 100);
    },
    onError: (error: any) => {
      const msg = error.response?.data || error.message || "Error desconocido al generar";
      alert("❌ NO SE PUDO GENERAR: " + msg);
    }
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
    <div className="page-container fade-in">
      <h1>Generar Modelo de Examen</h1>
      <p className="subtitle">Configure los parámetros técnicos para la generación aleatoria estratificada.</p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        {/* 1. CONFIGURACIÓN BASE */}
        <div className="card">
          <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ color: 'var(--primary)', fontWeight: '900', fontSize: '1.2rem', opacity: 0.5 }}>01</span> 
            Parámetros Generales
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '1.25rem' }}>
            <div>
              <label>Grado Académico</label>
              <select 
                value={gradoId} 
                onChange={(e) => { setGradoId(Number(e.target.value)); setAsignaturaId(0); setTemaIds([]); }}
                style={{ width: '100%' }}
              >
                <option value={0}>Seleccionar Grado...</option>
                {grados.map(g => <option key={g.id} value={g.id}>{g.nombre}</option>)}
              </select>
            </div>
            <div>
              <label>Asignatura</label>
              <select 
                value={asignaturaId} 
                onChange={(e) => { setAsignaturaId(Number(e.target.value)); setTemaIds([]); }}
                style={{ width: '100%' }}
                disabled={!gradoId}
              >
                <option value={0}>Seleccionar Asignatura...</option>
                {asignaturasDelGrado.map(a => <option key={a.id} value={a.id}>{a.nombre}</option>)}
              </select>
            </div>
            <div>
              <label>Bloque de Evaluación</label>
              <select 
                value={tipo} 
                onChange={(e) => setTipo(e.target.value as TipoEvaluacion)}
                style={{ width: '100%' }}
              >
                {Object.values(TipoEvaluacion).map(t => <option key={t} value={t}>{t.replace('_', ' ')}</option>)}
              </select>
            </div>
            <div>
              <label>Cuestiones</label>
              <input 
                type="number" 
                min={1} 
                max={50}
                value={numPreguntas} 
                onChange={e => setNumPreguntas(Number(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>
          </div>
        </div>

        {/* 2. SELECCIÓN DE TEMAS */}
        {asignaturaId > 0 && (
          <div className="card">
            <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ color: 'var(--primary)', fontWeight: '900', fontSize: '1.2rem', opacity: 0.5 }}>02</span> 
              Selección de Temas
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {temasDeAsignatura.length === 0 ? (
                <p style={{ color: '#999', gridColumn: 'span 2', textAlign: 'center', padding: '1rem' }}>No hay temas registrados para esta materia.</p>
              ) : (
                temasDeAsignatura.map((t: any) => (
                  <div 
                    key={t.id} 
                    onClick={() => toggleTema(t.id)}
                    style={{ 
                      padding: '1rem', 
                      borderRadius: '10px', 
                      border: `1px solid ${temaIds.includes(t.id) ? 'var(--primary)' : 'var(--border)'}`,
                      background: temaIds.includes(t.id) ? 'var(--primary-soft)' : 'white',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      transition: 'all 0.2s'
                    }}
                  >
                    <div className={`custom-checkbox ${temaIds.includes(t.id) ? 'checked' : ''}`}></div>
                    <span style={{ fontSize: '0.85rem', fontWeight: '600', color: temaIds.includes(t.id) ? 'var(--primary)' : 'var(--text-main)' }}>{t.nombre}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* 3. ESTRATEGIA DE DIFICULTAD */}
        <div className="card">
          <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ color: 'var(--primary)', fontWeight: '900', fontSize: '1.2rem', opacity: 0.5 }}>03</span> 
            Estrategia de Dificultad
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '3rem' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--success)', textTransform: 'uppercase' }}>Fácil</span>
                <span style={{ fontSize: '0.85rem', fontWeight: '900' }}>{Math.round(proporciones[Dificultad.FACIL]*100)}%</span>
              </div>
              <input type="range" min="0" max="100" step="5" value={proporciones[Dificultad.FACIL]*100} onChange={e => handlePropChange(Dificultad.FACIL, e.target.value)} style={{ width: '100%', accentColor: 'var(--success)' }} />
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--warning)', textTransform: 'uppercase' }}>Medio</span>
                <span style={{ fontSize: '0.85rem', fontWeight: '900' }}>{Math.round(proporciones[Dificultad.MEDIO]*100)}%</span>
              </div>
              <input type="range" min="0" max="100" step="5" value={proporciones[Dificultad.MEDIO]*100} onChange={e => handlePropChange(Dificultad.MEDIO, e.target.value)} style={{ width: '100%', accentColor: 'var(--warning)' }} />
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--danger)', textTransform: 'uppercase' }}>Difícil</span>
                <span style={{ fontSize: '0.85rem', fontWeight: '900' }}>{Math.round(proporciones[Dificultad.DIFICIL]*100)}%</span>
              </div>
              <input type="range" min="0" max="100" step="5" value={proporciones[Dificultad.DIFICIL]*100} onChange={e => handlePropChange(Dificultad.DIFICIL, e.target.value)} style={{ width: '100%', accentColor: 'var(--danger)' }} />
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1rem' }}>
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={() => window.location.reload()}
            style={{ flex: 1, padding: '1.25rem' }}
          >
            REINICIAR FORMULARIO
          </button>
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={mutation.isPending || !asignaturaId || temaIds.length === 0 || Math.round((proporciones[Dificultad.FACIL] + proporciones[Dificultad.MEDIO] + proporciones[Dificultad.DIFICIL])*100) !== 100}
            style={{ flex: 2, padding: '1.25rem', fontSize: '1.1rem' }}
          >
            {mutation.isPending ? 'CREANDO MODELO...' : 'GENERAR MODELO DE EXAMEN'}
          </button>
        </div>
      </form>

      {resultado && (
        <div className="card" style={{ marginTop: '3rem', border: '2px solid var(--success)', textAlign: 'center', boxShadow: '0 20px 25px -5px rgba(16, 185, 129, 0.1)' }}>
          <div style={{ width: '60px', height: '60px', background: '#ecfdf5', color: 'var(--success)', borderRadius: '50%', display: 'grid', placeItems: 'center', margin: '0 auto 1.5rem', fontSize: '1.5rem', fontWeight: 'bold' }}>✓</div>
          <h2 style={{ color: '#065f46', marginBottom: '0.75rem' }}>Examen Generado</h2>
          <p style={{ color: 'var(--text-muted)', fontWeight: '500', marginBottom: '2rem' }}>{resultado}</p>
          <button 
            className="btn btn-primary"
            onClick={() => window.location.href='/asignar-examen'}
            style={{ padding: '1rem 3rem' }}
          >
            PASAR A ASIGNACIÓN
          </button>
        </div>
      )}
    </div>
  );
};

export default GenerarExamenPage;
