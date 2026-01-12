import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import MapFilters from './MapFilters';
import { useMap } from '../../hooks';
import '../../css/Map.css';
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

const Map = () => {
  //Ccarregamento
  const {
    loading,
    error,
    selectedCategories,
    categoryCounts,
    filteredLocations,
    mapCenter,
    mapZoom,
    handleCategoryToggle,
  } = useMap();

  
  return (
    <div className="map-container">
      <h1>Mapa</h1>
      
      {loading && <p>Carregando mapa...</p>}
      {error && <p className="map-error">Erro: {error}</p>}

      <div className="map-wrapper">
        <MapFilters
          selectedCategories={selectedCategories}
          onCategoryToggle={handleCategoryToggle}
          categoryCounts={categoryCounts}
        />
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

export default Map;
