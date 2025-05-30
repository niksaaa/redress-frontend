// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { useAuth } from './AuthContext';
// import { fetchUserFavorites, addToFavorites, removeFromFavorites } from '../api/favorite';
// import { getProfileByUser } from '../api/user';

// const FavoritesContext = createContext();

// export const FavoritesProvider = ({ children }) => {
//   const { user, isAuthenticated } = useAuth();
//   const [favorites, setFavorites] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [profileId, setProfileId] = useState(null);
//   console.log('Ініціалізація FavoritesProvider');

//   // Отримуємо profileId при завантаженні
//   useEffect(() => {
//     const loadProfile = async () => {
//       if (isAuthenticated()) {
//         try {
//           setLoading(true);
//           const profileData = await getProfileByUser();
//           setProfileId(profileData.id); // Тут використовуємо Id з профілю
//           console.log('Отримано profileId:', profileData.id);
//         } catch (error) {
//           console.error('Помилка завантаження профілю:', error);
//         }
//       }
//     };

//     loadProfile();
//   }, [isAuthenticated]);

//   // Завантажуємо обране тільки коли маємо profileId
//   useEffect(() => {
//     const loadFavorites = async () => {
//       if (profileId) {
//         try {
//           setLoading(true);
//           const data = await fetchUserFavorites(profileId);
//           console.log('Отримано обраних товарів:', data.items);
//           setFavorites(data.items || []);
//         } catch (error) {
//           console.error('Помилка завантаження обраних:', error);
//         } finally {
//           setLoading(false);
//         }
//       }
//     };

//     loadFavorites();
//   }, [profileId]);


//   const toggleFavorite = async (listingId) => {
//     console.log('Початок toggleFavorite для:', listingId);
//     if (!profileId) {
//       console.log('Немає profileId, перериваємо');
//       return;
//     }

//     try {
//       const isCurrentlyFavorite = favorites.some(fav => fav.listingId === listingId);
//       console.log(`Товар ${listingId} вже в обраному:`, isCurrentlyFavorite);
      
//       if (isCurrentlyFavorite) {
//         console.log('Видаляємо з обраного...');
//         await removeFromFavorites(profileId, listingId);
//         setFavorites(prev => prev.filter(fav => fav.listingId !== listingId));
//         console.log('Успішно видалено');
//       } else {
//         console.log('Додаємо до обраного...');
//         await addToFavorites({
//           ProfileId: profileId,
//           ListingId: listingId
//         });
//         setFavorites(prev => [...prev, { listingId }]);
//         console.log('Успішно додано');
//       }
//     } catch (error) {
//       console.error('Помилка при зміні стану обраного:', error);
//     }
//   };

//   const isFavorite = (listingId) => {
//     const result = favorites.some(fav => fav.listingId === listingId);
//     console.log(`Перевірка чи ${listingId} в обраному:`, result);
//     return result;
//   };

//   return (
//     <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite, loading }}>
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
import { fetchUserFavorites, addToFavorites, removeFromFavorites } from '../api/favorite';
import { fetchProfile } from '../api/profile';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [profileId, setProfileId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load profile data when component mounts
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profileData = await fetchProfile();
        console.log('Profile data loaded:', profileData);
        if (profileData && profileData.id) {
          setProfileId(profileData.id);
          // Load favorites after getting profileId
          await loadFavorites(profileData.id);
        }
      } catch (error) {
        console.error('Error loading profile:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const loadFavorites = async (currentProfileId) => {
    try {
      console.log('Loading favorites for profile:', currentProfileId);
      const data = await fetchUserFavorites(currentProfileId);
      console.log('Favorites loaded:', data);
      setFavorites(data.items || []);
    } catch (error) {
      console.error('Error loading favorites:', error);
      setFavorites([]);
    }
  };

  const toggleFavorite = async (listingId) => {
    console.log('Starting toggleFavorite for:', listingId);
    console.log('Current profileId:', profileId);

    if (!profileId) {
      console.error('No profileId available');
      return;
    }

    try {
      const isCurrentlyFavorite = favorites.some(fav => fav.id === listingId);

      if (isCurrentlyFavorite) {
        // Remove from favorites
        await removeFromFavorites(profileId, listingId);
        setFavorites(prev => prev.filter(fav => fav.id !== listingId));
      } else {
        // Add to favorites
        const favoriteData = {
          profileId: profileId,
          listingId: listingId
        };
        await addToFavorites(favoriteData);
        // Reload favorites to get updated list
        await loadFavorites(profileId);
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