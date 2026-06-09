import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import GradosPage from './pages/GradosPage';
import AsignaturasPage from './pages/AsignaturasPage';
import AsignaturaDetailPage from './pages/AsignaturaDetailPage';
import ProfesoresPage from './pages/ProfesoresPage';
import AlumnosPage from './pages/AlumnosPage';
import AlumnoDetailPage from './pages/AlumnoDetailPage';
import PreguntasPage from './pages/PreguntasPage';
import GenerarExamenPage from './pages/GenerarExamenPage';
import CorregirExamenPage from './pages/CorregirExamenPage';
import AsignarExamenPage from './pages/AsignarExamenPage';
import ImportarExportarPage from './pages/ImportarExportarPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;
  const isAdmin = user?.rol === 'ADMINISTRADOR_INSTITUCIONAL';

  return (
    <Routes>
      <Route path="/login" element={!user ? <LoginPage /> : <Navigate to={isAdmin ? '/docentes' : '/'} replace />} />

      <Route path="/" element={user ? <Layout /> : <Navigate to="/login" replace />}>
        <Route index element={<Navigate to={isAdmin ? '/docentes' : '/dashboard'} replace />} />

        {/* Rutas exclusivas de DOCENTE */}
        <Route path="dashboard" element={!isAdmin ? <DashboardPage /> : <Navigate to="/docentes" replace />} />
        <Route path="generar-examen" element={!isAdmin ? <GenerarExamenPage /> : <Navigate to="/docentes" replace />} />
        <Route path="asignar-examen" element={!isAdmin ? <AsignarExamenPage /> : <Navigate to="/docentes" replace />} />
        <Route path="corregir-examen" element={!isAdmin ? <CorregirExamenPage /> : <Navigate to="/docentes" replace />} />
        <Route path="grados" element={!isAdmin ? <GradosPage /> : <Navigate to="/docentes" replace />} />
        <Route path="asignaturas" element={!isAdmin ? <AsignaturasPage /> : <Navigate to="/docentes" replace />} />
        <Route path="asignaturas/:id" element={!isAdmin ? <AsignaturaDetailPage /> : <Navigate to="/docentes" replace />} />
        <Route path="preguntas" element={!isAdmin ? <PreguntasPage /> : <Navigate to="/docentes" replace />} />
        <Route path="alumnos" element={!isAdmin ? <AlumnosPage /> : <Navigate to="/docentes" replace />} />
        <Route path="alumnos/:id" element={!isAdmin ? <AlumnoDetailPage /> : <Navigate to="/docentes" replace />} />
        <Route path="importar-exportar" element={!isAdmin ? <ImportarExportarPage /> : <Navigate to="/docentes" replace />} />

        {/* Ruta exclusiva de ADMINISTRADOR_INSTITUCIONAL */}
        <Route path="docentes" element={<ProfesoresPage />} />
      </Route>
    </Routes>
  );
}

export default App;


