import { Request, Response } from 'express';
import { CalendarEvent } from '../models/CalendarEvent.js';
import type { ICalendarEvent, NewCalendarEvent, CalendarEventUpdate, ApiResponse } from '../types/index.js';

export const getAllCalendarEvents = async (req: Request, res: Response) => {
  try {
    const events = await CalendarEvent.find().sort({ start: 1 });
    
    res.status(200).json({
      success: true,
      data: events,
      message: 'Eventos encontrados com sucesso'
    } as ApiResponse<ICalendarEvent[]>);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({
      success: false,
      error: errorMessage
    } as ApiResponse<ICalendarEvent[]>);
  }
};

export const getCalendarEventById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const event = await CalendarEvent.findById(id);
    
    if (!event) {
      res.status(404).json({
        success: false,
        error: 'Evento não encontrado'
      } as ApiResponse<ICalendarEvent>);
      return;
    }
    
    res.status(200).json({
      success: true,
      data: event,
      message: 'Evento encontrado com sucesso'
    } as ApiResponse<ICalendarEvent>);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({
      success: false,
      error: errorMessage
    } as ApiResponse<ICalendarEvent>);
  }
};

export const createCalendarEvent = async (req: Request, res: Response) => {
  try {
    const eventData: NewCalendarEvent = req.body;
    
    if (!eventData.end) {
      eventData.end = eventData.start;
    }
    
    const newEvent = new CalendarEvent(eventData);
    const savedEvent = await newEvent.save();
    
    res.status(201).json({
      success: true,
      data: savedEvent,
      message: 'Evento criado com sucesso'
    } as ApiResponse<ICalendarEvent>);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(400).json({
      success: false,
      error: errorMessage
    } as ApiResponse<ICalendarEvent>);
  }
};

export const updateCalendarEvent = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const updateData: CalendarEventUpdate = req.body;
    
    const event = await CalendarEvent.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!event) {
      res.status(404).json({
        success: false,
        error: 'Evento não encontrado'
      } as ApiResponse<ICalendarEvent>);
      return;
    }
    
    res.status(200).json({
      success: true,
      data: event,
      message: 'Evento atualizado com sucesso'
    } as ApiResponse<ICalendarEvent>);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(400).json({
      success: false,
      error: errorMessage
    } as ApiResponse<ICalendarEvent>);
  }
};

export const deleteCalendarEvent = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const event = await CalendarEvent.findByIdAndDelete(id);
    
    if (!event) {
      res.status(404).json({
        success: false,
        error: 'Evento não encontrado'
      } as ApiResponse<null>);
      return;
    }
    
    res.status(200).json({
      success: true,
      data: null,
      message: 'Evento deletado com sucesso'
    } as ApiResponse<null>);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({
      success: false,
      error: errorMessage
    } as ApiResponse<null>);
  }
};
