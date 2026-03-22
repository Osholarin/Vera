import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import type { SoilHealth as SoilHealthType } from '../services/api';
import { AlertBanner } from '../components/AlertBanner';

export const SoilHealth: React.FC = () => {
  const [healthData, setHealthData] = useState<SoilHealthType | null>(null);

  useEffect(() => {
    // In skeleton, pass a default farm id
    api.getSoilHealth('farm-01').then(setHealthData);
  }, []);

  if (!healthData) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading analysis...</div>;
  }

  const getScoreClass = (label: string) => {
    switch (label.toLowerCase()) {
      case 'excellent': return 'score-excellent';
      case 'good': return 'score-good';
      case 'fair': return 'score-fair';
      case 'poor': return 'score-poor';
      default: return '';
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <h2>Soil Health Analysis</h2>
        <p style={{ color: 'var(--color-text-muted)' }}>Rule-based prediction service evaluation.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '2rem' }}>
        <div className="card" style={{ textAlign: 'center' }}>
          <h3 style={{ marginBottom: '2rem', color: 'var(--color-text-muted)', fontSize: '1rem' }}>Overall Score</h3>
          <div className={`score-circle ${getScoreClass(healthData.label)}`}>
            {healthData.score}
          </div>
          <div style={{ fontSize: '1.25rem', fontWeight: 600, color: `var(--color-${healthData.label === 'Excellent' ? 'success' : healthData.label === 'Good' ? 'primary' : healthData.label === 'Fair' ? 'warning' : 'danger'})` }}>
            {healthData.label}
          </div>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: '1.5rem' }}>Automated Recommendation</h3>
          <p style={{ fontSize: '1.125rem', lineHeight: 1.6, marginBottom: '2rem' }}>
            {healthData.recommendation}
          </p>
          
          <h4 style={{ marginBottom: '1rem' }}>Action Items</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <AlertBanner type="info" message="Review upcoming weather forecast before scheduling next irrigation." />
            <AlertBanner type="success" message="Phosphorus levels expected to be stable based on current moisture trends." />
          </div>
        </div>
      </div>
    </div>
  );
};
