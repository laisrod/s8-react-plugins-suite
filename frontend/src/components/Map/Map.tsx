import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { fetchMapLocations } from '../../services/mapLocationApi';
import type { IMapLocation } from '../../types/index';

// Fix para ícones do Leaflet (problema comum)
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

  // Centro padrão (Brasil) se não houver locais
  const defaultCenter: [number, number] = [-14.235, -51.925];
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

  // Calcular centro do mapa baseado nos locais ou usar padrão
  const getMapCenter = (): [number, number] => {
    if (locations.length === 0) {
      return defaultCenter;
    }
    
    const avgLat = locations.reduce((sum, loc) => sum + loc.latitude, 0) / locations.length;
    const avgLng = locations.reduce((sum, loc) => sum + loc.longitude, 0) / locations.length;
    
    return [avgLat, avgLng];
  };

  const getMapZoom = (): number => {
    if (locations.length === 0) {
      return defaultZoom;
    }
    if (locations.length === 1) {
      return 13;
    }
    return 6;
  };

  return (
    <div className="map-container" style={{ padding: '20px' }}>
      <h1>Mapa Interativo</h1>
      
      {loading && <p>Carregando mapa...</p>}
      {error && <p style={{ color: 'red' }}>Erro: {error}</p>}
      {!loading && locations.length === 0 && !error && (
        <p>Nenhum local cadastrado. Adicione locais através da API.</p>
      )}

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
                {location.address && (
                  <>
                    <br />
                    <small>{location.address}</small>
                  </>
                )}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {!loading && locations.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <p><strong>{locations.length}</strong> local(is) cadastrado(s)</p>
        </div>
      )}
    </div>
  );
};

export default Map;

