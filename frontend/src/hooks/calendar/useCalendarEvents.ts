import { useState, useEffect, useCallback } from 'react';
import {
  fetchCalendarEvents,
  createCalendarEvent,
  updateCalendarEvent,
  deleteCalendarEvent
} from '../../services/calendarEventApi';
import type { ICalendarEvent, CreateCalendarEventDTO, UpdateCalendarEventDTO } from '../../types/index';

interface UseCalendarEventsReturn {
  events: ICalendarEvent[];
  loading: boolean;
  error: string | null;
  createEvent: (data: CreateCalendarEventDTO) => Promise<boolean>;
  updateEvent: (id: string, data: UpdateCalendarEventDTO) => Promise<boolean>;
  deleteEvent: (id: string) => Promise<boolean>;
  refetch: () => Promise<void>;
}

export const useCalendarEvents = (): UseCalendarEventsReturn => {
  const [events, setEvents] = useState<ICalendarEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadEvents = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchCalendarEvents();
      
      if (response.success && response.data) {
        setEvents(response.data);
      } else {
        setError(response.error || 'Erro ao carregar eventos');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido ao carregar eventos');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadEvents();
  }, [loadEvents]);

  const createEventHandler = useCallback(async (data: CreateCalendarEventDTO): Promise<boolean> => {
    try {
      setError(null);
      const response = await createCalendarEvent(data);
      
      if (response.success) {
        await loadEvents(); // Recarregar eventos
        return true;
      } else {
        setError(response.error || 'Erro ao criar evento');
        return false;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido ao criar evento');
      return false;
    }
  }, [loadEvents]);

  const updateEventHandler = useCallback(async (id: string, data: UpdateCalendarEventDTO): Promise<boolean> => {
    try {
      setError(null);
      const response = await updateCalendarEvent(id, data);
      
      if (response.success) {
        await loadEvents(); // Recarregar eventos
        return true;
      } else {
        setError(response.error || 'Erro ao atualizar evento');
        return false;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido ao atualizar evento');
      return false;
    }
  }, [loadEvents]);

  const deleteEventHandler = useCallback(async (id: string): Promise<boolean> => {
    try {
      setError(null);
      const response = await deleteCalendarEvent(id);
      
      if (response.success) {
        await loadEvents(); // Recarregar eventos
        return true;
      } else {
        setError(response.error || 'Erro ao deletar evento');
        return false;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido ao deletar evento');
      return false;
    }
  }, [loadEvents]);

  return {
    events,
    loading,
    error,
    createEvent: createEventHandler,
    updateEvent: updateEventHandler,
    deleteEvent: deleteEventHandler,
    refetch: loadEvents
  };
};
