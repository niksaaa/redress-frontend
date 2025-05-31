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