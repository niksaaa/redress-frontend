import { demoFeedbackData, getPaginatedData } from '../demoData';
import { authService } from './authService';

export const fetchProfileFeedbacks = async (profileId, page = 1, pageSize = 5) => {
  if (process.env.REACT_APP_DEMO_MODE === 'true') {
    return new Promise(resolve => {
      setTimeout(() => resolve(getPaginatedData(demoFeedbackData, page, pageSize)), 500);
    });
  }
  
  try {
    const response = await authService.get(`/Feedback/GetProfileFeedbacks/profile/?profileId=${profileId}&page=${page}&pageSize=${pageSize}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Не вдалося завантажити відгуки');
  }
};

export const fetchFeedbackDetails = async (feedbackId) => {
  if (process.env.REACT_APP_DEMO_MODE === 'true') {
    return new Promise(resolve => {
      setTimeout(() => resolve({
        id: feedbackId,
        rating: 5,
        comment: "Демо-коментар",
        createdAt: new Date(),
        dealId: 'demo-deal-id',
        profile: {
          id: 'demo-profile-id',
          userId: 'demo-user-id'
        }
      }), 300);
    });
  }

  try {
    const response = await authService.get(`/Feedback/GetById/${feedbackId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Не вдалося завантажити деталі відгуку');
  }
};