import { useState, useEffect, useCallback } from 'react';
import type { FormEvent } from 'react';
import type { IUser, CreateUserDTO } from '../../types/index';
import { fetchUsers, createUser, updateUser, deleteUser } from '../../services/api';

interface UseUsersReturn {
  users: IUser[];
  loading: boolean;
  error: string | null;
  editingUser: IUser | null;
  showForm: boolean;
  formData: CreateUserDTO;
  setFormData: React.Dispatch<React.SetStateAction<CreateUserDTO>>;
  handleCreate: (e: FormEvent) => Promise<void>;
  handleUpdate: (e: FormEvent) => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
  startEdit: (user: IUser) => void;
  resetForm: () => void;
  handleCancel: () => void;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => Promise<void>;
}

export const useUsers = (): UseUsersReturn => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<IUser | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);

  // Formulário
  const [formData, setFormData] = useState<CreateUserDTO>({
    first: '',
    last: '',
    email: '',
    phone: '',
    location: '',
    hobby: ''
  });

  // Função para carregar todos os usuários
  const loadUsers = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchUsers();
      
      if (response.success && response.data) {
        setUsers(response.data);
      } else {
        setError(response.error || 'Erro ao carregar usuários');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido ao carregar usuários');
    } finally {
      setLoading(false);
    }
  }, []);

  // Carregar usuários ao montar o componente
  useEffect(() => {
    void loadUsers();
  }, [loadUsers]);

  // Função para criar usuário
  const handleCreate = useCallback(async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      setError(null);
      const response = await createUser(formData);
      if (response.success) {
        await loadUsers();
        resetForm();
        setShowForm(false);
      } else {
        setError(response.error || 'Erro ao criar usuário');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido ao criar usuário');
    }
  }, [formData, loadUsers]);

  // Função para resetar formulário
  const resetForm = useCallback((): void => {
    setFormData({
      first: '',
      last: '',
      email: '',
      phone: '',
      location: '',
      hobby: ''
    });
    setEditingUser(null);
  }, []);

  // Função para atualizar usuário
  const handleUpdate = useCallback(async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    if (!editingUser?._id) return;
    
    try {
      setError(null);
      const response = await updateUser(editingUser._id, formData);
      if (response.success) {
        await loadUsers();
        resetForm();
        setEditingUser(null);
        setShowForm(false);
      } else {
        setError(response.error || 'Erro ao atualizar usuário');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido ao atualizar usuário');
    }
  }, [editingUser, formData, loadUsers, resetForm]);

  // Função para deletar usuário
  const handleDelete = useCallback(async (id: string): Promise<void> => {
    if (!confirm('Tem certeza que deseja deletar este usuário?')) return;
    
    try {
      setError(null);
      const response = await deleteUser(id);
      if (response.success) {
        await loadUsers();
      } else {
        setError(response.error || 'Erro ao deletar usuário');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido ao deletar usuário');
    }
  }, [loadUsers]);

  // Função para iniciar edição
  const startEdit = useCallback((user: IUser): void => {
    setEditingUser(user);
    setFormData({
      first: user.first,
      last: user.last,
      email: user.email,
      phone: user.phone || '',
      location: user.location || '',
      hobby: user.hobby || ''
    });
    setShowForm(true);
  }, []);

  // Função para cancelar edição/criação
  const handleCancel = useCallback((): void => {
    resetForm();
    setShowForm(false);
  }, [resetForm]);

  return {
    users,
    loading,
    error,
    editingUser,
    showForm,
    formData,
    setFormData,
    handleCreate,
    handleUpdate,
    handleDelete,
    startEdit,
    resetForm,
    handleCancel,
    setShowForm,
    refetch: loadUsers,
  };
};
