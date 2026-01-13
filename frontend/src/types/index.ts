import type { ChartData, ChartOptions } from 'chart.js';
import type { FormEvent } from 'react';

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
  
  // criar usuário
  export type CreateUserDTO = Omit<IUser, '_id' | 'createdAt' | 'updatedAt'>;
  
  //  atualizar
  export type UpdateUserDTO = Partial<Omit<IUser, '_id' | 'createdAt' | 'updatedAt'>>;
  
  // resposta da API
  export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
  }

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

  // criar MapLocation
  export type CreateMapLocationDTO = Omit<IMapLocation, '_id' | 'createdAt' | 'updatedAt'>;

  // atualizar MapLocation
  export type UpdateMapLocationDTO = Partial<Omit<IMapLocation, '_id' | 'createdAt' | 'updatedAt'>>;

  // calendarEvent
  export interface ICalendarEvent {
    _id?: string;
    title: string;
    date: string; // Date vira string no JSON
    color: string;
    description?: string;
    createdAt?: string;
    updatedAt?: string;
  }

  // criar CalendarEvent
  export type CreateCalendarEventDTO = Omit<ICalendarEvent, '_id' | 'createdAt' | 'updatedAt'>;

  // atualizar CalendarEvent
  export type UpdateCalendarEventDTO = Partial<Omit<ICalendarEvent, '_id' | 'createdAt' | 'updatedAt'>>;

  // Tipos para Charts
  // dados de gráfico de linha
  export interface LineChartData extends ChartData<'line'> {}

  // dados de gráfico de barras
  export interface BarChartData extends ChartData<'bar'> {}

  // dados de gráfico de pizza
  export interface PieChartData extends ChartData<'pie'> {}

  // dados de gráfico de rosca
  export interface DoughnutChartData extends ChartData<'doughnut'> {}

  // opções de gráfico
  export type ChartOptionsType = ChartOptions<'line' | 'bar' | 'pie' | 'doughnut'>;

  // categorias do mapa
  export type Category = 'restaurant' | 'park' | 'museum' | 'hotel' | 'shopping' | 'other';

  // props do componente UserForm
  export interface UserFormProps {
    formData: CreateUserDTO;
    editingUser: IUser | null;
    onFormDataChange: (data: CreateUserDTO) => void;
    onSubmit: (e: FormEvent) => Promise<void>;
    onCancel: () => void;
  }

  // props do componente ConfirmModal
  export interface ConfirmModalProps {
    isOpen: boolean;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
    onCancel: () => void;
  }

  // props do componente EventModal
  export interface EventModalProps {
    isOpen: boolean;
    event: ICalendarEvent | null;
    onClose: () => void;
    onSave: (id: string, data: UpdateCalendarEventDTO) => Promise<void>;
    onDelete: (id: string) => Promise<void>;
  }

  // props do componente MapFilters
  export interface MapFiltersProps {
    selectedCategories: Category[];
    onCategoryToggle: (category: Category) => void;
    categoryCounts: Record<Category, number>;
  }