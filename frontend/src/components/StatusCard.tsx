import React from 'react';

interface StatusCardProps {
  title: string;
  value: string | number;
  color?: string;
}

export const StatusCard: React.FC<StatusCardProps> = ({ title, value, color = 'blue' }) => {
  return (
    <div className={`status-card ${color}`}>
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
};