import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useCalendar } from '../../hooks';
import './Calendar.css';

/**
 * Componente de calendário
 * Responsabilidade: Apenas renderização da UI
 * Lógica está no hook useCalendar
 */
const CalendarComponent = () => {
  const { date, handleDateChange, formattedDate } = useCalendar();

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
      {formattedDate && (
        <div className="selected-date">
          <p>
            <strong>Data selecionada:</strong> {formattedDate}
          </p>
        </div>
      )}
    </div>
  );
};

export default CalendarComponent;

