import React, { useState, useEffect } from 'react';
import { convivenciaApi } from '../api/convivencia';
import { UsuarioInstitucional, RegistrarUsuarioInstitucionalDto, Rol } from '../types/api';
import { UserCard } from '../components/UserCard';
import { FormField } from '../components/FormField';
import { SelectField } from '../components/SelectField';

export const UsuariosInstitucionalesPage: React.FC = () => {
  const [usuarios, setUsuarios] = useState<UsuarioInstitucional[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<RegistrarUsuarioInstitucionalDto>({
    nombre: '',
    correo: '',
    rol: Rol.DOCENTE,
    area: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadUsuarios();
  }, []);

  const loadUsuarios = async () => {
    try {
      const data = await convivenciaApi.listarUsuariosInstitucionales();
      setUsuarios(data);
    } catch (err) {
      setError('Error al cargar usuarios');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await convivenciaApi.registrarUsuarioInstitucional(formData);
      setShowForm(false);
      setFormData({
        nombre: '',
        correo: '',
        rol: Rol.DOCENTE,
        area: '',
        password: '',
      });
      await loadUsuarios();
    } catch (err) {
      setError('Error al registrar usuario');
    } finally {
      setIsLoading(false);
    }
  };

  const updateFormData = (field: keyof RegistrarUsuarioInstitucionalDto, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="usuarios-page">
      <h2>Usuarios Institucionales</h2>
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancelar' : 'Agregar Usuario'}
      </button>

      {error && <div className="error-message">{error}</div>}

      {showForm && (
        <form onSubmit={handleSubmit} className="usuario-form">
          <FormField
            label="Nombre"
            value={formData.nombre}
            onChange={(value) => updateFormData('nombre', value)}
            required
          />
          <FormField
            label="Correo"
            type="email"
            value={formData.correo}
            onChange={(value) => updateFormData('correo', value)}
            required
          />
          <SelectField
            label="Rol"
            value={formData.rol}
            onChange={(value) => updateFormData('rol', value)}
            options={[
              { value: Rol.ADMIN, label: 'Administrador' },
              { value: Rol.DOCENTE, label: 'Docente' },
              { value: Rol.PSICOLOGO, label: 'Psicólogo' },
              { value: Rol.ADMINISTRATIVO, label: 'Administrativo' },
            ]}
            required
          />
          <FormField
            label="Área"
            value={formData.area}
            onChange={(value) => updateFormData('area', value)}
            required
          />
          <FormField
            label="Contraseña"
            type="password"
            value={formData.password}
            onChange={(value) => updateFormData('password', value)}
            required
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Registrando...' : 'Registrar Usuario'}
          </button>
        </form>
      )}

      <div className="usuarios-list">
        {usuarios.map((usuario) => (
          <UserCard key={usuario.id} user={usuario} />
        ))}
      </div>
    </div>
  );
};