import { memo } from 'react';
import { useMapFilters } from '../../hooks';
import type { Category } from './types';

interface MapFiltersProps {
  selectedCategories: Category[];
  onCategoryToggle: (category: Category) => void;
  categoryCounts: Record<Category, number>;
}

/**
 * Componente de filtros para o mapa
 * Permite filtrar locais por categoria
 * 
 * Responsabilidade: Renderização da UI
 * Lógica de dados está no hook useMapFilters
 * 
 * @param selectedCategories - Array de categorias selecionadas
 * @param onCategoryToggle - Função chamada ao alternar uma categoria
 * @param categoryCounts - Contagem de locais por categoria
 */
const MapFilters = ({
  selectedCategories,
  onCategoryToggle,
  categoryCounts
}: MapFiltersProps) => {
  const { filterItems, handleCategoryChange } = useMapFilters({
    selectedCategories,
    onCategoryToggle,
    categoryCounts
  });

  return (
    <div className="map-filters-container" role="group" aria-label="Filtros de categorias do mapa">
      <h3 className="map-filters-title">Filtros</h3>
      {filterItems.map((item) => (
        <label
          key={item.category}
          className="map-filters-label"
          htmlFor={`filter-${item.category}`}
        >
          <input
            id={`filter-${item.category}`}
            type="checkbox"
            checked={item.isChecked}
            onChange={() => handleCategoryChange(item.category)}
            className="map-filters-checkbox"
            aria-label={`Filtrar por ${item.label}`}
            aria-checked={item.isChecked}
          />
          <span className="map-filters-text">
            {item.label} [{item.count}]
          </span>
        </label>
      ))}
    </div>
  );
};

// Memoizar o componente para evitar re-renders quando props não mudam
export default memo(MapFilters);
