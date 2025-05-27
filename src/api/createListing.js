import axios from 'axios';

const API_BASE_URL = 'https://localhost:7029/API';

export const createListing = async (listingData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/Listing/Create`, listingData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Помилка при створенні оголошення');
  }
};

export const startAuction = async (listingId, auctionData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/Auction/StartAuction?${listingId}`, auctionData);
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
    const response = await axios.post(`${API_BASE_URL}/ListingImage/UploadImage`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Помилка при завантаженні зображення');
  }
};