import { Request, Response } from 'express';
import { CalendarEvent } from '../models/CalendarEvent.js';
import type { ICalendarEvent, CreateCalendarEventDTO, UpdateCalendarEventDTO, ApiResponse } from '../types/index.js';

// GET /api/calendar-events - Listar todos os eventos
export const getAllCalendarEvents = async (
  req: Request,
  res: Response<ApiResponse<ICalendarEvent[]>>
): Promise<void> => {
  try {
    const events: ICalendarEvent[] = await CalendarEvent.find().sort({ date: 1 });
    res.status(200).json({
      success: true,
      data: events,
      message: 'Eventos encontrados com sucesso'
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({
      success: false,
      error: errorMessage
    });
  }
};

// GET /api/calendar-events/:id - Buscar um evento por ID
export const getCalendarEventById = async (
  req: Request<{ id: string }>,
  res: Response<ApiResponse<ICalendarEvent>>
): Promise<void> => {
  try {
    const { id } = req.params;
    const event: ICalendarEvent | null = await CalendarEvent.findById(id);
    
    if (!event) {
      res.status(404).json({
        success: false,
        error: 'Evento não encontrado'
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      data: event
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({
      success: false,
      error: errorMessage
    });
  }
};

// POST /api/calendar-events - Criar novo evento
export const createCalendarEvent = async (
  req: Request<Record<string, never>, ApiResponse<ICalendarEvent>, CreateCalendarEventDTO>,
  res: Response<ApiResponse<ICalendarEvent>>
): Promise<void> => {
  try {
    const eventData: CreateCalendarEventDTO = req.body;

    if (!eventData.title || !eventData.date) {
      res.status(400).json({
        success: false,
        error: 'Campos obrigatórios: Título e Data são necessários'
      });
      return;
    }

    const cleanedData: CreateCalendarEventDTO = {
      title: eventData.title.trim(),
      date: new Date(eventData.date),
      color: eventData.color || 'blue',
      description: eventData.description?.trim() || ''
    };

    const newEvent = new CalendarEvent(cleanedData);
    const savedEvent: ICalendarEvent = await newEvent.save();
    
    res.status(201).json({
      success: true,
      data: savedEvent,
      message: 'Evento criado com sucesso'
    });
  } catch (error) {
    let errorMessage = 'Erro ao criar evento';
    
    if (error instanceof Error) {
      if (error.name === 'ValidationError') {
        errorMessage = `Erro de validação: ${error.message}`;
      } else {
        errorMessage = error.message;
      }
    }
    
    console.error('Erro ao criar evento:', error);
    res.status(400).json({
      success: false,
      error: errorMessage
    });
  }
};

// PUT /api/calendar-events/:id - Atualizar evento
export const updateCalendarEvent = async (
  req: Request<{ id: string }, ApiResponse<ICalendarEvent>, UpdateCalendarEventDTO>,
  res: Response<ApiResponse<ICalendarEvent>>
): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData: UpdateCalendarEventDTO = req.body;

    // Limpar dados
    const cleanedData: UpdateCalendarEventDTO = {};
    if (updateData.title) cleanedData.title = updateData.title.trim();
    if (updateData.date) cleanedData.date = new Date(updateData.date);
    if (updateData.color) cleanedData.color = updateData.color;
    if (updateData.description !== undefined) {
      cleanedData.description = updateData.description?.trim() || '';
    }

    const updatedEvent: ICalendarEvent | null = await CalendarEvent.findByIdAndUpdate(
      id,
      cleanedData,
      { new: true, runValidators: true }
    );

    if (!updatedEvent) {
      res.status(404).json({
        success: false,
        error: 'Evento não encontrado'
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: updatedEvent,
      message: 'Evento atualizado com sucesso'
    });
  } catch (error) {
    let errorMessage = 'Erro ao atualizar evento';
    
    if (error instanceof Error) {
      if (error.name === 'ValidationError') {
        errorMessage = `Erro de validação: ${error.message}`;
      } else {
        errorMessage = error.message;
      }
    }
    
    console.error('Erro ao atualizar evento:', error);
    res.status(400).json({
      success: false,
      error: errorMessage
    });
  }
};

// DELETE /api/calendar-events/:id - Deletar evento
export const deleteCalendarEvent = async (
  req: Request<{ id: string }>,
  res: Response<ApiResponse<null>>
): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedEvent: ICalendarEvent | null = await CalendarEvent.findByIdAndDelete(id);

    if (!deletedEvent) {
      res.status(404).json({
        success: false,
        error: 'Evento não encontrado'
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: null,
      message: 'Evento deletado com sucesso'
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({
      success: false,
      error: errorMessage
    });
  }
};

