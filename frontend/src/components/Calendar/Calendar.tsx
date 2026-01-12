import { useState, useMemo } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useCalendar, useCalendarEvents } from '../../hooks';
import EventModal from './EventModal';
import type { ICalendarEvent } from '../../types/index';
import '../../css/Calendar.css';


const CalendarComponent = () => {
  const { date, handleDateChange, formattedDate } = useCalendar();
  const { events, error, updateEvent, deleteEvent } = useCalendarEvents();
  const [selectedEvent, setSelectedEvent] = useState<ICalendarEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const eventsByDate = useMemo(() => {
    const grouped: Record<string, ICalendarEvent[]> = {};
    events.forEach(event => {
      const eventDate = new Date(event.date).toISOString().split('T')[0];
      if (!grouped[eventDate]) {
        grouped[eventDate] = [];
      }
      grouped[eventDate].push(event);
    });
    return grouped;
  }, [events]);

  const formatDateKey = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view !== 'month') return null;

    const dateKey = formatDateKey(date);
    const dayEvents = eventsByDate[dateKey] || [];

    if (dayEvents.length === 0) return null;

    return (
      <div>
        {dayEvents.map((event) => (
          <div
            key={event._id}
            className={`calendar-event ${event.color}`}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedEvent(event);
              setIsModalOpen(true);
            }}
            title={event.title}
          >
            {event.title}
          </div>
        ))}
      </div>
    );
  };

  const handleSaveEvent = async (id: string, data: any) => {
    await updateEvent(id, data);
  };

  const handleDeleteEvent = async (id: string) => {
    await deleteEvent(id);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <div className="calendar-container">
      <h1>Calendário</h1>
      
      {error && (
        <div style={{ color: '#e74c3c', textAlign: 'center', marginBottom: '1rem' }}>
          Erro: {error}
        </div>
      )}

      <div className="calendar-wrapper">
        <Calendar
          onChange={handleDateChange}
          value={date}
          className="react-calendar"
          tileContent={tileContent}
        />
      </div>

      {formattedDate && (
        <div className="selected-date">
          <p>
            <strong>Data selecionada:</strong> {formattedDate}
          </p>
        </div>
      )}

      <EventModal
        isOpen={isModalOpen}
        event={selectedEvent}
        onClose={handleCloseModal}
        onSave={handleSaveEvent}
        onDelete={handleDeleteEvent}
      />
    </div>
  );
};

export default CalendarComponent;

