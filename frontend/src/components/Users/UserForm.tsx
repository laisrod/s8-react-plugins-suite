import type { FormEvent } from 'react';
import type { IUser, CreateUserDTO } from '../../types/index';
import './Users.css';

interface UserFormProps {
  formData: CreateUserDTO;
  editingUser: IUser | null;
  onFormDataChange: (data: CreateUserDTO) => void;
  onSubmit: (e: FormEvent) => Promise<void>;
  onCancel: () => void;
}

const UserForm = ({
  formData,
  editingUser,
  onFormDataChange,
  onSubmit,
  onCancel
}: UserFormProps) => {
  const handleChange = (field: keyof CreateUserDTO, value: string) => {
    onFormDataChange({ ...formData, [field]: value });
  };

  return (
    <div className="user-form">
      <h2>{editingUser ? 'Editar Usuário' : 'Novo Usuário'}</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Nome:</label>
          <input
            type="text"
            value={formData.first}
            onChange={(e) => handleChange('first', e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Sobrenome:</label>
          <input
            type="text"
            value={formData.last}
            onChange={(e) => handleChange('last', e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Telefone:</label>
          <input
            type="text"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Localização:</label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => handleChange('location', e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Hobby:</label>
          <input
            type="text"
            value={formData.hobby}
            onChange={(e) => handleChange('hobby', e.target.value)}
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn-save">
            {editingUser ? 'Atualizar' : 'Criar'}
          </button>
          <button type="button" onClick={onCancel} className="btn-cancel">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;

