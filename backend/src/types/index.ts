export interface IUser {
  _id?: string;
  first: string;
  last: string;
  email: string;
  phone?: string;
  location?: string;
  hobby?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface NewUser {
  first: string;
  last: string;
  email: string;
  phone?: string;
  location?: string;
  hobby?: string;
}

export interface UserUpdate {
  first?: string;
  last?: string;
  email?: string;
  phone?: string;
  location?: string;
  hobby?: string;
}

// Interface para MapLocation
export interface IMapLocation {
  _id?: string;
  name: string;
  latitude: number;
  longitude: number;
  description?: string;
  address?: string;
  category: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Tipo para criar MapLocation
export type CreateMapLocationDTO = Omit<IMapLocation, '_id' | 'createdAt' | 'updatedAt'>;

// Tipo para atualizar MapLocation
export type UpdateMapLocationDTO = Partial<Omit<IMapLocation, '_id' | 'createdAt' | 'updatedAt'>>;

// Interface para CalendarEvent
export interface ICalendarEvent {
  _id?: string;
  title: string;
  date: Date;
  color: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Tipo para criar CalendarEvent
export type CreateCalendarEventDTO = Omit<ICalendarEvent, '_id' | 'createdAt' | 'updatedAt'>;

// Tipo para atualizar CalendarEvent
export type UpdateCalendarEventDTO = Partial<Omit<ICalendarEvent, '_id' | 'createdAt' | 'updatedAt'>>;

// Interface para ChartData
export interface IChartData {
  _id?: string;
  label: string;
  value: number;
  category: string;
  chartType: 'bar' | 'line';
  date?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

// Tipo para criar ChartData
export type NewChartData = Omit<IChartData, '_id' | 'createdAt' | 'updatedAt'>;

// Tipo para atualizar ChartData
export type ChartDataUpdate = Partial<Omit<IChartData, '_id' | 'createdAt' | 'updatedAt'>>;

// Tipo para resposta da API
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
