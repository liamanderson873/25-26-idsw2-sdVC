import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css';
import { Usuario } from '../types';
import logo from '../assets/logo.png';

const Sidebar: React.FC = () => {
  const userStr = localStorage.getItem('user');
  const user: Usuario | null = userStr ? JSON.parse(userStr) : null;

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  const isAdmin = user?.rol === 'ADMINISTRADOR_INSTITUCIONAL';

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <img src={logo} alt="Jorgestor" className={styles.logoImg} />
      </div>

      <nav className={styles.nav}>
        {isAdmin ? (
          <div>
            <div className={styles.sectionTitle}>Administración</div>
            <NavLink to="/docentes" className={({ isActive }) => isActive ? styles.active : ''}>
               <div className={styles.dot}></div> Docentes
            </NavLink>
          </div>
        ) : (
          <>
            <div className={styles.sectionTitle}>Sistema</div>
            <NavLink to="/dashboard" className={({ isActive }) => isActive ? styles.active : ''}>
               <div className={styles.dot}></div> Panel de Control
            </NavLink>

            <div style={{ marginTop: '1.5rem' }}>
              <div className={styles.sectionTitle}>Gestión Core</div>
              <NavLink to="/generar-examen" className={({ isActive }) => isActive ? styles.active : ''}>
                 <div className={styles.dot}></div> Generar Examen
              </NavLink>
              <NavLink to="/corregir-examen" className={({ isActive }) => isActive ? styles.active : ''}>
                 <div className={styles.dot}></div> Corregir Exámenes
              </NavLink>
            </div>

            <div style={{ marginTop: '2rem' }}>
              <div className={styles.sectionTitle}>Configuración</div>
              <NavLink to="/grados" className={({ isActive }) => isActive ? styles.active : ''}>
                 <div className={styles.dot}></div> Grados
              </NavLink>
              <NavLink to="/asignaturas" className={({ isActive }) => isActive ? styles.active : ''}>
                 <div className={styles.dot}></div> Asignaturas
              </NavLink>
              <NavLink to="/preguntas" className={({ isActive }) => isActive ? styles.active : ''}>
                 <div className={styles.dot}></div> Batería de Preguntas
              </NavLink>
              <NavLink to="/alumnos" className={({ isActive }) => isActive ? styles.active : ''}>
                 <div className={styles.dot}></div> Listado de Alumnos
              </NavLink>
            </div>

            <div style={{ marginTop: '2rem' }}>
              <div className={styles.sectionTitle}>Datos</div>
              <NavLink to="/importar-exportar" className={({ isActive }) => isActive ? styles.active : ''}>
                 <div className={styles.dot}></div> Importar / Exportar
              </NavLink>
            </div>
          </>
        )}
      </nav>

      <div className={styles.userSection}>
        <div style={{ marginBottom: '1.25rem' }}>
          <div style={{ fontSize: '0.9rem', fontWeight: '800', color: 'white' }}>{user?.nombre}</div>
          <div style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: '700' }}>{user?.rol?.replace('_', ' ')}</div>
        </div>
        <button
          onClick={handleLogout}
          className={styles.logoutBtn}
        >
          CERRAR SESIÓN
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
