import type { ApiResponse, IChartData, CreateChartDataDTO, UpdateChartDataDTO } from '../types/index';

const API_URL = 'http://localhost:3000/api/chart-data';

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
    console.error('Erro na requisição:', error);
    throw error;
  }
};

// Buscar todos os dados de gráficos (com filtros opcionais)
export const fetchChartData = async (filters?: {
  category?: string;
  chartType?: 'bar' | 'line';
}): Promise<ApiResponse<IChartData[]>> => {
  const queryParams = new URLSearchParams();
  if (filters?.category) queryParams.append('category', filters.category);
  if (filters?.chartType) queryParams.append('chartType', filters.chartType);
  
  const queryString = queryParams.toString();
  const endpoint = queryString ? `?${queryString}` : '';
  
  return fetchAPI<IChartData[]>(endpoint);
};

// Buscar um dado específico por ID
export const fetchChartDataById = async (id: string): Promise<ApiResponse<IChartData>> => {
  return fetchAPI<IChartData>(`/${id}`);
};

// Criar novo dado
export const createChartData = async (data: CreateChartDataDTO): Promise<ApiResponse<IChartData>> => {
  return fetchAPI<IChartData>('', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

// Atualizar dado existente
export const updateChartData = async (
  id: string,
  data: UpdateChartDataDTO
): Promise<ApiResponse<IChartData>> => {
  return fetchAPI<IChartData>(`/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

// Deletar dado
export const deleteChartData = async (id: string): Promise<ApiResponse<null>> => {
  return fetchAPI<null>(`/${id}`, {
    method: 'DELETE',
  });
};

// Re-exportar tipos para facilitar importação
export type { IChartData, CreateChartDataDTO, UpdateChartDataDTO };
