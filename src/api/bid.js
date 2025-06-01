import { authService } from './authService';

export const createBid = async (bidData) => {
    try {
      const response = await authService.post('/Bid/Create', bidData);
      return response.data;
    } catch (error) {
      console.error('Error creating bid:', error);
      throw error;
    }
  };