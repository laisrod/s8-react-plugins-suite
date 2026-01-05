import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { useUsers, useUserForm } from '../../hooks';
import UserForm from './UserForm';
import ConfirmModal from './ConfirmModal';
import './Users.css';

const Users = () => {
  const { users, loading, error, createUserHandler, updateUserHandler, deleteUserHandler } = useUsers();
  const { formData, editingUser, showForm, setFormData, startEdit, handleCancel, openForm } = useUserForm();
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; userId: string | null }>({
    isOpen: false,
    userId: null
  });
  const [localError, setLocalError] = useState<string | null>(null);

  // Sincronizar erro do hook com estado local para poder fechar
  useEffect(() => {
    if (error) {
      console.log('Erro recebido no componente Users:', error);
      setLocalError(error);
    } else {
      setLocalError(null);
    }
  }, [error]);

  // Função para criar usuário
  const handleCreate = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    const success = await createUserHandler(formData);
    if (success) {
      handleCancel();
    }
  };

  // Função para atualizar usuário
  const handleUpdate = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    if (!editingUser?._id) return;
    
    const success = await updateUserHandler(editingUser._id, formData);
    if (success) {
      handleCancel();
    }
  };

  // Função para abrir modal de confirmação de delete
  const openDeleteModal = (id: string): void => {
    setDeleteModal({ isOpen: true, userId: id });
  };

  // Função para confirmar delete
  const confirmDelete = async (): Promise<void> => {
    if (deleteModal.userId) {
      await deleteUserHandler(deleteModal.userId);
      setDeleteModal({ isOpen: false, userId: null });
    }
  };

  // Função para cancelar delete
  const cancelDelete = (): void => {
    setDeleteModal({ isOpen: false, userId: null });
  };

  return (
    <div className="users-container">
      <h1>CRUD de Usuários</h1>
      
      {localError && (
        <div className="error-message" role="alert">
          <span><strong>Erro:</strong> {localError}</span>
          <button 
            className="error-close-btn"
            onClick={() => setLocalError(null)}
            aria-label="Fechar mensagem de erro"
          >
            ×
          </button>
        </div>
      )}

      <div className="users-actions">
        <button 
          onClick={openForm}
          className="btn-add"
        >
          Adicionar Usuário
        </button>
      </div>

      {showForm && (
        <UserForm
          formData={formData}
          editingUser={editingUser}
          onFormDataChange={setFormData}
          onSubmit={editingUser ? handleUpdate : handleCreate}
          onCancel={handleCancel}
        />
      )}

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        title="Confirmar Exclusão"
        message="Tem certeza que deseja deletar este usuário? Esta ação não pode ser desfeita."
        confirmText="Deletar"
        cancelText="Cancelar"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />

      <div className="users-table-container">
        {loading ? (
          <div className="loading-message">Carregando usuários...</div>
        ) : (
          <table className="users-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Sobrenome</th>
                <th>Email</th>
                <th>Telefone</th>
                <th>Localização</th>
                <th>Hobby</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={8} className="empty-message">
                    Nenhum usuário encontrado
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.first}</td>
                    <td>{user.last}</td>
                    <td>{user.email}</td>
                    <td>{user.phone || '-'}</td>
                    <td>{user.location || '-'}</td>
                    <td>{user.hobby || '-'}</td>
                    <td>
                      <button
                        onClick={() => startEdit(user)}
                        className="btn-edit"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => user._id && openDeleteModal(user._id)}
                        className="btn-delete"
                      >
                        Deletar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Users;