import { UploadResponse } from '../types';
import { API_CONFIG } from '@/config/api';

const API_BASE_URL = API_CONFIG.BASE_URL;
const API_KEY = API_CONFIG.API_KEY;

const getHeaders = () => ({
  'x-api-key': API_KEY,
});

export const uploadApi = {
  // POST /upload/image
  uploadImage: async (file: File): Promise<UploadResponse> => {
    const formData = new FormData();
    formData.append('image', file); // Campo deve ser 'image'

    const response = await fetch(`${API_BASE_URL}/upload/image`, {
      method: 'POST',
      headers: {
        'x-api-key': API_KEY, // Header de autenticação necessário
        // Não definir Content-Type - deixar o browser definir com boundary
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Erro no upload:', response.status, errorText);
      throw new Error(`Failed to upload image: ${response.status}`);
    }

    return response.json();
  },

  // POST /upload/document
  uploadDocument: async (file: File): Promise<UploadResponse> => {
    const formData = new FormData();
    formData.append('image', file); // Campo deve ser 'image' também

    const response = await fetch(`${API_BASE_URL}/upload/document`, {
      method: 'POST',
      headers: {
        'x-api-key': API_KEY, // Header de autenticação necessário
        // Não definir Content-Type - deixar o browser definir com boundary
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Erro no upload:', response.status, errorText);
      throw new Error(`Failed to upload document: ${response.status}`);
    }

    return response.json();
  },
};
