import { useState, useEffect } from 'react';
import type { SensorReading } from '../services/api';

export function useWebSocket(_url: string = 'ws://localhost:8080/ws') {
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<SensorReading | null>(null);

  // In this skeleton implementation, we'll mock the WebSocket behavior
  // by generating a new reading every 5 seconds.
  useEffect(() => {
    // Simulate connection delay
    const connectTimer = setTimeout(() => {
      setIsConnected(true);
    }, 1000);

    // Simulate incoming messages
    const messageInterval = setInterval(() => {
      if (isConnected) {
        const mockNewReading: SensorReading = {
          id: Math.random().toString(36).substring(7),
          node_id: 'node-esp-01',
          moisture: 40 + Math.random() * 10,
          temperature: 20 + Math.random() * 5,
          humidity: 55 + Math.random() * 10,
          light: 800 + Math.random() * 200,
          timestamp: new Date().toISOString()
        };
        setLastMessage(mockNewReading);
      }
    }, 5000);

    return () => {
      clearTimeout(connectTimer);
      clearInterval(messageInterval);
      setIsConnected(false);
    };
  }, [isConnected]);

  return { isConnected, lastMessage };
}
