import { useState, useCallback } from 'react';
import { createUser, updateUser, deleteUser } from '../../services/api';
import type { IUser, CreateUserDTO } from '../../types/index';
import { executeAsyncOperation, executeDeleteOperation } from './utils';

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

  const createUserHandler = useCallback(
    async (data: CreateUserDTO): Promise<IUser | null> => {
      return executeAsyncOperation(
        () => createUser(data),
        setCreating,
        setError,
        'Erro ao criar usuário'
      );
    },
    []
  );

  const updateUserHandler = useCallback(
    async (id: string, data: CreateUserDTO): Promise<IUser | null> => {
      return executeAsyncOperation(
        () => updateUser(id, data),
        setUpdating,
        setError,
        'Erro ao atualizar usuário'
      );
    },
    []
  );

  const deleteUserHandler = useCallback(
    async (id: string): Promise<boolean> => {
      return executeDeleteOperation(
        () => deleteUser(id),
        setDeleting,
        setError,
        'Erro ao deletar usuário'
      );
    },
    []
  );

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

