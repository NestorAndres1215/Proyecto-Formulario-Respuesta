// src/loginService.js
import { apiRequest } from '../api/api';

export const loginUser = async (email, password) => {
  try {
    const data = { email, password };
    const response = await apiRequest('usuarios/login', 'POST', data);
    return response;
  } catch (error) {
    console.error('Error al intentar loguearse', error);
    throw error;
  }
};


export const getUserProfile = async (email) => {
  try {
    const response = await apiRequest(`usuarios/perfil/${email}`, 'GET');
    if (!response) {
      throw new Error('No se pudo obtener el perfil del usuario');
    }
    return response;
  } catch (error) {
    throw error;
  }
};
