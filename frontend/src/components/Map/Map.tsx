import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../../css/Map.css';
import { useMap } from '../../hooks';

const Map = () => {
  const { filteredLocations, mapCenter, mapZoom, loading, error } = useMap();

  if (loading) {
    return (
      <div className="map-container">
        <h1>Mapa Interativo</h1>
        <div className="map-loading">Carregando locais do mapa...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="map-container">
        <h1>Mapa Interativo</h1>
        <div className="map-error">
          <p>Erro: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="map-container">
      <h1>Mapa Interativo</h1>
      <div className="map-wrapper">
        <div>
          <MapContainer
            center={mapCenter}
            zoom={mapZoom}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {filteredLocations.map((location) => (
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
                      <em>{location.address}</em>
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
    </div>
  );
};

export default Map;

