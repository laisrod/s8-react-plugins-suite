import { useState, useCallback } from 'react';
import { createUser, updateUser, deleteUser } from '../../services/api';
import type { IUser, CreateUserDTO } from '../../types/index';

interface UseUserOperationsReturn {
  creating: boolean;
  updating: boolean;
  deleting: boolean;
  error: string | null;
  createUser: (data: CreateUserDTO) => Promise<IUser | null>;
  updateUser: (id: string, data: CreateUserDTO) => Promise<IUser | null>;
  deleteUser: (id: string) => Promise<boolean>;
}

/**
 * Hook para operações CRUD de usuários
 * Responsabilidade: Gerenciar operações de API e estados de loading
 */
export const useUserOperations = (): UseUserOperationsReturn => {
  const [creating, setCreating] = useState<boolean>(false);
  const [updating, setUpdating] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createUserHandler = useCallback(async (data: CreateUserDTO): Promise<IUser | null> => {
    try {
      setCreating(true);
      setError(null);
      
      const response = await createUser(data);
      
      if (response.success && response.data) {
        return response.data;
      } else {
        setError(response.error || 'Erro ao criar usuário');
        return null;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido ao criar usuário');
      return null;
    } finally {
      setCreating(false);
    }
  }, []);

  const updateUserHandler = useCallback(async (id: string, data: CreateUserDTO): Promise<IUser | null> => {
    try {
      setUpdating(true);
      setError(null);
      
      const response = await updateUser(id, data);
      
      if (response.success && response.data) {
        return response.data;
      } else {
        setError(response.error || 'Erro ao atualizar usuário');
        return null;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido ao atualizar usuário');
      return null;
    } finally {
      setUpdating(false);
    }
  }, []);

  const deleteUserHandler = useCallback(async (id: string): Promise<boolean> => {
    try {
      setDeleting(true);
      setError(null);
      
      const response = await deleteUser(id);
      
      if (response.success) {
        return true;
      } else {
        setError(response.error || 'Erro ao deletar usuário');
        return false;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido ao deletar usuário');
      return false;
    } finally {
      setDeleting(false);
    }
  }, []);

  return {
    creating,
    updating,
    deleting,
    error,
    createUser: createUserHandler,
    updateUser: updateUserHandler,
    deleteUser: deleteUserHandler,
  };
};

