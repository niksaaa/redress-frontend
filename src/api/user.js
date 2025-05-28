import { demoUserData } from '../demoData';
import { demoFavoritesData, getPaginatedData, demoProductsData } from '../demoData';
import { authService } from './authService';

// export const fetchUserById = async (id) => {
//     if (process.env.REACT_APP_DEMO_MODE === 'true') {
//         return new Promise(resolve => {
//           setTimeout(() => resolve(demoUserData), 500);
//         });
//     }
    
//     const response = await fetch(`${process.env.REACT_APP_API_URL}/api/User/GetById?${id}`, {
//       headers: {
//         'Authorization': `Bearer ${localStorage.getItem('token')}`
//       }
//     });
//     if (!response.ok) throw new Error('Не вдалося отримати дані користувача');
//     return response.json();
//   };
  
// export const updateUser = async ({ id, updateDto }) => {
//   const response = await fetch(`${process.env.REACT_APP_API_URL}/api/User?${id}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${localStorage.getItem('token')}`
//     },
//     body: JSON.stringify(updateDto)
//   });
//   if (!response.ok) throw new Error('Не вдалося оновити користувача');
//   return response.json();
// };



export const fetchUserById = async (id) => {
  try {
    console.log(`Спроба отримати користувача з ID: ${id}`);
    
    if (process.env.REACT_APP_DEMO_MODE === 'true') {
      console.log('Демо-режим: використовуються тестові дані');
      return new Promise(resolve => {
        setTimeout(() => resolve(demoUserData), 500);
      });
    }
    
    const response = await authService.get(`/User/GetById?id=${id}`);
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
    
    const response = await authService.put(`/User/Update?id=${id}`, updateDto);
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


export const fetchUserFavorites = async (profileId, page = 1, pageSize = 5) => {
  if (process.env.REACT_APP_DEMO_MODE === 'true') {
    return new Promise(resolve => {
      setTimeout(() => resolve(getPaginatedData(demoFavoritesData, page, pageSize)), 500);
    });
  }
  
  const response = await fetch(`${process.env.REACT_APP_API_URL}/api/Favorite/GetUserFavorites?profileId=${profileId}&page=${page}&pageSize=${pageSize}`);
  if (!response.ok) throw new Error('Не вдалося завантажити обрані товари');
  return response.json();
};


export const fetchUserProducts = async (profileId, page = 1, pageSize = 5) => {
  if (process.env.REACT_APP_DEMO_MODE === 'true') {
    return new Promise(resolve => {
      setTimeout(() => resolve(getPaginatedData(demoProductsData, page, pageSize)), 500);
    });
  }
  
  const response = await fetch(`${process.env.REACT_APP_API_URL}/api/Listing/GetByProfile?profileId=${profileId}&page=${page}&pageSize=${pageSize}`);
  if (!response.ok) throw new Error('Не вдалося завантажити обрані товари');
  return response.json();
};