import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css';
const Sidebar: React.FC = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <div style={{ width: '32px', height: '32px', background: 'var(--primary)', borderRadius: '8px', display: 'grid', placeItems: 'center', fontWeight: 'bold' }}>J</div>
        JORGES<span>TOR</span>
      </div>

      <nav className={styles.nav}>
        <div className={styles.section}>
          <div className={styles.sectionTitle}>Gestión Core</div>
          <NavLink to="/" className={({ isActive }) => isActive ? styles.active : ''}>
             <span style={{ marginRight: '10px' }}>⚡</span> Generar Examen
          </NavLink>
          <NavLink to="/asignar-examen" className={({ isActive }) => isActive ? styles.active : ''}>
             <span style={{ marginRight: '10px' }}>👥</span> Asignar Alumnos
          </NavLink>
          <NavLink to="/corregir-examen" className={({ isActive }) => isActive ? styles.active : ''}>
             <span style={{ marginRight: '10px' }}>✅</span> Corregir Exámenes
          </NavLink>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionTitle}>Administración</div>
          <NavLink to="/preguntas" className={({ isActive }) => isActive ? styles.active : ''}>
             <span style={{ marginRight: '10px' }}>📚</span> Batería de Preguntas
          </NavLink>
          <NavLink to="/alumnos" className={({ isActive }) => isActive ? styles.active : ''}>
             <span style={{ marginRight: '10px' }}>🎓</span> Listado de Alumnos
          </NavLink>
          <NavLink to="/docentes" className={({ isActive }) => isActive ? styles.active : ''}>
             <span style={{ marginRight: '10px' }}>👨‍🏫</span> Docentes
          </NavLink>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;


