import { useState, useCallback } from 'react';

interface DeleteModalState {
  isOpen: boolean;
  userId: string | null;
}

interface UseDeleteModalReturn {
  deleteModal: DeleteModalState;
  openDeleteModal: (id: string) => void;
  closeDeleteModal: () => void;
  confirmDelete: (onDelete: (id: string) => Promise<void>) => Promise<void>;
}

/**
 * Hook para gerenciar o modal de confirmação de exclusão
 * Responsabilidade: Controlar estado e ações do modal de delete
 */
export const useDeleteModal = (): UseDeleteModalReturn => {
  const [deleteModal, setDeleteModal] = useState<DeleteModalState>({
    isOpen: false,
    userId: null,
  });

  const openDeleteModal = useCallback((id: string): void => {
    setDeleteModal({ isOpen: true, userId: id });
  }, []);

  const closeDeleteModal = useCallback((): void => {
    setDeleteModal({ isOpen: false, userId: null });
  }, []);

  const confirmDelete = useCallback(
    async (onDelete: (id: string) => Promise<void>): Promise<void> => {
      if (deleteModal.userId) {
        await onDelete(deleteModal.userId);
        closeDeleteModal();
      }
    },
    [deleteModal.userId, closeDeleteModal]
  );

  return {
    deleteModal,
    openDeleteModal,
    closeDeleteModal,
    confirmDelete,
  };
};

