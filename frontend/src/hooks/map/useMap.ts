import { useState, useMemo, useCallback } from 'react';
import { useMapLocations } from './useMapLocations';
import type { Category } from '../../components/Map/types';
import { CATEGORIES } from '../../components/Map/constants';

interface UseMapReturn {
  locations: ReturnType<typeof useMapLocations>['locations'];
  loading: boolean;
  error: string | null;
  selectedCategories: Category[];
  categoryCounts: Record<Category, number>;
  filteredLocations: ReturnType<typeof useMapLocations>['locations'];
  mapCenter: [number, number];
  mapZoom: number;
  handleCategoryToggle: (category: Category) => void;
  selectAllCategories: () => void;
  deselectAllCategories: () => void;
}

const DEFAULT_CENTER: [number, number] = [-14.235, -51.925]; // Brasil
const DEFAULT_ZOOM = 4;

/**
 * Hook principal para gerenciar o mapa
 * Responsabilidade: Orquestrar toda a lógica do mapa
 */
export const useMap = (): UseMapReturn => {
  const { locations, loading, error } = useMapLocations();
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([...CATEGORIES]);

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
      if (cat && cat in counts) {
        counts[cat] = (counts[cat] || 0) + 1;
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

  // Calcular centro do mapa baseado nos locais filtrados
  const mapCenter = useMemo((): [number, number] => {
    if (filteredLocations.length === 0) return DEFAULT_CENTER;
    const avgLat = filteredLocations.reduce((sum, loc) => sum + loc.latitude, 0) / filteredLocations.length;
    const avgLng = filteredLocations.reduce((sum, loc) => sum + loc.longitude, 0) / filteredLocations.length;
    return [avgLat, avgLng];
  }, [filteredLocations]);

  // Calcular zoom do mapa baseado na quantidade de locais
  const mapZoom = useMemo((): number => {
    if (filteredLocations.length === 0) return DEFAULT_ZOOM;
    if (filteredLocations.length === 1) return 13;
    return 6;
  }, [filteredLocations]);

  // Função para alternar uma categoria
  const handleCategoryToggle = useCallback((category: Category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(cat => cat !== category)
        : [...prev, category]
    );
  }, []);

  // Selecionar todas as categorias
  const selectAllCategories = useCallback(() => {
    setSelectedCategories([...CATEGORIES]);
  }, []);

  // Desselecionar todas as categorias
  const deselectAllCategories = useCallback(() => {
    setSelectedCategories([]);
  }, []);

  return {
    locations,
    loading,
    error,
    selectedCategories,
    categoryCounts,
    filteredLocations,
    mapCenter,
    mapZoom,
    handleCategoryToggle,
    selectAllCategories,
    deselectAllCategories,
  };
};

