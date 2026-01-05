import { useState, useEffect } from 'react';
import { fetchMapLocations } from '../../services/mapLocationApi';
import type { IMapLocation } from '../../types/index';

interface UseMapLocationsReturn {
  locations: IMapLocation[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useMapLocations = (): UseMapLocationsReturn => {
  const [locations, setLocations] = useState<IMapLocation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadLocations = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchMapLocations();
      
      if (response.success && response.data) {
        setLocations(response.data);
      } else {
        setError(response.error || 'Erro ao carregar locais');
      }
    } catch (err) {
      setError('Erro ao conectar com a API');
      console.error('Erro ao carregar locais:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadLocations();
  }, []);

  return {
    locations,
    loading,
    error,
    refetch: loadLocations
  };
};

