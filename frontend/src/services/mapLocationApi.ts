import type { IMapLocation, ApiResponse } from '../types/index';

const API_URL = 'http://localhost:3000/api/map-locations';

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

export const fetchMapLocations = async (): Promise<ApiResponse<IMapLocation[]>> => {
  return fetchAPI<IMapLocation[]>('');
};