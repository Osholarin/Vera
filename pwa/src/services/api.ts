export interface SensorReading {
  id: string;
  node_id: string;
  moisture: number;
  temperature: number;
  humidity: number;
  light: number;
  timestamp: string;
}

export interface NodeInfo {
  id: string;
  status: 'online' | 'offline';
  last_seen: string;
  battery: number;
}

export interface SoilHealth {
  score: number;
  label: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  recommendation: string;
}

// Mock initial data
const mockReadings: SensorReading[] = [
  {
    id: '1',
    node_id: 'node-esp-01',
    moisture: 45.2,
    temperature: 22.5,
    humidity: 60.1,
    light: 850,
    timestamp: new Date(Date.now() - 60000).toISOString()
  }
];

const mockNodes: NodeInfo[] = [
  {
    id: 'node-esp-01',
    status: 'online',
    last_seen: new Date().toISOString(),
    battery: 89
  }
];

// Mock API Service
export const api = {
  getReadings: async (): Promise<SensorReading[]> => {
    return new Promise(resolve => setTimeout(() => resolve([...mockReadings]), 500));
  },
  
  getNodes: async (): Promise<NodeInfo[]> => {
    return new Promise(resolve => setTimeout(() => resolve([...mockNodes]), 500));
  },
  
  getSoilHealth: async (_farmId: string): Promise<SoilHealth> => {
    // Return a mock calculation
    return new Promise(resolve => setTimeout(() => resolve({
      score: 82,
      label: 'Good',
      recommendation: 'Moisture levels are optimal. Continue current irrigation schedule.'
    }), 500));
  }
};
