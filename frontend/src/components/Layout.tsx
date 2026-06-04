import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import styles from './Layout.module.css';

const Layout: React.FC = () => {
  return (
    <div className={styles.container}>
      <Sidebar />
      <main className={styles.main}>
        <header className={styles.header}>
          <h2>Panel de Gestión</h2>
        </header>
        <section className={styles.content}>
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default Layout;


