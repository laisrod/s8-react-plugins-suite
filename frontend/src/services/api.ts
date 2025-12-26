import type { IUser, CreateUserDTO, UpdateUserDTO, ApiResponse } from '../types/index';

const API_URL = 'http://localhost:3000/api/users';

// Função auxiliar para fazer requisições
const fetchAPI = async <T>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    const data: ApiResponse<T> = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Erro na requisição');
    }

    return data;
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
    };
  }
};

// Buscar todos os usuários
export const fetchUsers = async (): Promise<ApiResponse<IUser[]>> => {
  return fetchAPI<IUser[]>('');
};

// Buscar um usuário por ID
export const fetchUserById = async (id: string): Promise<ApiResponse<IUser>> => {
  return fetchAPI<IUser>(`/${id}`);
};

// Criar usuário
export const createUser = async (userData: CreateUserDTO): Promise<ApiResponse<IUser>> => {
  return fetchAPI<IUser>('', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
};

// Atualizar usuário
export const updateUser = async (
  id: string,
  userData: UpdateUserDTO
): Promise<ApiResponse<IUser>> => {
  return fetchAPI<IUser>(`/${id}`, {
    method: 'PUT',
    body: JSON.stringify(userData),
  });
};

// Deletar usuário
export const deleteUser = async (id: string): Promise<ApiResponse<{ message: string }>> => {
  return fetchAPI<{ message: string }>(`/${id}`, {
    method: 'DELETE',
  });
};