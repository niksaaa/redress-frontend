// import { authService } from './authService';
// import { demoFavoritesData, getPaginatedData } from '../demoData';

// export const fetchUserFavorites = async (profileId, page = 1, pageSize = 5) => {
//   if (process.env.REACT_APP_DEMO_MODE === 'true') {
//     return new Promise(resolve => {
//       setTimeout(() => resolve(getPaginatedData(demoFavoritesData, page, pageSize)), 500);
//     });
//   }
  
//   try {
//     const response = await authService.get(`/Favorite/GetUserFavorites?profileId=${profileId}&page=${page}&pageSize=${pageSize}`);
//     return response.data;
//   } catch (error) {
//     throw new Error(error.response?.data?.message || 'Не вдалося завантажити обрані товари');
//   }
// };

// export const addToFavorites = async (favoriteData) => {
//   try {
//     const response = await authService.post('/Favorite/AddToFavorites', favoriteData);
//     return response.data;
//   } catch (error) {
//     throw new Error(error.response?.data?.message || 'Не вдалося додати до обраного');
//   }
// };

// export const removeFromFavorites = async (profileId, listingId) => {
//   try {
//     const response = await authService.delete(`/Favorite/RemoveFromFavorites?profileId=${profileId}&listingId=${listingId}`);
//     return response.data;
//   } catch (error) {
//     throw new Error(error.response?.data?.message || 'Не вдалося видалити з обраного');
//   }
// };


import { authService } from './authService';

export const fetchUserFavorites = async (profileId, page = 1, pageSize = 10) => {
  try {
    const response = await authService.get(`/Favorite/GetUserFavorites?profileId=${profileId}&page=${page}&pageSize=${pageSize}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching favorites:', error);
    throw error;
  }
};

export const addToFavorites = async (profileId, listingId) => {
  try {
    const response = await authService.post('/Favorite/AddToFavorites', {
      profileId: profileId,
      listingId: listingId
    });
    return response.data;
  } catch (error) {
    console.error('Error adding to favorites:', error);
    throw error;
  }
};

export const removeFromFavorites = async (profileId, listingId) => {
  try {
    await authService.delete(`/Favorite/RemoveFromFavorites?profileId=${profileId}&listingId=${listingId}`);
  } catch (error) {
    console.error('Error removing from favorites:', error);
    throw error;
  }
};