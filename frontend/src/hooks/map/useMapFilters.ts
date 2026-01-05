import { useMemo, useCallback } from 'react';
import type { Category } from '../../components/Map/types';
import { CATEGORIES, CATEGORY_LABELS } from '../../components/Map/constants';

interface UseMapFiltersProps {
  selectedCategories: Category[];
  onCategoryToggle: (category: Category) => void;
  categoryCounts: Record<Category, number>;
}

export interface FilterItem {
  category: Category;
  label: string;
  count: number;
  isChecked: boolean;
}

interface UseMapFiltersReturn {
  filterItems: FilterItem[];
  handleCategoryChange: (category: Category) => void;
}

/**
 * Hook para gerenciar a lógica dos filtros do mapa
 * Responsabilidade: Processar dados e retornar informações dos filtros
 * Não retorna JSX - apenas dados para o componente renderizar
 */
export const useMapFilters = ({
  selectedCategories,
  onCategoryToggle,
  categoryCounts
}: UseMapFiltersProps): UseMapFiltersReturn => {
  // Memoizar a criação dos handlers para evitar re-criação
  const handleCategoryChange = useCallback(
    (category: Category) => {
      onCategoryToggle(category);
    },
    [onCategoryToggle]
  );

  // Memoizar a lista de dados dos filtros (sem JSX)
  const filterItems = useMemo(() => {
    return CATEGORIES.map((category) => {
      const isChecked = selectedCategories.includes(category);
      const count = categoryCounts[category] || 0;
      const label = CATEGORY_LABELS[category];

      return {
        category,
        label,
        count,
        isChecked
      };
    });
  }, [selectedCategories, categoryCounts]);

  return {
    filterItems,
    handleCategoryChange
  };
};

