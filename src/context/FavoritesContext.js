// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { fetchUserFavorites, addToFavorites, removeFromFavorites } from '../api/favorite';
// import { fetchProfile } from '../api/profile';
// import { useAuth } from './AuthContext';

// const FavoritesContext = createContext();

// export const FavoritesProvider = ({ children }) => {
//   const [favorites, setFavorites] = useState([]);
//   const [profileId, setProfileId] = useState(() => {
//     // Инициализируем profileId из localStorage при создании контекста
//     return localStorage.getItem('profileId');
//   });
//   const [loading, setLoading] = useState(true);
//   const { isAuthenticated } = useAuth();

//   // Load profile data when component mounts or when authentication status changes
//   useEffect(() => {
//     const loadProfile = async () => {
//       try {
//         if (!isAuthenticated()) {
//           console.log('User is not authenticated');
//           setLoading(false);
//           return;
//         }

//         // Проверяем, есть ли уже profileId в localStorage
//         const storedProfileId = localStorage.getItem('profileId');
//         if (storedProfileId) {
//           console.log('Using stored profileId:', storedProfileId);
//           setProfileId(storedProfileId);
//           await loadFavorites(storedProfileId);
//           setLoading(false);
//           return;
//         }

//         // Если profileId нет в localStorage, получаем его из API
//         const profileData = await fetchProfile();
//         console.log('Profile data loaded:', profileData);
//         if (profileData && profileData.id) {
//           // Сохраняем profileId в localStorage
//           localStorage.setItem('profileId', profileData.id);
//           setProfileId(profileData.id);
//           await loadFavorites(profileData.id);
//         }
//       } catch (error) {
//         console.error('Error loading profile:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadProfile();
//   }, [isAuthenticated]);

//   const loadFavorites = async (currentProfileId) => {
//     try {
//       const data = await fetchUserFavorites(currentProfileId);
//       console.log('Favorites loaded:', data);
//       setFavorites(data.items || []);
//     } catch (error) {
//       console.error('Error loading favorites:', error);
//     }
//   };

//   const toggleFavorite = async (listingId) => {
//     const currentProfileId = localStorage.getItem('profileId');
//     if (!currentProfileId) {
//       console.error('No profile ID available');
//       return;
//     }

//     try {
//       const isCurrentlyFavorite = favorites.some(fav => fav.id === listingId);
      
//       if (isCurrentlyFavorite) {
//         await removeFromFavorites(currentProfileId, listingId);
//         setFavorites(prevFavorites =>
//           prevFavorites.filter(fav => fav.id !== listingId)
//         );
//       } else {
//         await addToFavorites({
//           profileId: currentProfileId,
//           listingId
//         });
//         // Reload favorites to get the updated list
//         await loadFavorites(currentProfileId);
//       }
//     } catch (error) {
//       console.error('Error toggling favorite:', error);
//     }
//   };

//   const isFavorite = (listingId) => {
//     return favorites.some(fav => fav.id === listingId);
//   };

//   const value = {
//     favorites,
//     loading,
//     toggleFavorite,
//     isFavorite,
//     profileId
//   };

//   return (
//     <FavoritesContext.Provider value={value}>
//       {children}
//     </FavoritesContext.Provider>
//   );
// };

// export const useFavorites = () => {
//   const context = useContext(FavoritesContext);
//   if (!context) {
//     throw new Error('useFavorites must be used within a FavoritesProvider');
//   }
//   return context;
// };


import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { fetchProfile } from '../api/profile';
import { addToFavorites, removeFromFavorites, fetchUserFavorites } from '../api/favorite';

const FavoritesContext = createContext();

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [profileId, setProfileId] = useState(localStorage.getItem('profileId'));
  const { isAuthenticated } = useAuth();
  console.log('Контекст обраного працює');

  useEffect(() => {
    console.log('FavoritesContext mounted, isAuthenticated:', isAuthenticated);
    console.log('Current profileId from localStorage:', localStorage.getItem('profileId'));
    
    if (isAuthenticated()) {
      loadProfile();
    }
  }, [isAuthenticated]);

  const loadProfile = async () => {
    try {
      console.log('Loading profile...');
      const profileData = await fetchProfile();
      console.log('Profile data received:', profileData);
      
      if (profileData && profileData.id) {
        setProfileId(profileData.id);
        localStorage.setItem('profileId', profileData.id);
        console.log('Profile ID saved:', profileData.id);
        await loadFavorites(profileData.id);
      } else {
        console.error('No profile ID in response');
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const loadFavorites = async (id) => {
    try {
      console.log('Loading favorites for profile:', id);
      const { data } = await fetchUserFavorites(id);
      const favoritesArray = Array.isArray(data?.items) ? data.items : [];
    setFavorites(favoritesArray);
    } catch (error) {
      console.error('Error loading favorites:', error);
      setFavorites([]);
    }
  };

  const toggleFavorite = async (itemId) => {
    const currentProfileId = localStorage.getItem('profileId');
    console.log('Toggling favorite for item:', itemId);
    console.log('Current profileId:', currentProfileId);

    if (!currentProfileId) {
      console.error('No profile ID available');
      return;
    }

    try {
      const isFavorite = favorites.some(fav => fav.id === itemId);
      console.log('Is favorite:', isFavorite);

      if (isFavorite) {
        await removeFromFavorites(currentProfileId, itemId);
        console.log('Removed from favorites');
      } else {
        await addToFavorites(currentProfileId, itemId);
        console.log('Added to favorites');
      }

      await loadFavorites(currentProfileId);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const value = {
    favorites,
    toggleFavorite,
    isFavorite: (itemId) => {
      // Додаємо додаткову перевірку для безпеки
      if (!Array.isArray(favorites)) {
        console.warn('Favorites is not an array!', favorites);
        return false;
      }
      return favorites.some(fav => fav.id === itemId);
    }
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};