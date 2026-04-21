const getApiBaseUrl = () => {
  const envUrl = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL)
    ? import.meta.env.VITE_API_URL
    : '';

  if (envUrl) {
    return envUrl;
  }

  const isProduction = typeof window !== 'undefined' && window.location.hostname !== 'localhost';
  return isProduction ? 'https://nexara-server.vercel.app/api' : 'http://localhost:8000/api';
};

// export const BASE_URL = 'http://localhost:8000/api';
export const BASE_URL = 'https://api.paydoot.com/api';
