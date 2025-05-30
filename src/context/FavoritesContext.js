import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { fetchUserFavorites, addToFavorites, removeFromFavorites } from '../api/favorite';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log('Ініціалізація FavoritesProvider');

  // Завантаження обраних товарів при авторизації
  useEffect(() => {
    const loadFavorites = async () => {
      if (isAuthenticated() && user?.profileId) {
        try {
          setLoading(true);
          const data = await fetchUserFavorites(user.profileId);
          setFavorites(data.items || []);
        } catch (error) {
          console.error('Помилка завантаження обраних:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setFavorites([]);
        setLoading(false);
      }
    };

    loadFavorites();
  }, [isAuthenticated, user?.profileId]);

  const toggleFavorite = async (listingId) => {
    console.log('Початок toggleFavorite для:', listingId);
    if (!user?.profileId) {
      console.log('Немає profileId, перериваємо');
      return;
    }

    try {
      const isCurrentlyFavorite = favorites.some(fav => fav.listingId === listingId);
      console.log(`Товар ${listingId} вже в обраному:`, isCurrentlyFavorite);
      
      if (isCurrentlyFavorite) {
        console.log('Видаляємо з обраного...');
        await removeFromFavorites(user.profileId, listingId);
        setFavorites(prev => prev.filter(fav => fav.listingId !== listingId));
        console.log('Успішно видалено');
      } else {
        console.log('Додаємо до обраного...');
        await addToFavorites({
          ProfileId: user.profileId,
          ListingId: listingId
        });
        setFavorites(prev => [...prev, { listingId }]);
        console.log('Успішно додано');
      }
    } catch (error) {
      console.error('Помилка при зміні стану обраного:', error);
    }
  };

  const isFavorite = (listingId) => {
    const result = favorites.some(fav => fav.listingId === listingId);
    console.log(`Перевірка чи ${listingId} в обраному:`, result);
    return result;
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite, loading }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};