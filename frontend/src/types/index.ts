// Interface do usuário (mesma do backend)
export interface IUser {
    _id?: string;
    first: string;
    last: string;
    email: string;
    phone?: string;
    location?: string;
    hobby?: string;
    createdAt?: string; // Date vira string no JSON
    updatedAt?: string;
  }
  
  // Tipo para criar usuário
  export type CreateUserDTO = Omit<IUser, '_id' | 'createdAt' | 'updatedAt'>;
  
  // Tipo para atualizar
  export type UpdateUserDTO = Partial<Omit<IUser, '_id' | 'createdAt' | 'updatedAt'>>;
  
  // Resposta da API
  export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
  }