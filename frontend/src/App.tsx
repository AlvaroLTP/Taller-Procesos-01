import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LoginPage } from './pages/LoginPage';
import { HealthPage } from './pages/HealthPage';
import { ReportAnonimoPage } from './pages/ReportAnonimoPage';
import { GenerarIaPage } from './pages/GenerarIaPage';
import { IncidenciasPage } from './pages/IncidenciasPage';
import { UsuariosInstitucionalesPage } from './pages/UsuariosInstitucionalesPage';
import { Rol } from './types/api';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Sistema de Convivencia Escolar</h1>
        <nav>
          <a href="/health">Salud</a>
          <a href="/report">Reportar</a>
          <a href="/login">Login</a>
        </nav>
      </header>
      <main className="app-main">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/health" element={<HealthPage />} />
          <Route path="/report" element={<ReportAnonimoPage />} />
          <Route
            path="/ia"
            element={
              <ProtectedRoute roles={[Rol.ADMIN, Rol.DOCENTE]}>
                <GenerarIaPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/incidencias"
            element={
              <ProtectedRoute roles={[Rol.DOCENTE, Rol.PSICOLOGO, Rol.ADMIN, Rol.ADMINISTRATIVO]}>
                <IncidenciasPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/usuarios"
            element={
              <ProtectedRoute roles={[Rol.ADMIN]}>
                <UsuariosInstitucionalesPage />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<HealthPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;