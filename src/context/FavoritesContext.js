import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchUserFavorites, addToFavorites, removeFromFavorites } from '../api/favorite';
import { fetchProfile } from '../api/profile';
import { useAuth } from './AuthContext';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [profileId, setProfileId] = useState(() => {
    // Инициализируем profileId из localStorage при создании контекста
    return localStorage.getItem('profileId');
  });
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  // Load profile data when component mounts or when authentication status changes
  useEffect(() => {
    const loadProfile = async () => {
      try {
        if (!isAuthenticated()) {
          console.log('User is not authenticated');
          setLoading(false);
          return;
        }

        // Проверяем, есть ли уже profileId в localStorage
        const storedProfileId = localStorage.getItem('profileId');
        if (storedProfileId) {
          console.log('Using stored profileId:', storedProfileId);
          setProfileId(storedProfileId);
          await loadFavorites(storedProfileId);
          setLoading(false);
          return;
        }

        // Если profileId нет в localStorage, получаем его из API
        const profileData = await fetchProfile();
        console.log('Profile data loaded:', profileData);
        if (profileData && profileData.id) {
          // Сохраняем profileId в localStorage
          localStorage.setItem('profileId', profileData.id);
          setProfileId(profileData.id);
          await loadFavorites(profileData.id);
        }
      } catch (error) {
        console.error('Error loading profile:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [isAuthenticated]);

  const loadFavorites = async (currentProfileId) => {
    try {
      const data = await fetchUserFavorites(currentProfileId);
      console.log('Favorites loaded:', data);
      setFavorites(data.items || []);
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  const toggleFavorite = async (listingId) => {
    const currentProfileId = localStorage.getItem('profileId');
    if (!currentProfileId) {
      console.error('No profile ID available');
      return;
    }

    try {
      const isCurrentlyFavorite = favorites.some(fav => fav.id === listingId);
      
      if (isCurrentlyFavorite) {
        await removeFromFavorites(currentProfileId, listingId);
        setFavorites(prevFavorites => 
          prevFavorites.filter(fav => fav.id !== listingId)
        );
      } else {
        await addToFavorites({
          profileId: currentProfileId,
          listingId
        });
        // Reload favorites to get the updated list
        await loadFavorites(currentProfileId);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const isFavorite = (listingId) => {
    return favorites.some(fav => fav.id === listingId);
  };

  const value = {
    favorites,
    loading,
    toggleFavorite,
    isFavorite,
    profileId
  };

  return (
    <FavoritesContext.Provider value={value}>
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