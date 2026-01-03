import type { IMapLocation, CreateMapLocationDTO, UpdateMapLocationDTO, ApiResponse } from '../types/index';

const API_URL = 'http://localhost:3000/api/map-locations';

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

// Buscar todos os locais
export const fetchMapLocations = async (): Promise<ApiResponse<IMapLocation[]>> => {
  return fetchAPI<IMapLocation[]>('');
};

// Buscar um local por ID
export const fetchMapLocationById = async (id: string): Promise<ApiResponse<IMapLocation>> => {
  return fetchAPI<IMapLocation>(`/${id}`);
};

// Criar local
export const createMapLocation = async (locationData: CreateMapLocationDTO): Promise<ApiResponse<IMapLocation>> => {
  return fetchAPI<IMapLocation>('', {
    method: 'POST',
    body: JSON.stringify(locationData),
  });
};

// Atualizar local
export const updateMapLocation = async (
  id: string,
  locationData: UpdateMapLocationDTO
): Promise<ApiResponse<IMapLocation>> => {
  return fetchAPI<IMapLocation>(`/${id}`, {
    method: 'PUT',
    body: JSON.stringify(locationData),
  });
};

// Deletar local
export const deleteMapLocation = async (id: string): Promise<ApiResponse<null>> => {
  return fetchAPI<null>(`/${id}`, {
    method: 'DELETE',
  });
};

