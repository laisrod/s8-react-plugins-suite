import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { fetchMapLocations } from '../../services/mapLocationApi';
import type { IMapLocation } from '../../types/index';

// Fix para ícones do Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const Map: React.FC = () => {
  const [locations, setLocations] = useState<IMapLocation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const defaultCenter: [number, number] = [-14.235, -51.925]; // Brasil
  const defaultZoom = 4;

  useEffect(() => {
    const loadLocations = async () => {
      try {
        setLoading(true);
        const response = await fetchMapLocations();
        
        if (response.success && response.data) {
          setLocations(response.data);
        } else {
          setError(response.error || 'Erro ao carregar locais');
        }
      } catch (err) {
        setError('Erro ao conectar com a API');
        console.error('Erro ao carregar locais:', err);
      } finally {
        setLoading(false);
      }
    };

    loadLocations();
  }, []);

  const getMapCenter = (): [number, number] => {
    if (locations.length === 0) return defaultCenter;
    const avgLat = locations.reduce((sum, loc) => sum + loc.latitude, 0) / locations.length;
    const avgLng = locations.reduce((sum, loc) => sum + loc.longitude, 0) / locations.length;
    return [avgLat, avgLng];
  };

  const getMapZoom = (): number => {
    if (locations.length === 0) return defaultZoom;
    if (locations.length === 1) return 13;
    return 6;
  };

  return (
    <div className="map-container" style={{ padding: '20px' }}>
      <h1>Mapa Interativo</h1>
      
      {loading && <p>Carregando mapa...</p>}
      {error && <p style={{ color: 'red' }}>Erro: {error}</p>}

      <div style={{ height: '600px', width: '100%', marginTop: '20px' }}>
        <MapContainer
          center={getMapCenter()}
          zoom={getMapZoom()}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {locations.map((location) => (
            <Marker
              key={location._id}
              position={[location.latitude, location.longitude]}
            >
              <Popup>
                <strong>{location.name}</strong>
                {location.description && (
                  <>
                    <br />
                    {location.description}
                  </>
                )}
                {location.category && (
                  <>
                    <br />
                    <small>Categoria: {location.category}</small>
                  </>
                )}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};
