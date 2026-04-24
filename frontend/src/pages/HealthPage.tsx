import React, { useState, useEffect } from 'react';
import { saludApi } from '../api/salud';
import { Salud } from '../types/api';

export const HealthPage: React.FC = () => {
  const [salud, setSalud] = useState<Salud | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSalud = async () => {
      try {
        const data = await saludApi.obtenerSalud();
        setSalud(data);
      } catch (err) {
        setError('Error al obtener el estado del servicio');
      }
    };

    fetchSalud();
  }, []);

  return (
    <div className="health-page">
      <h2>Estado del Servicio</h2>
      {error && <div className="error-message">{error}</div>}
      {salud && (
        <div className="health-status">
          <p><strong>Estado:</strong> {salud.status}</p>
          <p><strong>Servicio:</strong> {salud.service}</p>
        </div>
      )}
    </div>
  );
};