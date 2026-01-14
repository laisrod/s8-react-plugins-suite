import { useState, useEffect, useCallback } from 'react';
import type { ICalendarEvent } from '../../types/index';

interface UseEventModalProps {
  event: ICalendarEvent | null;
  onSave: (id: string, eventData: Partial<ICalendarEvent>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onClose: () => void;
}

export const useEventModal = ({
  event,
  onSave,
  onDelete,
  onClose
}: UseEventModalProps) => {
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('blue');
  const [description, setDescription] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Efeito para inicializar os campos quando o evento muda
  useEffect(() => {
    if (event) {
      setTitle(event.title || '');
      setColor(event.color || 'blue');
      setDescription(event.description || '');
      setIsDeleting(false);
    }
  }, [event]);

  // Função para salvar o evento
  const handleSave = useCallback(async () => {
    if (!title.trim()) {
      alert('O título é obrigatório');
      return;
    }

    if (!event?._id) {
      console.error('Evento não tem ID');
      return;
    }

    setIsSaving(true);
    try {
      await onSave(event._id, {
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
  }, [title, color, description, event, onSave, onClose]);

  // Função para deletar o evento
  const handleDelete = useCallback(async () => {
    if (!isDeleting) {
      setIsDeleting(true);
      return;
    }

    if (!event?._id) {
      console.error('Evento não tem ID');
      return;
    }

    try {
      await onDelete(event._id);
      onClose();
    } catch (error) {
      console.error('Erro ao deletar evento:', error);
    }
  }, [isDeleting, event, onDelete, onClose]);

  // Encontrar a cor selecionada
  const selectedColor = COLORS.find(c => c.value === color);

  return {
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
  };
};

export const COLORS = [
  { value: 'blue', label: 'Azul', color: '#3498db' },
  { value: 'green', label: 'Verde', color: '#2ecc71' },
  { value: 'teal', label: 'Verde-água', color: '#1abc9c' },
  { value: 'red', label: 'Vermelho', color: '#e74c3c' },
  { value: 'orange', label: 'Laranja', color: '#f39c12' },
  { value: 'purple', label: 'Roxo', color: '#9b59b6' }
];
