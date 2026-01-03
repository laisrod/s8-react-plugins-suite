import React, { useEffect, useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { fetchMapLocations } from '../../services/mapLocationApi';
import type { IMapLocation } from '../../types/index';
import MapFilters from './MapFilters';
import type { Category } from './MapFilters';

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
  // Estado para guardar quais categorias estão selecionadas (todas por padrão)
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([
    'restaurant', 'park', 'museum', 'hotel', 'shopping', 'other'
  ]);

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

  // Contar quantos locais existem em cada categoria
  const categoryCounts = useMemo(() => {
    const counts: Record<Category, number> = {
      restaurant: 0,
      park: 0,
      museum: 0,
      hotel: 0,
      shopping: 0,
      other: 0
    };
    
    locations.forEach(location => {
      const cat = location.category as Category;
      if (cat in counts) {
        counts[cat]++;
      }
    });
    
    return counts;
  }, [locations]);

  // Filtrar locais: mostrar apenas os que estão nas categorias selecionadas
  const filteredLocations = useMemo(() => {
    return locations.filter(location =>
      selectedCategories.includes(location.category as Category)
    );
  }, [locations, selectedCategories]);

  // Função para adicionar ou remover uma categoria da seleção
  const handleCategoryToggle = (category: Category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(cat => cat !== category)  // Remove se já está selecionada
        : [...prev, category]                    // Adiciona se não está selecionada
    );
  };

  return (
    <div className="map-container" style={{ padding: '20px', position: 'relative' }}>
      <h1>Mapa Interativo</h1>
      
      {loading && <p>Carregando mapa...</p>}
      {error && <p style={{ color: 'red' }}>Erro: {error}</p>}

      <div style={{ height: '600px', width: '100%', marginTop: '20px', position: 'relative' }}>
        <MapFilters
          selectedCategories={selectedCategories}
          onCategoryToggle={handleCategoryToggle}
          categoryCounts={categoryCounts}
        />
        <MapContainer
          center={getMapCenter()}
          zoom={getMapZoom()}
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
