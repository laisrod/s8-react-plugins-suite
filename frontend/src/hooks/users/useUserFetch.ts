import { useState, useCallback } from 'react';
import { fetchUsers } from '../../services/api';
import type { IUser } from '../../types/index';

interface UseUserFetchReturn {
  loading: boolean;
  error: string | null;
  fetchUsers: () => Promise<IUser[]>;
}

/**
 * Hook para buscar usuários da API
 * Responsabilidade: Apenas gerenciar o fetch de usuários
 */
export const useUserFetch = (): UseUserFetchReturn => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsersHandler = useCallback(async (): Promise<IUser[]> => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetchUsers();
      
      if (response.success && response.data) {
        return response.data;
      } else {
        const errorMsg = response.error || 'Erro ao carregar usuários';
        setError(errorMsg);
        return [];
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Erro desconhecido ao carregar usuários';
      setError(errorMsg);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    fetchUsers: fetchUsersHandler,
  };
};

