import React from 'react';
import { IncidenciaPsicologica } from '../types/api';

interface IncidentListProps {
  incidents: IncidenciaPsicologica[];
  onSelect?: (incident: IncidenciaPsicologica) => void;
}

export const IncidentList: React.FC<IncidentListProps> = ({ incidents, onSelect }) => {
  return (
    <div className="incident-list">
      {incidents.map((incident) => (
        <div
          key={incident.id}
          className={`incident-item ${incident.alertaCritica ? 'critical' : ''}`}
          onClick={() => onSelect?.(incident)}
        >
          <h4>{incident.tipoIncidencia}</h4>
          <p>{incident.descripcion}</p>
          <span className="level">{incident.nivelAlerta}</span>
          <span className="date">{new Date(incident.fechaCreacion).toLocaleDateString()}</span>
        </div>
      ))}
    </div>
  );
};