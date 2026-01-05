// Interface para o modelo User
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

// Tipo para criar um usuário (sem _id, createdAt, updatedAt)
export type CreateUserDTO = Omit<IUser, '_id' | 'createdAt' | 'updatedAt'>;

// Tipo para atualizar (todos os campos opcionais exceto _id)
export type UpdateUserDTO = Partial<Omit<IUser, '_id' | 'createdAt' | 'updatedAt'>>;

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

// Tipo para resposta da API
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
