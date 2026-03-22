import React from 'react';
import { AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';

interface AlertBannerProps {
  type: 'warning' | 'danger' | 'success' | 'info';
  message: string;
}

export const AlertBanner: React.FC<AlertBannerProps> = ({ type, message }) => {
  const getIcon = () => {
    switch (type) {
      case 'warning': return <AlertTriangle size={20} color="var(--color-warning)" />;
      case 'danger': return <AlertCircle size={20} color="var(--color-danger)" />;
      case 'success': return <CheckCircle size={20} color="var(--color-success)" />;
      case 'info': return <Info size={20} color="var(--color-primary)" />;
    }
  };

  return (
    <div className={`alert-banner alert-${type}`}>
      {getIcon()}
      <span>{message}</span>
    </div>
  );
};
