import React, { useState } from 'react';
import { convivenciaApi } from '../api/convivencia';
import { RegistrarReporteAnonimoDto, NivelEscolar, TipoIncidencia } from '../types/api';
import { SelectField } from '../components/SelectField';
import { FormField } from '../components/FormField';
import { TextAreaField } from '../components/TextAreaField';

export const ReportAnonimoPage: React.FC = () => {
  const [formData, setFormData] = useState<RegistrarReporteAnonimoDto>({
    nivelEscolar: NivelEscolar.SECUNDARIA,
    grado: '',
    seccion: '',
    tipoIncidencia: TipoIncidencia.BULLYING_VERBAL,
    descripcion: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await convivenciaApi.registrarReporteAnonimo(formData);
      setSuccess(true);
      setFormData({
        nivelEscolar: NivelEscolar.SECUNDARIA,
        grado: '',
        seccion: '',
        tipoIncidencia: TipoIncidencia.BULLYING_VERBAL,
        descripcion: '',
      });
    } catch (err) {
      setError('Error al enviar el reporte');
    } finally {
      setIsLoading(false);
    }
  };

  const updateFormData = (field: keyof RegistrarReporteAnonimoDto, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (success) {
    return (
      <div className="report-success">
        <h2>Reporte Enviado</h2>
        <p>Tu reporte anónimo ha sido registrado correctamente. Gracias por contribuir al clima escolar.</p>
        <button onClick={() => setSuccess(false)}>Enviar Otro Reporte</button>
      </div>
    );
  }

  return (
    <div className="report-page">
      <h2>Reporte Anónimo</h2>
      <p>Tu identidad permanecerá confidencial. Ayúdanos a mejorar el clima escolar.</p>
      <form onSubmit={handleSubmit}>
        <SelectField
          label="Nivel Escolar"
          value={formData.nivelEscolar}
          onChange={(value) => updateFormData('nivelEscolar', value)}
          options={[
            { value: NivelEscolar.PRIMARIA, label: 'Primaria' },
            { value: NivelEscolar.SECUNDARIA, label: 'Secundaria' },
          ]}
          required
        />
        <FormField
          label="Grado"
          value={formData.grado}
          onChange={(value) => updateFormData('grado', value)}
          required
          placeholder="ej: 3ro"
        />
        <FormField
          label="Sección"
          value={formData.seccion}
          onChange={(value) => updateFormData('seccion', value)}
          required
          placeholder="ej: B"
        />
        <SelectField
          label="Tipo de Incidencia"
          value={formData.tipoIncidencia}
          onChange={(value) => updateFormData('tipoIncidencia', value)}
          options={[
            { value: TipoIncidencia.BULLYING_VERBAL, label: 'Bullying Verbal' },
            { value: TipoIncidencia.EXCLUSION_SOCIAL, label: 'Exclusión Social' },
            { value: TipoIncidencia.CIBERBULLYING, label: 'Ciberbullying' },
            { value: TipoIncidencia.AGRESION_FISICA, label: 'Agresión Física' },
            { value: TipoIncidencia.HOSTIGAMIENTO_REITERADO, label: 'Hostigamiento Reiterado' },
            { value: TipoIncidencia.DISCRIMINACION, label: 'Discriminación' },
          ]}
          required
        />
        <TextAreaField
          label="Descripción"
          value={formData.descripcion}
          onChange={(value) => updateFormData('descripcion', value)}
          required
          placeholder="Describe la situación de manera detallada..."
          rows={6}
        />
        {error && <div className="error-message">{error}</div>}
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Enviando...' : 'Enviar Reporte'}
        </button>
      </form>
    </div>
  );
};