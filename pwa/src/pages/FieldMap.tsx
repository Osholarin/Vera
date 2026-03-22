import React from 'react';
import { MapContainer, TileLayer, Polygon, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Placeholder zone coordinates (e.g., a field boundary)
const fieldCoordinates: [number, number][] = [
  [51.505, -0.09],
  [51.51, -0.1],
  [51.51, -0.08],
];

export const FieldMap: React.FC = () => {
  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <h2>Field Map</h2>
        <p style={{ color: 'var(--color-text-muted)' }}>Geospatial view of active zones and sensors.</p>
      </div>

      <div style={{ height: '600px', width: '100%' }}>
        <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '100%', width: '100%' }}>
          {/* Use a dark-themed tile layer for aesthetics if desired, or standard OpenStreetMap */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
          <Polygon pathOptions={{ color: 'var(--color-primary)', fillColor: 'var(--color-primary)', fillOpacity: 0.2 }} positions={fieldCoordinates}>
            <Popup>
              <strong>Zone Alpha</strong><br />
              Area: 2.4 Hectares<br />
              Status: Active
            </Popup>
          </Polygon>
        </MapContainer>
      </div>
    </div>
  );
};
