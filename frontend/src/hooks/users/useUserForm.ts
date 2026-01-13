import { useState, useCallback } from 'react';
import type { FormEvent } from 'react';
import type { IUser, CreateUserDTO } from '../../types/index';

interface UseUserFormProps {
  createUserHandler: (data: CreateUserDTO) => Promise<boolean>;
  updateUserHandler: (id: string, data: CreateUserDTO) => Promise<boolean>;
  deleteUserHandler: (id: string) => Promise<boolean>;
}

interface UseUserFormReturn {
  formData: CreateUserDTO;
  editingUser: IUser | null;
  showForm: boolean;
  setFormData: React.Dispatch<React.SetStateAction<CreateUserDTO>>;
  setEditingUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  startEdit: (user: IUser) => void;
  resetForm: () => void;
  handleCancel: () => void;
  openForm: () => void;
  handleCreate: (e: FormEvent) => Promise<void>;
  handleUpdate: (e: FormEvent) => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
}

const initialFormData: CreateUserDTO = {
  first: '',
  last: '',
  email: '',
  phone: '',
  location: '',
  hobby: ''
};

export const useUserForm = ({
  createUserHandler,
  updateUserHandler,
  deleteUserHandler,
}: UseUserFormProps): UseUserFormReturn => {
  const [formData, setFormData] = useState<CreateUserDTO>(initialFormData);
  const [editingUser, setEditingUser] = useState<IUser | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);

  const startEdit = (user: IUser): void => {
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
  };

  const resetForm = (): void => {
    setFormData(initialFormData);
    setEditingUser(null);
  };

  const handleCancel = (): void => {
    resetForm();
    setShowForm(false);
  };

  const openForm = (): void => {
    resetForm();
    setShowForm(true);
  };

  // Helper para executar ação do formulário
  const executeFormAction = useCallback(
    async (action: () => Promise<boolean>): Promise<void> => {
      const success = await action();
      if (success) {
        handleCancel();
      }
    },
    [handleCancel]
  );

  const handleCreate = useCallback(
    async (e: FormEvent): Promise<void> => {
      e.preventDefault();
      await executeFormAction(() => createUserHandler(formData));
    },
    [createUserHandler, formData, executeFormAction]
  );

  const handleUpdate = useCallback(
    async (e: FormEvent): Promise<void> => {
      e.preventDefault();
      if (!editingUser?._id) return;

      const userId = editingUser._id;
      await executeFormAction(() => updateUserHandler(userId, formData));
    },
    [updateUserHandler, editingUser, formData, executeFormAction]
  );

  const handleDelete = useCallback(
    async (id: string): Promise<void> => {
      await deleteUserHandler(id);
    },
    [deleteUserHandler]
  );

  return {
    formData,
    editingUser,
    showForm,
    setFormData,
    setEditingUser,
    setShowForm,
    startEdit,
    resetForm,
    handleCancel,
    openForm,
    handleCreate,
    handleUpdate,
    handleDelete,
  };
};

