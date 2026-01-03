import type { IMapLocation, ApiResponse } from '../types/index';

const API_URL = 'http://localhost:3000/api/map-locations';

export const fetchMapLocations = async (): Promise<ApiResponse<IMapLocation[]>> => {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data: ApiResponse<IMapLocation[]> = await response.json();
    
    if (!response.ok) {
      return {
        success: false,
        error: data.error || 'Erro ao buscar locais',
      };
    }

    return data;
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
    };
  }
};

