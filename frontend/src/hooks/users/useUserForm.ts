import { useState } from 'react';
import type { IUser, CreateUserDTO } from '../../types/index';

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
}

const initialFormData: CreateUserDTO = {
  first: '',
  last: '',
  email: '',
  phone: '',
  location: '',
  hobby: ''
};

export const useUserForm = (): UseUserFormReturn => {
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
    openForm
  };
};

