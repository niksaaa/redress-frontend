import { demoProfileData } from '../demoData';
import axios from 'axios';

export const fetchProfile = async () => {
  // Для демо-режиму - повертаємо фейкові дані
  if (process.env.REACT_APP_DEMO_MODE === 'true') {
    return new Promise(resolve => {
      setTimeout(() => resolve(demoProfileData), 500); // Імітуємо затримку мережі
    });
  }

  // Реальний запит до бекенду
  const response = await fetch("https://localhost:7029/API/Profile/GetUserProfile", {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  if (!response.ok) throw new Error('Не вдалося отримати дані профілю');
  return response.json();
};


// Додаємо функції для отримання даних користувача
export const fetchCurrentUserProfile = async () => {
  if (process.env.REACT_APP_DEMO_MODE === 'true') {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          id: '5fa85f64-5717-4562-b3fc-2c963f66afa7',
          userId: '6fa85f64-5717-4562-b3fc-2c963f66afa8',
          phoneNumber: '+380991234567'
        });
      }, 300);
    });
  }

  try {
    const response = await axios.get('https://localhost:7029/API/Profile/GetUserProfile');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Помилка при завантаженні профілю');
  }
};


export const updateProfile = async ({ id, updateDto }) => {
  const response = await fetch(`https://localhost:7029/API/Profile/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(updateDto)
  });
  if (!response.ok) throw new Error('Не вдалося оновити профіль');
  return response.json();
};

export const uploadProfileImage = async ({ image, profileId }) => {
  const formData = new FormData();
  formData.append('image', image);
  formData.append('profileId', profileId);

  const response = await fetch(`https://localhost:7029/API/Profile/upload`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: formData
  });
  if (!response.ok) throw new Error('Не вдалося завантажити зображення');
  return response.json();
};