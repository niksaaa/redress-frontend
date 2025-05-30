import { demoUserData } from '../demoData';
import { getPaginatedData, demoProductsData } from '../demoData';
import { authService } from './authService';

export const fetchUserById = async (id) => {
  try {
    console.log(`Спроба отримати користувача з ID: ${id}`);
    
    if (process.env.REACT_APP_DEMO_MODE === 'true') {
      console.log('Демо-режим: використовуються тестові дані');
      return new Promise(resolve => {
        setTimeout(() => resolve(demoUserData), 500);
      });
    }
    
    const response = await authService.get(`/User/GetById/${id}`);
    console.log('Дані користувача отримано:', response.data);
    return response.data;
  } catch (error) {
    console.error('Помилка при отриманні даних користувача:', {
      id,
      error: error.response?.data || error.message
    });
    throw new Error(error.response?.data?.message || 'Не вдалося отримати дані користувача');
  }
};

export const updateUser = async ({ id, updateDto }) => {
  try {
    console.log(`Оновлення користувача з ID: ${id}`, updateDto);
    
    const response = await authService.put(`/User/Update/${id}`, updateDto);
    console.log('Користувача успішно оновлено:', response.data);
    return response.data;
  } catch (error) {
    console.error('Помилка при оновленні користувача:', {
      id,
      updateDto,
      error: error.response?.data || error.message
    });
    throw new Error(error.response?.data?.message || 'Не вдалося оновити користувача');
  }
};

export const fetchUserProducts = async (profileId, page = 1, pageSize = 5) => {
  if (process.env.REACT_APP_DEMO_MODE === 'true') {
    return new Promise(resolve => {
      setTimeout(() => resolve(getPaginatedData(demoProductsData, page, pageSize)), 500);
    });
  }
  console.log('Fetching products for profile:', profileId);
  try {
    const response = await authService.get(`/Listing/GetByProfile/by-profile/?profileId=${profileId}&page=${page}&pageSize=${pageSize}`);
    console.log('API response:', response.data);
    return response.data;
  } catch (error) {
    console.error('API error:', error);
    throw new Error(error.response?.data?.message || 'Не вдалося завантажити товари');
  }
};

export const getProfileByUser = async () => {
  try {
    const response = await authService.get('/User/GetProfile/profile');
    console.log('Дані профілю за користувачем отримано:', response.data);
    return response.data;
  } catch (error) {
    console.error('Помилка при отриманні профілю:', error);
    throw new Error(error.response?.data?.message || 'Не вдалося отримати дані профілю');
  }
};