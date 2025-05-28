import axios from 'axios';

const API_BASE_URL = 'https://redress-backend.onrender.com/api/Auth';

export const authService = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Додаємо інтерсептор для логування запитів
authService.interceptors.request.use(
  (config) => {
    console.log('Запит відправляється:', {
      url: config.url,
      method: config.method,
      data: config.data,
      headers: config.headers
    });
    return config;
  },
  (error) => {
    console.error('Помилка при відправці запиту:', error);
    return Promise.reject(error);
  }
);

// Додаємо інтерсептор для логування відповідей
authService.interceptors.response.use(
  (response) => {
    console.log('Отримано відповідь:', {
      url: response.config.url,
      status: response.status,
      data: response.data
    });
    return response;
  },
  (error) => {
    console.error('Помилка у відповіді:', {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    return Promise.reject(error);
  }
);

// Інтерсептор для автоматичного додавання токену
authService.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      console.log('Додаємо токен до заголовків запиту');
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Інтерсептор для автоматичного оновлення токену
authService.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      console.log('Спроба оновити токен (401 помилка)');
      originalRequest._retry = true;
      
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
          console.error('Refresh токен відсутній');
          throw new Error('No refresh token available');
        }
        
        console.log('Оновлюємо токен з використанням refresh токена');
        const response = await refreshAccessToken({ 
          Token: localStorage.getItem('accessToken'),
          RefreshToken: refreshToken 
        });
        
        console.log('Нові токени отримано:', {
          accessToken: response.data.token,
          refreshToken: response.data.refreshToken
        });
        
        localStorage.setItem('accessToken', response.data.token);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        
        originalRequest.headers.Authorization = `Bearer ${response.data.token}`;
        return authService(originalRequest);
      } catch (refreshError) {
        console.error('Помилка оновлення токену:', refreshError);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export const registerUser = async (userData) => {
  console.log('Початок реєстрації користувача:', userData);
  try {
    const response = await authService.post('/Register', userData);
    console.log('Реєстрація успішна:', response.data);
    return response.data;
  } catch (error) {
    console.error('Помилка реєстрації:', error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

export const loginUser = async (credentials) => {
  console.log('Початок входу користувача:', credentials);
  try {
    const response = await authService.post('/Login', credentials);
    
    console.log('Вхід успішний. Отримано токени:', {
      accessToken: response.data.token,
      refreshToken: response.data.refreshToken
    });
    
    localStorage.setItem('accessToken', response.data.token);
    localStorage.setItem('refreshToken', response.data.refreshToken);
    
    return response.data;
  } catch (error) {
    console.error('Помилка входу:', error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

export const refreshAccessToken = async (tokenData) => {
  console.log('Оновлення токену:', tokenData);
  try {
    const response = await authService.post('/RefreshToken', tokenData);
    return response;
  } catch (error) {
    console.error('Помилка оновлення токену:', error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

export const logoutUser = () => {
  console.log('Вихід користувача. Видаляємо токени');
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

export const isAuthenticated = () => {
  const hasToken = !!localStorage.getItem('accessToken');
  console.log(`Перевірка аутентифікації: ${hasToken ? 'користувач авторизований' : 'користувач не авторизований'}`);
  return hasToken;
};