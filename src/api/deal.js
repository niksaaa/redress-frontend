import { authService } from './authService';

export const createDeal = async (dealData) => {
  try {
    const response = await authService.post('/Deal/Create', dealData);
    return response.data;
  } catch (error) {
    console.error('Error creating deal:', error);
    throw error;
  }
};

export const createFeedback = async (feedbackData) => {
  try {
    const response = await authService.post('/Feedback/Create', feedbackData);
    return response.data;
  } catch (error) {
    console.error('Error creating feedback:', error);
    throw error;
  }
};

// Мокова функція для створення угоди
// export const createDeal = async (dealData) => {
//     console.log("Моковий запит на створення угоди:", dealData);
    
//     // Імітуємо затримку, як у реальному API
//     await new Promise(resolve => setTimeout(resolve, 1000));
    
//     // Повертаємо випадковий GUID (для тесту)
//     const mockDealId = 'mock-deal-id-' + Math.random().toString(36).substr(2, 9);
//     console.log("Моковий dealId:", mockDealId);
    
//     return mockDealId;
//   };
  
//   // Мокова функція для створення відгуку
//   export const createFeedback = async (feedbackData) => {
//     console.log("Моковий запит на створення відгуку:", feedbackData);
    
//     await new Promise(resolve => setTimeout(resolve, 1000));
    
//     const mockFeedbackId = 'mock-feedback-id-' + Math.random().toString(36).substr(2, 9);
//     console.log("Моковий feedbackId:", mockFeedbackId);
    
//     return mockFeedbackId;
//   };