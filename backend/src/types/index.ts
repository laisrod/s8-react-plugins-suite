// Interface para o modelo User
export interface IUser {
  _id?: string;
  first: string;
  last: string;
  email: string;
  phone?: string;
  location?: string;
  hobby?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Tipo para criar um usuário (sem _id, createdAt, updatedAt)
export type CreateUserDTO = Omit<IUser, '_id' | 'createdAt' | 'updatedAt'>;

// Tipo para atualizar (todos os campos opcionais exceto _id)
export type UpdateUserDTO = Partial<Omit<IUser, '_id' | 'createdAt' | 'updatedAt'>>;

// Tipo para resposta da API
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

