import type { ICalendarEvent, CreateCalendarEventDTO, UpdateCalendarEventDTO, ApiResponse } from '../types/index';

const API_URL = 'http://localhost:3000/api/calendar-events';

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
      console.error('API Error Response:', {
        status: response.status,
        statusText: response.statusText,
        error: data.error,
        fullResponse: data
      });
      return {
        success: false,
        error: data.error || `Erro na requisição: ${response.status} ${response.statusText}`,
      };
    }

    return data;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    console.error('Erro na requisição:', error);
    return {
      success: false,
      error: errorMessage,
    };
  }
};

// Buscar todos os eventos
export const fetchCalendarEvents = async (): Promise<ApiResponse<ICalendarEvent[]>> => {
  return fetchAPI<ICalendarEvent[]>('');
};

// Buscar evento por ID
export const fetchCalendarEventById = async (id: string): Promise<ApiResponse<ICalendarEvent>> => {
  return fetchAPI<ICalendarEvent>(`/${id}`);
};

// Criar evento
export const createCalendarEvent = async (eventData: CreateCalendarEventDTO | { title?: string; date: Date | string; color?: string; description?: string }): Promise<ApiResponse<ICalendarEvent>> => {
  const dateValue = eventData.date instanceof Date 
    ? eventData.date.toISOString() 
    : (typeof eventData.date === 'string' ? eventData.date : new Date().toISOString());
  
  const cleanedData: CreateCalendarEventDTO = {
    title: eventData.title?.trim() || '',
    date: dateValue,
    color: eventData.color || 'blue',
    description: eventData.description?.trim() || ''
  };

  console.log('Enviando dados para criar evento:', cleanedData);

  return fetchAPI<ICalendarEvent>('', {
    method: 'POST',
    body: JSON.stringify(cleanedData),
  });
};

// Atualizar evento
export const updateCalendarEvent = async (id: string, eventData: UpdateCalendarEventDTO | { title?: string; date?: Date | string; color?: string; description?: string }): Promise<ApiResponse<ICalendarEvent>> => {
  const cleanedData: UpdateCalendarEventDTO = {};
  if (eventData.title) cleanedData.title = eventData.title.trim();
  if (eventData.date !== undefined) {
    cleanedData.date = eventData.date instanceof Date 
      ? eventData.date.toISOString() 
      : (typeof eventData.date === 'string' ? eventData.date : String(eventData.date));
  }
  if (eventData.color) cleanedData.color = eventData.color;
  if (eventData.description !== undefined) {
    cleanedData.description = eventData.description?.trim() || '';
  }

  console.log('Enviando dados para atualizar evento:', { id, ...cleanedData });

  return fetchAPI<ICalendarEvent>(`/${id}`, {
    method: 'PUT',
    body: JSON.stringify(cleanedData),
  });
};

// Deletar evento
export const deleteCalendarEvent = async (id: string): Promise<ApiResponse<null>> => {
  return fetchAPI<null>(`/${id}`, {
    method: 'DELETE',
  });
};

