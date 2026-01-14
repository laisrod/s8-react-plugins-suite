import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../css/Calendar.css';
import { useCalendar, useCalendarEvents } from '../../hooks';

const CalendarComponent = () => {
  const { date, handleDateChange, formattedDate } = useCalendar();
  const { events, loading, error } = useCalendarEvents();

  // Filtrar eventos da data selecionada
  const selectedDateEvents = date
    ? events.filter(event => {
        const eventDate = new Date(event.date);
        const selectedDate = new Date(date);
        return (
          eventDate.getDate() === selectedDate.getDate() &&
          eventDate.getMonth() === selectedDate.getMonth() &&
          eventDate.getFullYear() === selectedDate.getFullYear()
        );
      })
    : [];

  if (loading) {
    return (
      <div className="calendar-container">
        <h1>Calendário</h1>
        <div className="loading-message">Carregando eventos...</div>
      </div>
    );
  }

  return (
    <div className="calendar-container">
      <h1>Calendário</h1>
      {error && (
        <div className="error-message">
          <p>Erro: {error}</p>
        </div>
      )}
      <div className="calendar-wrapper">
        <Calendar
          onChange={handleDateChange}
          value={date}
          className="react-calendar"
        />
      </div>
      {formattedDate && (
        <div className="selected-date">
          <p>
            <strong>Data selecionada:</strong> {formattedDate}
          </p>
          {selectedDateEvents.length > 0 && (
            <div className="events-list">
              <h3>Eventos nesta data:</h3>
              <ul>
                {selectedDateEvents.map((event) => (
                  <li key={event._id} style={{ color: event.color || '#4a5568' }}>
                    <strong>{event.title}</strong>
                    {event.description && <p>{event.description}</p>}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CalendarComponent;

