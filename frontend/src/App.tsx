import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import GradosPage from './pages/GradosPage';
import AsignaturasPage from './pages/AsignaturasPage';
import ProfesoresPage from './pages/ProfesoresPage';

import AlumnosPage from './pages/AlumnosPage';
import PreguntasPage from './pages/PreguntasPage';
import GenerarExamenPage from './pages/GenerarExamenPage';
import AsignarExamenPage from './pages/AsignarExamenPage';
import CorregirExamenPage from './pages/CorregirExamenPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/generar-examen" replace />} />
        
        {/* Core */}
        <Route path="generar-examen" element={<GenerarExamenPage />} />
        <Route path="asignar-examen" element={<AsignarExamenPage />} />
        <Route path="corregir-examen" element={<CorregirExamenPage />} />
        
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


