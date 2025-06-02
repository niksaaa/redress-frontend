import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  loginUser, 
  registerUser, 
  logoutUser, 
  isAuthenticated,
  refreshAccessToken
} from '../api/authService';
import { fetchProfile } from '../api/profile';
import { fetchUserFavorites } from '../api/favorite';

const AuthContext = createContext();

export const UserRole = {
  Admin: 0,
  Moderator: 1,
  Regular: 2
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);

  console.log('Ініціалізація AuthProvider');

  const login = async (credentials) => {
    console.log('Спроба входу з credentials:', credentials);
    try {
      const response = await loginUser(credentials);
      
      const userData = { 
        email: credentials.email || response.data.email,
        role: response.data.role
      };
      
      setUser(userData);
      setUserRole(response.user.role);
      
      console.log('Користувач успішно авторизований:', userData);
      
      const profileData = await fetchProfile();
      if (profileData?.id) {
        localStorage.setItem('profileId', profileData.id);
        localStorage.setItem('userBalance', profileData.balance);
        localStorage.setItem('userRole', response.user.role);
        
        const favorites = await fetchUserFavorites(profileData.id);
        localStorage.setItem('favorites', JSON.stringify(favorites.items.map(item => item.id)));
      }
      
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
    setUserRole(null);
    localStorage.removeItem('userRole');
    console.log('Користувач вийшов з системи');
  };

  useEffect(() => {
    console.log('Перевірка аутентифікації при завантаженні');
    const checkAuth = async () => {
      try {
        if (isAuthenticated()) {
          const role = localStorage.getItem('userRole');
          setUserRole(parseInt(role));
          setUser({ authenticated: true, role: parseInt(role) });
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
      isAuthenticated,
      userRole
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  console.log('Виклик useAuth');
  return useContext(AuthContext);
};