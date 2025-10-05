import { useState, useEffect } from 'react';
import { API_CONFIG } from '@/config/api';

/**
 * Hook para buscar URL de uma imagem pelo ID
 * Implementa cache local para evitar requisições repetidas
 */
export const useImageUrl = (imageId?: string) => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!imageId) {
      setImageUrl('');
      return;
    }

    // Verificar cache do sessionStorage
    const cacheKey = `image_url_${imageId}`;
    const cached = sessionStorage.getItem(cacheKey);
    
    if (cached) {
      setImageUrl(cached);
      return;
    }

    // Buscar da API
    const fetchImageUrl = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`${API_CONFIG.BASE_URL}/images/${imageId}`, {
          headers: {
            'x-api-key': API_CONFIG.API_KEY,
          },
        });

        if (!response.ok) {
          throw new Error('Erro ao buscar imagem');
        }

        const data = await response.json();
        setImageUrl(data.url);
        
        // Salvar no cache
        sessionStorage.setItem(cacheKey, data.url);
      } catch (err) {
        console.error('Erro ao buscar URL da imagem:', err);
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setIsLoading(false);
      }
    };

    fetchImageUrl();
  }, [imageId]);

  return { imageUrl, isLoading, error };
};

/**
 * Função helper para limpar cache de imagem
 */
export const clearImageCache = (imageId: string) => {
  sessionStorage.removeItem(`image_url_${imageId}`);
};

/**
 * Função helper para buscar URL de imagem de forma síncrona (se estiver em cache)
 */
export const getImageUrlFromCache = (imageId: string): string | null => {
  return sessionStorage.getItem(`image_url_${imageId}`);
};
