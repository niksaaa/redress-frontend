import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { fetchUserFavorites, addToFavorites, removeFromFavorites } from '../api/favorite';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

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
    console.log('Toggling favorite for:', listingId);
  console.log('Current user:', user);
  console.log('isAuthenticated:', isAuthenticated());
    if (!isAuthenticated() || !user?.profileId) return;

    try {
      const isFavorite = favorites.some(fav => fav.listingId === listingId);
      
      if (isFavorite) {
        await removeFromFavorites(user.profileId, listingId);
        setFavorites(prev => prev.filter(fav => fav.listingId !== listingId));
      } else {
        await addToFavorites({
          ProfileId: user.profileId,
          ListingId: listingId
        });
        setFavorites(prev => [...prev, { listingId }]);
      }
    } catch (error) {
      console.error('Помилка при зміні стану обраного:', error);
    }
  };

  const isFavorite = (listingId) => {
    return favorites.some(fav => fav.listingId === listingId);
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