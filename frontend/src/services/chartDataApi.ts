import type { IChartData, ApiResponse } from '../types/index';

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
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
    };
  }
};

// Buscar todos os dados de gráfico
export const fetchChartData = async (category?: string, chartType?: string): Promise<ApiResponse<IChartData[]>> => {
  const params = new URLSearchParams();
  if (category) params.append('category', category);
  if (chartType) params.append('chartType', chartType);
  
  const queryString = params.toString();
  return fetchAPI<IChartData[]>(queryString ? `?${queryString}` : '');
};

// Buscar um dado de gráfico por ID
export const fetchChartDataById = async (id: string): Promise<ApiResponse<IChartData>> => {
  return fetchAPI<IChartData>(`/${id}`);
};

// Criar dado de gráfico
export const createChartData = async (chartData: Omit<IChartData, '_id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<IChartData>> => {
  return fetchAPI<IChartData>('', {
    method: 'POST',
    body: JSON.stringify(chartData),
  });
};

// Atualizar dado de gráfico
export const updateChartData = async (
  id: string,
  chartData: Partial<Omit<IChartData, '_id' | 'createdAt' | 'updatedAt'>>
): Promise<ApiResponse<IChartData>> => {
  return fetchAPI<IChartData>(`/${id}`, {
    method: 'PUT',
    body: JSON.stringify(chartData),
  });
};

// Deletar dado de gráfico
export const deleteChartData = async (id: string): Promise<ApiResponse<{ message: string }>> => {
  return fetchAPI<{ message: string }>(`/${id}`, {
    method: 'DELETE',
  });
};
