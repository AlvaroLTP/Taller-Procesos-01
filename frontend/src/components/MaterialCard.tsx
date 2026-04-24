import React from 'react';
import { MaterialDocente } from '../types/api';

interface MaterialCardProps {
  material: MaterialDocente;
}

export const MaterialCard: React.FC<MaterialCardProps> = ({ material }) => {
  return (
    <div className="material-card">
      <h4>{material.titulo}</h4>
      <p>{material.contenido}</p>
      <span className="type">{material.tipo}</span>
      <span className="date">{new Date(material.fechaCreacion).toLocaleDateString()}</span>
    </div>
  );
};