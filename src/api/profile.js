import { authService } from './authService'; // Використовуємо налаштований axios з authService

export const fetchProfile = async () => {
  try {
    console.log('Спроба отримати профіль користувача');
    const response = await authService.get('/Profile/GetUserProfile');
    console.log('Дані профілю отримано:', response.data);
    return response.data;
  } catch (error) {
    console.error('Помилка при отриманні профілю:', error);
    throw new Error(error.response?.data?.message || 'Не вдалося отримати дані профілю');
  }
};

export const updateProfile = async ({ id, updateDto }) => {
  try {
    console.log('Оновлення профілю:', { id, updateDto });
    const response = await authService.put(`/Profile/Update/${id}`, updateDto);
    console.log('Профіль успішно оновлено:', response.data);
    return response.data;
  } catch (error) {
    console.error('Помилка при оновленні профілю:', error);
    throw new Error(error.response?.data?.message || 'Не вдалося оновити профіль');
  }
};

export const deleteProfileImage = async (profileId) => {
  try {
    console.log('Видалення зображення профілю для profileId:', profileId);
    const response = await authService.delete(`/Profile/DeleteImage/${profileId}`);
    console.log('Зображення успішно видалено:', response.data);
    return response.data;
  } catch (error) {
    console.error('Помилка при видаленні зображення:', error);
    throw new Error(error.response?.data?.message || 'Не вдалося видалити зображення');
  }
};

export const uploadProfileImage = async ({ image, profileId }) => {
  try {
    console.log('Завантаження зображення профілю');
    const formData = new FormData();
    formData.append('image', image);
    formData.append('profileId', profileId);

    const response = await authService.post('/Profile/UploadImage/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    console.log('Зображення успішно завантажено:', response.data);
    return response.data;
  } catch (error) {
    console.error('Помилка при завантаженні зображення:', error);
    throw new Error(error.response?.data?.message || 'Не вдалося завантажити зображення');
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await authService.delete(`/Listing/Delete/${id}`);
    return response.data;
  } catch (error) {
    console.error('Помилка видалення товару:', error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
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
    const response = await authService.get('/Profile/GetUserProfile');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Помилка при завантаженні профілю');
  }
};