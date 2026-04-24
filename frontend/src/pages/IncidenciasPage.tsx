import React, { useState, useEffect } from 'react';
import { convivenciaApi } from '../api/convivencia';
import { IncidenciaPsicologica, AgregarIntervencionDto, ResultadoIntervencion } from '../types/api';
import { IncidentList } from '../components/IncidentList';
import { SelectField } from '../components/SelectField';
import { FormField } from '../components/FormField';
import { TextAreaField } from '../components/TextAreaField';

export const IncidenciasPage: React.FC = () => {
  const [incidencias, setIncidencias] = useState<IncidenciaPsicologica[]>([]);
  const [selectedIncidencia, setSelectedIncidencia] = useState<IncidenciaPsicologica | null>(null);
  const [showIntervencionForm, setShowIntervencionForm] = useState(false);
  const [intervencionData, setIntervencionData] = useState<AgregarIntervencionDto>({
    estrategia: '',
    resultado: ResultadoIntervencion.PENDIENTE,
    observaciones: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadIncidencias();
  }, []);

  const loadIncidencias = async () => {
    try {
      const data = await convivenciaApi.listarIncidencias();
      setIncidencias(data);
    } catch (err) {
      setError('Error al cargar incidencias');
    }
  };

  const handleAgregarIntervencion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedIncidencia) return;

    setIsLoading(true);
    try {
      await convivenciaApi.agregarIntervencion(selectedIncidencia.id, intervencionData);
      setShowIntervencionForm(false);
      setIntervencionData({
        estrategia: '',
        resultado: ResultadoIntervencion.PENDIENTE,
        observaciones: '',
      });
      await loadIncidencias(); // Recargar para ver la nueva intervención
    } catch (err) {
      setError('Error al agregar intervención');
    } finally {
      setIsLoading(false);
    }
  };

  const updateIntervencionData = (field: keyof AgregarIntervencionDto, value: string) => {
    setIntervencionData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="incidencias-page">
      <h2>Incidencias Psicológicas</h2>
      {error && <div className="error-message">{error}</div>}
      
      <IncidentList 
        incidents={incidencias} 
        onSelect={(incident) => {
          setSelectedIncidencia(incident);
          setShowIntervencionForm(true);
        }}
      />

      {showIntervencionForm && selectedIncidencia && (
        <div className="intervencion-form">
          <h3>Agregar Intervención</h3>
          <p><strong>Incidencia:</strong> {selectedIncidencia.descripcion}</p>
          <form onSubmit={handleAgregarIntervencion}>
            <TextAreaField
              label="Estrategia"
              value={intervencionData.estrategia}
              onChange={(value) => updateIntervencionData('estrategia', value)}
              required
              placeholder="Describe la estrategia de intervención..."
              rows={3}
            />
            <SelectField
              label="Resultado"
              value={intervencionData.resultado}
              onChange={(value) => updateIntervencionData('resultado', value)}
              options={[
                { value: ResultadoIntervencion.PENDIENTE, label: 'Pendiente' },
                { value: ResultadoIntervencion.PARCIAL, label: 'Parcial' },
                { value: ResultadoIntervencion.EXITOSO, label: 'Exitoso' },
                { value: ResultadoIntervencion.SIN_CAMBIOS, label: 'Sin Cambios' },
              ]}
              required
            />
            <TextAreaField
              label="Observaciones"
              value={intervencionData.observaciones}
              onChange={(value) => updateIntervencionData('observaciones', value)}
              required
              placeholder="Observaciones sobre la intervención..."
              rows={3}
            />
            <div className="form-actions">
              <button type="submit" disabled={isLoading}>
                {isLoading ? 'Agregando...' : 'Agregar Intervención'}
              </button>
              <button type="button" onClick={() => setShowIntervencionForm(false)}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};