import { useUsers, useUserForm, useDeleteModal } from '../../hooks';
import UserForm from './UserForm';
import ConfirmModal from './ConfirmModal';
import '../../css/Users.css';

const Users = () => {
  const { users, loading, dismissibleError, dismissError, createUserHandler, updateUserHandler, deleteUserHandler } = useUsers();
  const { formData, editingUser, showForm, setFormData, startEdit, handleCancel, openForm, handleCreate, handleUpdate, handleDelete } = useUserForm({
    createUserHandler,
    updateUserHandler,
    deleteUserHandler,
  });
  const { deleteModal, openDeleteModal, closeDeleteModal, confirmDelete } = useDeleteModal();

  return (
    <div className="users-container">
      <h1>Usuários</h1>
      
      {dismissibleError && (
        <div className="error-message" role="alert">
          <span><strong>Erro:</strong> {dismissibleError}</span>
          <button 
            className="error-close-btn"
            onClick={dismissError}
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
        onConfirm={() => confirmDelete(handleDelete)}
        onCancel={closeDeleteModal}
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