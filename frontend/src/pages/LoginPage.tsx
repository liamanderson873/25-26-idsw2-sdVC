import React, { useState } from 'react';
import { login } from '../services/authService';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await login({ username, password });
      localStorage.setItem('user', JSON.stringify(user));
      window.location.href = user.rol === 'ADMINISTRADOR_INSTITUCIONAL' ? '/docentes' : '/';
    } catch {
      setError('Usuario o contraseña incorrectos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #0d1117 0%, #0a0e1a 50%, #111827 100%)',
      padding: '1.5rem',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '380px',
        background: 'rgba(255,255,255,0.97)',
        borderRadius: '20px',
        boxShadow: '0 24px 48px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.05)',
        padding: '2.5rem',
      }}>
        {/* Logo / Brand */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '52px', height: '52px',
            background: 'var(--primary)',
            borderRadius: '14px',
            display: 'grid', placeItems: 'center',
            margin: '0 auto 1.25rem',
            boxShadow: '0 8px 20px rgba(37,99,235,0.35)',
          }}>
            <span style={{ color: 'white', fontWeight: '900', fontSize: '1.3rem', letterSpacing: '-0.04em' }}>J</span>
          </div>
          <h1 style={{ fontSize: '1.35rem', fontWeight: '800', letterSpacing: '-0.03em', marginBottom: '0.3rem' }}>
            Jorgestor
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.83rem' }}>
            Plataforma de Gestión de Exámenes
          </p>
        </div>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '1.1rem' }}>
            <label>Usuario</label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Nombre de usuario"
              required
              autoFocus
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div style={{
              background: 'var(--danger-light)',
              color: 'var(--danger)',
              border: '1px solid #fecaca',
              borderRadius: '8px',
              padding: '0.65rem 0.875rem',
              fontSize: '0.82rem',
              fontWeight: '600',
              marginBottom: '1.25rem',
              textAlign: 'center',
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{ width: '100%', padding: '0.8rem !important', fontSize: '0.85rem !important', borderRadius: '10px !important' }}
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>

        <div style={{
          marginTop: '1.75rem',
          padding: '0.875rem',
          background: 'var(--surface-2)',
          borderRadius: '10px',
          border: '1px solid var(--border)',
        }}>
          <p style={{ fontSize: '0.68rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
            Credenciales por defecto
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              <code style={{ fontWeight: '700' }}>admin</code>
              <span style={{ color: 'var(--text-muted)' }}> / </span>
              <code style={{ fontWeight: '700' }}>admin123</code>
              <span style={{ marginLeft: '0.5rem', fontSize: '0.68rem', color: 'var(--text-muted)' }}>Administrador</span>
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              <code style={{ fontWeight: '700' }}>docente</code>
              <span style={{ color: 'var(--text-muted)' }}> / </span>
              <code style={{ fontWeight: '700' }}>docente123</code>
              <span style={{ marginLeft: '0.5rem', fontSize: '0.68rem', color: 'var(--text-muted)' }}>Docente</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
