import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  loginUser, 
  registerUser, 
  logoutUser, 
  isAuthenticated,
  refreshAccessToken
} from '../api/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log('Ініціалізація AuthProvider');

  const login = async (credentials) => {
    console.log('Спроба входу з credentials:', credentials);
    try {
      const response = await loginUser(credentials);
      
      // Оскільки у вас немає методу /UserInfo, просто встановлюємо email
      const userData = { email: credentials.email };
      setUser(userData);
      
      console.log('Користувач успішно авторизований:', userData);
      return response;
    } catch (error) {
      console.error('Помилка авторизації:', error);
      throw error;
    }
  };

  const register = async (userData) => {
    console.log('Спроба реєстрації з даними:', userData);
    try {
      const response = await registerUser(userData);
      console.log('Користувач успішно зареєстрований:', response);
      return response;
    } catch (error) {
      console.error('Помилка реєстрації:', error);
      throw error;
    }
  };

  const logout = () => {
    console.log('Викликано вихід користувача');
    logoutUser();
    setUser(null);
    console.log('Користувач вийшов з системи');
  };

  useEffect(() => {
    console.log('Перевірка аутентифікації при завантаженні');
    const checkAuth = async () => {
      try {
        if (isAuthenticated()) {
          console.log('Користувач має токен, але немає методу /UserInfo');
          // Встановлюємо мінімальні дані, оскільки немає методу отримання інфи
          setUser({ authenticated: true });
        } else {
          console.log('Користувач не авторизований');
        }
      } catch (error) {
        console.error('Помилка перевірки аутентифікації:', error);
      } finally {
        setLoading(false);
        console.log('Перевірка аутентифікації завершена');
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      logout, 
      loading,
      isAuthenticated
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  console.log('Виклик useAuth');
  return useContext(AuthContext);
};