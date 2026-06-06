import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import styles from './Layout.module.css';

const Layout: React.FC = () => {
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  return (
    <div className={styles.container}>
      <Sidebar />
      <main className={styles.main}>
        <header className={styles.header}>
          <div>
            <h2>Panel de Gestión</h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
             <div style={{ textAlign: 'right' }}>
               <div style={{ fontSize: '0.85rem', fontWeight: '800' }}>{user?.nombre}</div>
               <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{user?.rol?.replace('_', ' ')}</div>
             </div>
             <div style={{ width: '40px', height: '40px', background: 'var(--primary-soft)', color: 'var(--primary)', borderRadius: '50%', display: 'grid', placeItems: 'center', fontWeight: 'bold' }}>
               {user?.nombre?.charAt(0)}
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


