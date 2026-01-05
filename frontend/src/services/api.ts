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
      // Log detalhado do erro para debug
      console.error('API Error Response:', {
        status: response.status,
        statusText: response.statusText,
        error: data.error,
        fullResponse: data
      });
      
      // Retornar o erro diretamente sem lançar exceção
      // para que a mensagem seja preservada
      return {
        success: false,
        error: data.error || `Erro na requisição: ${response.status} ${response.statusText}`,
      };
    }

    return data;
  } catch (error) {
    // Se houver erro de rede ou parsing
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    console.error('Erro na requisição:', error);
    return {
      success: false,
      error: errorMessage,
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
  // Validação básica antes de enviar
  if (!userData.first?.trim() || !userData.last?.trim() || !userData.email?.trim()) {
    console.error('Dados inválidos para criar usuário:', userData);
    return {
      success: false,
      error: 'Campos obrigatórios: Nome, Sobrenome e Email são necessários'
    };
  }

  // Limpar campos opcionais vazios antes de enviar
  const cleanedData: CreateUserDTO = {
    first: userData.first.trim(),
    last: userData.last.trim(),
    email: userData.email.trim().toLowerCase(),
  };

  // Adicionar campos opcionais apenas se tiverem valor
  if (userData.phone?.trim()) {
    cleanedData.phone = userData.phone.trim();
  }
  if (userData.location?.trim()) {
    cleanedData.location = userData.location.trim();
  }
  if (userData.hobby?.trim()) {
    cleanedData.hobby = userData.hobby.trim();
  }

  // Log para debug
  console.log('Enviando dados para criar usuário:', cleanedData);

  return fetchAPI<IUser>('', {
    method: 'POST',
    body: JSON.stringify(cleanedData),
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