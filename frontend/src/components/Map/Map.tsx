import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import type { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Map: React.FC = () => {
  const position: LatLngExpression = [51.505, -0.09]; // Londres como exemplo

  return (
    <div className="map-container">
      <h1>Mapa Interativo</h1>
      <div style={{ height: '500px', width: '100%' }}>
        <MapContainer
          center={position}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              <strong>Localização Exemplo</strong>
              <br />
              Este é um marcador no mapa!
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;

