import React from 'react';
import type { NodeInfo } from '../services/api';
import { Battery, Wifi, Clock, Activity } from 'lucide-react';

interface NodeCardProps {
  node: NodeInfo;
  onClick?: () => void;
}

export const NodeCard: React.FC<NodeCardProps> = ({ node, onClick }) => {
  const isOnline = node.status === 'online';
  
  return (
    <div className="card" onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
      <div className="card-header">
        <div className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Activity size={20} color={isOnline ? 'var(--color-success)' : 'var(--color-danger)'} />
          Node {node.id.split('-').pop()}
        </div>
        <div className="live-indicator" style={{ backgroundColor: isOnline ? 'var(--color-success)' : 'var(--color-danger)', animation: isOnline ? 'pulse 2s infinite' : 'none' }} />
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '8px', color: 'var(--color-text-muted)', alignItems: 'center' }}>
            <Wifi size={16} /> Status
          </div>
          <span style={{ color: isOnline ? 'var(--color-success)' : 'var(--color-danger)', fontWeight: 600 }}>
            {isOnline ? 'Online' : 'Offline'}
          </span>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '8px', color: 'var(--color-text-muted)', alignItems: 'center' }}>
            <Battery size={16} /> Battery
          </div>
          <span style={{ color: node.battery > 20 ? 'var(--color-text)' : 'var(--color-danger)', fontWeight: 600 }}>
            {node.battery}%
          </span>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '8px', color: 'var(--color-text-muted)', alignItems: 'center' }}>
            <Clock size={16} /> Last Seen
          </div>
          <span style={{ color: 'var(--color-text)', fontSize: '0.875rem' }}>
            {new Date(node.last_seen).toLocaleTimeString()}
          </span>
        </div>
      </div>
    </div>
  );
};
