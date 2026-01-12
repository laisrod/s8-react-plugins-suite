import { useMemo, useCallback } from 'react';
import type { Category } from '../../types';
import { CATEGORIES, CATEGORY_LABELS } from '../../constants';

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
  // ============================================================
  // FLUXO DE FILTRAGEM: Usuário clica → Estado muda
  // ============================================================
  // Esta função é chamada quando o usuário clica em um checkbox
  // Ela apenas repassa a chamada para onCategoryToggle (que vem de useMap)
  // que atualizará o estado selectedCategories
  const handleCategoryChange = useCallback(
    (category: Category) => {
      onCategoryToggle(category); // REPASSA PARA useMap → Estado muda
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

