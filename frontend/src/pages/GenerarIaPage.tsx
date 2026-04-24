import React, { useState } from 'react';
import { iaApi } from '../api/ia';
import { GenerarTextoDto, RespuestaIa } from '../types/api';
import { TextAreaField } from '../components/TextAreaField';

export const GenerarIaPage: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState<RespuestaIa | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const data = await iaApi.generarTexto({ prompt });
      setResponse(data);
    } catch (err) {
      setError('Error al generar contenido con IA');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="ia-page">
      <h2>Generar Contenido con IA</h2>
      <form onSubmit={handleSubmit}>
        <TextAreaField
          label="Prompt"
          value={prompt}
          onChange={setPrompt}
          required
          placeholder="Describe el contenido que deseas generar..."
          rows={4}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Generando...' : 'Generar'}
        </button>
      </form>
      {error && <div className="error-message">{error}</div>}
      {response && (
        <div className="ia-response">
          <h3>Contenido Generado</h3>
          <p><strong>Modelo:</strong> {response.modelo}</p>
          <div className="content">{response.contenido}</div>
        </div>
      )}
    </div>
  );
};