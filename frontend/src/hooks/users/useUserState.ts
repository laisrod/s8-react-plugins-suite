import { useState, useCallback } from 'react';
import type { IUser } from '../../types/index';

interface UseUserStateReturn {
  users: IUser[];
  setUsers: React.Dispatch<React.SetStateAction<IUser[]>>;
  addUser: (user: IUser) => void;
  updateUserInList: (id: string, updatedUser: IUser) => void;
  removeUser: (id: string) => void;
}

/**
 * Hook para gerenciar o estado da lista de usuários
 *  Apenas gerenciar o estado local dos usuários
 */
export const useUserState = (): UseUserStateReturn => {
  const [users, setUsers] = useState<IUser[]>([]);

  const addUser = useCallback((user: IUser) => {
    setUsers((prev) => [...prev, user]);
  }, []);

  const updateUserInList = useCallback((id: string, updatedUser: IUser) => {
    setUsers((prev) =>
      prev.map((user) => (user._id === id ? updatedUser : user))
    );
  }, []);

  const removeUser = useCallback((id: string) => {
    setUsers((prev) => prev.filter((user) => user._id !== id));
  }, []);

  return {
    users,
    setUsers,
    addUser,
    updateUserInList,
    removeUser,
  };
};

