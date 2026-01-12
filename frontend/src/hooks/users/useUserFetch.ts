import { useState, useCallback } from 'react';
import { fetchUsers } from '../../services/api';
import type { IUser } from '../../types/index';
import { executeFetchOperation } from './utils';

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
    return executeFetchOperation(
      () => fetchUsers(),
      setLoading,
      setError,
      'Erro ao carregar usuários'
    );
  }, []);

  return {
    loading,
    error,
    fetchUsers: fetchUsersHandler,
  };
};

