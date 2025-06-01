import axios from 'axios';
import { authService } from './authService';

export const getAuctionById = async (id) => {
  try {
    const response = await authService.get(`Auction/GetById/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};