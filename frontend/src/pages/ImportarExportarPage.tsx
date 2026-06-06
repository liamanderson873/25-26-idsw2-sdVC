import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api/axios';
import { importarGrados } from '../services/gradoService';
import { importarAsignaturas } from '../services/asignaturaService';
import { importarAlumnos } from '../services/alumnoService';
import { importarPreguntas } from '../services/preguntaService';
import type { Grado, Asignatura, Alumno, Pregunta } from '../types';

type Tab = 'exportar' | 'individual' | 'global';

interface ImportState {
  data: any[] | null;
  status: { success: boolean; message: string } | null;
}

interface GlobalResult {
  entidad: string;
  total: number;
  status: 'pendiente' | 'ok' | 'error' | 'vacio';
  mensaje: string;
}

const empty = (): ImportState => ({ data: null, status: null });

const parseFile = (
  file: File,
  onSuccess: (parsed: any[]) => void,
  onError: (msg: string) => void
) => {
  const reader = new FileReader();
  reader.onload = (ev) => {
    try {
      const parsed = JSON.parse(ev.target?.result as string);
      if (!Array.isArray(parsed)) throw new Error('El JSON debe ser un array de objetos.');
      onSuccess(parsed);
    } catch (err: any) {
      onError('JSON inválido: ' + err.message);
    }
  };
  reader.readAsText(file);
};

// Componente reutilizable para cada sección de importación individual
const ImportCard: React.FC<{
  title: string;
  hint: string;
  state: ImportState;
  isPending: boolean;
  countLabel: string;
  onFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImport: () => void;
}> = ({ title, hint, state, isPending, countLabel, onFile, onImport }) => (
  <div className="card" style={{ flex: 1, minWidth: 0 }}>
    <h3 style={{ fontSize: '0.85rem', marginBottom: '0.4rem' }}>{title}</h3>
    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1.25rem', lineHeight: '1.6' }}>{hint}</p>
    <div style={{ marginBottom: '1rem' }}>
      <label>Archivo JSON</label>
      <input type="file" accept=".json" onChange={onFile} />
    </div>
    {state.data && !state.status?.success && (
      <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
        {state.data.length} {countLabel} detectados.
      </p>
    )}
    {state.status && (
      <div style={{
        padding: '0.6rem 0.75rem', borderRadius: '8px', fontSize: '0.78rem', fontWeight: '600', marginBottom: '0.75rem',
        background: state.status.success ? '#f0fdf4' : '#fef2f2',
        color: state.status.success ? 'var(--success)' : 'var(--danger)',
      }}>
        {state.status.message}
      </div>
    )}
    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.75rem' }}>
      <button
        onClick={onImport}
        className="btn btn-primary"
        disabled={!state.data || isPending}
        style={{ minWidth: '110px', fontSize: '0.8rem' }}
      >
        {isPending ? 'Importando...' : 'Importar'}
      </button>
    </div>
  </div>
);

const ImportarExportarPage: React.FC = () => {
  const queryClient = useQueryClient();
  const [tab, setTab] = useState<Tab>('exportar');

  // --- EXPORTAR GLOBAL ---
  const [exportStatus, setExportStatus] = useState<{ success: boolean; message: string } | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  // --- IMPORTAR INDIVIDUAL ---
  const [gradoState, setGradoState] = useState(empty());
  const [asigState, setAsigState] = useState(empty());
  const [alumnoState, setAlumnoState] = useState(empty());
  const [preguntaState, setPreguntaState] = useState(empty());

  // --- IMPORTAR GLOBAL ---
  const [globalFile, setGlobalFile] = useState<Record<string, any[]> | null>(null);
  const [globalFileError, setGlobalFileError] = useState<string | null>(null);
  const [globalResults, setGlobalResults] = useState<GlobalResult[]>([]);
  const [isProcessingGlobal, setIsProcessingGlobal] = useState(false);

  // --- MUTATIONS INDIVIDUALES ---
  const gradoMutation = useMutation({
    mutationFn: (d: Grado[]) => importarGrados(d),
    onSuccess: (msg) => { queryClient.invalidateQueries({ queryKey: ['grados'] }); setGradoState({ data: null, status: { success: true, message: msg } }); },
    onError: (e: any) => setGradoState(p => ({ ...p, status: { success: false, message: e.response?.data || e.message } })),
  });
  const asigMutation = useMutation({
    mutationFn: (d: Asignatura[]) => importarAsignaturas(d),
    onSuccess: (msg) => { queryClient.invalidateQueries({ queryKey: ['asignaturas'] }); setAsigState({ data: null, status: { success: true, message: msg } }); },
    onError: (e: any) => setAsigState(p => ({ ...p, status: { success: false, message: e.response?.data || e.message } })),
  });
  const alumnoMutation = useMutation({
    mutationFn: (d: Alumno[]) => importarAlumnos(d),
    onSuccess: (msg) => { queryClient.invalidateQueries({ queryKey: ['alumnos'] }); setAlumnoState({ data: null, status: { success: true, message: msg } }); },
    onError: (e: any) => setAlumnoState(p => ({ ...p, status: { success: false, message: e.response?.data || e.message } })),
  });
  const preguntaMutation = useMutation({
    mutationFn: (d: Pregunta[]) => importarPreguntas(d),
    onSuccess: (msg) => { queryClient.invalidateQueries({ queryKey: ['preguntas'] }); setPreguntaState({ data: null, status: { success: true, message: msg } }); },
    onError: (e: any) => setPreguntaState(p => ({ ...p, status: { success: false, message: e.response?.data || e.message } })),
  });

  const makeFileHandler = (setter: React.Dispatch<React.SetStateAction<ImportState>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      parseFile(file,
        (parsed) => setter({ data: parsed, status: null }),
        (msg) => setter({ data: null, status: { success: false, message: msg } })
      );
    };

  // --- EXPORTAR GLOBAL ---
  const handleExportarGlobal = async () => {
    setIsExporting(true);
    setExportStatus(null);
    try {
      const [resGrados, resAsignaturas, resAlumnos, resPreguntas] = await Promise.all([
        api.get('/grados'),
        api.get('/asignaturas'),
        api.get('/alumnos'),
        api.get('/preguntas'),
      ]);
      const config = {
        exportadoEn: new Date().toISOString(),
        grados: resGrados.data,
        asignaturas: resAsignaturas.data,
        alumnos: resAlumnos.data,
        preguntas: resPreguntas.data,
      };
      const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `jorgestor-config-global-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      const total = [resGrados, resAsignaturas, resAlumnos, resPreguntas].reduce((s, r) => s + (r.data?.length || 0), 0);
      setExportStatus({
        success: true,
        message: `Descargado con ${total} registros: ${resGrados.data?.length || 0} grados, ${resAsignaturas.data?.length || 0} asignaturas, ${resAlumnos.data?.length || 0} alumnos, ${resPreguntas.data?.length || 0} preguntas.`,
      });
    } catch {
      setExportStatus({ success: false, message: 'Error al obtener los datos del servidor.' });
    } finally {
      setIsExporting(false);
    }
  };

  // --- IMPORTAR GLOBAL ---
  const handleGlobalFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setGlobalFileError(null);
    setGlobalFile(null);
    setGlobalResults([]);
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target?.result as string);
        if (typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('El archivo debe ser el JSON de configuración global exportado por Jorgestor.');
        setGlobalFile(parsed);
      } catch (err: any) {
        setGlobalFileError('JSON inválido: ' + err.message);
      }
    };
    reader.readAsText(file);
  };

  const handleImportarGlobal = async () => {
    if (!globalFile) return;
    setIsProcessingGlobal(true);

    const secciones: { key: string; entidad: string; fn: (d: any[]) => Promise<string> }[] = [
      { key: 'grados',      entidad: 'Grados',      fn: importarGrados },
      { key: 'asignaturas', entidad: 'Asignaturas', fn: importarAsignaturas },
      { key: 'alumnos',     entidad: 'Alumnos',     fn: importarAlumnos },
      { key: 'preguntas',   entidad: 'Preguntas',   fn: importarPreguntas },
    ];

    const results: GlobalResult[] = [];

    for (const sec of secciones) {
      const datos = globalFile[sec.key];
      if (!datos || !Array.isArray(datos) || datos.length === 0) {
        results.push({ entidad: sec.entidad, total: 0, status: 'vacio', mensaje: 'No hay datos en esta sección.' });
        setGlobalResults([...results]);
        continue;
      }
      try {
        const msg = await sec.fn(datos);
        results.push({ entidad: sec.entidad, total: datos.length, status: 'ok', mensaje: msg });
        queryClient.invalidateQueries({ queryKey: [sec.key] });
      } catch (err: any) {
        const msg = err.response?.data || err.message;
        results.push({ entidad: sec.entidad, total: datos.length, status: 'error', mensaje: msg });
      }
      setGlobalResults([...results]);
    }

    setIsProcessingGlobal(false);
  };

  // --- ESTILOS TABS ---
  const tabStyle = (t: Tab): React.CSSProperties => ({
    padding: '0.5rem 1.5rem',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '0.82rem',
    fontWeight: '700',
    transition: 'all 0.15s',
    background: tab === t ? 'var(--primary)' : 'transparent',
    color: tab === t ? 'white' : 'var(--text-muted)',
    whiteSpace: 'nowrap',
  });

  const statusStyle = (success: boolean): React.CSSProperties => ({
    padding: '0.65rem 0.85rem', borderRadius: '8px', fontSize: '0.8rem', fontWeight: '600',
    background: success ? '#f0fdf4' : '#fef2f2',
    color: success ? 'var(--success)' : 'var(--danger)',
  });

  const resultIcon = (status: GlobalResult['status']) => {
    if (status === 'ok') return { bg: '#f0fdf4', color: 'var(--success)', label: 'OK' };
    if (status === 'error') return { bg: '#fef2f2', color: 'var(--danger)', label: 'ERROR' };
    if (status === 'vacio') return { bg: '#f8fafc', color: 'var(--text-muted)', label: 'VACÍO' };
    return { bg: '#fffbeb', color: '#d97706', label: '...' };
  };

  return (
    <div className="page-container fade-in">
      <div style={{ marginBottom: '1.5rem' }}>
        <h1>Importar / Exportar</h1>
        <p className="subtitle">Gestión de la configuración global del sistema: respaldo, migración y carga de datos.</p>
      </div>

      {/* TABS */}
      <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '2rem', background: 'var(--background)', padding: '0.3rem', borderRadius: '10px', width: 'fit-content', border: '1px solid var(--border)' }}>
        <button style={tabStyle('exportar')} onClick={() => setTab('exportar')}>Exportar Global</button>
        <button style={tabStyle('individual')} onClick={() => setTab('individual')}>Importar Individual</button>
        <button style={tabStyle('global')} onClick={() => setTab('global')}>Importar Global</button>
      </div>

      {/* ── TAB: EXPORTAR GLOBAL ── */}
      {tab === 'exportar' && (
        <div className="card" style={{ maxWidth: '620px' }}>
          <h3 style={{ fontSize: '0.9rem', marginBottom: '0.4rem' }}>Exportar Configuración Global</h3>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
            Genera y descarga un único archivo JSON con la totalidad de los datos del sistema. Sirve como copia de seguridad completa o para migrar el sistema a otro entorno.
          </p>
          <div style={{ background: 'var(--background)', borderRadius: '10px', padding: '1rem 1.25rem', marginBottom: '1.5rem', fontSize: '0.8rem', lineHeight: '1.8' }}>
            <strong style={{ color: 'var(--text-main)', display: 'block', marginBottom: '0.25rem' }}>El archivo incluye:</strong>
            <span style={{ color: 'var(--text-muted)' }}>Grados · Asignaturas · Alumnos (con matriculaciones) · Preguntas (con respuestas y dificultad)</span>
          </div>
          {exportStatus && <div style={{ ...statusStyle(exportStatus.success), marginBottom: '1.25rem' }}>{exportStatus.message}</div>}
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button onClick={handleExportarGlobal} className="btn btn-primary" disabled={isExporting} style={{ minWidth: '230px' }}>
              {isExporting ? 'Recopilando datos...' : 'Exportar Configuración Global'}
            </button>
          </div>
        </div>
      )}

      {/* ── TAB: IMPORTAR INDIVIDUAL ── */}
      {tab === 'individual' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <ImportCard
              title="Importar Grados"
              hint={`Array JSON con grados. Campos: codigo, nombre.`}
              state={gradoState} isPending={gradoMutation.isPending} countLabel="grado(s)"
              onFile={makeFileHandler(setGradoState)}
              onImport={() => gradoState.data && gradoMutation.mutate(gradoState.data)}
            />
            <ImportCard
              title="Importar Asignaturas"
              hint={`Array JSON con asignaturas. Campos: codigo, nombre, cursoAcademico, dniProfesor, gradoId. Los grados y profesores deben existir.`}
              state={asigState} isPending={asigMutation.isPending} countLabel="asignatura(s)"
              onFile={makeFileHandler(setAsigState)}
              onImport={() => asigState.data && asigMutation.mutate(asigState.data)}
            />
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <ImportCard
              title="Importar Alumnos"
              hint={`Array JSON con alumnos. Campos: dni, nombre, apellidos, curso, codigoGrado. Los grados deben existir previamente.`}
              state={alumnoState} isPending={alumnoMutation.isPending} countLabel="alumno(s)"
              onFile={makeFileHandler(setAlumnoState)}
              onImport={() => alumnoState.data && alumnoMutation.mutate(alumnoState.data)}
            />
            <ImportCard
              title="Importar Preguntas"
              hint={`Array JSON con preguntas. Campos: enunciado, dificultad (BAJA/MEDIA/ALTA), temaId, respuestas[]. Los temas deben existir previamente.`}
              state={preguntaState} isPending={preguntaMutation.isPending} countLabel="pregunta(s)"
              onFile={makeFileHandler(setPreguntaState)}
              onImport={() => preguntaState.data && preguntaMutation.mutate(preguntaState.data)}
            />
          </div>
        </div>
      )}

      {/* ── TAB: IMPORTAR GLOBAL ── */}
      {tab === 'global' && (
        <div className="card" style={{ maxWidth: '680px' }}>
          <h3 style={{ fontSize: '0.9rem', marginBottom: '0.4rem' }}>Importar Configuración Global</h3>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
            Carga el archivo JSON exportado previamente por Jorgestor. El sistema procesará cada sección en orden: primero Grados, luego Asignaturas, Alumnos y finalmente Preguntas. Las secciones que fallen no bloquean las demás.
          </p>
          <div style={{ marginBottom: '1.25rem' }}>
            <label>Archivo de Configuración Global (.json)</label>
            <input type="file" accept=".json" onChange={handleGlobalFile} />
          </div>

          {globalFileError && (
            <div style={{ ...statusStyle(false), marginBottom: '1.25rem' }}>{globalFileError}</div>
          )}

          {globalFile && globalResults.length === 0 && !isProcessingGlobal && (
            <div style={{ background: 'var(--background)', borderRadius: '10px', padding: '1rem 1.25rem', marginBottom: '1.5rem', fontSize: '0.8rem', lineHeight: '1.8' }}>
              <strong style={{ color: 'var(--text-main)', display: 'block', marginBottom: '0.5rem' }}>Archivo válido. Secciones detectadas:</strong>
              {['grados', 'asignaturas', 'alumnos', 'preguntas'].map(k => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', padding: '0.1rem 0' }}>
                  <span style={{ textTransform: 'capitalize' }}>{k}</span>
                  <strong style={{ color: 'var(--text-main)' }}>
                    {Array.isArray(globalFile[k]) ? globalFile[k].length : 0} registros
                  </strong>
                </div>
              ))}
            </div>
          )}

          {globalResults.length > 0 && (
            <div style={{ marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {globalResults.map((r) => {
                const icon = resultIcon(r.status);
                return (
                  <div key={r.entidad} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.65rem 0.85rem', borderRadius: '8px', background: icon.bg }}>
                    <span style={{ fontSize: '0.65rem', fontWeight: '900', color: icon.color, minWidth: '44px', textAlign: 'center' }}>{icon.label}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-main)' }}>{r.entidad}</div>
                      <div style={{ fontSize: '0.72rem', color: icon.color }}>{r.mensaje}</div>
                    </div>
                    {r.total > 0 && <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{r.total} registros</span>}
                  </div>
                );
              })}
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              onClick={handleImportarGlobal}
              className="btn btn-primary"
              disabled={!globalFile || isProcessingGlobal}
              style={{ minWidth: '220px' }}
            >
              {isProcessingGlobal ? 'Procesando...' : 'Importar Todo'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImportarExportarPage;
