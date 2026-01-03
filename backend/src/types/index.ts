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
  category: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface NewMapLocation {
  name: string;
  latitude: number;
  longitude: number;
  description?: string;
  address?: string;
  category: string;
}

export interface MapLocationUpdate {
  name?: string;
  latitude?: number;
  longitude?: number;
  description?: string;
  address?: string;
  category?: string;
}

export interface ICalendarEvent {
  _id?: string;
  title: string;
  start: Date;
  end?: Date;
  description?: string;
  color?: string;
  allDay?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface NewCalendarEvent {
  title: string;
  start: Date;
  end?: Date;
  description?: string;
  color?: string;
  allDay?: boolean;
}

export interface CalendarEventUpdate {
  title?: string;
  start?: Date;
  end?: Date;
  description?: string;
  color?: string;
  allDay?: boolean;
}

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

export interface NewChartData {
  label: string;
  value: number;
  category: string;
  chartType: 'bar' | 'line';
  date?: Date;
}

export interface ChartDataUpdate {
  label?: string;
  value?: number;
  category?: string;
  chartType?: 'bar' | 'line';
  date?: Date;
}

