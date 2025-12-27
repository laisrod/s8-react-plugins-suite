import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css';

const CalendarComponent = () => {
  const [date, setDate] = useState<Date | null>(new Date());

  const handleDateChange = (value: Date | [Date | null, Date | null] | null) => {
    if (value instanceof Date) {
      setDate(value);
    } else if (Array.isArray(value) && value[0] instanceof Date) {
      setDate(value[0]);
    } else {
      setDate(null);
    }
  };

  return (
    <div className="calendar-container">
      <h1>Calendário Completo</h1>
      <div className="calendar-wrapper">
        <Calendar
          onChange={handleDateChange}
          value={date}
          className="react-calendar"
        />
      </div>
      {date && (
        <div className="selected-date">
          <p>
            <strong>Data selecionada:</strong>{' '}
            {date instanceof Date && date.toLocaleDateString('pt-BR', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
      )}
    </div>
  );
};

export default CalendarComponent;

