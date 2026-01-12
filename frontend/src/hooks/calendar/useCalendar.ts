import { useState, useCallback } from 'react';

interface UseCalendarReturn {
  date: Date | null;
  handleDateChange: (value: Date | [Date | null, Date | null] | null) => void;
  formattedDate: string | null;
}

export const useCalendar = (): UseCalendarReturn => {
  const [date, setDate] = useState<Date | null>(new Date());

  const handleDateChange = useCallback((value: Date | [Date | null, Date | null] | null) => {
    if (value instanceof Date) {
      setDate(value);
    } else if (Array.isArray(value) && value[0] instanceof Date) {
      setDate(value[0]);
    } else {
      setDate(null);
    }
  }, []);

  const formattedDate = date
    ? date.toLocaleDateString('pt-BR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  return {
    date,
    handleDateChange,
    formattedDate,
  };
};

