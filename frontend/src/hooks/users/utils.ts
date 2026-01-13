import type { ApiResponse } from '../../types/index';

/**
 * Helper para executar operações assíncronas com tratamento de erro
 * Segue o padrão DRY para evitar repetição de código
 */
export const executeAsyncOperation = async <T>(
  operation: () => Promise<ApiResponse<T>>,
  setLoading: (loading: boolean) => void,
  setError: (error: string | null) => void,
  defaultErrorMessage: string
): Promise<T | null> => {
  try {
    setLoading(true);
    setError(null);

    const response = await operation();

    if (response.success && response.data) {
      return response.data;
    } else {
      setError(response.error || defaultErrorMessage);
      return null;
    }
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : `Erro desconhecido: ${defaultErrorMessage}`;
    setError(errorMsg);
    return null;
  } finally {
    setLoading(false);
  }
};

/**
 * Helper para executar operações de delete (retorna boolean)
 */
export const executeDeleteOperation = async (
  operation: () => Promise<ApiResponse<unknown>>,
  setLoading: (loading: boolean) => void,
  setError: (error: string | null) => void,
  defaultErrorMessage: string
): Promise<boolean> => {
  try {
    setLoading(true);
    setError(null);

    const response = await operation();

    if (response.success) {
      return true;
    } else {
      setError(response.error || defaultErrorMessage);
      return false;
    }
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : `Erro desconhecido: ${defaultErrorMessage}`;
    setError(errorMsg);
    return false;
  } finally {
    setLoading(false);
  }
};

/**
 * Helper para executar fetch de lista (retorna array)
 */
export const executeFetchOperation = async <T>(
  operation: () => Promise<ApiResponse<T[]>>,
  setLoading: (loading: boolean) => void,
  setError: (error: string | null) => void,
  defaultErrorMessage: string
): Promise<T[]> => {
  try {
    setLoading(true);
    setError(null);

    const response = await operation();

    if (response.success && response.data) {
      return response.data;
    } else {
      const errorMsg = response.error || defaultErrorMessage;
      setError(errorMsg);
      return [];
    }
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : `Erro desconhecido: ${defaultErrorMessage}`;
    setError(errorMsg);
    return [];
  } finally {
    setLoading(false);
  }
};

