import { memo } from 'react';
import { useMapFilters } from '../../hooks';
import type { MapFiltersProps } from '../../types';

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
          {/* ============================================================
              FLUXO DE FILTRAGEM: Usuário clica → Estado muda
              ============================================================
              Quando o usuário clica neste checkbox, onChange é disparado
              e chama handleCategoryChange, que por sua vez chama onCategoryToggle
              Isso atualiza o estado selectedCategories em useMap.ts
          */}
          <input
            id={`filter-${item.category}`}
            type="checkbox"
            checked={item.isChecked}
            onChange={() => handleCategoryChange(item.category)} // USUÁRIO CLICA AQUI
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

export default memo(MapFilters);
