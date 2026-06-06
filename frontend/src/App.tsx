import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import GradosPage from './pages/GradosPage';
import AsignaturasPage from './pages/AsignaturasPage';
import ProfesoresPage from './pages/ProfesoresPage';
import AlumnosPage from './pages/AlumnosPage';
import PreguntasPage from './pages/PreguntasPage';
import GenerarExamenPage from './pages/GenerarExamenPage';
import AsignarExamenPage from './pages/AsignarExamenPage';
import CorregirExamenPage from './pages/CorregirExamenPage';
import AuditoriaExamenesPage from './pages/AuditoriaExamenesPage';

function App() {
  const user = localStorage.getItem('user');

  return (
    <Routes>
      <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" replace />} />
      
      <Route path="/" element={user ? <Layout /> : <Navigate to="/login" replace />}>
        <Route index element={<Navigate to="/generar-examen" replace />} />
        
        {/* Core */}
        <Route path="generar-examen" element={<GenerarExamenPage />} />
        <Route path="asignar-examen" element={<AsignarExamenPage />} />
        <Route path="corregir-examen" element={<CorregirExamenPage />} />
        <Route path="auditoria-examenes" element={<AuditoriaExamenesPage />} />
        
        {/* Administración */}
        <Route path="grados" element={<GradosPage />} />
        <Route path="asignaturas" element={<AsignaturasPage />} />
        <Route path="preguntas" element={<PreguntasPage />} />
        <Route path="alumnos" element={<AlumnosPage />} />
        <Route path="docentes" element={<ProfesoresPage />} />
      </Route>
    </Routes>
  );
}

export default App;


