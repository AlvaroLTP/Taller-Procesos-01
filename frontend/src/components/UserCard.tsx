import React from 'react';
import { UsuarioInstitucional } from '../types/api';

interface UserCardProps {
  user: UsuarioInstitucional;
}

export const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <div className="user-card">
      <h4>{user.nombre}</h4>
      <p>{user.correo}</p>
      <span className="role">{user.rol}</span>
      <span className="area">{user.area}</span>
      <span className={`status ${user.activo ? 'active' : 'inactive'}`}>
        {user.activo ? 'Activo' : 'Inactivo'}
      </span>
    </div>
  );
};