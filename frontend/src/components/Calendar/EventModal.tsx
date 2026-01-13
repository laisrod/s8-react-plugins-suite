import { useEventModal, COLORS } from '../../hooks/calendar/useEventModal';
import type { EventModalProps } from '../../types/index';
import '../../css/Calendar.css';

const EventModal = ({
  isOpen,
  event,
  onClose,
  onSave,
  onDelete
}: EventModalProps) => {
  const {
    title,
    setTitle,
    color,
    setColor,
    description,
    setDescription,
    isDeleting,
    setIsDeleting,
    isSaving,
    handleSave,
    handleDelete,
    selectedColor
  } = useEventModal({ event, onSave, onDelete, onClose });

  if (!isOpen || !event) return null;

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

          {/* Campo de descrição - estava faltando */}
          <div className="event-modal-field">
            <label htmlFor="event-description">Descrição:</label>
            <textarea
              id="event-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descrição do evento"
              className="event-modal-textarea"
              rows={3}
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