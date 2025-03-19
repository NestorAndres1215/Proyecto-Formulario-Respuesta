// src/api.js

const API_URL = 'http://localhost:5000/api/';

export const apiRequest = async (url, method, data = null) => {
  try {
    const response = await fetch(`${API_URL}${url}`, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : null,
    });

    if (!response.ok) {
      throw new Error('Error al hacer la solicitud');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error en la solicitud API:', error);
    throw error;
  }
};
