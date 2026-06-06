import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import styles from './Layout.module.css';

const routeLabels: Record<string, string> = {
  '/dashboard':          'Panel de Control',
  '/generar-examen':     'Generar Examen',
  '/asignar-examen':    'Asignar Alumnos',
  '/corregir-examen':   'Corregir Exámenes',
  '/auditoria-examenes':'Auditoría de Exámenes',
  '/grados':            'Grados Académicos',
  '/asignaturas':       'Asignaturas',
  '/preguntas':         'Batería de Preguntas',
  '/alumnos':           'Listado de Alumnos',
  '/docentes':          'Cuerpo Docente',
  '/importar-exportar': 'Importar / Exportar',
};

const Layout: React.FC = () => {
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;
  const location = useLocation();
  const pageLabel = routeLabels[location.pathname] ?? 'Jorgestor';
  const initials = user?.nombre
    ?.split(' ')
    .slice(0, 2)
    .map((w: string) => w[0])
    .join('')
    .toUpperCase() ?? '?';

  return (
    <div className={styles.container}>
      <Sidebar />
      <main className={styles.main}>
        <header className={styles.header}>
          <span className={styles.pageLabel}>{pageLabel}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-main)', lineHeight: 1.2 }}>
                {user?.nombre}
              </div>
              <div style={{ fontSize: '0.67rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                {user?.rol?.replace(/_/g, ' ')}
              </div>
            </div>
            <div style={{
              width: '34px', height: '34px',
              background: 'var(--primary-light)',
              color: 'var(--primary)',
              borderRadius: '10px',
              display: 'grid', placeItems: 'center',
              fontWeight: '800', fontSize: '0.75rem',
              border: '1.5px solid var(--primary-soft)',
              flexShrink: 0,
            }}>
              {initials}
            </div>
          </div>
        </header>
        <section className={styles.content}>
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default Layout;
