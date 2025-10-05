export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || (import.meta.env.DEV ? 'http://localhost:3001' : '/api'),
  API_KEY: import.meta.env.VITE_API_KEY || 'your_secure_api_key_here_32_characters_long',
};

export const getAuthHeaders = () => ({
  'Content-Type': 'application/json',
  'x-api-key': API_CONFIG.API_KEY,
});

export const getPublicHeaders = () => ({
  'Content-Type': 'application/json',
});

export const getUploadHeaders = () => ({
  'x-api-key': API_CONFIG.API_KEY,
});

// API Client similar ao axios
export const apiClient = {
  get: async (url: string) => {
    const response = await fetch(`${API_CONFIG.BASE_URL}${url}`, {
      method: 'GET',
      headers: getPublicHeaders(),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return { data };
  },

  post: async (url: string, body?: any) => {
    const response = await fetch(`${API_CONFIG.BASE_URL}${url}`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: body ? JSON.stringify(body) : undefined,
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return { data };
  },

  put: async (url: string, body?: any) => {
    const response = await fetch(`${API_CONFIG.BASE_URL}${url}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: body ? JSON.stringify(body) : undefined,
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return { data };
  },

  delete: async (url: string) => {
    const response = await fetch(`${API_CONFIG.BASE_URL}${url}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return { data };
  },

  patch: async (url: string, body?: any) => {
    const response = await fetch(`${API_CONFIG.BASE_URL}${url}`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: body ? JSON.stringify(body) : undefined,
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return { data };
  },
};
