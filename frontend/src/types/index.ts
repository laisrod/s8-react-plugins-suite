import type { ChartData, ChartOptions } from 'chart.js';

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

  // Interface para dados de gráfico
  export interface IChartData {
    _id?: string;
    label: string;
    value: number;
    category: string;
    chartType: 'bar' | 'line';
    date?: string; // Date vira string no JSON
    createdAt?: string;
    updatedAt?: string;
  }

  // Tipo para criar dados de gráfico
  export type CreateChartDataDTO = Omit<IChartData, '_id' | 'createdAt' | 'updatedAt'>;

  // Tipo para atualizar dados de gráfico
  export type UpdateChartDataDTO = Partial<Omit<IChartData, '_id' | 'createdAt' | 'updatedAt'>>;

  // Dados de gráfico de linha
  export interface LineChartData extends ChartData<'line'> {}

  // Dados de gráfico de barras
  export interface BarChartData extends ChartData<'bar'> {}

  // Dados de gráfico de pizza
  export interface PieChartData extends ChartData<'pie'> {}

  // Dados de gráfico de rosca
  export interface DoughnutChartData extends ChartData<'doughnut'> {}

  // Opções de gráfico
  export type ChartOptionsType = ChartOptions<'line' | 'bar' | 'pie' | 'doughnut'>;

  // Interface para MapLocation
  export interface IMapLocation {
    _id?: string;
    name: string;
    latitude: number;
    longitude: number;
    description?: string;
    address?: string;
    category?: string;
    createdAt?: string;
    updatedAt?: string;
  }

  // Tipo para criar MapLocation
  export type CreateMapLocationDTO = Omit<IMapLocation, '_id' | 'createdAt' | 'updatedAt'>;

  // Tipo para atualizar MapLocation
  export type UpdateMapLocationDTO = Partial<Omit<IMapLocation, '_id' | 'createdAt' | 'updatedAt'>>;

  // Interface para CalendarEvent
  export interface ICalendarEvent {
    _id?: string;
    title: string;
    date: string; // Date vira string no JSON
    color: string;
    description?: string;
    createdAt?: string;
    updatedAt?: string;
  }

  // Tipo para criar CalendarEvent
  export type CreateCalendarEventDTO = Omit<ICalendarEvent, '_id' | 'createdAt' | 'updatedAt'>;

  // Tipo para atualizar CalendarEvent
  export type UpdateCalendarEventDTO = Partial<Omit<ICalendarEvent, '_id' | 'createdAt' | 'updatedAt'>>;

  // Categorias do mapa
  export type Category = 'restaurant' | 'park' | 'museum' | 'hotel' | 'shopping' | 'other';