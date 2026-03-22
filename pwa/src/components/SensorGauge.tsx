import React from 'react';
import { Droplets, Thermometer, Wind, Sun } from 'lucide-react';

interface SensorGaugeProps {
  type: 'moisture' | 'temperature' | 'humidity' | 'light';
  value: number;
}

export const SensorGauge: React.FC<SensorGaugeProps> = ({ type, value }) => {
  const getConfig = () => {
    switch(type) {
      case 'moisture':
        return {
          icon: <Droplets size={24} color="var(--color-primary)" />,
          label: 'Soil Moisture',
          unit: '%',
          color: 'var(--color-primary)',
          format: (v: number) => v.toFixed(1)
        };
      case 'temperature':
        return {
          icon: <Thermometer size={24} color="var(--color-danger)" />,
          label: 'Temperature',
          unit: '°C',
          color: 'var(--color-danger)',
          format: (v: number) => v.toFixed(1)
        };
      case 'humidity':
        return {
          icon: <Wind size={24} color="var(--color-success)" />,
          label: 'Air Humidity',
          unit: '%',
          color: 'var(--color-success)',
          format: (v: number) => v.toFixed(1)
        };
      case 'light':
        return {
          icon: <Sun size={24} color="var(--color-warning)" />,
          label: 'Light Level',
          unit: 'lx',
          color: 'var(--color-warning)',
          format: (v: number) => Math.round(v).toString()
        };
    }
  };

  const config = getConfig();

  return (
    <div className="card">
      <div className="card-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-muted)' }}>
          {config.icon}
          <span className="sensor-label">{config.label}</span>
        </div>
      </div>
      <div className="sensor-metric">
        <div className="sensor-value" style={{ color: config.color }}>
          {config.format(value)}
        </div>
        <div className="sensor-unit">{config.unit}</div>
      </div>
    </div>
  );
};
