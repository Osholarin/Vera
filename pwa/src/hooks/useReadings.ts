import { useState, useEffect } from 'react';
import { api } from '../services/api';
import type { SensorReading } from '../services/api';
import { useWebSocket } from './useWebSocket';

export function useReadings() {
  const [readings, setReadings] = useState<SensorReading[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const { isConnected, lastMessage } = useWebSocket();

  // Load initial data
  useEffect(() => {
    let mounted = true;
    
    async function fetchInitial() {
      try {
        const data = await api.getReadings();
        if (mounted) {
          setReadings(data);
          setIsLoading(false);
        }
      } catch (err) {
        console.error("Failed to load initial readings", err);
        if (mounted) setIsLoading(false);
      }
    }
    
    fetchInitial();
    
    return () => {
      mounted = false;
    };
  }, []);

  // Handle incoming websocket messages
  useEffect(() => {
    if (lastMessage) {
      setReadings(prev => {
        // Keep the last 50 readings to avoid memory leaks in the browser
        const updated = [lastMessage, ...prev].slice(0, 50);
        return updated;
      });
    }
  }, [lastMessage]);

  const latestReading = readings.length > 0 ? readings[0] : null;

  return {
    readings,
    latestReading,
    isLoading,
    isConnected
  };
}
