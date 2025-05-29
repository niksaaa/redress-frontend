import { authService } from './authService';

export const createListing = async (listingData) => {
  try {
    const response = await authService.post('/Listing/Create', listingData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Помилка при створенні оголошення');
  }
};

export const startAuction = async (listingId, auctionData) => {
  try {
    const response = await authService.post(`/Auction/StartAuction/${listingId}`, auctionData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Помилка при створенні аукціону');
  }
};

export const uploadListingImage = async (image, listingId) => {
  const formData = new FormData();
  formData.append('image', image);
  formData.append('listingId', listingId);

  try {
    const response = await authService.post('/ListingImage/UploadImage', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Помилка при завантаженні зображення');
  }
};