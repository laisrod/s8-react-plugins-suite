import React, { useState, useEffect } from 'react';
import type { IUser, CreateUserDTO } from '../../types/index';
import { fetchUsers, createUser, updateUser, deleteUser } from '../../services/api';
import './Users.css';

const Users: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
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
  const loadUsers = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    const response = await fetchUsers();
    
    if (response.success && response.data) {
      setUsers(response.data);
    } else {
      setError(response.error || 'Erro ao carregar usuários');
    }
    setLoading(false);
  };

  // Carregar usuários ao montar o componente
  useEffect(() => {
    // Carregar dados iniciais ao montar o componente
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadUsers();
  }, []);

  // Função para criar usuário
  const handleCreate = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    const response = await createUser(formData);
    if (response.success) {
      await loadUsers();
      resetForm();
      setShowForm(false);
    } else {
      setError(response.error || 'Erro ao criar usuário');
    }
  };

  // Função para atualizar usuário
  const handleUpdate = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (!editingUser?._id) return;
    
    const response = await updateUser(editingUser._id, formData);
    if (response.success) {
      await loadUsers();
      resetForm();
      setEditingUser(null);
      setShowForm(false);
    } else {
      setError(response.error || 'Erro ao atualizar usuário');
    }
  };

  // Função para deletar usuário
  const handleDelete = async (id: string): Promise<void> => {
    if (!confirm('Tem certeza que deseja deletar este usuário?')) return;
    
    const response = await deleteUser(id);
    if (response.success) {
      await loadUsers();
    } else {
      setError(response.error || 'Erro ao deletar usuário');
    }
  };

  // Função para iniciar edição
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

  // Função para resetar formulário
  const resetForm = (): void => {
    setFormData({
      first: '',
      last: '',
      email: '',
      phone: '',
      location: '',
      hobby: ''
    });
    setEditingUser(null);
  };

  // Função para cancelar edição/criação
  const handleCancel = (): void => {
    resetForm();
    setShowForm(false);
  };

  if (loading) {
    return <div className="users-container">Carregando...</div>;
  }

  return (
    <div className="users-container">
      <h1>CRUD de Usuários</h1>
      
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
                <td colSpan={8} style={{ textAlign: 'center' }}>
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