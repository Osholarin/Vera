import React from 'react';
import { useReadings } from '../hooks/useReadings';
import { NodeCard } from '../components/NodeCard';
import { SensorGauge } from '../components/SensorGauge';
import { AlertBanner } from '../components/AlertBanner';
import { api } from '../services/api';
import type { NodeInfo } from '../services/api';

export const Dashboard: React.FC = () => {
  const { latestReading, isConnected } = useReadings();
  const [nodes, setNodes] = React.useState<NodeInfo[]>([]);

  React.useEffect(() => {
    api.getNodes().then(setNodes);
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Live Dashboard</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div className="live-indicator" style={{ 
            backgroundColor: isConnected ? 'var(--color-success)' : 'var(--color-danger)',
            animation: isConnected ? 'pulse 2s infinite' : 'none'
          }} />
          <span style={{ color: 'var(--color-text-muted)' }}>
            {isConnected ? 'Connected to WebSocket' : 'Disconnected'}
          </span>
        </div>
      </div>

      {latestReading && latestReading.moisture < 45 && (
        <AlertBanner 
          type="warning" 
          message="Moisture levels are dropping below optimal threshold (45%). Consider irrigation soon." 
        />
      )}

      {latestReading && latestReading.temperature > 30 && (
        <AlertBanner 
          type="danger" 
          message="High temperature alert! Soil temperature exceeding 30°C." 
        />
      )}

      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem', color: 'var(--color-text-muted)', fontSize: '1rem' }}>Active Nodes</h3>
        <div className="dashboard-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
          {nodes.map(node => (
            <NodeCard key={node.id} node={node} />
          ))}
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem', color: 'var(--color-text-muted)', fontSize: '1rem' }}>Latest Readings</h3>
        {latestReading ? (
          <div className="dashboard-grid">
            <SensorGauge type="moisture" value={latestReading.moisture} />
            <SensorGauge type="temperature" value={latestReading.temperature} />
            <SensorGauge type="humidity" value={latestReading.humidity} />
            <SensorGauge type="light" value={latestReading.light} />
          </div>
        ) : (
          <div className="card" style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-muted)' }}>
            Waiting for first reading...
          </div>
        )}
      </div>
    </div>
  );
};
