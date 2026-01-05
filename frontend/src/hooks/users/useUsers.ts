import { useEffect, useCallback } from 'react';
import { useUserState } from './useUserState';
import { useUserFetch } from './useUserFetch';
import { useUserOperations } from './useUserOperations';
import type { CreateUserDTO } from '../../types/index';

interface UseUsersReturn {
  users: ReturnType<typeof useUserState>['users'];
  loading: boolean;
  creating: boolean;
  updating: boolean;
  deleting: boolean;
  error: string | null;
  createUserHandler: (data: CreateUserDTO) => Promise<boolean>;
  updateUserHandler: (id: string, data: CreateUserDTO) => Promise<boolean>;
  deleteUserHandler: (id: string) => Promise<boolean>;
  refetch: () => Promise<void>;
}

/**
 * Hook principal para gerenciar usuários
 * Responsabilidade: Orquestrar os hooks menores e fornecer interface unificada
 * 
 * Este hook combina:
 * - useUserState: Gerenciamento de estado local
 * - useUserFetch: Busca de dados da API
 * - useUserOperations: Operações CRUD
 */
export const useUsers = (): UseUsersReturn => {
  const { users, setUsers, addUser, updateUserInList, removeUser } = useUserState();
  const { loading, error: fetchError, fetchUsers } = useUserFetch();
  const {
    creating,
    updating,
    deleting,
    error: operationsError,
    createUser: createUserOp,
    updateUser: updateUserOp,
    deleteUser: deleteUserOp,
  } = useUserOperations();

  // Carregar usuários ao montar o componente
  const loadUsers = useCallback(async (): Promise<void> => {
    const fetchedUsers = await fetchUsers();
    if (fetchedUsers.length > 0 || !fetchError) {
      setUsers(fetchedUsers);
    }
  }, [fetchUsers, setUsers, fetchError]);

  useEffect(() => {
    void loadUsers();
  }, [loadUsers]);

  // Handler para criar usuário
  const createUserHandler = useCallback(
    async (data: CreateUserDTO): Promise<boolean> => {
      const newUser = await createUserOp(data);
      if (newUser) {
        addUser(newUser);
        return true;
      }
      return false;
    },
    [createUserOp, addUser]
  );

  // Handler para atualizar usuário
  const updateUserHandler = useCallback(
    async (id: string, data: CreateUserDTO): Promise<boolean> => {
      const updatedUser = await updateUserOp(id, data);
      if (updatedUser) {
        updateUserInList(id, updatedUser);
        return true;
      }
      return false;
    },
    [updateUserOp, updateUserInList]
  );

  // Handler para deletar usuário
  const deleteUserHandler = useCallback(
    async (id: string): Promise<boolean> => {
      const success = await deleteUserOp(id);
      if (success) {
        removeUser(id);
      }
      return success;
    },
    [deleteUserOp, removeUser]
  );

  // Priorizar erro de operações sobre erro de fetch
  const error = operationsError || fetchError;

  return {
    users,
    loading,
    creating,
    updating,
    deleting,
    error,
    createUserHandler,
    updateUserHandler,
    deleteUserHandler,
    refetch: loadUsers,
  };
};

