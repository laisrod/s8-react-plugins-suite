import { useUsers } from '../../hooks';
import '../../css/Users.css';

const Users = () => {
  const {
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
  } = useUsers();

  if (loading) {
    return (
      <div className="users-container">
        <div className="loading-message">Carregando usuários...</div>
      </div>
    );
  }

  return (
    <div className="users-container">
      <h1>Usuários</h1>
      
      {error && <div className="error-message">{error}</div>}

      <div className="users-actions">
        <button 
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="btn-add"
        >
          Adicionar Usuário
        </button>
      </div>

      {showForm && (
        <div className="user-form">
          <h2>{editingUser ? 'Editar Usuário' : 'Novo Usuário'}</h2>
          <form onSubmit={editingUser ? handleUpdate : handleCreate}>
            <div className="form-group">
              <label>Nome:</label>
              <input
                type="text"
                value={formData.first}
                onChange={(e) => setFormData({ ...formData, first: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Sobrenome:</label>
              <input
                type="text"
                value={formData.last}
                onChange={(e) => setFormData({ ...formData, last: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Telefone:</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Localização:</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Hobby:</label>
              <input
                type="text"
                value={formData.hobby}
                onChange={(e) => setFormData({ ...formData, hobby: e.target.value })}
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn-save">
                {editingUser ? 'Atualizar' : 'Criar'}
              </button>
              <button type="button" onClick={handleCancel} className="btn-cancel">
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="users-table-container">
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
                      onClick={() => user._id && handleDelete(user._id)}
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
      </div>
    </div>
  );
};

export default Users;