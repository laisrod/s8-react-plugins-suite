import { useState, useEffect } from 'react';
import type { ICalendarEvent, UpdateCalendarEventDTO } from '../../types/index';
import './Calendar.css';

interface EventModalProps {
  isOpen: boolean;
  event: ICalendarEvent | null;
  onClose: () => void;
  onSave: (id: string, data: UpdateCalendarEventDTO) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

const COLORS = [
  { value: 'blue', label: 'Azul', color: '#3498db' },
  { value: 'green', label: 'Verde', color: '#2ecc71' },
  { value: 'teal', label: 'Verde-água', color: '#1abc9c' },
  { value: 'red', label: 'Vermelho', color: '#e74c3c' },
  { value: 'orange', label: 'Laranja', color: '#f39c12' },
  { value: 'purple', label: 'Roxo', color: '#9b59b6' }
];

const EventModal = ({
  isOpen,
  event,
  onClose,
  onSave,
  onDelete
}: EventModalProps) => {
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('blue');
  const [description, setDescription] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (event) {
      setTitle(event.title || '');
      setColor(event.color || 'blue');
      setDescription(event.description || '');
      setIsDeleting(false);
    }
  }, [event]);

  if (!isOpen || !event) return null;

  const handleSave = async () => {
    if (!title.trim()) {
      alert('O título é obrigatório');
      return;
    }

    setIsSaving(true);
    try {
      await onSave(event._id!, {
        title: title.trim(),
        color,
        description: description.trim()
      });
      onClose();
    } catch (error) {
      console.error('Erro ao salvar evento:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!isDeleting) {
      setIsDeleting(true);
      return;
    }

    if (!event._id) return;

    try {
      await onDelete(event._id);
      onClose();
    } catch (error) {
      console.error('Erro ao deletar evento:', error);
    }
  };

  const selectedColor = COLORS.find(c => c.value === color);

  return (
    <div className="event-modal-overlay" onClick={onClose}>
      <div className="event-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="event-modal-header">
          <h3>Modificar Evento</h3>
          <button className="event-modal-close" onClick={onClose} aria-label="Fechar">
            ×
          </button>
        </div>

        <div className="event-modal-body">
          <div className="event-modal-field">
            <label htmlFor="event-title">Título:</label>
            <input
              id="event-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Doble click para editar evento"
              className="event-modal-input"
            />
          </div>

          <div className="event-modal-field">
            <label htmlFor="event-color">Color:</label>
            <select
              id="event-color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="event-modal-select"
            >
              {COLORS.map((colorOption) => (
                <option key={colorOption.value} value={colorOption.value}>
                  ■ {colorOption.label}
                </option>
              ))}
            </select>
            <div
              className="event-modal-color-preview"
              style={{ backgroundColor: selectedColor?.color }}
            />
          </div>

          <div className="event-modal-field">
            <label>
              <input
                type="checkbox"
                checked={isDeleting}
                onChange={(e) => setIsDeleting(e.target.checked)}
                className="event-modal-checkbox"
              />
              Eliminar Evento
            </label>
          </div>
        </div>

        <div className="event-modal-actions">
          <button
            className="event-modal-btn event-modal-btn-cancel"
            onClick={onClose}
            disabled={isSaving}
          >
            Cerrar
          </button>
          <button
            className="event-modal-btn event-modal-btn-save"
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? 'Guardando...' : 'Guardar'}
          </button>
        </div>

        {isDeleting && (
          <div className="event-modal-delete-warning">
            <p>¿Está seguro que desea eliminar este evento?</p>
            <button
              className="event-modal-btn event-modal-btn-delete"
              onClick={handleDelete}
            >
              Confirmar Eliminación
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventModal;

